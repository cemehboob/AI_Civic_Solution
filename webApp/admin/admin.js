/**
 * Awami Voice Civic Solution - Administrative Console Controller
 * Powers Triage Queue, Field Dispatches, AI Health Telemetry, User & Staff Management,
 * Enterprise Structured Logging, and Citizen Data Security (PECA 2016 Compliant).
 */

const AdminPortal = {
  currentTab: "triage",
  selectedComplaintToken: "PK-94021",
  usersList: [],
  logsFilter: {
    search: "",
    severity: "ALL",
    category: "ALL"
  },

  init() {
    this.loadUsers();
    this.renderQueue();
    this.renderSelectedCase("PK-94021");
    this.renderTelemetry();
    this.initSecurityAndLogging();
  },

  initSecurityAndLogging() {
    if (typeof AppLogger !== "undefined") {
      // Subscribe to real-time logs for live UI updates
      AppLogger.subscribe((logEntry) => {
        if (this.currentTab === "logs") {
          this.renderLogsView();
        }
      });

      // Initial audit log
      AppLogger.audit("ADMIN_SESSION_START", "Administrative console session initialized for Engr. Tariq Mehmood", {
        user: "STAFF-101",
        role: "admin",
        portal: "District Administration Rawalpindi"
      });
    }

    if (typeof AppSecurity !== "undefined") {
      AppSecurity.init();
    }
  },

  loadUsers() {
    this.usersList = [
      { id: "STAFF-101", name: "Engr. Tariq Mehmood (انجینئر طارق محمود)", role: "admin", designation: "Deputy Director Local Government", tehsil: "All Division", cnic: "37405-2210491-9", phone: "0300-5551234", active: true },
      { id: "STAFF-102", name: "Asma Bibi (عاصمہ بی بی)", role: "triage_officer", designation: "Senior Audio Triage Analyst", tehsil: "Rawalpindi City", cnic: "37405-7718290-2", phone: "0312-5554321", active: true },
      { id: "STAFF-201", name: "Engr. Asim Raza (اسسٹنٹ انجینئر عاصم)", role: "field_operator", designation: "SDO PHED Gujar Khan Team 2", tehsil: "Gujar Khan", cnic: "37405-3382910-5", phone: "0301-5918234", active: true },
      { id: "STAFF-202", name: "Supervisor Nadeem (سپروائزر ندیم چوہدری)", role: "field_operator", designation: "C&W Road Resurfacing Team 4", tehsil: "Rawalpindi Rural", cnic: "37405-4491023-7", phone: "0312-5819022", active: true },
      { id: "USR-001", name: "محمد افضل (Muhammad Afzal)", role: "citizen", designation: "Citizen Complainant", tehsil: "Gujar Khan", cnic: "37405-1849201-3", phone: "0300-5849120", active: true },
      { id: "USR-002", name: "چوہدری بشیر احمد (Ch. Bashir Ahmad)", role: "citizen", designation: "Citizen Complainant", tehsil: "Gujar Khan", cnic: "37405-9921443-1", phone: "0302-8419200", active: true }
    ];
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll(".admin-nav-item").forEach(item => {
      if (item.dataset.tab === tabId) {
        item.className = "admin-nav-item flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-bold shadow-sm whitespace-nowrap shrink-0 transition-all";
      } else {
        item.className = "admin-nav-item flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface whitespace-nowrap shrink-0 transition-all";
      }
    });

    const views = ["view-triage", "view-dispatch", "view-ai-telemetry", "view-users", "view-knowledge", "view-logs"];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) {
        if (v === `view-${tabId}`) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });

    if (tabId === "ai-telemetry") {
      this.renderTelemetry();
    } else if (tabId === "users") {
      this.renderUsersTable();
    } else if (tabId === "knowledge") {
      this.renderKnowledgeTable();
    } else if (tabId === "logs") {
      this.renderLogsView();
    }
  },

  renderQueue(filter = "all") {
    const container = document.getElementById("admin-queue-list");
    if (!container) return;

    let complaints = typeof AppSync !== "undefined" ? AppSync.getComplaints() : [];
    if (filter === "urgent") {
      complaints = complaints.filter(c => (c.slaRemaining || "").includes("remaining") && parseInt(c.slaRemaining) < 4);
    } else if (filter === "water") {
      complaints = complaints.filter(c => c.category === "water_supply");
    } else if (filter === "roads") {
      complaints = complaints.filter(c => c.category === "roads_infrastructure");
    }

    container.innerHTML = complaints.map(c => `
      <div onclick="AdminPortal.selectCase('${c.token}')" class="p-3.5 rounded-xl border ${c.token === this.selectedComplaintToken ? 'border-primary bg-primary-fixed/20 shadow-sm' : 'border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low'} cursor-pointer transition-all flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">#${c.token}</span>
          <span class="px-2 py-0.5 rounded-full ${c.status === 'resolved' ? 'bg-primary-fixed text-on-primary-fixed' : (c.status === 'dispatched' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-amber-100 text-amber-800')} text-[11px] font-bold">
            ${c.statusUrdu || 'زیر جائزہ'}
          </span>
        </div>
        <div>
          <h4 class="font-bold text-sm text-on-surface leading-tight">${c.titleUrdu}</h4>
          <span class="text-xs text-on-surface-variant">${c.location}</span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-slate-100">
          <span class="flex items-center gap-1 font-bold text-secondary">
            <span class="material-symbols-outlined text-[14px]">timer</span>
            <span>${c.slaRemaining || '24h SLA'}</span>
          </span>
          <button onclick="event.stopPropagation(); AppSpeech.speak('${c.audioNote || c.titleUrdu}')" class="flex items-center gap-0.5 text-primary font-bold hover:underline">
            <span class="material-symbols-outlined text-[14px]">volume_up</span>
            <span>آڈیو</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  selectCase(token) {
    this.selectedComplaintToken = token;
    this.renderQueue();
    this.renderSelectedCase(token);
  },

  renderSelectedCase(token) {
    const list = typeof AppSync !== "undefined" ? AppSync.getComplaints() : [];
    const c = list.find(x => x.token === token) || list[0];
    if (!c) return;

    // Mask PII per PECA 2016
    const rawCnic = c.cnic || "37405-1849201-3";
    const rawPhone = c.phone || "0300-5849120";
    const maskedCnic = typeof AppSecurity !== "undefined" ? AppSecurity.maskCNIC(rawCnic) : rawCnic;
    const maskedPhone = typeof AppSecurity !== "undefined" ? AppSecurity.maskPhone(rawPhone) : rawPhone;

    document.getElementById("detail-token").innerText = `#${c.token}`;
    document.getElementById("detail-title").innerText = c.titleUrdu;
    document.getElementById("detail-status").innerText = c.statusUrdu || "زیر جائزہ";
    document.getElementById("detail-location").innerText = c.location;
    document.getElementById("detail-complainant").innerText = c.complainantName;
    document.getElementById("detail-cnic").innerText = `CNIC: ${maskedCnic}`;
    document.getElementById("detail-phone").innerText = `Phone: ${maskedPhone}`;
    document.getElementById("detail-sla").innerText = c.slaRemaining || "3h 15m remaining";
    document.getElementById("detail-transcript").innerText = `“${c.audioNote || c.titleUrdu}”`;
    document.getElementById("detail-team").innerText = c.assignedTeam || "SDO Gujar Khan Team 2";

    // Audio Play Button
    const playBtn = document.getElementById("btn-play-case-audio");
    if (playBtn) {
      playBtn.onclick = () => AppSpeech.speak(c.audioNote || c.titleUrdu);
    }

    // Security Audit Log for Citizen Record Access
    if (typeof AppLogger !== "undefined") {
      AppLogger.audit("ACCESS_CITIZEN_RECORD", `Admin reviewed complaint record #${c.token} for ${c.complainantName}`, {
        token: c.token,
        maskedCnic: maskedCnic,
        category: c.category
      });
    }
  },

  approveAndDispatch() {
    const list = typeof AppSync !== "undefined" ? AppSync.getComplaints() : [];
    const c = list.find(x => x.token === this.selectedComplaintToken);
    if (!c) return;

    c.status = "dispatched";
    c.statusUrdu = "ٹیم جائے وقوعہ پر روانہ (Dispatched)";
    c.assignedTeam = "SDO PHED Gujar Khan Team 2 (Engr. Asim)";
    c.timeline.push({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stepUrdu: "ڈپٹی ڈائریکٹر کی منظوری، فیلڈ ٹیم چک 18 روانہ",
      stepEnglish: "Approved & Field Dispatched by Deputy Director",
      done: true
    });

    if (typeof AppSync !== "undefined") AppSync.saveComplaint(c);
    if (typeof AppSpeech !== "undefined") {
      AppSpeech.playChime("success");
      AppSpeech.speak(`کیس نمبر ${c.token.replace('PK-', 'پی کے ')} کی منظوری دے دی گئی ہے اور فیلڈ ٹیم روانہ ہو گئی ہے۔`);
    }

    if (typeof AppLogger !== "undefined") {
      AppLogger.audit("DISPATCH_FIELD_TEAM", `Approved & dispatched complaint #${c.token} to ${c.assignedTeam}`, {
        token: c.token,
        assignedTeam: c.assignedTeam,
        operator: "Engr. Tariq Mehmood"
      });
    }

    alert(`کیس #${c.token} فیلڈ ٹیم کو تفویض کر دیا گیا!`);
    this.renderQueue();
    this.renderSelectedCase(c.token);
  },

  escalateCase() {
    const list = typeof AppSync !== "undefined" ? AppSync.getComplaints() : [];
    const c = list.find(x => x.token === this.selectedComplaintToken);
    if (!c) return;

    c.statusUrdu = "اسسٹنٹ کمشنر دفتر کو فوری ارسال (Escalated)";
    c.timeline.push({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stepUrdu: "SLA تاخیر کے خطرے کے پیش نظر AC دفتر کو اسکیلٹ کیا گیا",
      stepEnglish: "Escalated to Assistant Commissioner Office",
      done: true
    });

    if (typeof AppSync !== "undefined") AppSync.saveComplaint(c);
    if (typeof AppSpeech !== "undefined") {
      AppSpeech.speak(`کیس نمبر ${c.token.replace('PK-', 'پی کے ')} اسسٹنٹ کمشنر آفس کو فوری اسکیلٹ کر دیا گیا ہے۔`);
    }

    if (typeof AppLogger !== "undefined") {
      AppLogger.warn(AppLogger.CATEGORIES.AUDIT, `Complaint #${c.token} escalated to Assistant Commissioner office due to SLA breach risk`, {
        token: c.token,
        slaRemaining: c.slaRemaining
      });
    }

    alert(`کیس #${c.token} اسسٹنٹ کمشنر دفتر کو اسکیلٹ ہو گیا!`);
    this.renderQueue();
    this.renderSelectedCase(c.token);
  },

  renderTelemetry() {
    if (typeof AppAIRouter === "undefined") return;
    const state = AppAIRouter.state;
    const dailyCountEl = document.getElementById("telemetry-daily-count");
    const dailyLimitEl = document.getElementById("telemetry-daily-limit");
    const circuitBadge = document.getElementById("telemetry-circuit-badge");
    const quotaBar = document.getElementById("telemetry-quota-bar");
    const logsContainer = document.getElementById("telemetry-logs-table");

    if (dailyCountEl) dailyCountEl.innerText = state.dailyRequestsCount;
    if (dailyLimitEl) dailyLimitEl.innerText = state.dailyRequestsLimit;

    const pct = Math.min(100, Math.round((state.dailyRequestsCount / state.dailyRequestsLimit) * 100));
    if (quotaBar) quotaBar.style.width = `${pct}%`;

    if (circuitBadge) {
      if (state.circuitBreakerTripped) {
        circuitBadge.innerText = "TRIPPED (Cooldown Active)";
        circuitBadge.className = "px-2 py-0.5 rounded bg-error text-on-error text-xs font-bold";
      } else {
        circuitBadge.innerText = "HEALTHY (Normal)";
        circuitBadge.className = "px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold";
      }
    }

    if (logsContainer) {
      logsContainer.innerHTML = state.telemetryLogs.map(log => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
          <td class="p-2.5 font-mono">${log.timestamp}</td>
          <td class="p-2.5"><span class="px-2 py-0.5 rounded bg-surface-container font-mono">${log.model}</span></td>
          <td class="p-2.5 font-bold">${log.intent || '-'}</td>
          <td class="p-2.5 font-mono text-primary font-bold">${log.latencyMs} ms</td>
          <td class="p-2.5"><span class="px-2 py-0.5 rounded ${log.status.includes('SUCCESS') ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-error-container text-on-error'} font-bold">${log.status}</span></td>
        </tr>
      `).join('');
    }
  },

  renderUsersTable() {
    const container = document.getElementById("admin-users-table");
    if (!container) return;

    container.innerHTML = this.usersList.map(u => {
      const maskedCnic = typeof AppSecurity !== "undefined" ? AppSecurity.maskCNIC(u.cnic) : u.cnic;
      const maskedPhone = typeof AppSecurity !== "undefined" ? AppSecurity.maskPhone(u.phone) : u.phone;
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
          <td class="p-3 font-mono font-bold text-primary">${u.id}</td>
          <td class="p-3">
            <div class="font-bold text-on-surface">${u.name}</div>
            <div class="text-[11px] text-outline font-mono">CNIC: ${maskedCnic} | Phone: ${maskedPhone}</div>
          </td>
          <td class="p-3"><span class="px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-primary-container text-on-primary' : (u.role === 'field_operator' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface')} font-bold text-[11px]">${u.role.toUpperCase()}</span></td>
          <td class="p-3 text-on-surface-variant">${u.designation}</td>
          <td class="p-3 font-bold">${u.tehsil}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Active</span></td>
        </tr>
      `;
    }).join('');
  },

  renderKnowledgeTable() {
    const container = document.getElementById("admin-knowledge-table");
    if (!container || typeof CivicData === "undefined") return;

    const list = CivicData.hospitals.concat(CivicData.subsidies.map(s => ({
      nameUrdu: s.nameUrdu,
      type: "Welfare Scheme",
      tehsil: s.authority,
      verificationDate: s.verifiedDate,
      verifiedSource: s.officialUrl
    })));

    container.innerHTML = list.map((item, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
        <td class="p-3 font-mono font-bold">KB-${String(idx + 1).padStart(3, "0")}</td>
        <td class="p-3 font-bold text-on-surface">${item.nameUrdu}</td>
        <td class="p-3"><span class="px-2 py-0.5 rounded bg-surface-container font-bold">${item.type}</span></td>
        <td class="p-3 text-on-surface-variant">${item.tehsil}</td>
        <td class="p-3 font-mono font-bold text-primary">${item.verificationDate}</td>
        <td class="p-3 text-xs text-outline truncate max-w-xs">${item.verifiedSource}</td>
      </tr>
    `).join('');
  },

  /* =========================================================================
     AUDIT & DIAGNOSTIC LOGS ENGINE (REAL-TIME STREAM & FILTERING)
     ========================================================================= */

  renderLogsView() {
    if (typeof AppLogger === "undefined") return;

    const allLogs = AppLogger.getLogs();
    
    // Update KPI counters
    const totalEl = document.getElementById("kpi-total-logs");
    const errorEl = document.getElementById("kpi-error-logs");
    const auditEl = document.getElementById("kpi-audit-logs");
    const aiEl = document.getElementById("kpi-ai-logs");

    if (totalEl) totalEl.innerText = allLogs.length;
    if (errorEl) errorEl.innerText = allLogs.filter(l => l.level === "ERROR" || l.level === "CRITICAL").length;
    if (auditEl) auditEl.innerText = allLogs.filter(l => l.level === "AUDIT" || l.category === "AUDIT").length;
    if (aiEl) aiEl.innerText = allLogs.filter(l => l.category === "AI_ROUTER" || l.category === "SPEECH_ASR" || l.category === "SPEECH_TTS").length;

    this.refreshLogsTable();
  },

  filterLogs() {
    const searchInput = document.getElementById("log-search-input");
    const severitySelect = document.getElementById("log-severity-select");
    const categorySelect = document.getElementById("log-category-select");

    this.logsFilter.search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    this.logsFilter.severity = severitySelect ? severitySelect.value : "ALL";
    this.logsFilter.category = categorySelect ? categorySelect.value : "ALL";

    this.refreshLogsTable();
  },

  refreshLogsTable() {
    if (typeof AppLogger === "undefined") return;

    const container = document.getElementById("admin-logs-table-body");
    const countEl = document.getElementById("logs-showing-count");
    if (!container) return;

    let logs = AppLogger.getLogs();

    // Apply Filter Criteria
    if (this.logsFilter.severity !== "ALL") {
      logs = logs.filter(l => l.level === this.logsFilter.severity);
    }
    if (this.logsFilter.category !== "ALL") {
      logs = logs.filter(l => l.category === this.logsFilter.category);
    }
    if (this.logsFilter.search) {
      const q = this.logsFilter.search;
      logs = logs.filter(l => 
        l.message.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.level.toLowerCase().includes(q) ||
        JSON.stringify(l.details || {}).toLowerCase().includes(q)
      );
    }

    if (countEl) countEl.innerText = `Showing ${logs.length} of ${AppLogger.getLogs().length} logs`;

    if (logs.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="5" class="p-8 text-center text-outline">
            <span class="material-symbols-outlined text-[32px] block mb-1">find_in_page</span>
            No log entries match the current filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    // Render Rows (Newest First)
    container.innerHTML = logs.map(l => {
      const levelColors = {
        "DEBUG": "bg-slate-100 text-slate-700",
        "INFO": "bg-blue-50 text-blue-700 border border-blue-200",
        "WARN": "bg-amber-50 text-amber-800 border border-amber-200",
        "ERROR": "bg-red-50 text-red-700 border border-red-200 font-bold",
        "CRITICAL": "bg-red-700 text-white font-bold",
        "AUDIT": "bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
      };

      const categoryIcons = {
        "SYSTEM": "settings",
        "AI_ROUTER": "neurology",
        "SPEECH_ASR": "mic",
        "SPEECH_TTS": "volume_up",
        "STORAGE_SYNC": "sync",
        "SECURITY": "verified_user",
        "AUDIT": "policy"
      };

      const dateStr = new Date(l.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + (new Date(l.timestamp).getMilliseconds());
      const icon = categoryIcons[l.category] || "info";
      const pillClass = levelColors[l.level] || "bg-surface-container text-on-surface";

      return `
        <tr class="hover:bg-surface-container-low transition-colors">
          <td class="p-3 font-mono text-[11px] text-outline whitespace-nowrap">${dateStr}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono ${pillClass}">${l.level}</span>
          </td>
          <td class="p-3">
            <span class="inline-flex items-center gap-1 font-bold text-on-surface text-[11px]">
              <span class="material-symbols-outlined text-[14px] text-primary">${icon}</span>
              <span>${l.category}</span>
            </span>
          </td>
          <td class="p-3">
            <div class="text-on-surface font-medium leading-tight">${l.message}</div>
            ${Object.keys(l.details || {}).length > 0 ? `
              <div class="text-[11px] text-outline font-mono mt-0.5 truncate max-w-xl">
                ${JSON.stringify(l.details)}
              </div>
            ` : ''}
          </td>
          <td class="p-3 text-right">
            <button onclick="AdminPortal.inspectLog('${l.id}')" class="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-bold text-[11px] inline-flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[13px]">visibility</span>
              <span>View</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  inspectLog(logId) {
    if (typeof AppLogger === "undefined") return;
    const log = AppLogger.getLogs().find(l => l.id === logId);
    if (!log) return;

    const modal = document.getElementById("log-detail-modal");
    const content = document.getElementById("log-modal-content");
    if (modal && content) {
      content.textContent = JSON.stringify(log, null, 2);
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  exportLogsJSON() {
    if (typeof AppLogger !== "undefined") {
      const data = AppLogger.exportJSON();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `awami_logs_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  },

  exportLogsCSV() {
    if (typeof AppLogger !== "undefined") {
      const data = AppLogger.exportCSV();
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `awami_logs_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  },

  clearLogs() {
    if (confirm("کیا آپ واقعی تمام عارضی لاگز صاف کرنا چاہتے ہیں؟ (Are you sure you want to clear all logs?)")) {
      if (typeof AppLogger !== "undefined") {
        AppLogger.clearLogs();
        this.renderLogsView();
      }
    }
  },

  simulateTestError() {
    if (typeof AppLogger === "undefined") return;
    // Simulate an AI provider rate limit and fallback transition to show error capture
    AppLogger.error(AppLogger.CATEGORIES.AI_ROUTER, "Simulated Upstream 429 Rate Limit on free AI Gateway. Switching automatically to Tier 4 Deterministic Rule Engine.", {
      simulation: true,
      circuitStatus: "TRIPPED_TO_OFFLINE",
      errorReason: "HTTP 429 Too Many Requests (Simulated)",
      zeroPaidPolicy: "Preserved - 0 USD cost"
    });
    this.renderLogsView();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AdminPortal.init();
});
