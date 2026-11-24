/**
 * Awami Voice Civic Solution - Citizen Web Portal Shared Script
 * Powers Audio Narration, Real-time Speech Interaction, Full-Page English <-> Urdu Switching,
 * Dynamic Green <-> Red Mic Color Transition upon Click, and Multi-Dialect Conversational AI
 */

const WebPortal = {
  narrating: false,
  narrationSpeed: 1.0,
  currentLang: "ur",
  lastAiResponse: null,
  lastUserQuery: null,

  init() {
    try {
      this.currentLang = localStorage.getItem("awami_app_lang") || "ur";
    } catch (e) {
      this.currentLang = "ur";
    }
    if (typeof AppSecurity !== "undefined" && typeof AppSecurity.init === "function") {
      AppSecurity.init();
    }
    if (typeof AppLogger !== "undefined") {
      AppLogger.info("SYSTEM", "Citizen WebPortal initialized", { lang: this.currentLang });
    }
    this.applyLanguage(this.currentLang);
    this.highlightActiveNav();

    if (typeof AppSpeech !== "undefined") {
      AppSpeech.setLanguage(this.currentLang === "en" ? "en-US" : "ur-PK");
    }
  },

  toggleLanguage() {
    this.currentLang = this.currentLang === "ur" ? "en" : "ur";
    try {
      localStorage.setItem("awami_app_lang", this.currentLang);
    } catch (e) {
      console.warn("Storage restricted", e);
    }
    this.applyLanguage(this.currentLang);
    this.highlightActiveNav();

    if (typeof AppSpeech !== "undefined") {
      AppSpeech.setLanguage(this.currentLang === "en" ? "en-US" : "ur-PK");
    }

    // Re-render subpage listings if present
    if (typeof renderWebHospitals === "function") {
      renderWebHospitals();
    }
    if (typeof renderSubsidies === "function") {
      renderSubsidies();
    }
  },

  applyLanguage(lang) {
    const isEn = lang === "en";
    document.documentElement.dir = isEn ? "ltr" : "rtl";
    document.documentElement.lang = isEn ? "en" : "ur";

    const dict = (typeof CivicData !== "undefined" && CivicData.i18n && CivicData.i18n[lang]) || {};

    // 1. Header & Navigation (Available on All Web Pages)
    const topBtnLabel = document.getElementById("top-lang-text");
    if (topBtnLabel) topBtnLabel.innerText = isEn ? "اردو" : "English";

    const govText = document.getElementById("gov-strip-text");
    if (govText && dict.govTitle) govText.innerText = dict.govTitle;

    const brandName = document.getElementById("brand-portal-name");
    if (brandName && dict.portalName) brandName.innerText = dict.portalName;

    const brandSub = document.getElementById("brand-portal-sub");
    if (brandSub && dict.portalSubtitle) brandSub.innerText = dict.portalSubtitle;

    const audioGuideTop = document.getElementById("gov-audio-guide-text");
    if (audioGuideTop && dict.audioGuide) audioGuideTop.innerText = dict.audioGuide;

    const adminLinkTop = document.getElementById("gov-admin-link-text");
    if (adminLinkTop && dict.adminLogin) adminLinkTop.innerText = dict.adminLogin;

    const mobileLinkText = document.getElementById("gov-mobile-link-text");
    if (mobileLinkText && dict.viewMobile) mobileLinkText.innerText = dict.viewMobile;

    const backBtnText = document.getElementById("nav-back-text");
    if (backBtnText) backBtnText.innerText = isEn ? "Back (Home)" : "واپسی (Back)";

    // Navigation Links
    const navLinks = document.querySelectorAll("header nav a");
    if (navLinks.length >= 5) {
      navLinks[0].innerText = dict.navHome || (isEn ? "Home" : "مرکزی صفحہ (Home)");
      navLinks[1].innerText = dict.navRegister || (isEn ? "Register Complaint" : "شکایت درج کروائیں (Register)");
      navLinks[2].innerText = dict.navTrack || (isEn ? "Track Status" : "شکایات کا حال (Track)");
      navLinks[3].innerText = dict.navHealthcare || (isEn ? "Healthcare" : "ہسپتال و صحت (Healthcare)");
      navLinks[4].innerText = dict.navSubsidies || (isEn ? "Subsidies & Welfare" : "امداد و وظائف (Subsidies)");
    }

    // 2. Audio Narrator Bar
    const narrateTitle = document.getElementById("narrator-bar-title");
    if (narrateTitle && dict.narratorTitle) narrateTitle.innerText = dict.narratorTitle;

    const narrateSub = document.getElementById("narrator-bar-sub");
    if (narrateSub && dict.narratorSub) narrateSub.innerText = dict.narratorSub;

    const narrateText = document.getElementById("narrateText");
    if (narrateText && dict.narratorBtn) narrateText.innerText = dict.narratorBtn;

    const speedLabel = document.getElementById("narrator-speed-label");
    if (speedLabel && dict.narratorSpeedLabel) speedLabel.innerText = dict.narratorSpeedLabel;

    // 3. Hero & Voice Interaction Centerpiece (index.html)
    const heroBadge = document.getElementById("hero-badge-text");
    if (heroBadge && dict.heroBadge) heroBadge.innerText = dict.heroBadge;

    const heroHeadline = document.getElementById("hero-headline-text");
    if (heroHeadline && dict.heroHeadline) heroHeadline.innerText = dict.heroHeadline;

    const heroSub = document.getElementById("hero-sub-text");
    if (heroSub && dict.heroSub) heroSub.innerText = dict.heroSub;

    const micStatus = document.getElementById("micStatusText");
    if (micStatus) {
      const isListening = typeof AppSpeech !== "undefined" && AppSpeech.isListening;
      micStatus.innerText = isListening ? (isEn ? "Listening..." : "سن رہا ہے...") : (isEn ? "Speak" : "بولیں");
    }

    const micInstructionTitle = document.getElementById("mic-instruction-title");
    if (micInstructionTitle && dict.micInstruction) micInstructionTitle.innerText = dict.micInstruction;

    const micInstructionSub = document.getElementById("mic-instruction-sub");
    if (micInstructionSub && dict.micDialectsList) micInstructionSub.innerText = dict.micDialectsList;

    // Suggestion Chips
    const chipsHeader = document.getElementById("chips-header-text");
    if (chipsHeader && dict.chipsTitle) chipsHeader.innerText = dict.chipsTitle;

    const chip1 = document.getElementById("chip-road-text");
    if (chip1 && dict.chipRoad) chip1.innerText = dict.chipRoad;

    const chip2 = document.getElementById("chip-hospital-text");
    if (chip2 && dict.chipHospital) chip2.innerText = dict.chipHospital;

    const chip3 = document.getElementById("chip-bisp-text");
    if (chip3 && dict.chipBisp) chip3.innerText = dict.chipBisp;

    const chip4 = document.getElementById("chip-saraiki-text");
    if (chip4 && dict.chipSaraiki) chip4.innerText = dict.chipSaraiki;

    const chip5 = document.getElementById("chip-hindko-text");
    if (chip5 && dict.chipHindko) chip5.innerText = dict.chipHindko;

    const chipSindhi = document.getElementById("chip-sindhi-text");
    if (chipSindhi && dict.chipSindhi) chipSindhi.innerText = dict.chipSindhi;

    const chipPashto = document.getElementById("chip-pashto-text");
    if (chipPashto && dict.chipPashto) chipPashto.innerText = dict.chipPashto;

    const chipBalochi = document.getElementById("chip-balochi-text");
    if (chipBalochi && dict.chipBalochi) chipBalochi.innerText = dict.chipBalochi;

    // 4. Conversational Dialogue Box Translations
    const convoTitle = document.getElementById("convo-status-title");
    if (convoTitle) convoTitle.innerText = isEn ? "Spoken Conversation & AI Civic Guidance" : "صوتی مکالمہ و رہنمائی (Voice Conversation & AI Response)";

    const convoUserLabel = document.getElementById("convo-user-label");
    if (convoUserLabel) convoUserLabel.innerText = isEn ? "Your Spoken Input:" : "آپ کا بولا گیا فقرہ (Your Spoken Input):";

    const convoReplayBtn = document.getElementById("convo-replay-btn");
    if (convoReplayBtn) convoReplayBtn.innerText = isEn ? "Replay" : "سنیں";

    const convoAiLabel = document.getElementById("convo-ai-label");
    if (convoAiLabel) convoAiLabel.innerText = isEn ? "Awami Voice Guidance & Action:" : "عوامی آواز رہنمائی (AI Response & Action):";

    const convoListenAiBtn = document.getElementById("convo-listen-ai-btn");
    if (convoListenAiBtn) convoListenAiBtn.innerText = isEn ? "Listen Answer" : "جواب سنیں";

    const convoProceedBtn = document.getElementById("convo-proceed-btn");
    if (convoProceedBtn) convoProceedBtn.innerText = isEn ? "File Formal Grievance with this Query" : "اس پر باقاعدہ شکایت درج کروائیں (Register Official Grievance)";

    // 5. Civic Gateways Bento Section
    const gwSecTitle = document.getElementById("gateways-section-title");
    if (gwSecTitle && dict.gatewaysTitle) gwSecTitle.innerText = dict.gatewaysTitle;

    const gwSecSub = document.getElementById("gateways-section-sub");
    if (gwSecSub && dict.gatewaysSub) gwSecSub.innerText = dict.gatewaysSub;

    // Gateway 1: Complaint
    const gw1Title = document.getElementById("gw-complaint-title");
    if (gw1Title && dict.gwComplaintTitle) gw1Title.innerText = dict.gwComplaintTitle;
    const gw1Badge = document.getElementById("gw-complaint-badge");
    if (gw1Badge && dict.gwComplaintBadge) gw1Badge.innerText = dict.gwComplaintBadge;
    const gw1Desc = document.getElementById("gw-complaint-desc");
    if (gw1Desc && dict.gwComplaintDesc) gw1Desc.innerText = dict.gwComplaintDesc;
    const gw1Btn = document.getElementById("gw-complaint-btn-text");
    if (gw1Btn && dict.gwComplaintAction) gw1Btn.innerText = dict.gwComplaintAction;

    // Gateway 2: Tracking
    const gw2Title = document.getElementById("gw-track-title");
    if (gw2Title && dict.gwTrackTitle) gw2Title.innerText = dict.gwTrackTitle;
    const gw2Badge = document.getElementById("gw-track-badge");
    if (gw2Badge && dict.gwTrackBadge) gw2Badge.innerText = dict.gwTrackBadge;
    const gw2Desc = document.getElementById("gw-track-desc");
    if (gw2Desc && dict.gwTrackDesc) gw2Desc.innerText = dict.gwTrackDesc;
    const gw2Btn = document.getElementById("gw-track-btn-text");
    if (gw2Btn && dict.gwTrackAction) gw2Btn.innerText = dict.gwTrackAction;

    // Gateway 3: Healthcare
    const gw3Title = document.getElementById("gw-health-title");
    if (gw3Title && dict.gwHealthTitle) gw3Title.innerText = dict.gwHealthTitle;
    const gw3Badge = document.getElementById("gw-health-badge");
    if (gw3Badge && dict.gwHealthBadge) gw3Badge.innerText = dict.gwHealthBadge;
    const gw3Desc = document.getElementById("gw-health-desc");
    if (gw3Desc && dict.gwHealthDesc) gw3Desc.innerText = dict.gwHealthDesc;
    const gw3Btn = document.getElementById("gw-health-btn-text");
    if (gw3Btn && dict.gwHealthAction) gw3Btn.innerText = dict.gwHealthAction;

    // Gateway 4: Subsidies
    const gw4Title = document.getElementById("gw-subsidy-title");
    if (gw4Title && dict.gwSubsidyTitle) gw4Title.innerText = dict.gwSubsidyTitle;
    const gw4Badge = document.getElementById("gw-subsidy-badge");
    if (gw4Badge && dict.gwSubsidyBadge) gw4Badge.innerText = dict.gwSubsidyBadge;
    const gw4Desc = document.getElementById("gw-subsidy-desc");
    if (gw4Desc && dict.gwSubsidyDesc) gw4Desc.innerText = dict.gwSubsidyDesc;
    const gw4Btn = document.getElementById("gw-subsidy-btn-text");
    if (gw4Btn && dict.gwSubsidyAction) gw4Btn.innerText = dict.gwSubsidyAction;

    // 6. Sidebar Bento Telemetry
    const sideDialectsTitle = document.getElementById("side-dialects-title");
    if (sideDialectsTitle && dict.sideDialectsTitle) sideDialectsTitle.innerText = dict.sideDialectsTitle;
    const sideDialectsDesc = document.getElementById("side-dialects-desc");
    if (sideDialectsDesc && dict.sideDialectsDesc) sideDialectsDesc.innerText = dict.sideDialectsDesc;

    const sideZeroTitle = document.getElementById("side-zeropaid-title");
    if (sideZeroTitle && dict.sideZeroPaidTitle) sideZeroTitle.innerText = dict.sideZeroPaidTitle;
    const sideZeroDesc = document.getElementById("side-zeropaid-desc");
    if (sideZeroDesc && dict.sideZeroPaidDesc) sideZeroDesc.innerText = dict.sideZeroPaidDesc;

    const sideOfflineTitle = document.getElementById("side-offline-title");
    if (sideOfflineTitle && dict.sideOfflineTitle) sideOfflineTitle.innerText = dict.sideOfflineTitle;
    const sideOfflineDesc = document.getElementById("side-offline-desc");
    if (sideOfflineDesc && dict.sideOfflineDesc) sideOfflineDesc.innerText = dict.sideOfflineDesc;

    // 7. Footer
    const footerGov = document.getElementById("footer-gov-text");
    if (footerGov && dict.footerGov) footerGov.innerText = dict.footerGov;
    const footerDiv = document.getElementById("footer-div-text");
    if (footerDiv && dict.footerDiv) footerDiv.innerText = dict.footerDiv;
    const footerTech = document.getElementById("footer-tech-text");
    if (footerTech && dict.footerTech) footerTech.innerText = dict.footerTech;

    // 8. Register Page Specific Localization (register.html)
    const regStep1 = document.getElementById("reg-step-1");
    if (regStep1) regStep1.innerText = isEn ? "1. Speak Voice Note" : "1. بولیں (Speak Voice Note)";
    const regStep2 = document.getElementById("reg-step-2");
    if (regStep2) regStep2.innerText = isEn ? "2. Review & Edit" : "2. سنیں (Review & Edit)";
    const regStep3 = document.getElementById("reg-step-3");
    if (regStep3) regStep3.innerText = isEn ? "3. Confirm & Submit" : "3. تصدیق (Confirm & Submit)";

    const regFormTitle = document.getElementById("reg-form-title");
    if (regFormTitle) regFormTitle.innerText = isEn ? "Grievance Form (Details & Verification)" : "شکایت فارم (تفصیلات و تصدیق)";
    const regFormSub = document.getElementById("reg-form-sub");
    if (regFormSub) regFormSub.innerText = isEn ? "You can speak into the mic next to each field" : "ہر خانے کے ساتھ مائیک کا بٹن دباکر بول بھی سکتے ہیں";

    const regSubmitBtn = document.getElementById("reg-submit-btn-text");
    if (regSubmitBtn) regSubmitBtn.innerText = isEn ? "Submit Official Grievance (Send to Department)" : "شکایت درج کریں اور کارروائی شروع کروائیں";

    // 9. Generic translation for elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerText = dict[key];
    });
  },

  highlightActiveNav() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("header nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href === current || (current === "" && href === "index.html"))) {
        link.className = "min-h-[44px] px-4 py-2 rounded-xl transition-colors flex items-center bg-primary-container text-on-primary font-bold shadow-sm";
      } else {
        link.className = "min-h-[44px] px-4 py-2 rounded-xl font-urdu-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center";
      }
    });
  },

  togglePageNarration(textToRead = null) {
    const icon = document.getElementById("narrateIcon");
    const textEl = document.getElementById("narrateText");
    const isEn = this.currentLang === "en";

    if (this.narrating) {
      AppSpeech.stopSpeaking();
      this.narrating = false;
      if (icon) icon.innerText = "play_circle";
      if (textEl) textEl.innerText = isEn ? "Listen This Page" : "یہ صفحہ سنیں (Listen)";
      return;
    }

    const dict = (typeof CivicData !== "undefined" && CivicData.i18n && CivicData.i18n[this.currentLang]) || {};
    const defaultNarration = textToRead || (isEn ? dict.welcomeNarration : (dict.welcomeNarration || "عوامی آواز حکومتِ پاکستان پورٹل میں خوش آمدید۔ آپ مائیک کا بڑا بٹن دبا کر بلا جھجھک اپنی زبان میں شکایت درج کروا سکتے ہیں، قریبی ہسپتال تلاش کر سکتے ہیں اور بینظیر وظیفہ کی معلومات حاصل کر سکتے ہیں۔"));
    
    this.narrating = true;
    if (icon) icon.innerText = "pause_circle";
    if (textEl) textEl.innerText = isEn ? "Pause Audio" : "آواز روکو (Pause)";

    AppSpeech.speak(defaultNarration, () => {
      this.narrating = false;
      if (icon) icon.innerText = "play_circle";
      if (textEl) textEl.innerText = isEn ? "Listen This Page" : "یہ صفحہ سنیں (Listen)";
    });
  },

  setSpeed(speed, btnElement = null) {
    this.narrationSpeed = speed;
    AppSpeech.setSpeed(speed);
    if (btnElement) {
      const parent = btnElement.parentElement;
      if (parent) {
        parent.querySelectorAll("button").forEach(b => {
          b.className = "min-h-[34px] px-3 py-1 rounded-lg text-xs text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors";
        });
        btnElement.className = "min-h-[34px] px-3 py-1 rounded-lg text-xs bg-primary text-on-primary font-bold transition-colors";
      }
    }
  },

  /**
   * Spoken Query Execution from Suggestion Chips
   */
  playVoiceHint(text) {
    AppSpeech.playChime("speechCaptured");
    const isEn = this.currentLang === "en";

    // Process through AI Router to produce conversational answer
    AppAIRouter.processQuery(text).then(res => {
      this.displayConversationResult(text, res, isEn);
    });
  },

  /**
   * Trigger Main Microphone Button
   * DYNAMIC COLOR TRANSITION:
   * - Default/Idle: GREEN (Pakistani Emerald Studio Green)
   * - Clicked/Active: RED/AMBER with fast sonic halo pulse and dancing equalizer
   * - Finished/Stopped: Flips smoothly back to GREEN
   */
  triggerMainMic() {
    const micBtn = document.getElementById("mainVoiceMic");
    const orbContainer = document.getElementById("mic-container-orb");
    const visualizer = document.getElementById("soundWaveVisualizer");
    const statusText = document.getElementById("micStatusText");
    const isEn = this.currentLang === "en";

    // If already listening, stop and return color to green
    if (AppSpeech.isListening) {
      AppSpeech.stopListening();
      if (micBtn) micBtn.classList.remove("is-recording");
      if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
      if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
      if (visualizer) visualizer.classList.add("hidden");
      return;
    }

    // ACTIVATE RECORDING STATE: Turn Mic RED/AMBER with pulsing animation
    if (micBtn) micBtn.classList.add("is-recording");
    if (orbContainer) orbContainer.classList.add("is-recording-wrapper");
    if (visualizer) visualizer.classList.remove("hidden");
    if (statusText) statusText.innerText = isEn ? "Listening..." : "سن رہا ہے...";

    // Ensure speech engine matches active language
    AppSpeech.setLanguage(isEn ? "en-US" : "ur-PK");

    AppSpeech.startListening(
      (transcript, isFinal) => {
        if (isFinal) {
          // RESTORE GREEN COLOR UPON SPEECH COMPLETION
          if (micBtn) micBtn.classList.remove("is-recording");
          if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
          if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
          if (visualizer) visualizer.classList.add("hidden");

          AppAIRouter.processQuery(transcript).then(res => {
            WebPortal.displayConversationResult(transcript, res, isEn);
          });
        }
      },
      (state) => {
        if (state === "idle") {
          // RESTORE GREEN COLOR WHEN IDLE
          if (micBtn) micBtn.classList.remove("is-recording");
          if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
          if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
          if (visualizer) visualizer.classList.add("hidden");
        }
      }
    );
  },

  /**
   * Translate Spoken Query from Urdu/Dialect to English
   */
  getQueryTranslation(query) {
    if (!query) return "";
    const text = query.toLowerCase();
    if (text.includes("پانی") || text.includes("پاݨی") || text.includes("فلٹر") || text.includes("نلکی") || text.includes("water")) {
      return "Drinking water pipeline / filtration plant in our area is broken and water supply is contaminated.";
    } else if (text.includes("سڑک") || text.includes("سڙڪ") || text.includes("سړک") || text.includes("روڈ") || text.includes("کھڈے") || text.includes("ٹٹی") || text.includes("road")) {
      return "Link road is broken and hazardous with deep potholes, blocking vehicle transit.";
    } else if (text.includes("ہسپتال") || text.includes("اسپتال") || text.includes("روغتون") || text.includes("ڈاکٹر") || text.includes("hospital")) {
      return "Inquiry regarding the nearest government hospital, Basic Health Unit (BHU), and doctors on duty.";
    } else if (text.includes("بینظیر") || text.includes("بينظير") || text.includes("کفالت") || text.includes("وظیفہ") || text.includes("8171") || text.includes("bisp")) {
      return "Inquiry regarding BISP 8171 Kafalat PKR 10,500 quarterly grant disbursement and eligibility verification.";
    } else if (text.includes("بجلی") || text.includes("تار") || text.includes("ٹرانسفارمر") || text.includes("electricity")) {
      return "Emergency complaint: Low-hanging live electric wires posing imminent hazard in village street.";
    } else if (text.includes("صفائی") || text.includes("کوڑا") || text.includes("نالی") || text.includes("sanitation")) {
      return "Sanitation crisis: Overflowing open garbage dump and choked drainage in municipal ward.";
    }
    return "Civic assistance and public department grievance request.";
  },

  /**
   * Display Dual-Language Urdu <-> English Spoken Dialogue
   */
  displayConversationResult(userText, aiRes, isEn) {
    this.lastUserQuery = userText;
    this.lastAiResponse = aiRes;

    const alertBox = document.getElementById("dictationAlert");
    const queryText = document.getElementById("dictatedQuery");
    const queryTrans = document.getElementById("dictatedQueryEnglish");
    const aiText = document.getElementById("aiResponseText");
    const aiTrans = document.getElementById("aiResponseTranslation");

    if (alertBox) {
      alertBox.classList.remove("hidden");
      alertBox.style.display = "flex";
      alertBox.style.flexDirection = "column";
    }

    if (queryText) queryText.innerText = `"${userText}"`;
    if (queryTrans) {
      const translated = this.getQueryTranslation(userText);
      queryTrans.innerText = `English Translation: "${translated}"`;
    }

    const urduAnswer = aiRes.responseUrdu || "آپ کی شکایت نوٹ کر لی گئی ہے اور متعلقہ محکمے کو روانہ کی جا رہی ہے۔";
    const englishAnswer = aiRes.responseEnglish || "Your complaint has been logged and assigned to the relevant department.";

    if (aiText) aiText.innerText = urduAnswer;
    if (aiTrans) aiTrans.innerText = englishAnswer;

    // Speak aloud in the user's active language
    const spokenReply = isEn ? englishAnswer : urduAnswer;
    AppSpeech.speak(spokenReply);

    // Scroll conversation into view smoothly
    if (alertBox) {
      alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  },

  replayUserQuery() {
    if (this.lastUserQuery) {
      AppSpeech.speak(this.lastUserQuery);
    }
  },

  replayAiResponse() {
    if (this.lastAiResponse) {
      const isEn = this.currentLang === "en";
      const spokenReply = isEn ? (this.lastAiResponse.responseEnglish || this.lastAiResponse.responseUrdu) : this.lastAiResponse.responseUrdu;
      AppSpeech.speak(spokenReply);
    }
  },

  playEnglishTranslation() {
    if (this.lastAiResponse && this.lastAiResponse.responseEnglish) {
      AppSpeech.speak(this.lastAiResponse.responseEnglish);
    } else if (this.lastUserQuery) {
      const trans = this.getQueryTranslation(this.lastUserQuery);
      AppSpeech.speak(trans);
    }
  },

  submitSpokenQuery() {
    const queryText = document.getElementById("dictatedQuery");
    const text = queryText ? queryText.innerText.replace(/[“”"]/g, "").trim() : "";
    if (text) {
      sessionStorage.setItem("awami_web_pending_query", text);
      window.location.href = "register.html";
    }
  },

  dismissDictationAlert() {
    const alertBox = document.getElementById("dictationAlert");
    if (alertBox) {
      alertBox.classList.add("hidden");
      alertBox.style.display = "none";
    }
  }
};

// Global Browser Window Assignment
if (typeof window !== "undefined") {
  window.WebPortal = WebPortal;
}

document.addEventListener("DOMContentLoaded", () => {
  WebPortal.init();
});
