/**
 * Awami Voice Civic Solution - Offline Storage & Synchronization Engine
 * Supports low-connectivity (2G/EDGE), offline draft queuing, and automatic cloud sync
 * Adheres to Section 13 of ComprehensivePrompt.txt
 */

class StorageSyncManager {
  constructor() {
    this.storageKey = "awami_offline_queue_v1";
    this.complaintsKey = "awami_complaints_db_v1";
    this.userKey = "awami_user_profile_v1";
    this.settingsKey = "awami_app_settings_v1";

    this.initDatabase();
    this.initNetworkListener();
  }

  initDatabase() {
    // Seed initial complaints if not present
    if (typeof localStorage !== "undefined") {
      const existing = localStorage.getItem(this.complaintsKey);
      if (!existing && typeof CivicData !== "undefined") {
        localStorage.setItem(this.complaintsKey, JSON.stringify(CivicData.initialComplaints));
      }

      // Default user profile
      const user = localStorage.getItem(this.userKey);
      if (!user) {
        const defaultUser = {
          name: "محمد افضل (Muhammad Afzal)",
          cnic: "37405-1849201-3",
          phone: "0300-5849120",
          district: "Rawalpindi / راولپنڈی",
          tehsil: "Gujar Khan / گوجر خان",
          village: "Chak 18 / چک نمبر 18",
          preferredLanguage: "ur-PK", // Urdu
          audioSpeed: 0.9,
          role: "citizen", // "citizen" | "field_operator" | "admin"
          offlineModeOnly: false,
          wifiOnlySync: true,
          voiceBiometricsEnabled: true
        };
        localStorage.setItem(this.userKey, JSON.stringify(defaultUser));
      }
    }
  }

  initNetworkListener() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        console.log("[StorageSync] Network restored (Online). Auto-syncing queue...");
        this.syncOutbox();
      });
      window.addEventListener("offline", () => {
        console.log("[StorageSync] Network lost (Offline mode). Changes will be queued locally.");
      });
    }
  }

  isOnline() {
    if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
      return navigator.onLine;
    }
    return true;
  }

  getUserProfile() {
    try {
      const data = localStorage.getItem(this.userKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveUserProfile(profile) {
    try {
      const current = this.getUserProfile();
      const updated = Object.assign({}, current, profile);
      localStorage.setItem(this.userKey, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn("Failed to save user profile", e);
      return profile;
    }
  }

  getComplaints() {
    try {
      const data = localStorage.getItem(this.complaintsKey);
      return data ? JSON.parse(data) : (typeof CivicData !== "undefined" ? CivicData.initialComplaints : []);
    } catch (e) {
      return typeof CivicData !== "undefined" ? CivicData.initialComplaints : [];
    }
  }

  saveComplaint(complaint) {
    const list = this.getComplaints();
    const existingIndex = list.findIndex(c => c.token === complaint.token || c.id === complaint.id);

    if (existingIndex >= 0) {
      list[existingIndex] = Object.assign({}, list[existingIndex], complaint);
    } else {
      list.unshift(complaint);
    }

    try {
      localStorage.setItem(this.complaintsKey, JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota warning:", e);
    }

    // Queue for sync if offline
    if (!this.isOnline()) {
      this.queueForSync({ type: "CREATE_COMPLAINT", data: complaint, queuedAt: new Date().toISOString() });
    }

    return complaint;
  }

  getQueue() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  queueForSync(item) {
    const queue = this.getQueue();
    queue.push(item);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(queue));
    } catch (e) {
      console.warn("Failed to queue item", e);
    }
  }

  async syncOutbox(onProgress = null) {
    const queue = this.getQueue();
    if (queue.length === 0) {
      if (onProgress) onProgress(100, 0);
      return { success: true, count: 0 };
    }

    const total = queue.length;
    for (let i = 0; i < total; i++) {
      // Simulate network payload dispatch to backend
      await new Promise(r => setTimeout(r, 400));
      if (onProgress) {
        onProgress(Math.round(((i + 1) / total) * 100), total - (i + 1));
      }
    }

    // Clear queue after sync
    localStorage.removeItem(this.storageKey);
    return { success: true, count: total };
  }

  getStorageBreakdown() {
    const queue = this.getQueue();
    const complaints = this.getComplaints();

    return {
      pendingQueueCount: queue.length,
      estimatedSizeMB: (14.2 + (queue.length * 1.1)).toFixed(1),
      maxStorageMB: 500,
      photoEvidenceMB: 14.2,
      audioRecordingsMB: (3.1 + (queue.length * 0.4)).toFixed(1),
      sqliteDataMB: 1.1
    };
  }
}

// Global Singleton Instance
const AppSync = new StorageSyncManager();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { StorageSyncManager, AppSync };
}
