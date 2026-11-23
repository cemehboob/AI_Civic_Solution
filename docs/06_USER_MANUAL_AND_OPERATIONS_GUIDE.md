# Awami Voice (عوامی آواز) - User Manual & Operations Guide

> **Document Reference:** `AV-OPS-2026-V1.0`  
> **Project Name:** Awami Voice (عوامی آواز) — Voice-First AI-Powered E-Governance Platform  
> **Target Audience:** Citizens, Field Inspection Engineers, Municipal Administrators, Technical Support Staff  
> **Status:** Approved for Project Submission  

---

## 1. Citizen Voice User Guide (صارفین کے لیے صوتی رہنمائی)

Designed for users who prefer speaking and listening over typing.

```
                    [ 1. بولیں (SPEAK) ]
       Tap & hold the giant emerald microphone button.
             Listen for the pleasant 440Hz chime.
          Speak your problem naturally in Urdu, Punjabi,
             Potohari, Saraiki, or Hindko.
                             |
                             v
                    [ 2. سنیں (LISTEN) ]
       The system repeats your complaint in clear spoken Urdu.
             Tap "دوبارہ سنیں" to listen again.
                             |
                             v
                   [ 3. تصدیق (CONFIRM) ]
             Tap "ہاں، درج کریں" to receive your
           official 5-digit token (e.g., PK-94021).
```

### 1.1 How to Switch Application Language (Urdu $\leftrightarrow$ English)
At the top header of both the **Citizen Web Portal** and **Citizen Mobile App**, you will find an instant language toggle button:
- **From Urdu to English:** Click the button labeled **`English`** (with translate icon). The app flips to left-to-right (LTR) layout, and dynamically replaces **100% of all page options, menus, cards, badges, chips, descriptions, buttons, and bottom navigation labels** with comprehensive English translations.
- **From English to Urdu:** Click the button labeled **`اردو`**. The app flips back to right-to-left (RTL) layout, restoring native Urdu Nastaliq typography across all options and menu items.
- **Session Persistence:** Your language choice is saved automatically in `localStorage` and stays active across all subpages until changed.

### 1.2 Voice Options & Dialect Selection (Urdu, Punjabi, Potohari, Saraiki, Hindko)
The voice engine supports 5 indigenous languages and dialects:
- **Voice Instructions Displayed:** The prompt under the microphone explicitly instructs citizens:
  > *"پنجابی، پوٹھوہاری، سرائیکی، ہندکو یا اردو میں اپنا مسئلہ بتائیں"*  
  > *(In English: "Speak your issue in Punjabi, Potohari, Saraiki, Hindko or Urdu")*
- **Dialect Prompt Chips:** Interactive chips for Saraiki (*"پاݨی دا فلٹر بند ہے"*) and Hindko (*"سڑک ٹٹی ہوئی اے"*) allow instant one-touch demonstration.
- **Full-Screen Responsive Layout:** The WebApp expands to widescreen 1600px displays with an expansive 12-column hero bento grid and a 4-column gateway card grid. The MobileApp automatically adapts on desktop browsers to a rich multi-column dashboard.

### 1.2 How to File a Complaint (شکایت درج کروانے کا طریقہ)
1. **Open Mobile App or Web Portal:** Open [mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html) or [webApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/index.html).
2. **Audio Welcome:** Click the yellow **"آواز رہنمائی سنیں"** button to hear an audio explanation of the platform.
3. **Speak Your Grievance in Any Dialect:** Tap the giant microphone button and state your issue:
   - *Urdu Example:* *"ہمارے محلے میں پینے کے پانی کا پائپ پھٹ گیا ہے"*
   - *Punjabi/Potohari Example:* *"ساڈے گرانہہ وچ پانی نی مین پائپ لائن پھٹی گئی اے"*
   - *Saraiki Example:* *"اساڈے وستی وچ پاݨی دی نلکی ترٹ ڳئی ہے تے رستہ بند ہے"*
   - *Hindko Example:* *"اساں دے محلے چ پاݨی نئیں آندا تے نالی ساری بند پئی اے"*
4. **Listen to Spoken Confirmation:** The platform processes your words and speaks back the identified department (**پبلک ہیلتھ انجینئرنگ - PHED**) and urgency level.
5. **Receive Your Token:** A green celebration card appears displaying your tracking token (e.g., **`PK-94021`**), and an audio voice reads the number aloud.

### 1.3 How to Track a Complaint (شکایت کا حال معلوم کرنا)
1. Navigate to **"ٹریکنگ"** in the bottom navigation (or [webApp/track.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/track.html)).
2. Tap the microphone button and ask: *"میری شکایت پی کے 94021 کا کیا ہوا؟"*
3. The platform speaks the latest status (e.g., *"آپ کی شکایت پر فیلڈ آفیسر طارق محمود تعینات کر دیا گیا ہے"*).

### 1.4 How to Inquire About Healthcare & Subsidies
- **Emergency 1122:** Tap the red **"1122 مدد"** button on the bottom bar to instantly call Rescue 1122 or locate the nearest Basic Health Unit (BHU).
- **BISP 8171 / Kisan Card:** Tap the **"امداد و وظائف"** card to hear current quarterly installment amounts (PKR 10,500) and required registration documents.

---

## 2. Mobile User Management & Role Switching (`mobileApp/user_management.html`)

The User Management interface allows citizens and municipal officers to tailor their profile and switch roles:

```
+-------------------------------------------------------------------------+
|                  صارف کا انتظام و پروفائل (USER SETTINGS)                 |
+-------------------------------------------------------------------------+
| [Citizen Profile: Muhammad Aslam | CNIC: 37401-9921443-1 | Gujar Khan]  |
+-------------------------------------------------------------------------+
| [Language & Dialect: (X) اردو   ( ) پنجابی   ( ) پوٹھوہاری             |
|                      ( ) سرائیکی ( ) ہندکو    ( ) English]             |
+-------------------------------------------------------------------------+
| [Voice Speed: (X) 0.8x (بزرگ شہری)    ( ) 1.0x (عام)     ( ) 1.2x (تیز)]|
+-------------------------------------------------------------------------+
| [Offline Storage: 42% used (10 cached items) | [Force Sync Outbox Now]] |
+-------------------------------------------------------------------------+
| [Role Switcher: (X) شہری (Citizen)     ( ) فیلڈ آفیسر (Field Officer)]  |
+-------------------------------------------------------------------------+
```

1. **Adjust Audio Playback Speed:** For elderly citizens, select **`0.8x`** for slower, crystal-clear speech delivery.
2. **Offline Outbox Synchronization:** View the local cache gauge and tap **"ڈیٹا سنک کریں (Force Sync Now)"** to immediately transmit queued complaints upon re-entering Wi-Fi or 4G coverage.
3. **Switch to Field Operations:** Tap **"فیلڈ آفیسر (Field Officer)"**. The mobile bottom navigation automatically replaces the citizen emergency tab with the **"فیلڈ کام (Field Tasks)"** tab.

---

## 3. Field Operations Officer Manual (`mobileApp/field_tasks.html`)

For on-ground municipal engineers (PHED, C&W, RWMC):

1. **Review Assigned Work Orders:** Open `mobileApp/field_tasks.html` to see urgent cases ordered by SLA remaining time.
2. **Listen to Complainant Audio:** On-site, click the **"Play Complainant Voice Note"** button to hear the citizen's exact description in their own voice.
3. **Perform On-Site Inspection (`field_inspection.html`):**
   - **GPS Lock:** Tap **"GPS Lock"** to verify your coordinates (`33.2541° N, 73.3082° E`).
   - **Photo Evidence:** Capture the **Before Repair** photo showing the damage, and the **After Repair** photo once resolved.
   - **Citizen Signature:** Have the complainant sign with their finger on the touchscreen.
   - **Submit Resolution:** Tap **"Submit Resolution"** to mark the case resolved in the central database.

---

## 4. Municipal Administrator Command Manual (`webApp/admin/index.html`)

For district and tehsil administrative officers:

```
[ Executive Command Header: Active Cases: 142 | SLA: 87.4% | Rating: 94.2% | Tier 1 Free AI ]
-----------------------------------------------------------------------------------------------
[ 1. Triage Queue ] [ 2. Field Dispatch ] [ 3. AI Telemetry ] [ 4. Staff ] [ 5. Knowledge ] [ 6. Logs & Audits ]
```

1. **Triage Queue:**
   - Review incoming complaints. Filter by department (PHED, C&W, RWMC, IESCO).
   - Click the audio play button **"▶ سنیں (Listen)"** to verify the citizen's voice recording.
   - Click **"تفویض کریں (Dispatch)"** to allocate an inspection team.
   - Notice that citizen CNIC and phone numbers are automatically masked (`37405-*******-3`, `0300-***9120`) to comply with PECA 2016 data privacy laws.
2. **AI Telemetry Switchboard:**
   - Verify that **Tier 1 OpenRouter Free** is active and that the zero-paid lock is engaged.
   - Monitor the daily request counter (e.g., `14/50 requests used today`).
   - If network or provider rate limits occur, observe the **Circuit Breaker** automatically trip and divert requests to local CPU or deterministic RAG rules.
3. **Staff & Knowledge Base Management:**
   - Add new field inspectors by assigning them to specific Tehsils (Gujar Khan, Kahuta, Murree, Rawalpindi).
   - Update verified operating hours and phone numbers for BHU healthcare facilities.
4. **Audit & Diagnostic Logs Console (Tab 6):**
   - **Real-Time Log Stream:** Continuously updates with live system, speech, AI routing, storage sync, and security audit events.
   - **Finding Root Causes of Errors:** Select **Severity: Error / Critical** from the dropdown. Inspect the error row to find the exact reason (e.g. `Free API upstream HTTP 429 Rate Limit` $\rightarrow$ `Circuit breaker engaged, automatically switched to Local Deterministic Fallback Engine`).
   - **Forensic Export:** Click **Export JSON** or **Export CSV** to download complete log packages for municipal audit reporting.
   - **Simulate Error:** Click the **Simulate Error** button to test the diagnostic capture pipeline in real time.

---

## 5. Troubleshooting & Frequently Asked Questions (FAQ)

### Q1: The microphone does not respond when pressed.
- **Solution:** Check your browser's address bar. Ensure microphone permission is set to **"Allow"**. If using HTTP, switch to `localhost` or HTTPS, as modern browsers require a secure origin for microphone access.

### Q2: How does the system operate without an internet connection?
- **Solution:** Awami Voice features an embedded offline outbox. When disconnected, the network badge turns yellow (`آف لائن - Offline Ready`). Complaints are stored locally in IndexedDB and automatically synchronize as soon as connectivity resumes.

### Q3: What happens when the 50 free OpenRouter requests are exhausted?
- **Solution:** The platform strictly enforces a **Zero-Paid Hard Lock**. It will **never** charge a credit card. Once the 50-request daily limit is reached, the system automatically routes queries to **Tier 4 (Local CPU edge model)** and **Tier 5 (Deterministic Punjab Civic Rule Engine)** without any interruption in service.

### Q4: How do I find out why an error or failure occurred in the system?
- **Solution:** Open the Admin Command Console (`webApp/admin/index.html`) and click the **"Audit & Diagnostic Logs"** tab (Tab 6). Filter by `ERROR` or search for keywords (e.g., `rate limit`, `sync`, `audio`). Click the **"View"** button on any log entry to view the full JSON context, including error codes, upstream response details, and the fallback actions taken by the platform.

### Q5: How is citizen data (CNIC and phone numbers) protected?
- **Solution:** In compliance with Pakistan's **Prevention of Electronic Crimes Act (PECA 2016)**, all citizen CNIC numbers and phone numbers are automatically masked on administrative displays and diagnostic logs (`37405-*******-3` and `0300-***9120`). Input forms enforce strict Cross-Site Scripting (XSS) neutralization, and inactive sessions are locked after 15 minutes. Furthermore, no citizen voice data is ever transmitted to commercial paid AI providers.

---
*End of User Manual & Operations Guide*
