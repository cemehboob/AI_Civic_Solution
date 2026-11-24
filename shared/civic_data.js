/**
 * Awami Voice Civic Solution - Verified Civic Knowledge Base & Datasets
 * Covers: Rawalpindi Division, Murree, Gujar Khan, Kahuta, Lahore Cantt
 * Verified Government Schemes, Healthcare Facilities, and Municipal Categories
 */

const CivicData = {
  // National Jurisdiction & Provincial Coverage (All Pakistan)
  country: "Pakistan / پاکستان",
  nationalScope: "National Public Services Portal (حکومتِ پاکستان)",
  verifiedDate: "2026-11-24",

  // Complete Provincial & Territorial Coverage of Pakistan
  provinces: [
    {
      id: "punjab",
      nameUrdu: "پنجاب",
      nameEnglish: "Punjab",
      majorCities: ["Lahore", "Rawalpindi", "Faisalabad", "Multan", "Gujranwala", "Bahawalpur", "Sargodha", "Sialkot"],
      municipalBodies: ["PHED Punjab", "C&W Punjab", "LWMC / RWMC", "LESCO / IESCO / FESCO / MEPCO / GEPCO"]
    },
    {
      id: "sindh",
      nameUrdu: "سندھ",
      nameEnglish: "Sindh",
      majorCities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", "Nawabshah"],
      municipalBodies: ["KWSB (Karachi Water & Sewerage)", "SSWMB (Sindh Solid Waste)", "Works & Services Sindh", "K-Electric / HESCO / SEPCO"]
    },
    {
      id: "kpk",
      nameUrdu: "خیبر پختونخوا",
      nameEnglish: "Khyber Pakhtunkhwa",
      majorCities: ["Peshawar", "Mardan", "Abbottabad", "Swat", "D.I. Khan", "Bannu", "Kohat"],
      municipalBodies: ["WSSP (Water & Sanitation Peshawar)", "C&W KP", "PESCO"]
    },
    {
      id: "balochistan",
      nameUrdu: "بلوچستان",
      nameEnglish: "Balochistan",
      majorCities: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi", "Ziarat", "Chaman"],
      municipalBodies: ["WASA Quetta", "B&R Balochistan", "QESCO", "Quetta Municipal Corp"]
    },
    {
      id: "ict",
      nameUrdu: "وفاقی دارالحکومت اسلام آباد",
      nameEnglish: "Islamabad Capital Territory",
      majorCities: ["Islamabad"],
      municipalBodies: ["CDA (Capital Development Authority)", "MCI (Metropolitan Corp Islamabad)", "IESCO"]
    },
    {
      id: "gb",
      nameUrdu: "گلگت بلتستان",
      nameEnglish: "Gilgit-Baltistan",
      majorCities: ["Gilgit", "Skardu", "Hunza", "Chilas"],
      municipalBodies: ["Works & Power GB", "Local Government GB"]
    },
    {
      id: "ajk",
      nameUrdu: "آزاد جموں و کشمیر",
      nameEnglish: "Azad Jammu & Kashmir",
      majorCities: ["Muzaffarabad", "Mirpur", "Rawalakot", "Kotli"],
      municipalBodies: ["LG&RDD AJK", "Public Works Dept AJK"]
    }
  ],

  // Supported Languages & Regional Audio Accents (Interfaces strictly in 2 versions: Urdu and English)
  supportedLanguages: [
    { code: "ur-PK", label: "اردو (Urdu)", native: "اردو", script: "rtl", region: "National / پنجاب" },
    { code: "pa-PK", label: "پنجابی (Punjabi)", native: "پنجابی", script: "rtl", region: "Punjab Central & North" },
    { code: "poth-PK", label: "پوٹھوہاری (Potohari)", native: "پوٹھوہاری", script: "rtl", region: "Rawalpindi / Pothohar" },
    { code: "skr-PK", label: "سرائیکی (Saraiki)", native: "سرائیکی", script: "rtl", region: "South Punjab (Multan, Bahawalpur, D.G. Khan)" },
    { code: "hnd-PK", label: "ہندکو (Hindko)", native: "ہندکو", script: "rtl", region: "Attock, Hazara & Rawalpindi Border" },
    { code: "sd-PK", label: "سنڌي (Sindhi)", native: "سنڌي", script: "rtl", region: "Sindh & Southern Border" },
    { code: "ps-PK", label: "پښتو (Pashto)", native: "پښتو", script: "rtl", region: "Khyber Pakhtunkhwa & Northern Border" },
    { code: "bal-PK", label: "بلوچی (Balochi)", native: "بلوچی", script: "rtl", region: "Balochistan & Western Border" },
    { code: "en-US", label: "English", native: "English", script: "ltr", region: "Official / Administrative" }
  ],

  // Pakistan National Monuments Metadata & Emblem Mapping
  nationalMonuments: [
    {
      id: "pakistan_monument",
      nameUrdu: "پاکستان مانومنٹ (اسلام آباد)",
      nameEnglish: "Pakistan Monument (Islamabad)",
      significance: "National Unity of all 4 Provinces & Territories",
      gateway: "gw_track"
    },
    {
      id: "minar_e_pakistan",
      nameUrdu: "مینارِ پاکستان (لاہور)",
      nameEnglish: "Minar-e-Pakistan (Lahore)",
      significance: "Symbol of Public Voice & Civic Grievances",
      gateway: "gw_complaint"
    },
    {
      id: "faisal_mosque",
      nameUrdu: "فیصل مسجد (اسلام آباد)",
      nameEnglish: "Faisal Mosque (Islamabad)",
      significance: "National Landmark of Peace, Healing & Healthcare",
      gateway: "gw_health"
    },
    {
      id: "mazar_e_quaid",
      nameUrdu: "مزارِ قائد (کراچی)",
      nameEnglish: "Mazar-e-Quaid (Karachi)",
      significance: "Father of Nation, Social Justice & Welfare",
      gateway: "gw_subsidy"
    },
    {
      id: "bab_e_khyber",
      nameUrdu: "بابِ خیبر (خیبر پختونخوا)",
      nameEnglish: "Bab-e-Khyber (Khyber Pass)",
      significance: "Historic Gateway of Infrastructure & Public Works",
      gateway: "gw_infrastructure"
    },
    {
      id: "ziarat_residency",
      nameUrdu: "زیارت ریزیڈنسی (بلوچستان)",
      nameEnglish: "Ziarat Residency (Balochistan)",
      significance: "National Heritage & Quaid's Historic Sanctuary",
      gateway: "gw_welfare"
    }
  ],

  // Municipal Complaint Categories
  categories: [
    {
      id: "water_supply",
      nameUrdu: "پانی اور واٹر فلٹریشن پلانٹ",
      namePunjabi: "پانی تے فلٹریشن پلانٹ",
      namePotohari: "پانی نی سپلائی تے فلٹر",
      nameSaraiki: "پاݨی تے واٹر فلٹر نلکے",
      nameHindko: "پاݨی تے فلٹریشن پلانٹ",
      nameEnglish: "Water Supply & Filtration Plants",
      icon: "water_drop",
      department: "Public Health Engineering Department (PHED) / پبلک ہیلتھ انجینئرنگ",
      slaHours: 24,
      examples: [
        "پینے کا پانی بند ہے",
        "ساڈے پنڈ وچ فلٹریشن پلانٹ بند اے",
        "اساڈے وستی وچ پاݨی دی نلکی ترٹ ڳئی ہے",
        "محلے چ پاݨی نئیں آندا تے نالی بند اے"
      ]
    },
    {
      id: "roads_infrastructure",
      nameUrdu: "سڑکیں، گلیاں اور پختگی",
      namePunjabi: "سڑکاں تے گلیاں دی مرمت",
      namePotohari: "سڑکاں تے رابطہ پلیاں",
      nameSaraiki: "سڑکاں، گلیاں تے پکے رستے",
      nameHindko: "سڑکاں تے گلیاں دی ٹٹ پھٹ",
      nameEnglish: "Roads, Streets & Potholes",
      icon: "add_road",
      department: "Communication & Works (C&W) / لوکل گورنمنٹ و کمیونیکیشن",
      slaHours: 72,
      examples: [
        "گاؤں کی رابطہ سڑک ٹوٹ پھوٹ کا شکار ہے",
        "سڑک اُتے وڈے کھڈے نیں، گڈی اُلٹݨ دا خطرہ اے",
        "اساڈی وستی دا رستہ ترٹ ڳیا ہے",
        "سڑک ساری خراب اے، کھڈے بھرے جاون"
      ]
    },
    {
      id: "sanitation_waste",
      nameUrdu: "صفائی ستھرائی اور کوڑا کرکٹ",
      namePunjabi: "صفائی تے کوڑا چُکنا",
      namePotohari: "صفائی تے گندگی صفائی",
      nameSaraiki: "صفائی، گندگی تے کوڑا کرکٹ",
      nameHindko: "صفائی ستھرائی تے کوڑا",
      nameEnglish: "Sanitation & Solid Waste Management",
      icon: "cleaning_services",
      department: "Rawalpindi Waste Management Company (RWMC) / بلدیات",
      slaHours: 12,
      examples: [
        "گلی میں کوڑے کے ڈھیر لگے ہیں بدبو آ رہی ہے",
        "نالی بند ہو گئی ہے اور گندا پانی گلی میں بہہ رہا ہے",
        "کوڑا چُکن آلا عملہ نئیں آندا",
        "نالیاں دی صفائی نئیں تھیندی پئی"
      ]
    },
    {
      id: "electricity_lighting",
      nameUrdu: "بجلی، لٹکتے تار اور اسٹریٹ لائٹس",
      namePunjabi: "بجلی دے تار تے کھمبے",
      namePotohari: "بجلی نے تار تے ٹرانسفارمر",
      nameSaraiki: "بجلی دے لٹکدے تاراں تے کھمبے",
      nameHindko: "بجلی دیاں تاراں تے لائیٹاں",
      nameEnglish: "Electricity Hazards & Street Lights",
      icon: "bolt",
      department: "IESCO / آئیسکو اور میونسپل کارپوریشن",
      slaHours: 12,
      examples: [
        "بجلی کے لٹکتے ننگے تار زمین کے قریب ہیں خطرہ ہے",
        "ٹرانسفارمر سڑ گیا اے چار دیہاڑیاں توں بجلی نئیں",
        "تاراں نال اگ لگن دا ڈر ہے",
        "اساڈے کھمبے دی لائیٹ خراب اے"
      ]
    },
    {
      id: "public_health_bhu",
      nameUrdu: "بنیادی مرکز صحت (بی ایچ یو) کی شکایات",
      namePunjabi: "ہسپتال تے ڈاکٹر دی شکایت",
      namePotohari: "ہسپتال، دوائیاں تے ڈاکٹر",
      nameSaraiki: "ہسپتال، ڈاکٹر تے مفت دوائیاں",
      nameHindko: "ہسپتال تے ڈاکٹراں دی شکایت",
      nameEnglish: "Basic Health Unit (BHU) Concerns",
      icon: "local_hospital",
      department: "District Health Authority (DHA) / محکمہ صحت",
      slaHours: 24,
      examples: [
        "بی ایچ یو میں ڈاکٹر یا ڈسپنسر موجود نہیں ہے",
        "ہسپتال وچ دوائی نئیں ملدی پئی",
        "ڈاکٹر ویلے تے نئیں آندا",
        "اساڈے بی ایچ یو وچ ایمبولینس کائنی"
      ]
    }
  ],

  // Verified Healthcare Facilities (BHUs, RHCs, DHQ, Emergency)
  hospitals: [
    {
      id: "bhu_chak18",
      nameUrdu: "بنیادی مرکز صحت چک نمبر 18",
      nameEnglish: "Basic Health Unit (BHU) Chak 18",
      tehsil: "Gujar Khan / گوجر خان",
      district: "Rawalpindi / راولپنڈی",
      type: "Basic Health Unit (BHU)",
      emergencyAvailable: true,
      ambulance: true,
      phone: "051-3561280",
      operatingHoursUrdu: "صبح 8 بجے تا دوپہر 2 بجے (ایمرجنسی 24 گھنٹے)",
      operatingHoursEnglish: "8:00 AM - 2:00 PM (Emergency 24/7)",
      doctorsUrdu: "میڈیکل آفیسر اور لیڈی ہیلتھ ورکر موجود",
      doctorsEnglish: "Medical Officer (Dr. Salman) & Lady Health Visitor (LHV)",
      services: ["مفت ادویات", "زچہ و بچہ نگہداشت", "پولیو و حفاظتی ٹیکے", "ابتدائی طبی امداد"],
      distanceKm: 2.4,
      verifiedSource: "Ministry of National Health Services & Provincial Health Dept",
      verificationDate: "2026-11-15"
    },
    {
      id: "rhc_mandra",
      nameUrdu: "دیہی مرکز صحت ماندرہ",
      nameEnglish: "Rural Health Center (RHC) Mandra",
      tehsil: "Gujar Khan / گوجر خان",
      district: "Rawalpindi / راولپنڈی",
      type: "Rural Health Center (RHC)",
      emergencyAvailable: true,
      ambulance: true,
      phone: "051-3591410",
      operatingHoursUrdu: "24 گھنٹے ایمرجنسی و وارڈ",
      operatingHoursEnglish: "24/7 Emergency & General Ward",
      doctorsUrdu: "سینئر ڈاکٹر، زچگی کا عملہ، لیب ٹیکنیشن",
      doctorsEnglish: "Senior Medical Officers, Gynecologist, Laboratory",
      services: ["24 گھنٹے ایمرجنسی", "الٹراساؤنڈ", "خون ٹیسٹ", "ایمبولینس 1122 سٹیشن"],
      distanceKm: 8.6,
      verifiedSource: "Government of Pakistan National Health Portal",
      verificationDate: "2026-11-18"
    },
    {
      id: "thq_gujarkhan",
      nameUrdu: "تحصیل ہیڈ کوارٹر ہسپتال گوجر خان",
      nameEnglish: "Tehsil Headquarters (THQ) Hospital Gujar Khan",
      tehsil: "Gujar Khan / گوجر خان",
      district: "Rawalpindi / راولپنڈی",
      type: "THQ Hospital",
      emergencyAvailable: true,
      ambulance: true,
      phone: "051-3510222",
      operatingHoursUrdu: "24 گھنٹے او پی ڈی و ایمرجنسی",
      operatingHoursEnglish: "24/7 Emergency, Trauma & Specialist OPD",
      doctorsUrdu: "سرجن، چائلڈ سپیشلسٹ، گائناکالوجسٹ اور فزیشن",
      doctorsEnglish: "Consultants, Pediatrician, Trauma Surgeons",
      services: ["ڈائیلاسز سنٹر", "صحت کارڈ انڈور علاج", "ایکسرے و سی ٹی سکین", "ریسکیو 1122 ڈیسک"],
      distanceKm: 14.2,
      verifiedSource: "DHA Rawalpindi Official Records",
      verificationDate: "2026-11-10"
    },
    {
      id: "dhq_rawalpindi",
      nameUrdu: "ڈسٹرکٹ ہیڈ کوارٹرز (DHQ) ہسپتال راولپنڈی",
      nameEnglish: "District Headquarters (DHQ) Hospital Rawalpindi",
      tehsil: "Rawalpindi City / راولپنڈی",
      district: "Rawalpindi / راولپنڈی",
      type: "Tertiary DHQ Hospital",
      emergencyAvailable: true,
      ambulance: true,
      phone: "051-9270034",
      operatingHoursUrdu: "24 گھنٹے شعبہ حادثات و ٹراما",
      operatingHoursEnglish: "24/7 Full Tertiary Trauma Center",
      doctorsUrdu: "تمام شعبہ جات کے پروفیسر و سپیشلسٹ ڈاکٹرز",
      doctorsEnglish: "All Medical & Surgical Specialties",
      services: ["مفت او پی ڈی", "صحت کارڈ مفت داخلہ", "آئی سی یو و وینٹی لیٹر", "ایمرجنسی برن یونٹ"],
      distanceKm: 32.0,
      verifiedSource: "Rawalpindi Medical University Health Directorate",
      verificationDate: "2026-11-01"
    }
  ],

  // Emergency Hotlines (Verified Pakistan Public Hotlines)
  hotlines: [
    {
      code: "1122",
      nameUrdu: "پنجاب ایمرجنسی سروس (ریسکیو 1122)",
      nameEnglish: "Rescue 1122 Emergency Ambulance & Fire",
      category: "Ambulance / Fire / Disaster",
      tollFree: true,
      descriptionUrdu: "کسی بھی حادثے، آگ لگنے، ڈوبنے یا شدید بیماری میں مفت ایمبولینس کیلئے فوراً 1122 ملائیں۔"
    },
    {
      code: "1033",
      nameUrdu: "قومی صحت ہیلپ لائن (1033)",
      nameEnglish: "National Sehat Health Helpline 1033",
      category: "Medical Advice & Health Info",
      tollFree: true,
      descriptionUrdu: "طبی مشورے، حفاظتی ٹیکہ جات، پولیو اور بنیادی مراکز صحت کے متعلق معلومات کیلئے کال کریں۔"
    },
    {
      code: "15",
      nameUrdu: "پولیس ایمرجنسی مددگار (15)",
      nameEnglish: "Police Madadgar 15",
      category: "Police & Security",
      tollFree: true,
      descriptionUrdu: "کسی بھی جرم، ہنگامی صورتحال، چوری یا جھگڑے کی فوری پولیس رپورٹ کیلئے 15 ڈائل کریں۔"
    },
    {
      code: "8171",
      nameUrdu: "بینظیر انکم سپورٹ / احساس ہیلپ لائن (8171)",
      nameEnglish: "BISP & Ehsaas SMS / Helpline 8171",
      category: "Welfare & Subsidies",
      tollFree: true,
      descriptionUrdu: "اپنا شناختی کارڈ نمبر لکھ کر 8171 پر میسج بھیج کر بینظیر کفالت وظیفہ کی اہلیت چیک کریں۔"
    }
  ],

  // Verified Government Welfare & Subsidy Schemes
  subsidies: [
    {
      id: "bisp_kafalat",
      nameUrdu: "بینظیر کفالت پروگرام (BISP Kafalat)",
      nameEnglish: "Benazir Kafaalat Quarterly Cash Transfer",
      authority: "Benazir Income Support Programme / وفاقی حکومت",
      amountUrdu: "10,500 روپے فی سہ ماہی (ہر 3 ماہ بعد)",
      amountEnglish: "PKR 10,500 per quarter",
      eligibilityUrdu: "غریب اور نادار خواتین جن کا پی ایم ٹی (PMT) سکور 32 یا اس سے کم ہو۔ شناختی کارڈ نادرا سے تصدیق شدہ ہو۔",
      eligibilityEnglish: "Poor/deserving women with PMT score <= 32 on NSER registry, valid NADRA CNIC",
      procedureUrdu: "قریبی بینظیر تحصیل آفس میں جاکر مفت این ایس ای آر (NSER) ڈائنامک رجسٹری سروے کروائیں۔ اپنی سم اپنے شناختی کارڈ پر رجسٹرڈ ہونی چاہیے۔",
      howToCheckUrdu: "اپنا 13 ہندسوں کا شناختی کارڈ نمبر بغیر ڈیش کے 8171 پر ایس ایم ایس بھیجیں۔",
      requiredDocsUrdu: ["اصل قومی شناختی کارڈ", "بچوں کا نادرا بے فارم (تعلیمی وظائف کیلئے)", "رجسٹرڈ موبائل سم"],
      officialUrl: "https://bisp.gov.pk",
      verifiedDate: "2026-11-20",
      status: "Active / جاری ہے"
    },
    {
      id: "pakistan_kisan_package",
      nameUrdu: "قومی کسان ریلیف و زرعی پیکج (Pakistan National Kisan Package)",
      nameEnglish: "Pakistan National Kisan Agricultural Support Package",
      authority: "وزارتِ قومی تحفظ خوراک و زراعت (Ministry of National Food Security & Research)",
      amountUrdu: "کھاد پر 1500 روپے فی بوری سبسڈی، مفت بیج اور بغیر سود زرعی قرضہ جات",
      amountEnglish: "Fertilizer subsidy PKR 1,500/bag, certified seeds, zero-interest crop credit",
      eligibilityUrdu: "تمام صوبوں کے کسان جن کی ملکیتی یا کاشت شدہ زرعی اراضی 12.5 ایکڑ تک ہو۔",
      eligibilityEnglish: "Smallholders cultivating up to 12.5 acres across all provinces & territories",
      procedureUrdu: "قریبی زرعی دفتر یا بینک آف پنجاب / زرعی ترقیاتی بینک برانچ وزٹ کریں۔",
      requiredDocsUrdu: ["شناختی کارڈ", "زمین کی فرد ملکیت یا لینڈ ریکارڈ", "موبائل سم"],
      officialUrl: "https://mnfsr.gov.pk",
      verifiedDate: "2026-11-20",
      status: "Active / جاری ہے"
    },
    {
      id: "sehat_sahulat_card",
      nameUrdu: "قومی صحت کارڈ / صحت سہولت پروگرام",
      nameEnglish: "Sehat Sahulat Programme (Sehat Card)",
      authority: "وزارتِ صحت و صوبائی محکمہ جاتِ صحت (Govt of Pakistan Health)",
      amountUrdu: "فی خاندان سالانہ 10 لاکھ روپے تک مفت انڈور ہسپتال علاج",
      amountEnglish: "Up to PKR 1,000,000 inpatient coverage per family per year",
      eligibilityUrdu: "پاکستان کے مستقل رہائشی خاندان جن کا نادرا ریکارڈ مکمل ہو۔ نادرا ریکارڈ میں فیملی ہیڈ رجسٹرڈ ہو۔",
      eligibilityEnglish: "Permanent residents of Pakistan registered with family in NADRA database",
      procedureUrdu: "کسی بھی نامزد سرکاری یا نجی ایمپینلڈ ہسپتال میں اصل شناختی کارڈ دکھا کر داخلہ لیں۔",
      howToCheckUrdu: "اپنا شناختی کارڈ نمبر لکھ کر 8500 پر ایس ایم ایس کریں۔",
      requiredDocsUrdu: ["اصل قومی شناختی کارڈ (CNIC)", "بچوں کا بے فارم"],
      officialUrl: "https://pmhealthprogram.gov.pk",
      verifiedDate: "2026-11-15",
      status: "Active / جاری ہے"
    },
    {
      id: "bisp_taleemi_wazaif",
      nameUrdu: "بینظیر تعلیمی وظائف (سکول جانے والے بچوں کیلئے)",
      nameEnglish: "Benazir Taleemi Wazaif for School Children",
      authority: "بینظیر انکم سپورٹ پروگرام (BISP)",
      amountUrdu: "پرائمری تا ہائر سیکنڈری: لڑکوں کو 1500 تا 4000، لڑکیوں کو 2000 تا 4500 روپے فی سہ ماہی",
      amountEnglish: "PKR 1,500 - 4,500 quarterly with higher stipend for girl students",
      eligibilityUrdu: "بینظیر کفالت کی فعال مستفید خاتون کے بچے، سکول میں کم از کم 70 فیصد حاضری لازمی ہے۔",
      eligibilityEnglish: "Children of active BISP beneficiaries with >= 70% school attendance",
      procedureUrdu: "سکول کا داخلہ فارم اور نادرا بے فارم لے کر قریبی BISP تحصیل دفتر جمع کروائیں۔",
      officialUrl: "https://bisp.gov.pk",
      verifiedDate: "2026-11-10",
      status: "Active / جاری ہے"
    }
  ],

  // Initial Seed Complaints in System
  initialComplaints: [
    {
      id: "PK-94021",
      token: "PK-94021",
      category: "water_supply",
      titleUrdu: "فلٹریشن پلانٹ کی موٹر جل جانا اور گندا پانی",
      titleEnglish: "Water Filtration Motor Failure & Contaminated Water",
      complainantName: "محمد افضل (Muhammad Afzal)",
      cnic: "37405-1849201-3",
      phone: "0300-5849120",
      location: "چک نمبر 18 ماندرہ، تحصیل گوجر خان، ضلع راولپنڈی",
      coordinates: { lat: 33.2641, lng: 73.2392 },
      status: "dispatched", // pending_triage, dispatched, in_progress, resolved
      statusUrdu: "ٹیم جائے وقوعہ پر روانہ (Dispatched)",
      statusColor: "amber",
      assignedTeam: "SDO Gujar Khan Team 2 (Engr. Asim / اسسٹنٹ انجینئر عاصم)",
      filedAt: "2026-11-23 09:15",
      slaHours: 24,
      slaRemaining: "3h 15m remaining",
      audioNote: "ہمارے گاؤں چک 18 میں پینے کے پانی کا فلٹر پچھلے دو ہفتے سے بند ہے، گندا پانی آ رہا ہے",
      audioDurationSec: 14,
      hasVoiceRecording: true,
      dialect: "Potohari Punjabi / پوٹھوہاری",
      timeline: [
        { time: "09:15 AM", stepUrdu: "شکایت درج ہوئی بذریعہ صوتی کال", stepEnglish: "Voice Complaint Captured", done: true },
        { time: "09:40 AM", stepUrdu: "اے آئی ٹرائیاج و اسسٹنٹ کمشنر دفتر تصدیق", stepEnglish: "AI Triaged & Verified by AC Office", done: true },
        { time: "11:20 AM", stepUrdu: "فیلڈ ٹیم چک 18 روانہ (SDO PHED)", stepEnglish: "Field Dispatch Initiated", done: true },
        { time: "02:30 PM", stepUrdu: "مرمت و معائنہ جاری", stepEnglish: "On-site Motor Replacement in Progress", done: false }
      ]
    },
    {
      id: "PK-7821",
      token: "PK-7821",
      category: "roads_infrastructure",
      titleUrdu: "ماندرہ چک بیلی روڈ پر گہرے کھڈے اور حادثات",
      titleEnglish: "Deep Potholes and Asphalt Cracking on Mandra-Chak Beli Road",
      complainantName: "چوہدری بشیر احمد (Ch. Bashir Ahmad)",
      cnic: "37405-9921443-1",
      phone: "0302-8419200",
      location: "کلو موڑ، ماندرہ روڈ، تحصیل گوجر خان",
      coordinates: { lat: 33.2891, lng: 73.2104 },
      status: "in_progress",
      statusUrdu: "مرمت جاری ہے (In Progress)",
      statusColor: "amber",
      assignedTeam: "C&W Machinery Unit 4 (سپروائزر ندیم)",
      filedAt: "2026-11-22 14:30",
      slaHours: 72,
      slaRemaining: "28h remaining",
      audioNote: "کھیتوں کی رابطہ سڑک اور موڑ پر گہرے کھڈے ہیں، بارش کا پانی کھڑا رہتا ہے",
      audioDurationSec: 18,
      hasVoiceRecording: true,
      dialect: "Urdu / Punjabi Mix",
      timeline: [
        { time: "22 Nov, 02:30 PM", stepUrdu: "شکایت درج بذریعہ ویب پورٹل مائیک", stepEnglish: "Complaint Registered via Voice", done: true },
        { time: "22 Nov, 04:00 PM", stepUrdu: "محکمہ مواصلات و تعمیرات کو تفویض", stepEnglish: "Assigned to C&W Roads Dept", done: true },
        { time: "23 Nov, 10:00 AM", stepUrdu: "اسفالٹ پیچ ورک اور بجری ٹیم موقع پر", stepEnglish: "Road Resurfacing Team on Ground", done: true },
        { time: "متوقع شام", stepUrdu: "حتمی جانچ و تکمیل", stepEnglish: "Final Inspection & Sign-off", done: false }
      ]
    },
    {
      id: "PK-6310",
      token: "PK-6310",
      category: "sanitation_waste",
      titleUrdu: "گاؤں روات کے نالے کی بندش اور گندگی",
      titleEnglish: "Main Drainage Blockage & Waste Dump in Rawat",
      complainantName: "غلام مصطفیٰ (Ghulam Mustafa)",
      cnic: "37406-3819203-9",
      phone: "0333-5182931",
      location: "وارڈ نمبر 3، نزد جامع مسجد، روات، راولپنڈی",
      coordinates: { lat: 33.5122, lng: 73.1894 },
      status: "resolved",
      statusUrdu: "مکمل حل شدہ (Resolved)",
      statusColor: "green",
      assignedTeam: "RWMC Sanitation Unit 7",
      filedAt: "2026-11-21 08:00",
      slaHours: 24,
      slaRemaining: "Resolved in 11 hours",
      audioNote: "نالی بند ہے پانی گلیوں میں آ رہا ہے، مہربانی کر کے مشین بھیجیں",
      audioDurationSec: 10,
      hasVoiceRecording: true,
      dialect: "Urdu",
      timeline: [
        { time: "21 Nov, 08:00 AM", stepUrdu: "صوتی شکایت درج ہوئی", stepEnglish: "Voice Complaint Captured", done: true },
        { time: "21 Nov, 09:15 AM", stepUrdu: "سینیٹری انسپکٹر تفویض", stepEnglish: "Sanitary Inspector Assigned", done: true },
        { time: "21 Nov, 02:00 PM", stepUrdu: "نالے کی صفائی مکمل اور جراثیم کش سپرے", stepEnglish: "Drain Cleared & Disinfected", done: true },
        { time: "21 Nov, 07:00 PM", stepUrdu: "شہری سے فون پر تصدیق اور کیس بند", stepEnglish: "Citizen Confirmed via Phone Call", done: true }
      ]
    },
    {
      id: "PK-5219",
      token: "PK-5219",
      category: "electricity_lighting",
      titleUrdu: "گاؤں کہوٹہ میں بجلی کے لٹکتے تاروں کا خطرہ",
      titleEnglish: "Hanging Low-Tension Power Cables in Kahuta Village",
      complainantName: "ارشد محمود (Arshad Mehmood)",
      cnic: "37403-8821033-5",
      phone: "0345-5912830",
      location: "ڈھوک کلیاں، تحصیل کہوٹہ، ضلع راولپنڈی",
      coordinates: { lat: 33.5901, lng: 73.3892 },
      status: "pending_triage",
      statusUrdu: "جائزہ زیر التواء (Pending Review)",
      statusColor: "red",
      assignedTeam: "Unassigned (IESCO Sub-Division Kahuta)",
      filedAt: "2026-11-23 11:45",
      slaHours: 12,
      slaRemaining: "1h 45m remaining (CRITICAL SLA)",
      audioNote: "بجلی کے تار زمین سے صرف 5 فٹ اوپر لٹک رہے ہیں، ٹریکٹر گزرنے پر آگ لگی تھی",
      audioDurationSec: 16,
      hasVoiceRecording: true,
      dialect: "Potohari Punjabi",
      timeline: [
        { time: "11:45 AM", stepUrdu: "شکایت موصول بذریعہ عوامی آواز ایپ", stepEnglish: "Voice Complaint Received", done: true },
        { time: "12:00 PM", stepUrdu: "اے آئی روٹر نے ہنگامی کیٹیگری مارک کی", stepEnglish: "Flagged High Severity Hazard", done: true },
        { time: "زیر التواء", stepUrdu: "آئیسکو لائن مین روانگی کی منظوری درکار", stepEnglish: "Awaiting Dispatch Approval", done: false }
      ]
    }
  ],

  // Administrative Field Teams
  fieldTeams: [
    {
      id: "team_gkj_phed",
      nameUrdu: "پی ایچ ای ڈی واٹر ٹیم 2 گوجر خان",
      nameEnglish: "PHED Water Engineering Team 2 (Gujar Khan)",
      leader: "Engr. Asim Raza (اسسٹنٹ انجینئر عاصم رضا)",
      phone: "0301-5918234",
      tehsil: "Gujar Khan",
      activeTasks: 2,
      status: "On Ground (موقع پر موجود)"
    },
    {
      id: "team_cw_roads",
      nameUrdu: "کمیونیکیشن و روڈز یونٹ 4 راولپنڈی",
      nameEnglish: "C&W Highway Repair Unit 4 (Rawalpindi)",
      leader: "Supervisor Nadeem (سپروائزر ندیم چوہدری)",
      phone: "0312-5819022",
      tehsil: "Rawalpindi Rural",
      activeTasks: 1,
      status: "Active (روانہ)"
    },
    {
      id: "team_murree_phed",
      nameUrdu: "مری سینیٹیشن و کوہسار ریپڈ ٹیم",
      nameEnglish: "Murree Sanitation & Rapid Team",
      leader: "Inspector Kamran (انسپکٹر کامران عباسی)",
      phone: "0333-5198201",
      tehsil: "Murree",
      activeTasks: 0,
      status: "Available (دستیاب)"
    },
    {
      id: "team_kahuta_iesco",
      nameUrdu: "کہوٹہ ایمرجنسی لائن اسکواڈ (آئیسکو)",
      nameEnglish: "IESCO Kahuta Emergency Squad",
      leader: "Line Superintendent Zahid (ایل ایس زاہد کیانی)",
      phone: "0345-5100912",
      tehsil: "Kahuta",
      activeTasks: 3,
      status: "Busy (مصروف)"
    }
  ],

  // Dual-Language UI Dictionaries (Urdu & English) - Comprehensive Full-Page Localization
  i18n: {
    ur: {
      govTitle: "حکومتِ پاکستان - لوکل گورنمنٹ و قومی ای گورننس نظام",
      portalName: "عوامی آواز | Awami Voice",
      portalSubtitle: "قومی عوامی شکایات و صوتی رہنمائی پورٹل (All Pakistan)",
      navHome: "مرکزی صفحہ (Home)",
      navRegister: "شکایت درج کروائیں (Register)",
      navTrack: "شکایات کا حال (Track)",
      navHealthcare: "ہسپتال و صحت (Healthcare)",
      navSubsidies: "امداد و وظائف (Subsidies)",
      audioGuide: "آواز رہنمائی (Audio Guide)",
      adminLogin: "ایڈمن پورٹل (Admin Portal)",
      viewMobile: "موبائل ایپ دیکھیں",
      speakBtn: "بولیں",
      listenBtn: "سنیں",
      tabHome: "مرکزی",
      tabTrack: "ٹریکنگ",
      tabEmergency: "1122 مدد",
      tabFieldTasks: "فیلڈ کام",
      tabProfile: "پروفائل",
      onlineBadge: "آن لائن (Online)",
      offlineBadge: "آف لائن ریکارڈنگ میسر ہے (Offline Ready)",
      offlineSub: "انٹرنیٹ کمزور ہو تو بھی آواز محفوظ ہوگی",
      langSwitchLabel: "English",
      welcomeNarration: "خوش آمدید! عوامی آواز حکومتِ پاکستان پورٹل میں آپ کا استقبال ہے۔ آپ بغیر لکھے اپنا مسئلہ اردو، پنجابی، سندھی، پشتو، بلوچی، سرائیکی یا ہندکو میں بول کر بتا سکتے ہیں۔ نیچے مائیک بٹن دبائیں اور کھل کر بات کریں۔",
      
      // Hero & Voice Section
      heroBadge: "قومی صوتی شکایات و رہنمائی پورٹل (حکومتِ پاکستان)",
      heroHeadline: "مائیک دبائیں اور بلا جھجھک اپنی زبان میں بتائیں",
      heroSub: "انگریزی یا اپنی مقامی زبان میں اپنا مسئلہ بولیں۔ لکھائی کی ضرورت نہیں۔ (Speak in English or Local Language)",
      micInstruction: "مائیک دبائیں اور بولیں",
      micDialectsList: "Speak in English or Local Language (انگریزی یا اپنی مقامی زبان میں بولیں)",
      micPressToSpeak: "بولیں",
      soundWaveListening: "سسٹم آپ کی آواز سن رہا ہے...",
      
      // Welcome card in MobileApp
      welcomeBadge: "آسان رہنمائی • قومی یادگاریں",
      welcomeTitle: "بولیں اور کام کروائیں!",
      welcomeDesc: "لکھنے کی ضرورت نہیں، بس مائیک بٹن دبا کر انگریزی یا اپنی مقامی زبان میں مسئلہ بتائیں۔",
      welcomeAudioBtn: "آواز سنیں",
      
      // Quick Spoken Suggestions (Supporting All Regional Accents)
      chipsTitle: "عام بولے جانے والے فقرے (فوری مدد کیلئے کسی پر کلک کریں):",
      chipsMobileTitle: "یا ان میں سے کسی پر انگلی رکھیں:",
      chipRoad: "\"کھیتوں کی سڑک ٹوٹی ہوئی ہے\"",
      chipHospital: "\"قریبی سرکاری ہسپتال کہاں ہے؟\"",
      chipBisp: "\"بے نظیر انکم سپورٹ رقم\"",
      chipSaraiki: "\"پاݨی دی نلکی ترٹ ڳئی اے (سرائیکی)\"",
      chipHindko: "\"سڑک ٹٹی ہوئی اے (ہندکو)\"",
      chipSindhi: "\"اسان جي علائقي ۾ پاڻي جو مسئلو آهي (سنڌي)\"",
      chipPashto: "\"زمونږ په کلي کښې د اوبو مسئله ده (پښتو)\"",
      chipBalochi: "\"مئے میتگ ءَ آپ نیست (بلوچی)\"",
      
      // Gateways Section
      gatewaysTitle: "اہم حکومتی و شہری خدمات (Citizen Gateways)",
      gatewaysSub: "اپنی ضرورت کے مطابق شعبہ منتخب کریں یا اس کا آڈیو کارڈ سنیں",
      gatewaysMobileSub: "بڑی تصویر پر کلک کریں",
      
      gwComplaintTitle: "شکایت درج کروائیں",
      gwComplaintBadge: "فوری ایکشن",
      gwComplaintDesc: "پانی، بجلی، صفائی، سڑک یا بلدیاتی مسائل کا ملک بھر کے قومی و صوبائی اداروں کے ذریعے فوری ازالہ۔",
      gwComplaintAction: "شکایت درج کریں (File Complaint)",
      
      gwTrackTitle: "شکایات کا احوال (Track)",
      gwTrackBadge: "ٹوکن تلاش",
      gwTrackDesc: "اپنے ٹوکن نمبر کے ذریعے شکایت کی موجودہ صورتحال اور فیلڈ ٹیم کی پیش رفت جانیں۔",
      gwTrackAction: "سٹیٹس معلوم کریں (Track Status)",
      
      gwHealthTitle: "قریبی ہسپتال و صحت",
      gwHealthBadge: "24 گھنٹے اوپن",
      gwHealthDesc: "ملک بھر کے بنیادی مراکز صحت، دیہی ہسپتال، ڈاکٹروں کی دستیابی اور ایمرجنسی 1122۔",
      gwHealthAction: "ہسپتال تلاش کریں (Find Hospital)",
      
      gwSubsidyTitle: "امداد، وظائف و کسان پیکج",
      gwSubsidyBadge: "تصدیق شدہ",
      gwSubsidyDesc: "بینظیر کفالت وظیفہ 10,500، 8171 ایس ایم ایس اہلیت، قومی کسان سپورٹ اور وفاقی و صوبائی امداد۔",
      gwSubsidyAction: "وظائف کی معلومات (Check Schemes)",
      
      // Narrator Bar
      narratorTitle: "صفحہ کی خودکار آواز رہنمائی (Audio Narration)",
      narratorSub: "براؤزر مائیک فعال ہے • آن لائن آواز شناخت (Shruti-ONNX / Whisper ASR Ready)",
      narratorBtn: "یہ صفحہ سنیں (Listen)",
      narratorSpeedLabel: "رفتار:",
      
      // Telemetry & Sidebar Bento
      sideDialectsTitle: "تمام علاقائی صوتی لہجے میسر ہیں",
      sideDialectsDesc: "اردو، پنجابی، پوٹھوہاری، سرائیکی، ہندکو، سنڌي، پښتو، بلوچی اور انگلش",
      sideZeroPaidTitle: "100% مفت سرکاری سروس",
      sideZeroPaidDesc: "زیرو پیڈ اے آئی لاک فعال ہے",
      sideOfflineTitle: "آف لائن ریکارڈنگ کی سہولت",
      sideOfflineDesc: "انٹرنیٹ بند ہونے پر بھی شکایت محفوظ ہوگی",
      
      // Footer
      footerGov: "حکومتِ پاکستان - لوکل گورنمنٹ و قومی ڈیجیٹل سروسز",
      footerDiv: "عوامی آواز - قومی عوامی خدمت پورٹل (All Pakistan Provinces & Territories)",
      footerTech: "صوتی شناخت: Shruti-ONNX & Whisper v3 • ماڈل روٹنگ: OpenRouter Free & Local Zero-Cost Policy"
    },
    en: {
      govTitle: "Government of Pakistan - Local Government & National E-Governance",
      portalName: "Awami Voice | Civic Portal",
      portalSubtitle: "National Voice-First Civic Grievance & Guidance Portal (All Pakistan)",
      navHome: "Home",
      navRegister: "Register Complaint",
      navTrack: "Track Complaints",
      navHealthcare: "Healthcare & Hospitals",
      navSubsidies: "Subsidies & Welfare",
      audioGuide: "Audio Guide",
      adminLogin: "Admin Portal",
      viewMobile: "View Mobile App",
      speakBtn: "Speak",
      listenBtn: "Listen",
      tabHome: "Home",
      tabTrack: "Track",
      tabEmergency: "1122 Emergency",
      tabFieldTasks: "Field Tasks",
      tabProfile: "Profile",
      onlineBadge: "Online",
      offlineBadge: "Offline Recording Available (Offline Ready)",
      offlineSub: "Audio will be safely recorded even without internet",
      langSwitchLabel: "اردو",
      welcomeNarration: "Welcome to Awami Voice Government of Pakistan Portal. You can register civic complaints, look up hospitals, and verify welfare benefits using natural speech across all provinces of Pakistan without typing.",
      
      // Hero & Voice Section
      heroBadge: "Pakistan National Voice Civic Grievance & Guidance Portal",
      heroHeadline: "Press the Mic & Speak Freely in Your Native Dialect",
      heroSub: "Speak in English or Local Language regarding roads, water, health, or subsidies. Zero typing required.",
      micInstruction: "Press Mic and Speak",
      micDialectsList: "Speak in English or Local Language",
      micPressToSpeak: "Speak",
      soundWaveListening: "System is listening to your voice...",
      
      // Welcome card in MobileApp
      welcomeBadge: "Easy Voice Guidance • National Monuments",
      welcomeTitle: "Speak and Get It Done!",
      welcomeDesc: "No typing required. Just press the mic button and Speak in English or Local Language.",
      welcomeAudioBtn: "Listen Guide",
      
      // Quick Spoken Suggestions
      chipsTitle: "Common Spoken Queries (Click any for instant assistance):",
      chipsMobileTitle: "Or tap any of these quick queries:",
      chipRoad: "\"Farm link road is broken and hazardous\"",
      chipHospital: "\"Where is the nearest Basic Health Unit (BHU)?\"",
      chipBisp: "\"BISP 8171 Cash Grant Release Date\"",
      chipSaraiki: "\"Water pipeline is broken (Saraiki)\"",
      chipHindko: "\"Road has severe potholes (Hindko)\"",
      chipSindhi: "\"Water supply crisis in our village (Sindhi)\"",
      chipPashto: "\"Water supply pipeline issue (Pashto)\"",
      chipBalochi: "\"Drinking water filter is closed (Balochi)\"",
      
      // Gateways Section
      gatewaysTitle: "Key Government & Civic Gateways",
      gatewaysSub: "Select a department or listen to its voice audio card",
      gatewaysMobileSub: "Tap any large card or speaker icon",
      
      gwComplaintTitle: "Register Grievance",
      gwComplaintBadge: "Immediate Action",
      gwComplaintDesc: "Immediate municipal action on water leaks, power hazards, broken roads, and sanitation across all provinces of Pakistan.",
      gwComplaintAction: "File Complaint (Speak)",
      
      gwTrackTitle: "Track Filed Grievances",
      gwTrackBadge: "Token Search",
      gwTrackDesc: "Check real-time progress, assigned provincial engineering team, and resolution status via your token.",
      gwTrackAction: "Check Status",
      
      gwHealthTitle: "Hospitals & Rescue 1122",
      gwHealthBadge: "24/7 Open",
      gwHealthDesc: "Nearest Basic Health Units, Rural Health Centers, doctors on duty, and 1122 ambulance nationwide.",
      gwHealthAction: "Find Hospitals & Centers",
      
      gwSubsidyTitle: "Subsidies, Welfare & BISP",
      gwSubsidyBadge: "Verified",
      gwSubsidyDesc: "Authoritative verified guidance on national BISP 10,500, 8171 SMS eligibility, national Kisan packages, and student stipends.",
      gwSubsidyAction: "Check Welfare Schemes",
      
      // Narrator Bar
      narratorTitle: "Automated Audio Narration (Voice Assistance)",
      narratorSub: "Browser mic active • Online Speech Recognition (Shruti-ONNX / Whisper ASR Ready)",
      narratorBtn: "Listen This Page",
      narratorSpeedLabel: "Speed:",
      
      // Telemetry & Sidebar Bento
      sideDialectsTitle: "All Regional Audio Accents Supported",
      sideDialectsDesc: "Urdu, Punjabi, Potohari, Saraiki, Hindko, Sindhi, Pashto, Balochi, English",
      sideZeroPaidTitle: "100% Free Public Service",
      sideZeroPaidDesc: "Strict Zero-Paid AI Fallback Lock Active",
      sideOfflineTitle: "Offline Recording Ready",
      sideOfflineDesc: "Complaints safely saved locally when internet is offline",
      
      // Footer
      footerGov: "Government of Pakistan - Local Government & National Digital Infrastructure",
      footerDiv: "Awami Voice National Public Services Platform - All Provinces & Territories of Pakistan",
      footerTech: "Speech Recognition: Shruti-ONNX & Whisper v3 • Model Routing: OpenRouter Free & Zero-Cost Policy"
    }
  }
};

// Export for browser & module environments
if (typeof window !== "undefined") {
  window.CivicData = CivicData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CivicData;
}
