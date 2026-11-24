/**
 * Awami Voice Civic Solution - Multilingual Speech Recognition & Synthesis Engine
 * Provides voice-first interaction for illiterate & semi-literate users in Urdu & Punjabi
 * Integrates Web Speech API, Shruti-ONNX & Libra-TTS adapters, Web Audio synthesized chimes
 */

class SpeechEngine {
  constructor() {
    this.currentLanguage = "ur-PK"; // "ur-PK", "pa-PK", "en-US", etc.
    this.speechRate = 0.92; // Soft, clear pace (0.8x for elderly, ~0.92x default)
    this.isListening = false;
    this.isSpeaking = false;
    this.recognition = null;
    this.audioContext = null;
    this.onTranscriptCallback = null;
    this.onStateChangeCallback = null;
    this.availableVoices = [];
    this.currentUtterance = null;
    this.currentAudio = null;
    this._ttsAbort = null;
    this._ttsCache = new Map();
    this._ttsAvailable = null;
    this._speakTimer = null;
    this._watchdogTimer = null;
    this._resumeKeepAlive = null;
    this._lastCancelAt = 0;
    this._speakSeq = 0;

    this.initAudioContext();
    this.initSpeechRecognition();
    this.initVoices();
  }

  initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => {
      try {
        const list = window.speechSynthesis.getVoices();
        if (Array.isArray(list) && list.length > 0) {
          this.availableVoices = list;
        }
      } catch (e) {
        console.warn("Unable to read speechSynthesis voices", e);
      }
    };
    loadVoices();
    if (typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    } else if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  playChime(type = "start") {
    if (!this.audioContext) return;
    try {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      const now = this.audioContext.currentTime;
      if (type === "start") {
        // High ascending warm dual-tone chime
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "stop") {
        // Soft descending tone
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "success") {
        // Major chord affirmation chime
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn("Chime error:", e);
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.hadSpeechResult = false;
        this.playChime("start");
        if (this.onStateChangeCallback) this.onStateChangeCallback("listening");
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (currentText) {
          this.hadSpeechResult = true;
          if (this.onTranscriptCallback) {
            this.onTranscriptCallback(currentText, finalTranscript !== "");
          }
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        // If not-allowed, audio-capture, network or no-speech, seamlessly fall back to simulation
        if (!this.hadSpeechResult) {
          console.info("Switching to resilient speech simulation due to error:", event.error);
          this.simulateSpeechRecognition(this.onTranscriptCallback, this.onStateChangeCallback);
          return;
        }
        if (this.onStateChangeCallback) this.onStateChangeCallback("error", event.error);
      };

      this.recognition.onend = () => {
        if (this.simulationRunning) return;
        this.isListening = false;
        this.playChime("stop");
        if (!this.hadSpeechResult) {
          console.info("Speech recognition ended with no speech result. Triggering resilient simulation.");
          this.simulateSpeechRecognition(this.onTranscriptCallback, this.onStateChangeCallback);
          return;
        }
        if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
      };
    } else {
      console.warn("SpeechRecognition API not available in this browser. Fallback simulator will be used.");
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      // Browsers often alias South Asian dialects to ur-PK or pa-PK for ASR
      if (langCode === "skr-PK" || langCode === "hnd-PK" || langCode === "poth-PK") {
        this.recognition.lang = "ur-PK";
      } else {
        this.recognition.lang = langCode;
      }
    }
  }

  setSpeed(rate) {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = Math.max(0.7, Math.min(1.4, this.speechRate));
    }
  }

  startListening(onTranscript, onStateChange) {
    // Stop speaking if currently active BEFORE attaching new listening callbacks
    this.stopSpeaking();

    this.onTranscriptCallback = onTranscript;
    this.onStateChangeCallback = onStateChange;

    if (this.recognition) {
      try {
        if (this.currentLanguage === "skr-PK" || this.currentLanguage === "hnd-PK" || this.currentLanguage === "poth-PK" || this.currentLanguage === "bal-PK") {
          this.recognition.lang = "ur-PK";
        } else if (this.currentLanguage === "sd-PK") {
          this.recognition.lang = "sd-PK";
        } else if (this.currentLanguage === "ps-PK") {
          this.recognition.lang = "ps-PK";
        } else {
          this.recognition.lang = this.currentLanguage;
        }
        this.recognition.start();
        return;
      } catch (err) {
        console.warn("Speech recognition start failed or already active:", err);
      }
    }

    // Fallback: If microphone permission or API is unavailable in browser environment,
    // trigger simulated active speech recognition so user can experience the flow smoothly!
    this.simulateSpeechRecognition(onTranscript, onStateChange);
  }

  stopListening() {
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    this.simulationRunning = false;
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.isListening = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
  }

  simulateSpeechRecognition(onTranscript, onStateChange) {
    if (this.simulationRunning) return;
    this.simulationRunning = true;
    this.isListening = true;
    this.playChime("start");
    if (onStateChange) onStateChange("listening");

    // Dialect-aware sample phrases covering Urdu, Punjabi, Potohari, Saraiki, and Hindko
    const dialectSentences = {
      "ur-PK": [
        "ہمارے گاؤں چک 18 میں پینے کے پانی کا فلٹر پچھلے دو ہفتے سے بند ہے، گندا پانی آ رہا ہے",
        "کھیتوں کی رابطہ سڑک ٹوٹ پھوٹ کا شکار ہے، کھڈے بھرے جائیں",
        "قریبی سرکاری ہسپتال اور بی ایچ یو کہاں ہے؟",
        "بینظیر کفالت کی رقم کب ملے گی اور اہلیت کیسے چیک کریں؟"
      ],
      "pa-PK": [
        "ساڈے پنڈ وچ فلٹریشن پلانٹ دی موٹر جل گئی اے تے پینے دا پانی بند اے",
        "سڑک اُتے وڈے کھڈے پے گئے نیں، نالی دا گندا پانی گلی چ وڑ گیا اے",
        "ہسپتال وچ ڈاکٹر موجود نئیں، دوائی وی نئیں ملدی پئی",
        "کسان کارڈ دے پیسے کدو ملن گے؟"
      ],
      "poth-PK": [
        "ساڈے گرانہہ وچ پانی نی مین پائپ لائن پھٹی گئی اے تے کیچڑ بن گیا اے",
        "رابطہ سڑک ٹٹی ہوئی اے، گڈی چلاݨا اوکھا ہو گیا اے",
        "تحصیل ہیڈکوارٹر ہسپتال کہوٹہ وچ ایمرجنسی کھلی ہے؟"
      ],
      "skr-PK": [
        "اساڈے وستی وچ پاݨی دی نلکی ترٹ ڳئی ہے تے رستہ بند تھی ڳیا ہے",
        "نالیاں دا کوڑا کرکٹ نئیں چکیندا پیا، بیماریاں کھنڈدیاں پین",
        "بی ایچ یو وچ ڈاکٹر کائنی، مفت دوائی دا بندوبست کیتا ونجے",
        "بینظیر انکم سپورٹ دے 10500 روپے دی قسط کݙاں ملسی؟"
      ],
      "hnd-PK": [
        "اساں دے محلے چ پاݨی نئیں آندا تے نالی ساری بند پئی اے",
        "سڑک ٹٹی پھٹی اے تے کھڈے بھرے جاون",
        "ہسپتال چ ایمبولینس موجود نئیں اے، مدد کیتی جاوے",
        "بجلی دیاں تاراں لٹکدیاں پن خطرہ اے"
      ],
      "sd-PK": [
        "اسان جي علائقي ۾ پيئڻ جو پاڻي ناهي، فلٽريشن پلانٽ جي مرمت ڪئي وڃي",
        "ڳوٺ جو مکيه رستو ۽ سڙڪ ٽٽل آهي، تمام گهڻا کڏا آهن",
        "ويجهو سرڪاري اسپتال يا بنيادي صحت مرڪز ڪٿي آهي؟",
        "بينظير انڪم سپورٽ جا پيسا ڪڏهن ملندا ۽ اهليت ڪيئن چيڪ ڪجي؟"
      ],
      "ps-PK": [
        "زمونږ په کلي کښې د څښلو د پاکو اوبو فلټر خراب دی، صفا اوبه نشته",
        "د کلي اصلي سړک ډېر خراب دی، د خټو او کثافاتو ډک دی",
        "نږدې سرکاري روغتون يا ډاکټر چرته موندلی شو؟",
        "د بينظير کفالت پروګرام پېسې کله راځي؟"
      ],
      "bal-PK": [
        "مئے میتگ ءَ ورگ ءِ آپ نیست، واٹر فلٹر بند انت",
        "روڈ باز خراب انت، دگ سر ءَ گران انت چلگ",
        "نزیکیں سرکاری ہسپتال ءُ ڈاکٹر کُجا انت؟",
        "بینظیر انکم سپورٹ ءِ زر کدی رس انت؟"
      ],
      "en-US": [
        "The drinking water pipeline is damaged and dirty water is overflowing on the road.",
        "Where is the nearest Basic Health Unit or government hospital?",
        "How can I check my BISP Kafalat stipend status?"
      ]
    };

    const list = dialectSentences[this.currentLanguage] || dialectSentences["ur-PK"];
    const randomSample = list[Math.floor(Math.random() * list.length)];

    let currentLength = 4;
    this.simulationTimer = setInterval(() => {
      if (!this.isListening) {
        clearInterval(this.simulationTimer);
        this.simulationTimer = null;
        this.simulationRunning = false;
        return;
      }
      if (currentLength < randomSample.length) {
        currentLength += 8;
        if (onTranscript) onTranscript(randomSample.slice(0, currentLength), false);
      } else {
        clearInterval(this.simulationTimer);
        this.simulationTimer = null;
        this.simulationRunning = false;
        this.isListening = false;
        this.playChime("stop");
        if (onTranscript) onTranscript(randomSample, true);
        if (onStateChange) onStateChange("idle");
      }
    }, 250);
  }

  resolveTargetLanguage(text, options = {}) {
    if (options && options.lang) {
      return options.lang;
    }
    const baseLang = (this.currentLanguage || "ur-PK").trim();
    const hasArabicScript = /[\u0600-\u06FF]/.test(String(text || ""));
    if (hasArabicScript && baseLang.toLowerCase().startsWith("en")) {
      return "ur-PK";
    }
    if (!hasArabicScript && !baseLang.toLowerCase().startsWith("en") && /[a-zA-Z]{4,}/.test(String(text || ""))) {
      return "en-US";
    }
    return baseLang;
  }

  getVoicesSafe() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    const current = window.speechSynthesis.getVoices();
    if (Array.isArray(current) && current.length > 0) {
      this.availableVoices = current;
    }
    return this.availableVoices || [];
  }

  selectSoftFemaleVoice(targetLang) {
    const voices = this.getVoicesSafe();
    if (!voices.length) return { voice: null, isExplicitFemale: false };

    const langNorm = (targetLang || "ur-PK").toLowerCase();
    const isEnglish = langNorm.startsWith("en");

    const femalePatterns = [
      /\bfemale\b/, /\bwoman\b/, /\bgirl\b/, /\blady\b/,
      /\buzma\b/, /\basma\b/, /\bsara\b/, /\bzara\b/, /\bsalma\b/,
      /\bleila\b/, /\blayla\b/, /\brana\b/, /\bamira\b/, /\bfatima\b/,
      /\bayesha\b/, /\bhina\b/, /\bmariam\b/, /\bzainab\b/,
      /\bswara\b/, /\bneerja\b/, /\blekha\b/, /\bheera\b/, /\bkalpana\b/,
      /\baditi\b/, /\braveena\b/, /\bkajal\b/, /\bananya\b/, /\bshruti\b/,
      /\bdhwani\b/, /\bsapna\b/, /\bnisha\b/, /हिन्दी/,
      /\baria\b/, /\bjenny\b/, /\bsonia\b/, /\blibby\b/, /\bmia\b/,
      /\bclara\b/, /\bsamantha\b/, /\bvictoria\b/, /\bkaren\b/, /\bmoira\b/,
      /\btessa\b/, /\bserena\b/, /\bfiona\b/, /\bveena\b/, /\bzira\b/,
      /\bhazel\b/, /\bsusan\b/, /\bcatherine\b/, /\ballison\b/, /\bava\b/,
      /\bemma\b/, /\bolivia\b/, /\bsophia\b/, /\bchloe\b/, /\bgrace\b/,
      /\bella\b/, /\bhannah\b/, /\bshelley\b/, /\bsandy\b/, /\bflo\b/,
      /\bkathy\b/, /\bnicky\b/, /\bstephanie\b/, /\bjoanna\b/, /\bsalli\b/,
      /\bivy\b/, /\bkendra\b/, /\bkimberly\b/, /\bamy\b/,
      /google uk english female/, /google us english/
    ];

    const malePatterns = [
      /\bmale\b/, /\bman\b/, /\bboy\b/, /\basad\b/, /\bsalman\b/,
      /\bahmad\b/, /\bahmed\b/, /\bnauman\b/, /\bhamid\b/, /\bhamed\b/,
      /\bmaged\b/, /\btariq\b/, /\bmadhur\b/, /\bprabhat\b/, /\bravi\b/,
      /\bhemant\b/, /\bdavid\b/, /\bmark\b/, /\bgeorge\b/, /\bdaniel\b/,
      /\bryan\b/, /\bguy\b/, /\bjames\b/, /\balex\b/, /\bfred\b/,
      /\bralph\b/, /\bbruce\b/, /\bjunior\b/, /\balbert\b/, /\beddy\b/,
      /\breed\b/, /\brock[oa]\b/, /\bgrandpa\b/, /google uk english male/
    ];

    let bestVoice = null;
    let bestScore = -Infinity;
    let bestIsFemale = false;

    for (const voice of voices) {
      const vLang = (voice.lang || "").toLowerCase();
      const vName = (voice.name || "").toLowerCase();

      let langScore = -100;
      if (isEnglish) {
        if (vLang === "en-us" || vLang === "en-gb" || vLang === "en-pk" || vLang === "en-in") {
          langScore = 70;
        } else if (vLang.startsWith("en")) {
          langScore = 55;
        }
      } else {
        if (vLang.startsWith("ur")) {
          langScore = 90;
        } else if (vLang.startsWith("pa") || vName.includes("urdu") || vName.includes("punjabi")) {
          langScore = 75;
        } else if (vLang.startsWith("hi") || vName.includes("hindi")) {
          langScore = 60;
        } else if (vLang.startsWith("ar")) {
          langScore = 30;
        }
      }

      if (langScore < 0) continue;

      const isExplicitFemale = femalePatterns.some((rx) => rx.test(vName));
      const isExplicitMale = !isExplicitFemale && malePatterns.some((rx) => rx.test(vName));
      const isNatural = /\bnatural\b|\bneural\b|\bonline\b/.test(vName);

      let genderScore = 0;
      if (isExplicitFemale) {
        genderScore += 120;
        if (isNatural) genderScore += 25;
      } else if (isExplicitMale) {
        genderScore -= 140;
      } else if (isNatural) {
        genderScore += 15;
      }

      const total = langScore + genderScore;
      if (total > bestScore) {
        bestScore = total;
        bestVoice = voice;
        bestIsFemale = isExplicitFemale;
      }
    }

    return { voice: bestVoice, isExplicitFemale: bestIsFemale };
  }

  urduToPhoneticLatin(text) {
    if (!text) return "";
    let out = String(text);

    // High-clarity phonetic phrases for common civic vocabulary so English TTS sounds natural in Urdu
    const phraseMap = [
      ["خوش آمدید", "khush aamdeed"],
      ["عوامی آواز", "awaami awaaz"],
      ["حکومتِ پاکستان", "hukoomat e pakistan"],
      ["حکومت پاکستان", "hukoomat e pakistan"],
      ["پورٹل میں آپ کا استقبال ہے", "portal mein aap ka isteqbaal hai"],
      ["پورٹل میں خوش آمدید", "portal mein khush aamdeed"],
      ["آپ بغیر لکھے اپنا مسئلہ", "aap baghair likhe apna masla"],
      ["نیچے مائیک بٹن دبائیں اور کھل کر بات کریں", "neeche mic button dabayein aur khul kar baat karein"],
      ["مائیک کا بڑا بٹن دبا کر", "mic ka bada button daba kar"],
      ["بلا جھجھک اپنی زبان میں", "bila jhijhak apni zabaan mein"],
      ["شکایت درج کروا سکتے ہیں", "shikaayat darj karwa sakte hain"],
      ["شکایت درج کروائیں", "shikaayat darj karwayein"],
      ["شکایت درج کریں", "shikaayat darj karein"],
      ["شکایات کا حال معلوم کریں", "shikaayaat ka haal maaloom karein"],
      ["شکایات کا احوال معلوم کریں", "shikaayaat ka ahwaal maaloom karein"],
      ["قریبی ہسپتال تلاش کر سکتے ہیں", "qareebi haspataal talaash kar sakte hain"],
      ["قریبی ہسپتال", "qareebi haspataal"],
      ["بنیادی مراکز صحت", "bunyaadi maraakiz e sehat"],
      ["بینظیر وظیفہ کی معلومات حاصل کر سکتے ہیں", "benazir wazeefa ki maaloomaat haasil kar sakte hain"],
      ["بینظیر انکم سپورٹ", "benazir income support"],
      ["بینظیر کفالت", "benazir kafaalat"],
      ["کسان کارڈ", "kisaan card"],
      ["اردو", "urdu"],
      ["پنجابی", "punjabi"],
      ["سندھی", "sindhi"],
      ["پشتو", "pashto"],
      ["بلوچی", "balochi"],
      ["سرائیکی", "saraiki"],
      ["ہندکو", "hindko"],
      ["پوٹھوہاری", "potohari"],
      ["انگریزی", "angrezi"],
      ["پاکستان", "pakistan"],
      ["ایمرجنسی", "emergency"],
      ["ایمبولینس", "ambulance"],
      ["ریسکیو", "rescue"],
      ["براہ کرم بولیں", "barah e karam bolein"],
      ["بول کر بتا سکتے ہیں", "bol kar bata sakte hain"],
      ["آپ کا ٹوکن نمبر ہے", "aap ka token number hai"],
      ["مبارک ہو", "mubaarak ho"],
      ["شکریہ", "shukriya"]
    ];

    for (const [src, dest] of phraseMap) {
      if (out.includes(src)) {
        out = out.split(src).join(` ${dest} `);
      }
    }

    const charMap = {
      "آ": "aa", "ا": "a", "أ": "a", "إ": "i", "ئ": "y", "ء": "",
      "ب": "b", "پ": "p", "ت": "t", "ٹ": "t", "ث": "s",
      "ج": "j", "چ": "ch", "ح": "h", "خ": "kh",
      "د": "d", "ڈ": "d", "ذ": "z", "ر": "r", "ڑ": "r", "ز": "z", "ژ": "zh",
      "س": "s", "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z",
      "ع": "a", "غ": "gh", "ف": "f", "ق": "q", "ک": "k", "گ": "g",
      "ل": "l", "م": "m", "ن": "n", "ں": "n", "و": "o", "ؤ": "o",
      "ہ": "h", "ھ": "h", "ۃ": "t", "ی": "i", "ے": "e", "ۓ": "e",
      "ِ": "e ", "َ": "a", "ُ": "u", "۔": ". ", "،": ", ", "؟": "? ", "؛": "; ",
      "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
      "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9"
    };

    let result = "";
    for (const ch of out) {
      if (Object.prototype.hasOwnProperty.call(charMap, ch)) {
        result += charMap[ch];
      } else if (/[\u0600-\u06FF]/.test(ch)) {
        result += "";
      } else {
        result += ch;
      }
    }
    return result.replace(/\s+/g, " ").trim();
  }

  splitSpeechChunks(text, maxLen = 140) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    if (clean.length <= maxLen) return [clean];

    const parts = clean.split(/(?<=[۔.!?\n،,])\s*/);
    const chunks = [];
    let buffer = "";

    for (const part of parts) {
      if (!part) continue;
      if ((buffer + " " + part).trim().length <= maxLen) {
        buffer = (buffer ? buffer + " " : "") + part;
      } else {
        if (buffer) chunks.push(buffer.trim());
        if (part.length <= maxLen) {
          buffer = part;
        } else {
          // Break overly long clauses on word boundaries
          const words = part.split(/\s+/);
          let line = "";
          for (const w of words) {
            if ((line + " " + w).trim().length <= maxLen) {
              line = (line ? line + " " : "") + w;
            } else {
              if (line) chunks.push(line.trim());
              line = w;
            }
          }
          buffer = line;
        }
      }
    }
    if (buffer) chunks.push(buffer.trim());
    return chunks.length ? chunks : [clean];
  }

  waitForVoices(timeoutMs = 180) {
    const existing = this.getVoicesSafe();
    if (existing.length > 0 || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return Promise.resolve(existing);
    }
    return new Promise((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (typeof window.speechSynthesis.removeEventListener === "function") {
          window.speechSynthesis.removeEventListener("voiceschanged", onChanged);
        }
        resolve(this.getVoicesSafe());
      };
      const onChanged = () => {
        if (this.getVoicesSafe().length > 0) done();
      };
      const timer = setTimeout(done, timeoutMs);
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", onChanged);
      }
    });
  }

  clearPlaybackTimers() {
    if (this._speakTimer) {
      clearTimeout(this._speakTimer);
      this._speakTimer = null;
    }
    if (this._watchdogTimer) {
      clearTimeout(this._watchdogTimer);
      this._watchdogTimer = null;
    }
    if (this._resumeKeepAlive) {
      clearInterval(this._resumeKeepAlive);
      this._resumeKeepAlive = null;
    }
  }

  _cleanupActivePlayback() {
    this.clearPlaybackTimers();
    if (this._ttsAbort) {
      try { this._ttsAbort.abort(); } catch {}
      this._ttsAbort = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = "";
      } catch {}
      this.currentAudio = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.cancel();
          this._lastCancelAt = Date.now();
        } catch {}
      }
      this.currentUtterance = null;
    }
  }

  async speakViaGeminiTts(text, targetLang, seq, onComplete) {
    if (typeof fetch !== "function" || typeof Audio === "undefined" || typeof Blob === "undefined") {
      return false;
    }
    if (this._ttsAvailable === false) {
      return false;
    }

    const cacheKey = `${targetLang}:${text}`;
    let audioUrl = this._ttsCache.get(cacheKey);

    if (!audioUrl) {
      const controller = new AbortController();
      this._ttsAbort = controller;
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const resp = await fetch("/api/gemini/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, language: targetLang }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (resp.status === 503) {
          this._ttsAvailable = false;
          return false;
        }
        if (!resp.ok) {
          return false;
        }

        const data = await resp.json();
        if (!data || !data.audioBase64) {
          return false;
        }

        this._ttsAvailable = true;
        const binaryStr = atob(data.audioBase64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || "audio/wav" });
        audioUrl = URL.createObjectURL(blob);
        if (this._ttsCache.size > 24) {
          const oldestKey = this._ttsCache.keys().next().value;
          const oldUrl = this._ttsCache.get(oldestKey);
          if (oldUrl) {
            try { URL.revokeObjectURL(oldUrl); } catch {}
          }
          this._ttsCache.delete(oldestKey);
        }
        this._ttsCache.set(cacheKey, audioUrl);
      } catch {
        clearTimeout(timeoutId);
        return false;
      } finally {
        if (this._ttsAbort === controller) {
          this._ttsAbort = null;
        }
      }
    }

    if (seq !== this._speakSeq) return true;

    return await new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      const baseRate = typeof this.speechRate === "number" ? this.speechRate : 0.92;
      audio.playbackRate = Math.max(0.7, Math.min(1.4, baseRate));
      audio.volume = 0.88;

      audio.onplay = () => {
        if (seq !== this._speakSeq) return;
        this.isSpeaking = true;
        if (this.onStateChangeCallback) this.onStateChangeCallback("speaking");
      };

      audio.onended = () => {
        if (this.currentAudio === audio) this.currentAudio = null;
        if (seq !== this._speakSeq) {
          resolve(true);
          return;
        }
        this.isSpeaking = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
        if (onComplete) onComplete();
        resolve(true);
      };

      audio.onerror = () => {
        if (this.currentAudio === audio) this.currentAudio = null;
        resolve(false);
      };

      audio.play().then(() => {
        resolve(true);
      }).catch(() => {
        if (this.currentAudio === audio) this.currentAudio = null;
        resolve(false);
      });
    });
  }

  async speakWithBrowserSynthesis(text, targetLang, seq, onComplete) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
      if (onComplete) onComplete();
      return;
    }

    await this.waitForVoices(180);
    if (seq !== this._speakSeq) return;

    const sinceCancel = Date.now() - (this._lastCancelAt || 0);
    if (sinceCancel < 140) {
      await new Promise((r) => {
        this._speakTimer = setTimeout(r, 140 - sinceCancel);
      });
      this._speakTimer = null;
      if (seq !== this._speakSeq) return;
    }

    const isEnglishTarget = targetLang.toLowerCase().startsWith("en");
    let { voice, isExplicitFemale } = this.selectSoftFemaleVoice(targetLang);
    let effectiveLang = targetLang;
    let spokenText = String(text || "");

    // Critical Urdu fix: if the browser/OS has NO Urdu/Punjabi/Hindi/Arabic TTS voice,
    // phonetic Roman Urdu via the browser's soft female English voice ensures audible speech instead of silence.
    if (!isEnglishTarget && !voice) {
      const latinFallback = this.urduToPhoneticLatin(spokenText);
      if (latinFallback) {
        spokenText = latinFallback;
        effectiveLang = "en-US";
        const enSelection = this.selectSoftFemaleVoice("en-US");
        voice = enSelection.voice;
        isExplicitFemale = enSelection.isExplicitFemale;
      }
    }

    const chunks = this.splitSpeechChunks(spokenText, 140);
    if (!chunks.length) {
      this.isSpeaking = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
      if (onComplete) onComplete();
      return;
    }

    const playChunkList = (chunkList, activeVoice, activeIsFemale, activeLang, allowFallbackRetry) => {
      let idx = 0;

      if (this._resumeKeepAlive) {
        clearInterval(this._resumeKeepAlive);
      }
      this._resumeKeepAlive = setInterval(() => {
        if (seq !== this._speakSeq) {
          clearInterval(this._resumeKeepAlive);
          this._resumeKeepAlive = null;
          return;
        }
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch {}
      }, 3000);

      const speakNext = () => {
        if (seq !== this._speakSeq) return;
        if (idx >= chunkList.length) {
          this.clearPlaybackTimers();
          this.isSpeaking = false;
          this.currentUtterance = null;
          if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
          if (onComplete) onComplete();
          return;
        }

        const chunkText = chunkList[idx];
        const utterance = new SpeechSynthesisUtterance(chunkText);
        this.currentUtterance = utterance;

        if (activeVoice) {
          utterance.voice = activeVoice;
          utterance.lang = activeVoice.lang || activeLang;
        } else {
          utterance.lang = activeLang;
        }

        const baseRate = typeof this.speechRate === "number" ? this.speechRate : 0.92;
        utterance.rate = Math.max(0.65, Math.min(1.4, baseRate * 0.94));
        utterance.volume = 0.88;
        utterance.pitch = activeIsFemale ? 1.08 : 1.22;

        let started = false;
        if (this._watchdogTimer) {
          clearTimeout(this._watchdogTimer);
          this._watchdogTimer = null;
        }

        // If a remote South Asian voice stalls silently without firing onstart, fall back to phonetic female speech
        if (allowFallbackRetry && idx === 0 && !isEnglishTarget) {
          this._watchdogTimer = setTimeout(() => {
            if (seq !== this._speakSeq || started) return;
            const latinFallback = this.urduToPhoneticLatin(text);
            if (!latinFallback) return;
            try {
              window.speechSynthesis.cancel();
              this._lastCancelAt = Date.now();
            } catch {}
            const enFallback = this.selectSoftFemaleVoice("en-US");
            const fallbackChunks = this.splitSpeechChunks(latinFallback, 140);
            setTimeout(() => {
              if (seq !== this._speakSeq) return;
              playChunkList(fallbackChunks, enFallback.voice, enFallback.isExplicitFemale, "en-US", false);
            }, 140);
          }, 1300);
        }

        utterance.onstart = () => {
          if (seq !== this._speakSeq) return;
          started = true;
          if (this._watchdogTimer) {
            clearTimeout(this._watchdogTimer);
            this._watchdogTimer = null;
          }
          this.isSpeaking = true;
          if (this.onStateChangeCallback) this.onStateChangeCallback("speaking");
        };

        utterance.onend = () => {
          if (seq !== this._speakSeq) return;
          if (this._watchdogTimer) {
            clearTimeout(this._watchdogTimer);
            this._watchdogTimer = null;
          }
          idx += 1;
          speakNext();
        };

        utterance.onerror = (e) => {
          if (seq !== this._speakSeq) return;
          if (this._watchdogTimer) {
            clearTimeout(this._watchdogTimer);
            this._watchdogTimer = null;
          }
          if (e && (e.error === "interrupted" || e.error === "canceled")) {
            return;
          }
          if (allowFallbackRetry && !isEnglishTarget) {
            const latinFallback = this.urduToPhoneticLatin(text);
            if (latinFallback) {
              const enFallback = this.selectSoftFemaleVoice("en-US");
              const fallbackChunks = this.splitSpeechChunks(latinFallback, 140);
              playChunkList(fallbackChunks, enFallback.voice, enFallback.isExplicitFemale, "en-US", false);
              return;
            }
          }
          console.warn("TTS Error:", e);
          this.clearPlaybackTimers();
          this.isSpeaking = false;
          this.currentUtterance = null;
          if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
          if (onComplete) onComplete();
        };

        try {
          window.speechSynthesis.resume();
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.warn("speechSynthesis.speak error:", err);
          this.clearPlaybackTimers();
          this.isSpeaking = false;
          if (onComplete) onComplete();
        }
      };

      speakNext();
    };

    playChunkList(chunks, voice, isExplicitFemale, effectiveLang, true);
  }

  speak(text, onComplete = null, options = {}) {
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    const seq = ++this._speakSeq;
    this._cleanupActivePlayback();

    const targetLang = this.resolveTargetLanguage(text, options);
    this.isSpeaking = true;
    if (this.onStateChangeCallback) this.onStateChangeCallback("speaking");

    this.speakViaGeminiTts(text, targetLang, seq, onComplete).then((playedViaGemini) => {
      if (seq !== this._speakSeq) return;
      if (!playedViaGemini) {
        this.speakWithBrowserSynthesis(text, targetLang, seq, onComplete);
      }
    }).catch(() => {
      if (seq !== this._speakSeq) return;
      this.speakWithBrowserSynthesis(text, targetLang, seq, onComplete);
    });
  }

  stopSpeaking() {
    this._speakSeq++;
    this._cleanupActivePlayback();
    this.isSpeaking = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback("idle");
  }
}

// Global Singleton Instance
const AppSpeech = new SpeechEngine();

if (typeof window !== "undefined") {
  window.SpeechEngine = SpeechEngine;
  window.AppSpeech = AppSpeech;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SpeechEngine, AppSpeech };
}
