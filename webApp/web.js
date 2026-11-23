/**
 * Awami Voice Civic Solution - Citizen Web Portal Shared Script
 * Powers Audio Narration, Real-time Speech Interaction, Full-Page English <-> Urdu Switching,
 * and Multi-Dialect Support (Urdu, Punjabi, Potohari, Saraiki, Hindko, English)
 */

const WebPortal = {
  narrating: false,
  narrationSpeed: 1.0,
  currentLang: localStorage.getItem("awami_app_lang") || "ur",

  init() {
    if (typeof AppSecurity !== "undefined") {
      AppSecurity.init();
    }
    if (typeof AppLogger !== "undefined") {
      AppLogger.info(AppLogger.CATEGORIES.SYSTEM, "Citizen WebPortal initialized", { lang: this.currentLang });
    }
    this.applyLanguage(this.currentLang);
    this.highlightActiveNav();
  },

  toggleLanguage() {
    this.currentLang = this.currentLang === "ur" ? "en" : "ur";
    localStorage.setItem("awami_app_lang", this.currentLang);
    this.applyLanguage(this.currentLang);
    this.highlightActiveNav();
  },

  applyLanguage(lang) {
    const isEn = lang === "en";
    document.documentElement.dir = isEn ? "ltr" : "rtl";
    document.documentElement.lang = isEn ? "en" : "ur";

    const dict = (typeof CivicData !== "undefined" && CivicData.i18n && CivicData.i18n[lang]) || {};

    // 1. Header & Navigation
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

    const navLinks = document.querySelectorAll("nav a");
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

    // 3. Hero & Voice Interaction Centerpiece
    const heroBadge = document.getElementById("hero-badge-text");
    if (heroBadge && dict.heroBadge) heroBadge.innerText = dict.heroBadge;

    const heroHeadline = document.getElementById("hero-headline-text");
    if (heroHeadline && dict.heroHeadline) heroHeadline.innerText = dict.heroHeadline;

    const heroSub = document.getElementById("hero-sub-text");
    if (heroSub && dict.heroSub) heroSub.innerText = dict.heroSub;

    const micStatus = document.getElementById("micStatusText");
    if (micStatus && dict.micPressToSpeak) micStatus.innerText = dict.micPressToSpeak;

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

    // 4. Civic Gateways Bento Section
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

    // 5. Sidebar Bento Telemetry
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

    // 6. Footer
    const footerGov = document.getElementById("footer-gov-text");
    if (footerGov && dict.footerGov) footerGov.innerText = dict.footerGov;
    const footerDiv = document.getElementById("footer-div-text");
    if (footerDiv && dict.footerDiv) footerDiv.innerText = dict.footerDiv;
    const footerTech = document.getElementById("footer-tech-text");
    if (footerTech && dict.footerTech) footerTech.innerText = dict.footerTech;

    // Generic translation for elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerText = dict[key];
    });
  },

  highlightActiveNav() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href === current || (current === "" && href === "index.html"))) {
        link.className = "min-h-[48px] px-4 py-2 rounded-lg transition-colors flex items-center bg-primary-container text-on-primary font-bold shadow-sm";
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
    const defaultNarration = textToRead || dict.welcomeNarration || "عوامی آواز پنجاب گورنمنٹ پورٹل میں خوش آمدید۔ آپ مائیک کا بڑا بٹن دبا کر بلا جھجھک اپنی زبان میں شکایت درج کروا سکتے ہیں، قریبی ہسپتال تلاش کر سکتے ہیں اور بینظیر وظیفہ کی معلومات حاصل کر سکتے ہیں۔";
    
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
          b.className = "min-h-[36px] px-3 py-1 rounded-lg text-xs text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors";
        });
        btnElement.className = "min-h-[36px] px-3 py-1 rounded-lg text-xs bg-primary text-on-primary font-bold transition-colors";
      }
    }
  },

  playVoiceHint(text) {
    AppSpeech.playChime("speechCaptured");
    AppSpeech.speak(text);
    const alertBox = document.getElementById("dictationAlert");
    const queryText = document.getElementById("dictatedQuery");
    if (alertBox) alertBox.classList.remove("hidden");
    if (queryText) queryText.innerText = `"${text}"`;
  },

  triggerMainMic() {
    const micPulse1 = document.getElementById("micPulse1");
    const micPulse2 = document.getElementById("micPulse2");
    const visualizer = document.getElementById("soundWaveVisualizer");
    const statusText = document.getElementById("micStatusText");
    const alertBox = document.getElementById("dictationAlert");
    const queryText = document.getElementById("dictatedQuery");
    const isEn = this.currentLang === "en";

    if (AppSpeech.isListening) {
      AppSpeech.stopListening();
      return;
    }

    if (micPulse1) micPulse1.classList.add("scale-125", "bg-secondary-container/40");
    if (micPulse2) micPulse2.classList.add("scale-125", "bg-primary-fixed/40");
    if (visualizer) visualizer.classList.remove("hidden");
    if (statusText) statusText.innerText = isEn ? "Listening..." : "سن رہا ہے...";

    AppSpeech.startListening(
      (transcript, isFinal) => {
        if (alertBox) alertBox.classList.remove("hidden");
        if (queryText) queryText.innerText = `"${transcript}"`;

        if (isFinal) {
          if (statusText) statusText.innerText = isEn ? "Press to Speak" : "بولیں (Press)";
          if (visualizer) visualizer.classList.add("hidden");
          if (micPulse1) micPulse1.classList.remove("scale-125", "bg-secondary-container/40");
          if (micPulse2) micPulse2.classList.remove("scale-125", "bg-primary-fixed/40");
          
          AppAIRouter.processQuery(transcript).then(res => {
            const reply = isEn ? (res.responseEnglish || res.responseUrdu) : res.responseUrdu;
            AppSpeech.speak(reply);
          });
        }
      },
      (state) => {
        if (state === "idle") {
          if (statusText) statusText.innerText = isEn ? "Press to Speak" : "بولیں (Press)";
          if (visualizer) visualizer.classList.add("hidden");
          if (micPulse1) micPulse1.classList.remove("scale-125", "bg-secondary-container/40");
          if (micPulse2) micPulse2.classList.remove("scale-125", "bg-primary-fixed/40");
        }
      }
    );
  },

  submitSpokenQuery() {
    const queryText = document.getElementById("dictatedQuery");
    const text = queryText ? queryText.innerText.replace(/[“”"]/g, "") : "";
    if (text) {
      sessionStorage.setItem("awami_web_pending_query", text);
      window.location.href = "register.html";
    }
  },

  dismissDictationAlert() {
    const alertBox = document.getElementById("dictationAlert");
    if (alertBox) alertBox.classList.add("hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  WebPortal.init();
});
