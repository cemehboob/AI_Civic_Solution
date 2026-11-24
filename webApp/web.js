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
    this.setupKeyboardNavigation();
    this.updateAriaLabels();

    if (typeof AppSpeech !== "undefined") {
      AppSpeech.setLanguage(this.currentLang === "en" ? "en-US" : "ur-PK");
    }
  },

  mediaRecorder: null,
  recordedChunks: [],
  isGeminiRecording: false,

  toggleLanguage() {
    const wasNarrating = this.narrating;
    if (typeof AppSpeech !== "undefined" && (this.narrating || AppSpeech.isSpeaking)) {
      AppSpeech.stopSpeaking();
      this.narrating = false;
    }

    this.currentLang = this.currentLang === "ur" ? "en" : "ur";
    try {
      localStorage.setItem("awami_app_lang", this.currentLang);
    } catch (e) {
      console.warn("Storage restricted", e);
    }
    this.applyLanguage(this.currentLang);
    this.highlightActiveNav();
    this.updateAriaLabels();

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

    // If page narration was actively playing, restart immediately in the new language
    if (wasNarrating) {
      this.togglePageNarration();
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

    // Navigation Links (Desktop & Mobile Nav Bars)
    const desktopNavLinks = document.querySelectorAll('header nav[aria-label="Main navigation"] a');
    if (desktopNavLinks.length >= 5) {
      desktopNavLinks[0].innerText = dict.navHome || (isEn ? "Home" : "مرکزی صفحہ (Home)");
      desktopNavLinks[1].innerText = dict.navRegister || (isEn ? "Register Complaint" : "شکایت درج کروائیں (Register)");
      desktopNavLinks[2].innerText = dict.navTrack || (isEn ? "Track Status" : "شکایات کا حال (Track)");
      desktopNavLinks[3].innerText = dict.navHealthcare || (isEn ? "Healthcare" : "ہسپتال و صحت (Healthcare)");
      desktopNavLinks[4].innerText = dict.navSubsidies || (isEn ? "Subsidies & Welfare" : "امداد و وظائف (Subsidies)");
    }

    const mobileNavLinks = document.querySelectorAll('header nav[aria-label="Mobile navigation"] a');
    if (mobileNavLinks.length >= 5) {
      mobileNavLinks[0].innerText = isEn ? "Home" : "مرکزی صفحہ (Home)";
      mobileNavLinks[1].innerText = isEn ? "Register" : "شکایت درج (Register)";
      mobileNavLinks[2].innerText = isEn ? "Track" : "ٹریکنگ (Track)";
      mobileNavLinks[3].innerText = isEn ? "Healthcare" : "ہسپتال (Healthcare)";
      mobileNavLinks[4].innerText = isEn ? "Subsidies" : "امداد (Subsidies)";
    }

    // 2. Audio Narrator Bar
    const narrateTitle = document.getElementById("narrator-bar-title");
    if (narrateTitle && dict.narratorTitle) narrateTitle.innerText = dict.narratorTitle;

    const narrateSub = document.getElementById("narrator-bar-sub");
    if (narrateSub && dict.narratorSub) narrateSub.innerText = dict.narratorSub;

    const narrateText = document.getElementById("narrateText");
    if (narrateText) {
      if (this.narrating) {
        narrateText.innerText = isEn ? "Pause Audio" : "آواز روکو (Pause)";
      } else if (dict.narratorBtn) {
        narrateText.innerText = dict.narratorBtn;
      }
    }

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
    const isActive = href => Boolean(href && (href === current || (current === "" && href === "index.html")));

    document.querySelectorAll('header nav[aria-label="Main navigation"] a').forEach(link => {
      if (isActive(link.getAttribute("href"))) {
        link.className = "min-h-[44px] px-4 py-2 rounded-xl transition-colors flex items-center bg-primary-container text-on-primary font-bold shadow-sm";
        link.setAttribute("aria-current", "page");
      } else {
        link.className = "min-h-[44px] px-4 py-2 rounded-xl font-urdu-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center";
        link.removeAttribute("aria-current");
      }
    });

    document.querySelectorAll('header nav[aria-label="Mobile navigation"] a').forEach(link => {
      if (isActive(link.getAttribute("href"))) {
        link.className = "min-h-[38px] px-3 py-1.5 rounded-lg bg-primary-container text-on-primary whitespace-nowrap shrink-0 flex items-center shadow-sm";
        link.setAttribute("aria-current", "page");
      } else {
        link.className = "min-h-[38px] px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap shrink-0 flex items-center";
        link.removeAttribute("aria-current");
      }
    });
  },

  updateAriaLabels() {
    const isEn = this.currentLang === "en";
    const mainMic = document.getElementById("mainVoiceMic");
    const isListening = Boolean(
      this.isGeminiRecording ||
      (typeof AppSpeech !== "undefined" && AppSpeech.isListening) ||
      (mainMic && mainMic.classList.contains("is-recording"))
    );

    const langBtn = document.getElementById("header-lang-switcher") || document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.setAttribute(
        "aria-label",
        isEn ? "Switch interface language to Urdu" : "انگریزی زبان میں تبدیل کریں (Switch language to English)"
      );
      langBtn.setAttribute("aria-pressed", isEn ? "true" : "false");
    }

    if (mainMic) {
      mainMic.setAttribute("aria-pressed", isListening ? "true" : "false");
      mainMic.setAttribute(
        "aria-label",
        isListening
          ? (isEn ? "Stop voice recording and transcribe audio" : "آواز ریکارڈنگ بند کریں اور تحریر بنائیں")
          : (isEn ? "Activate voice microphone. Press Enter or Space to speak in English or local language." : "مائیکروفون آن کریں۔ انگریزی یا اپنی مقامی زبان میں بولنے کے لیے انٹر یا اسپیس دبائیں۔")
      );
    }

    const narrateBtn = document.getElementById("narrateBtn");
    if (narrateBtn) {
      narrateBtn.setAttribute("aria-pressed", this.narrating ? "true" : "false");
      narrateBtn.setAttribute(
        "aria-label",
        this.narrating
          ? (isEn ? "Pause page audio narration" : "صفحہ کی آواز رہنمائی روکیں")
          : (isEn ? "Listen to page audio narration" : "یہ صفحہ آواز میں سنیں")
      );
    }

    const gatewayMap = [
      {
        id: "gw-complaint-link",
        en: "Register Official Complaint — File water, road, electricity, or sanitation grievances",
        ur: "عوامی شکایت درج کروائیں — پانی، سڑک، بجلی یا صفائی کی شکایت درج کریں"
      },
      {
        id: "gw-track-link",
        en: "Track Complaint Status — Check progress by token number, CNIC, or voice",
        ur: "شکایات کا حال معلوم کریں — ٹوکن نمبر یا آواز سے پیشرفت دیکھیں"
      },
      {
        id: "gw-health-link",
        en: "Healthcare and Basic Health Units — Find nearby hospitals, doctors, and Rescue 1122",
        ur: "ہسپتال و بنیادی مراکز صحت — قریبی ہسپتال، ڈاکٹر اور ریسکیو 1122 تلاش کریں"
      },
      {
        id: "gw-subsidy-link",
        en: "Subsidies and BISP Welfare Schemes — Check BISP 8171, Kisan Card, and Sehat Card",
        ur: "امداد، وظائف و کسان کارڈ — بینظیر کفالت 8171 اور کسان کارڈ معلومات دیکھیں"
      }
    ];

    gatewayMap.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        el.setAttribute("aria-label", isEn ? item.en : item.ur);
      }
    });
  },

  setupKeyboardNavigation() {
    // Allow Spacebar activation on role="button" elements and gateway action links
    document.addEventListener("keydown", (e) => {
      const active = document.activeElement;
      if (!active) return;

      // Escape stops active voice recording or closes conversation panel
      if (e.key === "Escape") {
        if (this.isGeminiRecording || (typeof AppSpeech !== "undefined" && AppSpeech.isListening)) {
          this.stopAllRecording();
          return;
        }
        const alertBox = document.getElementById("dictationAlert");
        if (alertBox && !alertBox.classList.contains("hidden")) {
          this.dismissDictationAlert();
          const mainMic = document.getElementById("mainVoiceMic");
          if (mainMic) mainMic.focus();
        }
        return;
      }

      // Gateway cards arrow-key navigation & Space activation
      const gatewayLinks = Array.from(document.querySelectorAll(".gateway-action-link"));
      const gwIdx = gatewayLinks.indexOf(active);
      if (gwIdx !== -1) {
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          active.click();
          return;
        }
        const isRtl = document.documentElement.dir === "rtl";
        let nextIdx = -1;
        if (e.key === "ArrowRight") nextIdx = isRtl ? gwIdx - 1 : gwIdx + 1;
        if (e.key === "ArrowLeft") nextIdx = isRtl ? gwIdx + 1 : gwIdx - 1;
        if (e.key === "ArrowDown") nextIdx = gwIdx + 1;
        if (e.key === "ArrowUp") nextIdx = gwIdx - 1;
        if (e.key === "Home") nextIdx = 0;
        if (e.key === "End") nextIdx = gatewayLinks.length - 1;

        if (nextIdx >= 0 && nextIdx < gatewayLinks.length) {
          e.preventDefault();
          gatewayLinks[nextIdx].focus();
        }
        return;
      }

      // Suggestion voice chips arrow-key navigation
      const chipBtns = Array.from(document.querySelectorAll(".voice-suggestion-chip"));
      const chipIdx = chipBtns.indexOf(active);
      if (chipIdx !== -1) {
        const isRtl = document.documentElement.dir === "rtl";
        let nextIdx = -1;
        if (e.key === "ArrowRight") nextIdx = isRtl ? chipIdx - 1 : chipIdx + 1;
        if (e.key === "ArrowLeft") nextIdx = isRtl ? chipIdx + 1 : chipIdx - 1;
        if (e.key === "Home") nextIdx = 0;
        if (e.key === "End") nextIdx = chipBtns.length - 1;
        if (nextIdx >= 0 && nextIdx < chipBtns.length) {
          e.preventDefault();
          chipBtns[nextIdx].focus();
        }
      }
    });
  },

  stopAllRecording() {
    const micBtn = document.getElementById("mainVoiceMic");
    const orbContainer = document.getElementById("mic-container-orb");
    const visualizer = document.getElementById("soundWaveVisualizer");
    const statusText = document.getElementById("micStatusText");
    const isEn = this.currentLang === "en";

    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      try { this.mediaRecorder.stop(); } catch {}
    }
    this.isGeminiRecording = false;
    if (typeof AppSpeech !== "undefined" && AppSpeech.isListening) {
      AppSpeech.stopListening();
    }
    if (micBtn) micBtn.classList.remove("is-recording");
    if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
    if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
    if (visualizer) visualizer.classList.add("hidden");
    this.updateAriaLabels();
  },

  speakLocalized(urduText, englishText, onComplete = null) {
    const isEn = this.currentLang === "en";
    const targetLang = isEn ? "en-US" : "ur-PK";
    const spoken = isEn ? (englishText || urduText) : (urduText || englishText);
    if (typeof AppSpeech !== "undefined") {
      AppSpeech.setLanguage(targetLang);
      AppSpeech.speak(spoken, onComplete, { lang: targetLang });
    } else if (onComplete) {
      onComplete();
    }
  },

  togglePageNarration(textToRead = null) {
    const icon = document.getElementById("narrateIcon");
    const textEl = document.getElementById("narrateText");
    const isEn = this.currentLang === "en";
    const targetLang = isEn ? "en-US" : "ur-PK";

    if (this.narrating) {
      AppSpeech.stopSpeaking();
      this.narrating = false;
      if (icon) icon.innerText = "play_circle";
      if (textEl) textEl.innerText = isEn ? "Listen This Page" : "یہ صفحہ سنیں (Listen)";
      this.updateAriaLabels();
      return;
    }

    const dict = (typeof CivicData !== "undefined" && CivicData.i18n && CivicData.i18n[this.currentLang]) || {};
    const fallbackUrdu = "عوامی آواز حکومتِ پاکستان پورٹل میں خوش آمدید۔ آپ مائیک کا بڑا بٹن دبا کر بلا جھجھک اپنی زبان میں شکایت درج کروا سکتے ہیں، قریبی ہسپتال تلاش کر سکتے ہیں اور بینظیر وظیفہ کی معلومات حاصل کر سکتے ہیں۔";
    const fallbackEn = "Welcome to Awami Voice Government of Pakistan Portal. You can register civic complaints, look up hospitals, and verify welfare benefits using natural speech across all provinces of Pakistan without typing.";
    const defaultNarration = textToRead || dict.welcomeNarration || (isEn ? fallbackEn : fallbackUrdu);

    this.narrating = true;
    if (icon) icon.innerText = "pause_circle";
    if (textEl) textEl.innerText = isEn ? "Pause Audio" : "آواز روکو (Pause)";
    this.updateAriaLabels();

    AppSpeech.setLanguage(targetLang);
    AppSpeech.speak(defaultNarration, () => {
      this.narrating = false;
      const nowEn = this.currentLang === "en";
      if (icon) icon.innerText = "play_circle";
      if (textEl) textEl.innerText = nowEn ? "Listen This Page" : "یہ صفحہ سنیں (Listen)";
      this.updateAriaLabels();
    }, { lang: targetLang });
  },

  setSpeed(speed, btnElement = null) {
    this.narrationSpeed = speed;
    AppSpeech.setSpeed(speed);
    if (btnElement) {
      const parent = btnElement.parentElement;
      if (parent) {
        parent.querySelectorAll("button").forEach(b => {
          b.className = "min-h-[34px] px-3 py-1 rounded-lg text-xs text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors";
          b.setAttribute("aria-pressed", "false");
        });
        btnElement.className = "min-h-[34px] px-3 py-1 rounded-lg text-xs bg-primary text-on-primary font-bold transition-colors";
        btnElement.setAttribute("aria-pressed", "true");
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

  async transcribeAudioBlob(blob, mimeType, language = "ur-PK") {
    const base64Audio = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = String(reader.result || "");
        const commaIdx = result.indexOf(",");
        resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
      };
      reader.onerror = () => reject(new Error("Failed to read recorded audio."));
      reader.readAsDataURL(blob);
    });

    const response = await fetch("/api/gemini/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audioBase64: base64Audio,
        mimeType: mimeType || "audio/webm",
        language
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Transcription service failed.");
    }
    return payload.transcript || "";
  },

  async queryMapsGrounding(query, outputEl = null) {
    if (!query || !query.trim()) return null;

    let coords = {};
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
        });
        coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      } catch {
        // Proceed without coordinates if user denies or geolocation is unavailable
      }
    }

    const response = await fetch("/api/gemini/maps-grounding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query.trim(), ...coords })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Maps grounding lookup failed.");
    }

    if (outputEl) {
      this.renderMapsGroundingResults(outputEl, data);
    }
    return data;
  },

  renderMapsGroundingResults(container, data) {
    if (!container) return;
    container.innerHTML = "";
    container.classList.remove("hidden");

    const textPara = document.createElement("p");
    textPara.className = "text-sm text-on-surface leading-relaxed whitespace-pre-line";
    textPara.textContent = data.text || "";
    container.appendChild(textPara);

    const places = Array.isArray(data.places) ? data.places : [];
    if (places.length > 0) {
      const heading = document.createElement("h4");
      heading.className = "text-xs font-bold text-primary mt-3 mb-2";
      heading.textContent = this.currentLang === "en" ? "Verified Google Maps Links:" : "گوگل میپس سے تصدیق شدہ مقامات:";
      container.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "space-y-2";

      places.forEach((place) => {
        const li = document.createElement("li");
        li.className = "p-2.5 rounded-xl bg-surface-container-low border border-slate-200 flex flex-col gap-1";

        if (place.uri && /^https?:\/\//i.test(place.uri)) {
          const link = document.createElement("a");
          link.href = place.uri;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "text-xs font-bold text-primary hover:underline inline-flex items-center gap-1";
          link.setAttribute("aria-label", `Open ${place.title || "place"} in Google Maps`);
          link.textContent = place.title || place.uri;
          li.appendChild(link);
        } else {
          const span = document.createElement("span");
          span.className = "text-xs font-bold text-on-surface";
          span.textContent = place.title || "Place";
          li.appendChild(span);
        }

        if (Array.isArray(place.reviewSnippets)) {
          place.reviewSnippets.forEach((snippet) => {
            const snippetText = typeof snippet === "string"
              ? snippet
              : (snippet?.review || snippet?.text || snippet?.title || "");
            if (snippetText) {
              const snp = document.createElement("p");
              snp.className = "text-[11px] text-on-surface-variant";
              snp.textContent = snippetText;
              li.appendChild(snp);
            }
          });
        }

        list.appendChild(li);
      });

      container.appendChild(list);
    }
  },

  /**
   * Trigger Main Microphone Button
   * Supports microphone audio recording + Gemini transcription (gemini-3.5-transcribe)
   * alongside Web Speech API / resilient fallback.
   */
  async triggerMainMic() {
    const micBtn = document.getElementById("mainVoiceMic");
    const orbContainer = document.getElementById("mic-container-orb");
    const visualizer = document.getElementById("soundWaveVisualizer");
    const statusText = document.getElementById("micStatusText");
    const isEn = this.currentLang === "en";

    // Stop active recording if already listening
    if (this.isGeminiRecording || AppSpeech.isListening) {
      if (this.isGeminiRecording && this.mediaRecorder && this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        return;
      }
      this.stopAllRecording();
      return;
    }

    // Activate Recording Visual State
    if (micBtn) micBtn.classList.add("is-recording");
    if (orbContainer) orbContainer.classList.add("is-recording-wrapper");
    if (visualizer) visualizer.classList.remove("hidden");
    if (statusText) statusText.innerText = isEn ? "Listening..." : "سن رہا ہے...";
    this.updateAriaLabels();

    const langCode = isEn ? "en-US" : "ur-PK";
    AppSpeech.setLanguage(langCode);

    // Prefer real microphone recording -> Gemini 3.5 Transcribe when MediaRecorder is permitted
    if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof MediaRecorder !== "undefined") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recordedChunks = [];
        const recorder = new MediaRecorder(stream);
        this.mediaRecorder = recorder;
        this.isGeminiRecording = true;
        this.updateAriaLabels();
        AppSpeech.playChime("start");

        recorder.ondataavailable = (evt) => {
          if (evt.data && evt.data.size > 0) {
            this.recordedChunks.push(evt.data);
          }
        };

        recorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          this.isGeminiRecording = false;
          if (micBtn) micBtn.classList.remove("is-recording");
          if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
          if (visualizer) visualizer.classList.add("hidden");
          if (statusText) statusText.innerText = isEn ? "Transcribing..." : "تحریر جاری...";
          this.updateAriaLabels();
          AppSpeech.playChime("stop");

          const mimeType = recorder.mimeType || "audio/webm";
          const blob = new Blob(this.recordedChunks, { type: mimeType });
          try {
            const transcript = await this.transcribeAudioBlob(blob, mimeType, langCode);
            if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
            if (transcript) {
              const aiRes = await AppAIRouter.processQuery(transcript);
              WebPortal.displayConversationResult(transcript, aiRes, isEn);
            }
          } catch (err) {
            if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
            WebPortal.displayErrorBanner(err.message);
          }
        };

        recorder.start();
        // Auto-stop after 8 seconds if user doesn't press again
        setTimeout(() => {
          if (this.mediaRecorder === recorder && recorder.state === "recording") {
            recorder.stop();
          }
        }, 8000);
        return;
      } catch (micErr) {
        console.warn("Microphone capture unavailable, falling back to speech engine:", micErr.message);
        this.isGeminiRecording = false;
      }
    }

    AppSpeech.startListening(
      (transcript, isFinal) => {
        if (isFinal) {
          if (micBtn) micBtn.classList.remove("is-recording");
          if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
          if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
          if (visualizer) visualizer.classList.add("hidden");
          this.updateAriaLabels();

          AppAIRouter.processQuery(transcript).then(res => {
            WebPortal.displayConversationResult(transcript, res, isEn);
          });
        }
      },
      (state) => {
        if (state === "listening") {
          this.updateAriaLabels();
        } else if (state === "idle") {
          if (micBtn) micBtn.classList.remove("is-recording");
          if (orbContainer) orbContainer.classList.remove("is-recording-wrapper");
          if (statusText) statusText.innerText = isEn ? "Speak" : "بولیں";
          if (visualizer) visualizer.classList.add("hidden");
          this.updateAriaLabels();
        }
      }
    );
    this.updateAriaLabels();
  },

  displayErrorBanner(message) {
    const alertBox = document.getElementById("dictationAlert");
    const queryText = document.getElementById("dictatedQuery");
    const aiText = document.getElementById("aiResponseText");
    if (alertBox) {
      alertBox.classList.remove("hidden");
      alertBox.style.display = "flex";
      alertBox.style.flexDirection = "column";
    }
    if (queryText) queryText.innerText = this.currentLang === "en" ? "Audio Transcription Notice" : "آڈیو ٹرانسکرپشن اطلاع";
    if (aiText) aiText.innerText = message;
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
    const targetLang = isEn ? "en-US" : "ur-PK";
    const spokenReply = isEn ? englishAnswer : urduAnswer;
    AppSpeech.setLanguage(targetLang);
    AppSpeech.speak(spokenReply, null, { lang: targetLang });

    // Scroll conversation into view smoothly
    if (alertBox) {
      alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  },

  replayUserQuery() {
    if (this.lastUserQuery) {
      const hasArabic = /[\u0600-\u06FF]/.test(this.lastUserQuery);
      AppSpeech.speak(this.lastUserQuery, null, { lang: hasArabic ? "ur-PK" : "en-US" });
    }
  },

  replayAiResponse() {
    if (this.lastAiResponse) {
      const isEn = this.currentLang === "en";
      const targetLang = isEn ? "en-US" : "ur-PK";
      const spokenReply = isEn ? (this.lastAiResponse.responseEnglish || this.lastAiResponse.responseUrdu) : this.lastAiResponse.responseUrdu;
      AppSpeech.setLanguage(targetLang);
      AppSpeech.speak(spokenReply, null, { lang: targetLang });
    }
  },

  playEnglishTranslation() {
    if (this.lastAiResponse && this.lastAiResponse.responseEnglish) {
      AppSpeech.speak(this.lastAiResponse.responseEnglish, null, { lang: "en-US" });
    } else if (this.lastUserQuery) {
      const trans = this.getQueryTranslation(this.lastUserQuery);
      AppSpeech.speak(trans, null, { lang: "en-US" });
    }
  },

  async lookupMapsForConversation() {
    const queryEl = document.getElementById("dictatedQuery");
    const resultsEl = document.getElementById("convo-maps-results");
    const errorEl = document.getElementById("convo-maps-error");
    const btnEl = document.getElementById("convo-maps-btn");
    const rawQuery = this.lastUserQuery || (queryEl ? queryEl.innerText.replace(/[“”"]/g, "").trim() : "");
    if (!rawQuery) return;

    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    if (btnEl) btnEl.disabled = true;

    try {
      await this.queryMapsGrounding(rawQuery, resultsEl);
    } catch (err) {
      if (resultsEl) resultsEl.classList.add("hidden");
      if (errorEl) {
        errorEl.textContent = err.message;
        errorEl.classList.remove("hidden");
      }
    } finally {
      if (btnEl) btnEl.disabled = false;
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
