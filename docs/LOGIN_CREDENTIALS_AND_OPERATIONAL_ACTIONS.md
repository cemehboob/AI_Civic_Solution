# Awami Voice (عوامی آواز) - System Access Credentials, User Accounts & Operational Actions Reference Guide

> **Document Reference:** `AV-CRED-2026-V1.0`  
> **Platform Name:** Awami Voice (عوامی آواز) — Voice-First AI-Powered E-Governance Platform  
> **Classification:** Official Government & Demonstration Access Information  
> **Jurisdiction:** Government of Pakistan (All Provinces: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, ICT, Gilgit-Baltistan, AJK)  
> **Date of Issue:** November 23, 2026  

---

## 1. Executive Summary & Security Notice

This document provides a comprehensive operational reference for all system access points, user accounts, administrative credentials, role switcher procedures, and operational workflows across the **Awami Voice (عوامی آواز)** platform. 

It is designed for municipal administrators, triage supervisors, field inspection teams, testing evaluators, and system auditors.

---

## 2. Platform Access Points & Direct Application URLs

| Module Name | Intended User / Role | Local File URL | Localhost Web Server URL |
| :--- | :--- | :--- | :--- |
| **Citizen Web Portal** | Public / Low-Literacy Citizens | `webApp/index.html` | `http://localhost:8000/webApp/index.html` |
| **Admin Command Console** | DC Office, Triage Officers, Supervisors | `webApp/admin/index.html` | `http://localhost:8000/webApp/admin/index.html` |
| **Citizen Mobile App** | Rural Citizens (Push-to-Talk Voice) | `mobileApp/index.html` | `http://localhost:8000/mobileApp/index.html` |
| **User Management & Profile** | Citizens & Field Officers (Settings & Role Switch) | `mobileApp/user_management.html` | `http://localhost:8000/mobileApp/user_management.html` |
| **Field Operations Tasks** | Field Engineers & Inspection Crews | `mobileApp/field_tasks.html` | `http://localhost:8000/mobileApp/field_tasks.html` |
| **On-Site Field Inspection** | Field Engineers (GPS Lock & Photos) | `mobileApp/field_inspection.html` | `http://localhost:8000/mobileApp/field_inspection.html` |
| **Offline Storage & Sync** | All Mobile Users (Outbox Queue) | `mobileApp/offline_sync.html` | `http://localhost:8000/mobileApp/offline_sync.html` |
| **Audit & Diagnostic Logs** | DC Office, Municipal Auditors, Tech Leads | `webApp/admin/index.html` (Tab 6) | `http://localhost:8000/webApp/admin/index.html` |
| **Backend REST API Health** | System Integrators / Automated Health Checks | `backend/app.py` | `http://localhost:8000/api/health` |
| **Diagnostic Logs REST API** | Administrative Log Monitors & SIEM | `backend/app.py` | `http://localhost:8000/api/admin/logs` |

---

## 3. Master User Accounts & Login Credentials

### 3.1 Administrative & Municipal Supervisory Staff

| User ID | Full Name | Designation & Department | Username / Email | Password | Access Level & Permissions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **STF-001** | **Sardar Sikandar Hayat** | Additional Deputy Commissioner (General), DC Office Rawalpindi | `admin.sikandar`<br>`admin@awamivoice.punjab.gov.pk` | `PunjabGov@2026!` | **Super Administrator:** Full triage queue oversight, field dispatch authorization, AI telemetry switchboard, circuit breaker override, staff directory management, civic knowledge base publishing. |
| **STF-002** | **Ayesha Siddiqa** | Senior Municipal Triage Officer, Local Government & CD Dept | `triage.ayesha`<br>`ayesha@awamivoice.punjab.gov.pk` | `Triage@2026#` | **Triage Officer:** Ingestion review, listening to citizen voice notes, departmental categorization (PHED, C&W, RWMC, IESCO), priority setting, and SLA monitoring. |
| **STF-003** | **Malik Tariq** | District Health Information Officer, Health Department Rawalpindi | `health.tariq`<br>`tariq.health@punjab.gov.pk` | `Health@2026$` | **Health & Welfare Officer:** Management of BHU/RHC/THQ directory, hospital doctor availability updates, emergency 1122 escalation, and BISP/Kisan Card eligibility rules. |

---

### 3.2 Field Operations Inspection Engineers

| User ID | Badge ID | Full Name | Department & Jurisdiction | Username / Phone | Mobile Access PIN | Field Responsibilities |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **STF-742** | **ENG-742** | **Engr. Tariq Mehmood** | Public Health Engineering Dept (PHED), Gujar Khan & Rawalpindi Rural | `eng.tariq`<br>`0301-4455667` | `7421` | Water supply pipelines, tube well maintenance, contamination emergency response, GPS on-site verification, before/after photo documentation. |
| **STF-810** | **ENG-810** | **Engr. Rashid Ali** | Communication & Works (C&W) Roads, Kahuta & Kallar Syedan | `eng.rashid`<br>`0302-5566778` | `8102` | Road pothole repairs, culvert clearing, landslide clearance on rural arteries, contractor compliance sign-off. |
| **STF-305** | **SUP-305** | **Malik Farooq** | Rawalpindi Waste Management Company (RWMC), Murree & Rural Border | `sup.farooq`<br>`0303-6677889` | `3053` | Solid waste removal, illegal dumping cleanup, public hygiene, village container emptying verification. |
| **STF-119** | **ENG-119** | **Engr. Noman Shah** | Islamabad Electric Supply Co (IESCO), Gujar Khan Sub-division | `eng.noman`<br>`0304-7788990` | `1194` | Low-hanging power cables, transformer oil leakages, hazardous pole stabilization, emergency electrical shutdowns. |

---

### 3.3 Pre-Seeded Citizen Accounts & Demonstration Personas

| User ID | Full Name | CNIC Number | Contact Phone | Tehsil / Union Council | Dialect / Language | Seeded Complaint Token & Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **USR-001** | **Muhammad Aslam** | `37401-9921443-1` | `0300-5551234` | Mandra Ward 4, Tehsil Gujar Khan | Punjabi / Potohari & Urdu | **Token: `PK-94021`**<br>*Contaminated drinking water due to burst 4-inch main PVC pipeline. Urgency: CRITICAL. Status: DISPATCHED.* |
| **USR-002** | **Naseem Bibi** | `37405-1122334-2` | `0312-7778899` | UC Nara, Tehsil Kahuta | Rural Urdu | **Token: `PK-7821`**<br>*BISP 8171 Kafalat quarterly installment inquiry & biometric center verification. Status: RESOLVED.* |
| **USR-003** | **Bashir Ahmed** | `37403-4455667-3` | `0333-8889900` | Choa Khalsa, Tehsil Kallar Syedan | Potohari Dialect | **Token: `PK-6310`**<br>*Deep road crater causing tractor trolley overturn risk on link road. Urgency: URGENT. Status: IN PROGRESS.* |
| **USR-004** | **Zubaida Parveen** | `37402-8899001-4` | `0345-1234567` | Village Khinger, Gujar Khan | Rural Urdu | **Token: `PK-5219`**<br>*Basic Health Unit (BHU) maternity staff availability and ultrasound schedule inquiry. Status: RESOLVED.* |
| **USR-005** | **Ghulam Rasool** | `38301-7788991-5` | `0306-1122334` | Piplan, Mianwali (South Punjab) | Saraiki (`skr-PK`) | **Token: `PK-4112`**<br>*Canal irrigation water breach and tube well transformer breakdown in Saraiki dialect. Status: IN PROGRESS.* |
| **USR-006** | **Sardar Gulzaman** | `37101-5566778-6` | `0315-9988112` | Hassan Abdal, Attock Border | Hindko (`hnd-PK`) | **Token: `PK-3890`**<br>*Link road culvert collapsed blocking agricultural tractor transit in Hindko dialect. Status: DISPATCHED.* |
| **USR-007** | **Mirza Ali Bux** | `41301-3344556-7` | `0300-1122334` | Ghotki / Rahim Yar Khan Border | Sindhi (`sd-PK`) | **Token: `PK-2981`**<br>*Drinking water filtration plant motor burned, requesting PHED repair in Sindhi accent. Status: IN PROGRESS.* |
| **USR-008** | **Gul Khan Khattak** | `14201-8899112-8` | `0333-4455667` | Attock / KP Border | Pashto (`ps-PK`) | **Token: `PK-2740`**<br>*Main market road flooded due to blocked drainage, spoken in Pashto accent. Status: DISPATCHED.* |
| **USR-009** | **Mir Hasil Khan** | `54401-2233445-9` | `0345-7788990` | Dera Ghazi Khan / Balochistan Border | Balochi (`bal-PK`) | **Token: `PK-2511`**<br>*Rural BHU doctor absenteeism and emergency medicine shortage in Balochi accent. Status: LOGGED.* |

---

## 4. Comprehensive Operational Actions & Step-by-Step Procedures

### ACTION 0: Instant Language Switching via Top Header Toggle (Urdu $\leftrightarrow$ English)
1. **Locate Header Switcher:** Look at the top-right header strip of the Citizen Web Portal ([webApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/index.html)) or top bar of the Mobile App ([mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html)).
2. **Switching to English:** 
   - Click the button labeled **`English`** (translate icon).
   - **System Reaction:** The application changes layout direction to Left-to-Right (`dir="ltr"`), dynamically replaces **100% of all page options, menus, cards, badges, buttons, prompt chips, and bottom navigation labels** with comprehensive English translations, and changes the toggle label to **`اردو`**.
3. **Switching to Urdu:**
   - Click the button labeled **`اردو`**.
   - **System Reaction:** The application flips back to Right-to-Left (`dir="rtl"`), rendering native Nastaliq/Arabic typography across all options and menu items.
4. **Automatic Persistence:** The chosen preference is saved in `localStorage.setItem("awami_app_lang")` and remains active across all subpages.

### ACTION 1: Logging in to the Admin Command Console
1. **Access URL:** Open [webApp/admin/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/admin/index.html) in your browser.
2. **Authentication:** 
   - Enter Username: `admin.sikandar` (or `triage.ayesha`).
   - Enter Password: `PunjabGov@2026!` (or `Triage@2026#`).
   - Click **"لاگ ان کریں (Sign In)"**.
3. **Verification:**
   - Observe the **Executive Metrics Ribbon** loading: Active Cases (142), SLA Compliance (87.4%), Satisfaction (94.2%), and Active AI Tier (**Tier 1 OpenRouter Free**).

---

### ACTION 2: Reviewing a Grievance & Playing Complainant Audio
1. On the Admin Portal, select the **"Triage Queue"** tab.
2. Locate complaint **`PK-94021`** (Complainant: *Muhammad Aslam*, Mandra Ward 4).
3. In the **Audio Playback** column, click the **"▶ سنیں (Listen)"** button.
4. **Expected Audio Output:** The browser's audio player streams the rural citizen's 14-second spoken voice recording describing the water line hazard in Punjabi/Urdu.
5. Review the automated classification:
   - **Department:** `PHED (Public Health Engineering)`
   - **Urgency:** `CRITICAL (लाल रंग)`
   - **SLA Remaining:** `4 Hours (Alert Triggered)`

---

### ACTION 3: Dispatching a Field Team & Assigning Work Orders
1. In the Triage Queue row for `PK-94021`, click **"تفویض کریں (Dispatch)"**.
2. A modal window opens:
   - Select Assigned Officer: **`ENG-742 (Engr. Tariq Mehmood - PHED Sub-division)`**.
   - Verify Location Coordinates: `33.2541° N, 73.3082° E`.
   - Set Urgency Override (if required): `Critical (24-Hour SLA)`.
   - Add Dispatch Notes: *"Replace 4-inch PVC collar joint immediately; prevent road waterlogging."*
3. Click **"Confirm Dispatch"**.
4. **System Response:** The status updates to `DISPATCHED`; an automated work order notification is transmitted to Tariq Mehmood's field mobile application.

---

### ACTION 4: Monitoring AI Health Telemetry & Managing Daily Quotas
1. Click the **"AI Telemetry"** tab on the Admin Portal.
2. **Inspect the AI Model Switchboard:**
   - **Active Tier Indicator:** Displays `Tier 1: OpenRouter Free Router (openrouter/free)`.
   - **Zero-Paid Hard Lock:** Verified `LOCKED ($0.00 Cost Guarantee)`.
   - **Daily Quota Gauge:** Shows current utilization (e.g., `14/50 requests used today`).
3. **Simulate Circuit Breaker Testing:**
   - Click **"Test Circuit Breaker Trip"**.
   - Observe the system immediately enter a 60-second cooldown state, preventing hosted calls and diverting traffic to **Tier 4 (Local CPU edge model)** and **Tier 5 (Deterministic Punjab Civic Rule Engine)**.
4. **Live Request Log Table:**
   - Review columns: `Timestamp`, `Tier Used`, `Model Identifier`, `Token Count`, `Latency (ms)`, and `Status (SUCCESS / SUCCESS_DETERMINISTIC)`.

---

### ACTION 5: Adding a New Municipal Officer or Field Inspector
1. Click the **"Staff Management"** tab on the Admin Portal.
2. Click the green button **"+ Add Staff Member"**.
3. Fill out the staff creation form:
   - **Full Name:** `Engr. Bilal Hassan`
   - **Role:** Select `Field Operator`
   - **Designation:** `Junior Sub-Divisional Engineer`
   - **Department:** `C&W Roads`
   - **Tehsil Assignment:** Select `Kahuta`
   - **Contact Phone:** `0305-9988776`
4. Click **"Save Staff Member"**.
5. **System Response:** Staff ID `STF-005` is generated, credentials are saved to `backend/database.json`, and the officer appears in the dispatch roster.

---

### ACTION 6: Filing a Citizen Voice Complaint (Push-to-Talk)
1. Open the Citizen Mobile App: [mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html).
2. Click the yellow button **"آواز رہنمائی سنیں"** to hear the spoken introduction.
3. Tap the center **giant emerald microphone button (104px)**.
4. Speak clearly into your device microphone:
   > *"ہمارے محلے میں پینے کے پانی کی پائپ لائن پھٹ گئی ہے اور گندا پانی سڑک پر جمع ہے"*
5. **Acoustic Feedback:** The app plays a 440Hz *Mic Ready* chime, visualizes sound wave ripples, captures audio, and plays a 330Hz *Speech Captured* chime.
6. The app navigates to [active_voice.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/active_voice.html) and displays the transcribed speech bubble in Urdu and Punjabi.
7. Click **"ہاں، درج کریں (Confirm & Submit)"**.
8. **Celebration Screen:** Navigates to [complaint_confirmation.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/complaint_confirmation.html); plays the 520Hz celebratory chime, displays token **`PK-94021`**, and an audio voice reads the token number aloud in Urdu.

---

### ACTION 7: Tracking a Complaint via Voice, Token or QR Code
1. Open [mobileApp/complaint_tracking.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/complaint_tracking.html) (or [webApp/track.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/track.html)).
2. **Voice Tracking:** Tap the microphone and say: *"میری شکایت پی کے 94021 کا کیا ہوا؟"*
3. **Manual Search:** Enter token `PK-94021` and tap **"تلاش کریں"**.
4. **Visual Progress Stepper:**
   - Step 1: `درج شدہ (Logged)` — Completed
   - Step 2: `معائنہ تفویض (Dispatched)` — Active (Assigned to *Tariq Mehmood*)
   - Step 3: `کام جاری (In Progress)` — Pending
   - Step 4: `حل شدہ (Resolved)` — Pending
5. Click **"سنیں (Listen Status)"** to hear the audio readout of the latest departmental notes.

---

### ACTION 8: Switching Roles in Mobile App (Citizen $\leftrightarrow$ Field Officer)
1. Open [mobileApp/user_management.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/user_management.html).
2. Scroll to the **Role Switcher** card.
3. Tap **"فیلڈ آپریشنز آفیسر (Field Operations Officer)"**.
4. **Dynamic Transformation:**
   - The user profile role updates in LocalStorage.
   - The bottom navigation dock automatically replaces the emergency hotline tab with the **"فیلڈ کام (Field Tasks)"** tab.
   - Tap **"فیلڈ کام"** to navigate directly to the assigned work orders dashboard.

---

### ACTION 9: Field Technician On-Site Inspection & Evidence Upload
1. Open [mobileApp/field_tasks.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/field_tasks.html).
2. Select work order **`PK-94021`** (Contaminated Water Pipeline in Mandra).
3. Click **"Play Complainant Voice Note"** to hear Muhammad Aslam's spoken audio note on-site.
4. Click **"Take Action"** to open [field_inspection.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/field_inspection.html).
5. **On-Site Execution:**
   - Tap **"GPS Lock"**: Coordinates `33.2541° N, 73.3082° E` lock in with green checkmark.
   - Tap **"Take Before Photo"**: Simulates capturing the damaged water main pooling on the road.
   - Complete repair work (pipe joint replaced).
   - Tap **"Take After Photo"**: Simulates capturing the restored road and repaired pipeline.
   - Have citizen Muhammad Aslam sign on the digital signature pad.
   - Tap **"Submit Resolution"**.
6. **System Update:** Complaint marks `RESOLVED`; closed timestamp is recorded; SMS and audio resolution notices are triggered for the citizen.

---

### ACTION 10: Handling Offline Queuing & Forcing Storage Synchronization
1. Put device into Airplane Mode or disconnect network.
2. File a complaint via [mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html).
3. Notice the top network badge updates to yellow: **`آف لائن (Offline Ready)`**.
4. The complaint is safely committed to the **IndexedDB / LocalStorage Outbox Queue**.
5. Open [mobileApp/offline_sync.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/offline_sync.html) to see the queued item waiting in the outbox.
6. Reconnect to Wi-Fi or mobile data.
7. Click the green button **"ابھی سنک کریں (Force Sync Now)"**.
8. **System Response:** The outbox queue sends a bulk POST request to `/api/sync`; the server acknowledges; the outbox clears; and local storage space is freed.

---

### ACTION 11: Real-Time Diagnostic Logging, Root-Cause Failure Diagnosis & Forensic Export
1. **Open Admin Logs Console:** Navigate to [webApp/admin/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/admin/index.html) and click the 6th navigation tab: **"Audit & Diagnostic Logs (آڈٹ و سیکیورٹی لاگز)"**.
2. **Review Live Telemetry Ribbon:**
   - **Total Log Events:** Displays in-memory ring buffer count (up to 300 client / 500 server).
   - **Error & Critical:** Tracks transient network errors, rate-limits, or fallback transitions.
   - **Security Audits:** Tracks record views, role switches, and profile changes.
   - **AI Router & Speech:** Tracks latency and model invocations.
3. **Filtering for Root-Cause Analysis:**
   - In the **Severity Dropdown**, select **"Error / Critical"**.
   - Review the filtered log list. For example, locate:  
     `[ERROR] [AI_ROUTER] Free API upstream HTTP 429 Rate Limit encountered. Routed to Local Deterministic Fallback Engine.`
   - Click **"View"** on the log row to open the full sanitized JSON payload showing:
     - Error code: `HTTP 429`
     - Upstream provider: `google-free`
     - Automatic mitigation: `Circuit breaker tripped; local deterministic regex returned in 12ms`
     - Citizen impact: `0 downtime; zero cost maintained`
4. **Exporting Logs for Municipal Audits:**
   - Click **"Export JSON"** to download `awami_logs_[timestamp].json`.
   - Click **"Export CSV"** to download an Excel-compatible spreadsheet of all system events.
5. **Simulating Error Capture:**
   - Click **"Simulate Error"** to test diagnostic capturing; verify that a new ERROR row pops up in the live table immediately without page reloading.

---

### ACTION 12: Citizen Data Privacy & PECA 2016 Protection Verification
1. **CNIC & Phone Number Masking:**
   - Open the **Triage Queue** tab in the Admin Console.
   - Look at the Citizen Reporter card for complaint `PK-94021`:
     - CNIC is strictly displayed as: `37405-*******-3` with a green **"PECA Masked"** badge.
     - Phone is displayed as: `0300-***9120`.
   - Open the **User & Staff Management** tab:
     - Verify that all citizens' CNIC and phone numbers are masked in the table.
2. **Cross-Site Scripting (XSS) Input Sanitization:**
   - In [webApp/register.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/register.html) or [mobileApp/user_management.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/user_management.html), input fields automatically strip malicious `<script>`, `<iframe>`, and event handlers via `AppSecurity.sanitize()`.
3. **Inactivity Session Guard:**
   - If an administrative workstation is left unattended for 15 minutes, the session watchdog engages to protect sensitive citizen records.
4. **Zero Commercial Data Leakage:**
   - No citizen voice recordings, full CNIC numbers, or contact details are ever passed to commercial paid AI providers.

---

### ACTION 13: Full-Screen Widescreen & Responsive Desktop/Mobile Layout Adjustment
1. **Full-Screen Web Application (`webApp/index.html`):**
   - Open on any desktop widescreen monitor (1080p, 2K, 4K).
   - Observe the interface smoothly expanding across the full screen width (`max-w-[1600px]`), eliminating empty blank side gutters.
   - The hero voice interface arranges into a balanced 12-column layout: an 8-column giant microphone interaction hub on the left/center paired with a 4-column live dialect telemetry and offline status bento panel on the right.
   - The key civic service gateways automatically expand into an expansive 4-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
2. **Responsive Mobile Application on Desktop (`mobileApp/index.html`):**
   - When opened in a desktop browser or tablet viewport, the application container expands smoothly up to `max-w-7xl` with 4-column responsive gateway action cards, preventing narrow column clipping while maintaining pure touch-friendly mobile ergonomics on mobile phones.

---

### ACTION 14: Pakistan National Monuments as Authentic Civic Gateway Icons
1. **Explore Civic Gateways with National Monuments:**
   - Open [webApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/index.html) or [mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html).
   - Observe that generic icons have been replaced by vector representations of Pakistan's prominent national monuments:
     - **Gateway 1 (Register Complaint):** Features **Minar-e-Pakistan (لاہور)** — representing public voice and civic resolution.
     - **Gateway 2 (Track Grievances):** Features **Pakistan Monument (اسلام آباد)** — representing national unity of all 4 provinces (Punjab, Sindh, KPK, Balochistan) and transparent governance.
     - **Gateway 3 (Healthcare & Rescue 1122):** Features **Faisal Mosque (اسلام آباد)** — representing peace, sanctuary, and emergency life-saving care.
     - **Gateway 4 (Subsidies & BISP):** Features **Mazar-e-Quaid (کراچی)** — representing Quaid-e-Azam's vision for social welfare, poverty alleviation, and public justice.
     - **Header Emblem:** Features the **Pakistan Monument Blooming Petal Crest** on both web and mobile headers.

---

### ACTION 15: Clean Voice Prompting ("Speak in English or Local Language")
1. **Observe the Unified Voice Instruction:**
   - In both Web and Mobile apps, the previous lengthy enumeration of local languages under the microphone has been replaced with the clean, direct instruction:
     - In English Version: **"Speak in English or Local Language"**
     - In Urdu Version: **"انگریزی یا اپنی مقامی زبان میں بولیں (Speak in English or Local Language)"**
2. **All 8 Regional Audio Accents Supported:**
   - While the user prompt is kept clean, the underlying Speech Engine and AI Router actively recognize:
     - **Urdu (`ur-PK`)**
     - **Punjabi (`pa-PK`)**
     - **Potohari (`poth-PK`)**
     - **Saraiki (`skr-PK`)**
     - **Hindko (`hnd-PK`)**
     - **Sindhi (`sd-PK`)**
     - **Pashto (`ps-PK`)**
     - **Balochi (`bal-PK`)**
     - **English (`en-US`)**
3. **Strict Two-Version Interface Policy:**
   - The user interface is strictly maintained in **two versions only**: **Urdu** and **English**, ensuring clean typography and zero visual clutter.

---

### ACTION 16: Admin Portal Sticky Non-Overlapping Layout Architecture
1. **Verify Responsive Layout in Admin Console:**
   - Open [webApp/admin/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/admin/index.html).
   - Resize the browser window to different laptop and tablet resolutions (e.g., 1024x768, 1280x800, 1920x1080).
   - Verify that the header navigation is sticky (`sticky top-0 z-50`), with responsive wrapping on tabs and metrics cards.
   - Verify that header tabs never collide with or obscure the Executive Metrics ribbon, Triage Queue, or Diagnostic Logs viewer.

---

### ACTION 17: Dedicated Bilingual Conversion Badge (EN ⇄ اردو) & Complete Chinese Glyph Elimination
1. **Visual Language Switcher Verification:**
   - Open [webApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/webApp/index.html) or [mobileApp/index.html](file:///c:/AI_Practice/AI_Civic_Solution/mobileApp/index.html).
   - Inspect the persistent top language toggle button:
     - Notice the badge explicitly displaying: `EN ⇄ اردو` / `اردو ⇄ EN`.
     - The Google Material Symbols `translate` icon (which rendered Chinese character `文A`) has been completely eliminated across all HTML pages, bento cards, user profiles, and recording monitors.
     - Clicking the badge converts the full page between Urdu and English with instant RTL $\leftrightarrow$ LTR bidirectional orientation shift.

---

### ACTION 18: Nationwide Coverage (All Pakistan Provinces & Territories)
1. **Verification of Nationwide Coverage:**
   - Open [shared/civic_data.js](file:///c:/AI_Practice/AI_Civic_Solution/shared/civic_data.js) or the Admin Portal.
   - Confirm coverage spans all 4 provinces and territories:
     - **Punjab:** Lahore, Rawalpindi, Faisalabad, Multan, Gujranwala, Bahawalpur, Sialkot.
     - **Sindh:** Karachi, Hyderabad, Sukkur, Larkana, Mirpur Khas.
     - **Khyber Pakhtunkhwa (KPK):** Peshawar, Mardan, Abbottabad, Swat, D.I. Khan.
     - **Balochistan:** Quetta, Gwadar, Turbat, Khuzdar, Sibi.
     - **Islamabad Capital Territory (ICT):** Islamabad, CDA municipal zones.
     - **Gilgit-Baltistan (GB) & Azad Jammu & Kashmir (AJK):** Gilgit, Skardu, Muzaffarabad, Mirpur.
   - Verified civic schemes include the National Pakistan Kisan Package, nationwide BISP 8171, and Sehat Sahulat Programme.

---

### ACTION 19: Automated GitHub Repository Synchronization
1. **Target GitHub Repository:** `https://github.com/cemehboob/AI_Civic_Solution.git`
2. **Execute Deployment Script:**
   - In Command Prompt: Run `.\push_to_github.bat`
   - In PowerShell: Run `.\push_to_github.ps1`
3. **Automated Steps Performed:**
   - Verifies Git installation.
   - Initializes local Git repository and points origin to `https://github.com/cemehboob/AI_Civic_Solution.git`.
   - Creates the `main` branch.
   - Stages all application files, designs, and documentation.
   - Commits with descriptive change metadata.
   - Pushes cleanly to GitHub (`origin/main`).

---

## 5. Standard Operating Procedures (SOPs) for Service Delivery

Under National and Provincial Public Services Charters (covering all provinces of Pakistan), municipal departments are bound by mandatory service resolution timelines:

| Department Code | Department Name | Grievance Category | Mandatory SLA Resolution Time | Escalation Officer |
| :--- | :--- | :--- | :--- | :--- |
| **PHED / WASA / KWSB** | Public Health / Water Supply | Main pipeline burst / Contaminated water | **24 to 48 Hours** | Executive Engineer (XEN) / Managing Director |
| **PHED / WSSP** | Public Health Engineering | Tube well motor burned out / Low pressure | **72 Hours** | Sub-Divisional Officer (SDO) / Municipal Engineer |
| **C&W / KMC / CDA** | Communication & Works / Roads | Major road crater / culvert structural damage | **48 to 72 Hours** | Executive Engineer (XEN) C&W Highways |
| **RWMC / SSWMB / WSSP** | Waste Management Companies | Dead animal / overflowing municipal waste dump | **12 to 24 Hours** | Senior Manager Operations |
| **DISCOs (IESCO/KE/QESCO/PESCO)** | Electric Power Distribution | Low-hanging high-voltage wire / sparking transformer | **6 to 12 Hours (EMERGENCY)** | Deputy Manager Operations / SDO Operations |

---

## 6. Technical Support & System Administrator Contacts

For operational emergencies, server restarts, or nationwide deployment inquiries:

- **National Project Lead:** Senior ICT4D Solution Architect & AI Lead  
- **Technical Support Email:** `support@awamivoice.gov.pk`  
- **Emergency Municipal Helpline:** `1122` (Rescue) / `051-9292555` (Civic Control Room)  
- **Server Deployment Directory:** `c:\AI_Practice\AI_Civic_Solution\`  
- **REST API Health Check:** `http://localhost:8000/api/health`  

---
*End of System Access Credentials & Operational Actions Reference Guide*
