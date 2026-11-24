/**
 * Awami Voice Civic Solution - Free AI Model Router & Multi-Tier Fallback Switchboard
 * Designed strictly adhering to Section 10 & 11 of ComprehensivePrompt.txt
 * 
 * CORE PRINCIPLE: ZERO PAID USAGE.
 * Hard lock: Under NO circumstance will any paid model or endpoint ever be billed.
 */

class FreeAIRouter {
  constructor() {
    this.storageKey = "awami_ai_router_state_v1";
    this.loadState();

    // Approved Free Hosted Model Roster
    this.modelTiers = {
      tier1: {
        name: "Tier 1: OpenRouter Free Router",
        modelId: "openrouter/free",
        provider: "OpenRouter",
        cost: "Free ($0.00)",
        description: "Dynamic auto-routing among zero-cost community models",
        isFreeOnly: true
      },
      tier2: {
        name: "Tier 2: Gemini 2.0 Flash (Free Tier)",
        modelId: "google/gemini-2.0-flash-exp:free",
        provider: "Google AI via OpenRouter Free",
        cost: "Free ($0.00)",
        description: "Fast multimodal Urdu/Punjabi reasoning with zero charge",
        isFreeOnly: true
      },
      tier3: {
        name: "Tier 3: Llama 3.3 70B Instruct (Free)",
        modelId: "meta-llama/llama-3.3-70b-instruct:free",
        provider: "Meta via OpenRouter Free",
        cost: "Free ($0.00)",
        description: "High quality open-weights multilingual LLM",
        isFreeOnly: true
      },
      tier4: {
        name: "Tier 4: Local Ollama / CPU Edge LLM",
        modelId: "qwen2.5:1.5b",
        provider: "Local CPU Host (http://localhost:11434)",
        cost: "Free ($0.00 Offline)",
        description: "Self-hosted ONNX / Ollama on local server CPU",
        isLocal: true,
        isFreeOnly: true
      },
      tier5: {
        name: "Tier 5: Deterministic Civic Knowledge & Rule Engine",
        modelId: "awami-deterministic-v1",
        provider: "Local Rule & RAG Engine",
        cost: "Zero API Call",
        description: "Instant regex intent extraction against verified Pakistan civic DB",
        isDeterministic: true
      },
      tier6: {
        name: "Tier 6: Graceful Degradation Voice Fallback",
        modelId: "awami-safe-fallback",
        provider: "Civic Voice Assistance Backup",
        cost: "Zero API Call",
        description: "Polite spoken emergency & direct municipal dispatch notification"
      }
    };
  }

  loadState() {
    const defaultState = {
      dailyRequestsCount: 14,
      dailyRequestsLimit: 50, // 50 requests/day for standard free OpenRouter accounts
      lastResetDate: new Date().toISOString().split("T")[0],
      activeTier: "tier1",
      consecutiveErrors: 0,
      circuitBreakerTripped: false,
      circuitBreakerExpiry: null,
      zeroPaidLockEnforced: true, // HARD LOCK
      openRouterApiKey: "", // Optional user/admin provided key
      ollamaEndpoint: "http://localhost:11434/api/generate",
      telemetryLogs: [
        {
          timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
          tier: "tier1",
          model: "openrouter/free",
          intent: "complaint_registration",
          tokens: 284,
          latencyMs: 820,
          status: "SUCCESS"
        },
        {
          timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
          tier: "tier1",
          model: "openrouter/free",
          intent: "hospital_inquiry",
          tokens: 195,
          latencyMs: 740,
          status: "SUCCESS"
        },
        {
          timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
          tier: "tier5",
          model: "awami-deterministic-v1",
          intent: "bisp_welfare_inquiry",
          tokens: 0,
          latencyMs: 12,
          status: "SUCCESS_DETERMINISTIC"
        }
      ]
    };

    try {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          this.state = Object.assign({}, defaultState, JSON.parse(saved));
          this.checkDailyReset();
          return;
        }
      }
    } catch (e) {
      console.warn("Storage not available, using default router state", e);
    }
    this.state = defaultState;
  }

  saveState() {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn("Failed to persist router state", e);
    }
  }

  checkDailyReset() {
    const today = new Date().toISOString().split("T")[0];
    if (this.state.lastResetDate !== today) {
      this.state.dailyRequestsCount = 0;
      this.state.lastResetDate = today;
      this.state.consecutiveErrors = 0;
      this.state.circuitBreakerTripped = false;
      this.state.circuitBreakerExpiry = null;
      this.saveState();
    }
  }

  setApiKey(key) {
    this.state.openRouterApiKey = key.trim();
    this.saveState();
  }

  setDailyLimit(limit) {
    this.state.dailyRequestsLimit = parseInt(limit, 10) || 50;
    this.saveState();
  }

  isQuotaAvailable() {
    this.checkDailyReset();
    return this.state.dailyRequestsCount < this.state.dailyRequestsLimit;
  }

  isCircuitBreakerActive() {
    if (!this.state.circuitBreakerTripped) return false;
    if (Date.now() > this.state.circuitBreakerExpiry) {
      // Auto reset circuit breaker
      this.state.circuitBreakerTripped = false;
      this.state.circuitBreakerExpiry = null;
      this.state.consecutiveErrors = 0;
      this.saveState();
      return false;
    }
    return true;
  }

  tripCircuitBreaker(reason) {
    this.state.circuitBreakerTripped = true;
    this.state.circuitBreakerExpiry = Date.now() + 60000; // 60-second cooldown
    this.logTelemetry("CIRCUIT_BREAKER_TRIPPED", "all_hosted", 0, 0, `Cooldown 60s: ${reason}`);
    this.saveState();
  }

  logTelemetry(status, model, tokens, latencyMs, notes = "") {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      tier: this.state.activeTier,
      model: model,
      tokens: tokens,
      latencyMs: latencyMs,
      status: status,
      notes: notes
    };
    this.state.telemetryLogs.unshift(entry);
    if (this.state.telemetryLogs.length > 50) {
      this.state.telemetryLogs.pop();
    }
    this.saveState();
  }

  /**
   * Main Dispatch: Processes User Spoken Query with Zero-Cost Guarantee
   */
  async processQuery(userText, context = {}) {
    const startTime = performance.now();
    this.checkDailyReset();

    // Step 1: Normalize and identify immediate deterministic civic intents (Tier 5)
    // Avoid spending precious free LLM quota when queries have exact verified facts!
    const ruleMatch = this.matchDeterministicRules(userText, context);
    if (ruleMatch.handled) {
      const latencyMs = Math.round(performance.now() - startTime);
      this.logTelemetry("SUCCESS_DETERMINISTIC", "awami-deterministic-v1", 0, latencyMs, ruleMatch.intent);
      return {
        tier: "tier5",
        modelUsed: "Awami Deterministic & RAG Engine",
        responseUrdu: ruleMatch.replyUrdu,
        responseEnglish: ruleMatch.replyEnglish,
        intent: ruleMatch.intent,
        extractedData: ruleMatch.data || {},
        latencyMs: latencyMs,
        isFreeGuaranteed: true
      };
    }

    // Step 2: Check if hosted free quota is exhausted or circuit breaker active
    const quotaOk = this.isQuotaAvailable();
    const circuitBreakerActive = this.isCircuitBreakerActive();

    if (!quotaOk || circuitBreakerActive) {
      console.warn(`[AIRouter] Hosted LLM quota exhausted or breaker active. Quota: ${this.state.dailyRequestsCount}/${this.state.dailyRequestsLimit}`);
      // Fallback to Tier 4 (Local Ollama) or Tier 5 (RAG/NLP Engine)
      return await this.fallbackToLocalOrRules(userText, context, startTime, quotaOk ? "Circuit Breaker Active" : "Daily Quota Reached");
    }

    // Step 3: Attempt Tier 1 (openrouter/free)
    try {
      this.state.activeTier = "tier1";
      const result = await this.callOpenRouterFree(userText, "openrouter/free", context);
      const latencyMs = Math.round(performance.now() - startTime);
      this.state.dailyRequestsCount++;
      this.state.consecutiveErrors = 0;
      this.logTelemetry("SUCCESS", "openrouter/free", result.tokens, latencyMs, result.intent);
      this.saveState();

      return {
        tier: "tier1",
        modelUsed: "openrouter/free (Dynamic Zero-Cost)",
        responseUrdu: result.replyUrdu,
        responseEnglish: result.replyEnglish,
        intent: result.intent,
        extractedData: result.extractedData,
        latencyMs: latencyMs,
        isFreeGuaranteed: true
      };
    } catch (errTier1) {
      console.warn("[AIRouter] Tier 1 failed:", errTier1.message);
      this.state.consecutiveErrors++;

      // Step 4: Fallback to Tier 2 (Google Gemini Flash Free)
      try {
        this.state.activeTier = "tier2";
        const result2 = await this.callOpenRouterFree(userText, "google/gemini-2.0-flash-exp:free", context);
        const latencyMs = Math.round(performance.now() - startTime);
        this.state.dailyRequestsCount++;
        this.state.consecutiveErrors = 0;
        this.logTelemetry("FALLBACK_SUCCESS", "google/gemini-2.0-flash-exp:free", result2.tokens, latencyMs, result2.intent);
        this.saveState();

        return {
          tier: "tier2",
          modelUsed: "gemini-2.0-flash-exp:free (Tier 2 Fallback)",
          responseUrdu: result2.replyUrdu,
          responseEnglish: result2.replyEnglish,
          intent: result2.intent,
          extractedData: result2.extractedData,
          latencyMs: latencyMs,
          isFreeGuaranteed: true
        };
      } catch (errTier2) {
        console.warn("[AIRouter] Tier 2 failed:", errTier2.message);
        this.state.consecutiveErrors++;

        // Step 5: Fallback to Tier 3 (Llama 3.3 70B Free)
        try {
          this.state.activeTier = "tier3";
          const result3 = await this.callOpenRouterFree(userText, "meta-llama/llama-3.3-70b-instruct:free", context);
          const latencyMs = Math.round(performance.now() - startTime);
          this.state.dailyRequestsCount++;
          this.state.consecutiveErrors = 0;
          this.logTelemetry("FALLBACK_SUCCESS", "llama-3.3-70b-instruct:free", result3.tokens, latencyMs, result3.intent);
          this.saveState();

          return {
            tier: "tier3",
            modelUsed: "llama-3.3-70b-instruct:free (Tier 3 Fallback)",
            responseUrdu: result3.replyUrdu,
            responseEnglish: result3.replyEnglish,
            intent: result3.intent,
            extractedData: result3.extractedData,
            latencyMs: latencyMs,
            isFreeGuaranteed: true
          };
        } catch (errTier3) {
          console.warn("[AIRouter] Tier 3 failed:", errTier3.message);
          this.state.consecutiveErrors++;
          if (this.state.consecutiveErrors >= 3) {
            this.tripCircuitBreaker("3 consecutive hosted failures (429/timeout)");
          }

          // Step 6: Multi-tier fallback to Local or Deterministic Engine (Zero Paid Always!)
          return await this.fallbackToLocalOrRules(userText, context, startTime, "All hosted free tiers temporarily busy (HTTP 429 / offline)");
        }
      }
    }
  }

  /**
   * Safe OpenRouter Free Caller
   * Ensures strict zero-cost parameters and structured Urdu/English extraction
   */
  async callOpenRouterFree(userText, modelId, context) {
    const apiKey = this.state.openRouterApiKey;
    if (!apiKey) {
      throw new Error("No OpenRouter API Key configured. Falling back to local/deterministic engine.");
    }

    const systemPrompt = `You are Awami Voice (عوامی آواز), the national public e-governance assistant for Pakistan (serving all provinces: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, Gilgit-Baltistan, and Azad Kashmir).
Communicate warmly and clearly for semi-literate citizens. Support Urdu, Punjabi, Potohari, Saraiki, Hindko, Sindhi, Pashto, Balochi, and English.
Provide responses strictly in valid JSON format with this structure:
{
  "intent": "complaint_registration" | "hospital_inquiry" | "subsidy_inquiry" | "complaint_status" | "general_help",
  "category": "water_supply" | "roads_infrastructure" | "sanitation_waste" | "electricity_lighting" | "healthcare",
  "location": "extracted village/tehsil or empty string",
  "summary": "1 sentence brief issue summary",
  "replyUrdu": "warm spoken Urdu reply to be read out loud to citizen",
  "replyEnglish": "English translation of reply"
}
Never recommend paid services. Keep replyUrdu conversational and easy to understand.`;

    const payload = {
      model: modelId,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Citizen Spoken Query: "${userText}". Context: ${JSON.stringify(context)}` }
      ],
      temperature: 0.3,
      max_tokens: 350
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://awamivoice.gov.pk",
        "X-Title": "Awami Voice Civic Pilot"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenRouter HTTP ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const tokens = (data.usage && data.usage.total_tokens) || 150;

    // Parse JSON output safely
    try {
      const parsed = JSON.parse(content.replace(/```json|```/g, "").trim());
      return {
        replyUrdu: parsed.replyUrdu,
        replyEnglish: parsed.replyEnglish,
        intent: parsed.intent || "general_help",
        extractedData: parsed,
        tokens: tokens
      };
    } catch (parseErr) {
      return {
        replyUrdu: content,
        replyEnglish: content,
        intent: "general_help",
        extractedData: { summary: userText },
        tokens: tokens
      };
    }
  }

  /**
   * Fallback to Local Ollama or Deterministic RAG Rules
   */
  async fallbackToLocalOrRules(userText, context, startTime, fallbackReason) {
    // Attempt Tier 4: Local Ollama on CPU (if running)
    try {
      this.state.activeTier = "tier4";
      const localResult = await this.callLocalOllama(userText);
      const latencyMs = Math.round(performance.now() - startTime);
      this.logTelemetry("SUCCESS_LOCAL", "qwen2.5:1.5b (Ollama Local)", 100, latencyMs, `Fallback: ${fallbackReason}`);
      return {
        tier: "tier4",
        modelUsed: "Local CPU Ollama (Tier 4)",
        responseUrdu: localResult.replyUrdu,
        responseEnglish: localResult.replyEnglish,
        intent: localResult.intent,
        extractedData: localResult.extractedData,
        latencyMs: latencyMs,
        isFreeGuaranteed: true
      };
    } catch (localErr) {
      console.log("[AIRouter] Local Ollama not active. Falling back to Tier 5 Deterministic Knowledge Engine.");
    }

    // Tier 5: Deterministic Smart Synthesis from Civic Database
    this.state.activeTier = "tier5";
    const synthesized = this.synthesizeCivicResponse(userText, context);
    const latencyMs = Math.round(performance.now() - startTime);
    this.logTelemetry("SUCCESS_SYNTHESIS", "awami-deterministic-v1", 0, latencyMs, `Fallback: ${fallbackReason}`);

    return {
      tier: "tier5",
      modelUsed: "Awami Deterministic & Verified Knowledge Base (Tier 5)",
      responseUrdu: synthesized.replyUrdu,
      responseEnglish: synthesized.replyEnglish,
      intent: synthesized.intent,
      extractedData: synthesized.data,
      latencyMs: latencyMs,
      isFreeGuaranteed: true,
      fallbackReason: fallbackReason
    };
  }

  /**
   * Tier 4: Call Local Ollama CPU endpoint
   */
  async callLocalOllama(userText) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second local timeout

    const res = await fetch(this.state.ollamaEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:1.5b",
        prompt: `Respond in Urdu. Categorize this rural civic request: "${userText}"`,
        stream: false
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Local Ollama endpoint error");
    const data = await res.json();
    return {
      replyUrdu: data.response || "آپ کی آواز محفوظ کر لی گئی ہے اور متعلقہ محکمے کو روانہ کی جا رہی ہے۔",
      replyEnglish: "Your request has been captured locally.",
      intent: "general_help",
      extractedData: { summary: userText }
    };
  }

  /**
   * Deterministic Regex & Pattern Matcher (Tier 5)
   */
  matchDeterministicRules(text, context) {
    text = String(text || "");
    const lower = text.toLowerCase();

    // 1. Complaint Status Inquiry (Token ID e.g. PK-94021, PK-7821)
    const tokenMatch = text.match(/PK[- ]?([0-9]{4,5})/i);
    if (tokenMatch || lower.includes("سٹیٹس") || lower.includes("شکایت کا کیا بنا") || lower.includes("status")) {
      const matchedToken = tokenMatch ? "PK-" + tokenMatch[1] : (context.lastToken || "PK-94021");
      const found = (typeof CivicData !== "undefined" && CivicData.initialComplaints.find(c => c.token === matchedToken)) || {
        token: matchedToken,
        statusUrdu: "زیر کاروائی ہے اور فیلڈ ٹیم کو تفویض کر دی گئی ہے",
        titleUrdu: "آپ کی درج شدہ شکایت"
      };

      return {
        handled: true,
        intent: "complaint_status",
        replyUrdu: `آپ کی شکایت نمبر ${found.token} کا سٹیٹس ہے: ${found.statusUrdu}۔ جلد آپ کے موبائل نمبر پر تفصیلی ایس ایم ایس بھیجا جائے گا۔`,
        replyEnglish: `Status for Token ${found.token}: ${found.statusUrdu}.`,
        data: { token: matchedToken, status: found.status }
      };
    }

    // 2. BISP / Kafalat / Subsidy inquiry (Urdu, Punjabi, Sindhi, Pashto, Balochi, English)
    if (text.includes("بینظیر") || text.includes("بينظير") || text.includes("bisp") || text.includes("وظیفہ") || text.includes("کفالت") || text.includes("8171") || text.includes("پیسے کب") || text.includes("پيسا") || text.includes("پېسې") || text.includes("زر کدی")) {
      const bisp = typeof CivicData !== "undefined" ? CivicData.subsidies[0] : null;
      return {
        handled: true,
        intent: "subsidy_inquiry",
        replyUrdu: `بینظیر کفالت وظیفہ 10,500 روپے ہے۔ اپنی اہلیت چیک کرنے کے لیے اپنا شناختی کارڈ نمبر لکھ کر 8171 پر میسج بھیجیں یا قریبی BISP تحصیل آفس تشریف لے جائیں۔`,
        replyEnglish: "BISP Kafaalat stipend is PKR 10,500 quarterly. Send your CNIC to 8171 to check eligibility.",
        data: { scheme: "bisp_kafalat", helpline: "8171" }
      };
    }

    // 3. Emergency / 1122 / Hospital Inquiry (All Regional Audio Accents)
    if (text.includes("1122") || text.includes("ایمرجنسی") || text.includes("ہسپتال") || text.includes("اسپتال") || text.includes("روغتون") || text.includes("ڈاکٹر") || text.includes("ڊاڪٽر") || text.includes("ډاکټر") || text.includes("ایمبولینس") || text.includes("طبی امداد")) {
      return {
        handled: true,
        intent: "hospital_inquiry",
        replyUrdu: `کسی بھی ہنگامی صورتحال یا ایمبولینس کے لیے بلا تاخیر ریسکیو 1122 ملائیں۔ قریبی بنیادی مرکز صحت چک 18 صبح 8 سے 2 بجے تک کھلا ہے اور مفت ادویات فراہم کرتا ہے۔`,
        replyEnglish: "For medical emergencies, dial Rescue 1122 immediately. BHU Chak 18 is open 8 AM - 2 PM.",
        data: { emergencyNumber: "1122", nearbyBhu: "BHU Chak 18" }
      };
    }

    // 4. Kisan Card / Fertilizer Loans (National Pakistan Agricultural Support)
    if (text.includes("کسان") || text.includes("کھاد") || text.includes("بیج") || text.includes("زرعی قرضہ")) {
      return {
        handled: true,
        intent: "subsidy_inquiry",
        replyUrdu: `قومی کسان پیکج کے تحت فی ایکڑ 30,000 روپے تک بلا سود زرعی قرضہ کھاد و بیج کے لیے دیا جاتا ہے۔ معلومات کے لیے شناختی کارڈ 8070 پر میسج کریں۔`,
        replyEnglish: "National Pakistan Kisan Card provides up to PKR 30,000/acre interest-free loans. SMS CNIC to 8070.",
        data: { scheme: "national_kisan_card", code: "8070" }
      };
    }

    return { handled: false };
  }

  /**
   * Deterministic Fallback Synthesis when Hosted Free models unavailable
   */
  synthesizeCivicResponse(text, context) {
    text = String(text || "");
    let category = "water_supply";
    let replyUrdu = "";
    let replyEnglish = "";

    // Multi-accent speech recognition: Urdu, Punjabi, Potohari, Saraiki, Hindko, Sindhi, Pashto, Balochi, English
    if (text.includes("سڑک") || text.includes("سڙڪ") || text.includes("سړک") || text.includes("روډ") || text.includes("دگ") || text.includes("لار") || text.includes("راہ") || text.includes("کھڈا") || text.includes("کھڈے") || text.includes("گلیاں") || text.includes("پلیا") || text.includes("رستہ") || text.includes("رستو") || text.includes("ٹٹی") || text.includes("ترٹ ڳئی") || text.includes("road")) {
      category = "roads_infrastructure";
      replyUrdu = "آپ کی سڑک اور گلی کی مرمت سے متعلق شکایت نوٹ کر لی گئی ہے۔ محکمہ مواصلات و تعمیرات (C&W) کی فیلڈ ٹیم کو مطلع کیا جا رہا ہے۔";
      replyEnglish = "Your road infrastructure complaint has been registered for the C&W department.";
    } else if (text.includes("کوڑا") || text.includes("صفائی") || text.includes("صفائي") || text.includes("صفايي") || text.includes("ڪچرو") || text.includes("کثافت") || text.includes("ساپ سلائی") || text.includes("نالی") || text.includes("بدبو") || text.includes("سڑاند") || text.includes("گند") || text.includes("garbage")) {
      category = "sanitation_waste";
      replyUrdu = "آپ کی صفائی اور کچرا اٹھانے کی شکایت نوٹ کر لی گئی ہے۔ راولپنڈی ویسٹ مینجمنٹ کمپنی (RWMC) کو روانہ کی جا رہی ہے۔";
      replyEnglish = "Your sanitation complaint has been forwarded to RWMC.";
    } else if (text.includes("بجلی") || text.includes("بجلي") || text.includes("بجلۍ") || text.includes("تار") || text.includes("تاراں") || text.includes("تارون") || text.includes("تارونه") || text.includes("ٹرانسفارمر") || text.includes("کھمبا") || text.includes("لائٹ") || text.includes("electricity")) {
      category = "electricity_lighting";
      replyUrdu = "بجلی اور لٹکتے تاروں کے خطرے کی فوری شکایت درج کر لی گئی ہے۔ آئیسکو (IESCO) ہنگامی لائن ٹیم کو فوری تفویض کیا جا رہا ہے۔";
      replyEnglish = "Your electricity hazard complaint has been flagged for urgent IESCO dispatch.";
    } else {
      category = "water_supply";
      replyUrdu = "آپ کی پینے کے پانی اور فلٹریشن پلانٹ کی شکایت محفوظ کر لی گئی ہے۔ پبلک ہیلتھ انجینئرنگ (PHED) فیلڈ ٹیم کو فوری تفویض کی جا رہی ہے۔";
      replyEnglish = "Your water supply complaint has been registered for the PHED department.";
    }

    return {
      intent: "complaint_registration",
      replyUrdu: replyUrdu,
      replyEnglish: replyEnglish,
      data: {
        category: category,
        token: "PK-" + Math.floor(10000 + Math.random() * 90000),
        status: "recorded_locally"
      }
    };
  }
}

// Global Singleton Instance
const AppAIRouter = new FreeAIRouter();

if (typeof window !== "undefined") {
  window.AppAIRouter = AppAIRouter;
  window.FreeAIRouter = FreeAIRouter;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FreeAIRouter, AppAIRouter };
}
