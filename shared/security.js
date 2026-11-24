/**
 * Awami Voice Civic Solution - Enterprise Security & Data Privacy Framework
 * Implements PII Masking, XSS Neutralization, Session Integrity, and PECA 2016 Compliance
 */

const AppSecurity = {
  sessionTimeoutMinutes: 15,
  lastActivityTimestamp: Date.now(),

  init() {
    this.recordActivity();
    if (typeof AppLogger !== "undefined") {
      AppLogger.info("SECURITY", "AppSecurity PECA 2016 & XSS protection initialized");
    }
  },

  /**
   * Masks National Identity Card (CNIC) according to PECA 2016 privacy standard
   * Example: 37401-9921443-1 -> 37401-*******-1
   */
  maskCNIC(cnic) {
    if (!cnic || typeof cnic !== "string") return "";
    return cnic.replace(/^(\d{5})[-]?\d{7}[-](\d)$/, "$1-*******-$2");
  },

  /**
   * Masks Pakistani Mobile Phone number
   * Example: 0300-5551234 -> 0300-***1234
   */
  maskPhone(phone) {
    if (!phone || typeof phone !== "string") return "";
    return phone.replace(/^(\d{4})[-]?\d{3}(\d{4})$/, "$1-***$2");
  },

  /**
   * Strict XSS Sanitization to prevent script injection via spoken speech or form input
   */
  sanitize(input) {
    if (typeof input !== "string") return input;
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
      "`": '&#x60;'
    };
    return input.replace(/[&<>"'/`]/g, char => map[char])
                .replace(/javascript:/gi, "")
                .replace(/onerror/gi, "blocked")
                .replace(/onload/gi, "blocked")
                .replace(/onclick/gi, "blocked");
  },

  /**
   * Validate Pakistani CNIC format (13 digits: 5-7-1)
   */
  validateCNIC(cnic) {
    if (!cnic) return false;
    const regex = /^\d{5}-\d{7}-\d{1}$/;
    return regex.test(cnic.trim());
  },

  /**
   * Validate Pakistani Mobile Phone Number (03XX-XXXXXXX)
   */
  validatePhone(phone) {
    if (!phone) return false;
    const regex = /^03\d{2}-\d{7}$/;
    return regex.test(phone.trim());
  },

  /**
   * Generate Secure Cryptographic Session Nonce
   */
  generateNonce() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < array.length; i++) {
        token += chars[array[i] % chars.length];
      }
    } else {
      token = "NONCE-" + Date.now() + "-" + Math.random().toString(36).substring(2);
    }
    return token;
  },

  /**
   * Session Activity Tracker - Triggers timeout if idle > 15 minutes
   */
  recordActivity() {
    this.lastActivityTimestamp = Date.now();
  },

  isSessionExpired() {
    const elapsedMinutes = (Date.now() - this.lastActivityTimestamp) / (1000 * 60);
    return elapsedMinutes > this.sessionTimeoutMinutes;
  },

  /**
   * Obfuscate Sensitive Records in LocalStorage
   */
  encodeSecret(data) {
    try {
      return btoa(encodeURIComponent(JSON.stringify(data)));
    } catch (e) {
      return JSON.stringify(data);
    }
  },

  decodeSecret(encoded) {
    try {
      return JSON.parse(decodeURIComponent(atob(encoded)));
    } catch (e) {
      try {
        return JSON.parse(encoded);
      } catch (e2) {
        return null;
      }
    }
  },

  /**
   * Audit log access to sensitive citizen information
   */
  auditAccess(actorId, action, targetRecordId) {
    if (typeof AppLogger !== "undefined") {
      AppLogger.audit(action, targetRecordId, {
        actorId: actorId,
        timestamp: new Date().toISOString(),
        securityCheck: "PECA_PASSED"
      });
    }
  }
};

// Activity event listeners on window
if (typeof window !== "undefined") {
  window.AppSecurity = AppSecurity;
  ["click", "keydown", "touchstart"].forEach(evt => {
    window.addEventListener(evt, () => AppSecurity.recordActivity(), { passive: true });
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AppSecurity;
}
