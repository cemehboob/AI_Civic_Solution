/**
 * Awami Voice Civic Solution - Mobile Application Shared Script
 * Integrates Speech Engine, AI Router, Offline Sync, Full-Page English <-> Urdu Switching,
 * and Multi-Dialect Support (Urdu, Punjabi, Potohari, Saraiki, Hindko, English)
 */

const MobileApp = {
  currentUser: null,
  currentLang: localStorage.getItem("awami_app_lang") || "ur",

  init() {
    if (typeof AppSecurity !== "undefined") {
      AppSecurity.init();
    }
    if (typeof AppLogger !== "undefined") {
      AppLogger.info(AppLogger.CATEGORIES.SYSTEM, "Citizen MobileApp initialized", { lang: this.currentLang });
    }
    this.currentUser = AppSync.getUserProfile();
    this.applyLanguage(this.currentLang);
    this.applyUserPreferences();
    this.renderBottomNavigation();
    this.updateNetworkBadge();

    // Re-check network periodically
    setInterval(() => this.updateNetworkBadge(), 5000);
  },

  toggleLanguage() {
    this.currentLang = this.currentLang === "ur" ? "en" : "ur";
    localStorage.setItem("awami_app_lang", this.currentLang);
    this.applyLanguage(this.currentLang);
    this.renderBottomNavigation();
  },

  applyLanguage(lang) {
    const isEn = lang === "en";
    document.documentElement.dir = isEn ? "ltr" : "rtl";
    document.documentElement.lang = isEn ? "en" : "ur";

    const dict = (typeof CivicData !== "undefined" && CivicData.i18n && CivicData.i18n[lang]) || {};

    // 1. Header elements
    const label = document.getElementById("mobile-top-lang-label");
    if (label) label.innerText = isEn ? "اردو" : "English";

    const titleUrdu = document.getElementById("mobile-header-title");
    if (titleUrdu) titleUrdu.innerText = isEn ? "Awami Voice" : "عوامی آواز";

    const subUrdu = document.getElementById("mobile-header-subtitle");
    if (subUrdu) subUrdu.innerText = isEn ? "National Civic Portal (Government of Pakistan)" : "قومی عوامی آواز پورٹل (حکومتِ پاکستان)";

    const audioGuideText = document.getElementById("mobile-audio-guide-text");
    if (audioGuideText) audioGuideText.innerText = isEn ? "Listen Guide" : "آواز رہنمائی سنیں";

    // 2. Offline Ready Strip
    const offlineTitle = document.getElementById("mobile-offline-title");
    if (offlineTitle && dict.offlineBadge) offlineTitle.innerText = dict.offlineBadge;

    const offlineSub = document.getElementById("mobile-offline-sub");
    if (offlineSub && dict.offlineSub) offlineSub.innerText = dict.offlineSub;

    // 3. Welcome Banner Card
    const welcomeBadge = document.getElementById("mobile-welcome-badge");
    if (welcomeBadge && dict.welcomeBadge) welcomeBadge.innerText = dict.welcomeBadge;

    const welcomeTitle = document.getElementById("mobile-welcome-title");
    if (welcomeTitle && dict.welcomeTitle) welcomeTitle.innerText = dict.welcomeTitle;

    const welcomeDesc = document.getElementById("mobile-welcome-desc");
    if (welcomeDesc && dict.welcomeDesc) welcomeDesc.innerText = dict.welcomeDesc;

    const welcomeAudioBtn = document.getElementById("mobile-welcome-audio-btn");
    if (welcomeAudioBtn && dict.welcomeAudioBtn) welcomeAudioBtn.innerText = dict.welcomeAudioBtn;

    // 4. Central Microphone Centerpiece
    const micInstruction = document.getElementById("mic-instruction");
    if (micInstruction && dict.micInstruction) micInstruction.innerText = dict.micInstruction;

    const micDialectsText = document.getElementById("mic-dialects-text");
    if (micDialectsText && dict.micDialectsList) micDialectsText.innerText = dict.micDialectsList;

    const micStatus = document.getElementById("mic-status-text");
    if (micStatus && dict.speakBtn) micStatus.innerText = isEn ? "Speak" : "بولیں";

    // 5. Quick Suggestion Prompt Chips
    const chipsTitle = document.getElementById("mobile-chips-title");
    if (chipsTitle && dict.chipsMobileTitle) chipsTitle.innerText = dict.chipsMobileTitle;

    const chip1 = document.getElementById("chip-mobile-1");
    if (chip1 && dict.chipRoad) chip1.innerText = dict.chipRoad;

    const chip2 = document.getElementById("chip-mobile-2");
    if (chip2 && dict.chipHospital) chip2.innerText = dict.chipHospital;

    const chip3 = document.getElementById("chip-mobile-3");
    if (chip3 && dict.chipBisp) chip3.innerText = dict.chipBisp;

    const chip4 = document.getElementById("chip-mobile-4");
    if (chip4 && dict.chipSaraiki) chip4.innerText = dict.chipSaraiki;

    const chip5 = document.getElementById("chip-mobile-5");
    if (chip5 && dict.chipHindko) chip5.innerText = dict.chipHindko;

    const chipSindhi = document.getElementById("chip-mobile-sindhi");
    if (chipSindhi && dict.chipSindhi) chipSindhi.innerText = dict.chipSindhi;

    const chipPashto = document.getElementById("chip-mobile-pashto");
    if (chipPashto && dict.chipPashto) chipPashto.innerText = dict.chipPashto;

    const chipBalochi = document.getElementById("chip-mobile-balochi");
    if (chipBalochi && dict.chipBalochi) chipBalochi.innerText = dict.chipBalochi;

    // 6. Civic Gateways Section
    const gwTitle = document.getElementById("mobile-gateways-title");
    if (gwTitle && dict.gatewaysTitle) gwTitle.innerText = dict.gatewaysTitle;

    const gwSub = document.getElementById("mobile-gateways-sub");
    if (gwSub && dict.gatewaysMobileSub) gwSub.innerText = dict.gatewaysMobileSub;

    // Card 1: Complaint
    const c1Title = document.getElementById("card1-title");
    if (c1Title && dict.gwComplaintTitle) c1Title.innerText = dict.gwComplaintTitle;
    const c1Badge = document.getElementById("card1-badge");
    if (c1Badge && dict.gwComplaintBadge) c1Badge.innerText = dict.gwComplaintBadge;
    const c1Desc = document.getElementById("card1-desc");
    if (c1Desc && dict.gwComplaintDesc) c1Desc.innerText = dict.gwComplaintDesc;
    const c1Action = document.getElementById("card1-action");
    if (c1Action && dict.gwComplaintAction) c1Action.innerText = dict.gwComplaintAction;
    const c1Listen = document.getElementById("card1-listen");
    if (c1Listen && dict.listenBtn) c1Listen.innerText = dict.listenBtn;

    // Card 2: Tracking
    const c2Title = document.getElementById("card2-title");
    if (c2Title && dict.gwTrackTitle) c2Title.innerText = dict.gwTrackTitle;
    const c2Badge = document.getElementById("card2-badge");
    if (c2Badge && dict.gwTrackBadge) c2Badge.innerText = dict.gwTrackBadge;
    const c2Desc = document.getElementById("card2-desc");
    if (c2Desc && dict.gwTrackDesc) c2Desc.innerText = dict.gwTrackDesc;
    const c2Action = document.getElementById("card2-action");
    if (c2Action && dict.gwTrackAction) c2Action.innerText = dict.gwTrackAction;
    const c2Listen = document.getElementById("card2-listen");
    if (c2Listen && dict.listenBtn) c2Listen.innerText = dict.listenBtn;

    // Card 3: Healthcare
    const c3Title = document.getElementById("card3-title");
    if (c3Title && dict.gwHealthTitle) c3Title.innerText = dict.gwHealthTitle;
    const c3Badge = document.getElementById("card3-badge");
    if (c3Badge && dict.gwHealthBadge) c3Badge.innerText = dict.gwHealthBadge;
    const c3Desc = document.getElementById("card3-desc");
    if (c3Desc && dict.gwHealthDesc) c3Desc.innerText = dict.gwHealthDesc;
    const c3Action = document.getElementById("card3-action");
    if (c3Action && dict.gwHealthAction) c3Action.innerText = dict.gwHealthAction;
    const c3Listen = document.getElementById("card3-listen");
    if (c3Listen && dict.listenBtn) c3Listen.innerText = dict.listenBtn;

    // Card 4: Subsidies
    const c4Title = document.getElementById("card4-title");
    if (c4Title && dict.gwSubsidyTitle) c4Title.innerText = dict.gwSubsidyTitle;
    const c4Badge = document.getElementById("card4-badge");
    if (c4Badge && dict.gwSubsidyBadge) c4Badge.innerText = dict.gwSubsidyBadge;
    const c4Desc = document.getElementById("card4-desc");
    if (c4Desc && dict.gwSubsidyDesc) c4Desc.innerText = dict.gwSubsidyDesc;
    const c4Action = document.getElementById("card4-action");
    if (c4Action && dict.gwSubsidyAction) c4Action.innerText = dict.gwSubsidyAction;
    const c4Listen = document.getElementById("card4-listen");
    if (c4Listen && dict.listenBtn) c4Listen.innerText = dict.listenBtn;

    // Generic translation for elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerText = dict[key];
    });
  },

  applyUserPreferences() {
    if (!this.currentUser) return;
    if (this.currentUser.preferredLanguage) {
      AppSpeech.setLanguage(this.currentUser.preferredLanguage);
    }
    if (this.currentUser.audioSpeed) {
      AppSpeech.setSpeed(this.currentUser.audioSpeed);
    }
  },

  updateNetworkBadge() {
    const isOnline = AppSync.isOnline();
    const badge = document.getElementById("network-status-badge");
    const queueBadge = document.getElementById("queue-count-badge");
    const queue = AppSync.getQueue();
    const isEn = this.currentLang === "en";

    if (badge) {
      if (isOnline) {
        badge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse inline-block"></span><span class="font-label-md text-[13px] font-bold text-primary">${isEn ? "Online" : "آن لائن (Online)"}</span>`;
      } else {
        badge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span><span class="font-label-md text-[13px] font-bold text-secondary">${isEn ? "Offline Ready" : "آف لائن (Offline Ready)"}</span>`;
      }
    }

    if (queueBadge) {
      queueBadge.innerText = queue.length > 0 ? queue.length : "";
      queueBadge.style.display = queue.length > 0 ? "inline-flex" : "none";
    }
  },

  renderBottomNavigation() {
    const navContainer = document.getElementById("mobile-bottom-nav");
    if (!navContainer) return;

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const userRole = (this.currentUser && this.currentUser.role) || "citizen";
    const isCitizen = userRole !== "field_operator";
    const isEn = this.currentLang === "en";

    const tHome = isEn ? "Home" : "مرکزی";
    const tTrack = isEn ? "Track" : "ٹریکنگ";
    const tSpeak = isEn ? "Speak" : "بولیں";
    const tEmergency = isEn ? "1122 Help" : "1122 مدد";
    const tTasks = isEn ? "Field Tasks" : "فیلڈ کام";
    const tProfile = isEn ? "Profile" : "پروفائل";

    navContainer.innerHTML = `
      <nav class="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl border-t-2 border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.1)] pb-safe">
        <div class="h-20 max-w-7xl mx-auto px-4 flex items-center justify-between relative">
          <!-- Home Tab -->
          <a href="index.html" class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] ${currentPath === "index.html" || currentPath === "" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}">
            <span class="material-symbols-outlined text-[26px]">home</span>
            <span class="font-urdu-body-md text-[12px] leading-tight">${tHome}</span>
          </a>

          <!-- Tracking Tab -->
          <a href="complaint_tracking.html" class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] ${currentPath.includes("tracking") ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}">
            <span class="material-symbols-outlined text-[26px]">manage_search</span>
            <span class="font-urdu-body-md text-[12px] leading-tight">${tTrack}</span>
          </a>

          <!-- Center Giant PTT FAB Docked Voice Orb -->
          <div class="relative -top-5 flex flex-col items-center">
            <a href="active_voice.html" aria-label="Start Voice Assistant" class="w-[72px] h-[72px] rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-90 transition-transform">
              <span class="material-symbols-outlined text-[38px]">mic</span>
            </a>
            <span class="font-urdu-body-md text-[11px] font-bold text-primary mt-1">${tSpeak}</span>
          </div>

          <!-- Emergency / Field Tasks Tab -->
          ${isCitizen ? `
            <a href="healthcare_emergency.html" class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] ${currentPath.includes("healthcare") ? "text-error font-bold" : "text-on-surface-variant hover:text-error"}">
              <span class="material-symbols-outlined text-[26px]">emergency</span>
              <span class="font-urdu-body-md text-[12px] leading-tight text-error font-bold">${tEmergency}</span>
            </a>
          ` : `
            <a href="field_tasks.html" class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] ${currentPath.includes("field") ? "text-secondary font-bold" : "text-on-surface-variant hover:text-secondary"}">
              <span class="material-symbols-outlined text-[26px]">engineering</span>
              <span class="font-urdu-body-md text-[12px] leading-tight">${tTasks}</span>
            </a>
          `}

          <!-- User Management & Profile Tab -->
          <a href="user_management.html" class="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] ${currentPath.includes("user_management") ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}">
            <span class="material-symbols-outlined text-[26px]">manage_accounts</span>
            <span class="font-urdu-body-md text-[12px] leading-tight">${tProfile}</span>
          </a>
        </div>
      </nav>
    `;
  },

  speakText(text) {
    AppSpeech.speak(text);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  MobileApp.init();
});
