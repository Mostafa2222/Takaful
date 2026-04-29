/* ============================================================
   Takaful Arabia - Static Site Logic
   - Bilingual (Arabic / English) with full RTL/LTR switching
   - Hero slider (auto-advance + manual)
   - Quick actions, bottom navigation tabs
   - Live clock in status bar (mobile mockup)
============================================================ */



window.initWebsite = function () {


  
"use strict";

// ---------------- Translations ----------------
const I18N = {
  ar: {
    brand: "تكافل العربية",
    city: "الرياض",
    "hero.title": "رعاية صحية متميزة",
    "hero.desc": "تغطية شاملة لجميع احتياجاتك الطبية",
    "promo.title": "إصدار عضوية تكافل العربية",
    "promo.desc": "سجّل الآن واستمتع بتغطية كاملة في المستشفيات والمراكز والصيدليات",
    "promo.cta": "ابدأ الآن",
    "mn.title": "الشبكة الطبية",
    "mn.sub": "تصفح المستشفيات والعيادات المعتمدة",
    "mn.cta": "عرض الشبكة",
    "paid.title": "الكوبونات والعروض",
    "paid.sub": "خصومات حصرية على أفضل الخدمات",
    "paid.cta": "المزيد",
    "latest.title": "الأحدث",
    "latest.desc": "أحدث العروض والكوبونات المضافة حديثًا",
    "free.title": "عرض جميع الخدمات",
    "free.desc": "خدمات مجانية",
    "pd.title": "الإجراءات الطبية لك",
    "pd.sub": "اختر خطة لإجراءك الطبي",
    "pd.sar": "ريال",
    "pd.12mo": "12 شهرًا",
    "pd.4pat": "4 مرضى",
    "pd.book": "احجز الآن",
    "pd.details": "التفاصيل",
    "pd.save30": "وفر 30%",
    "pd.save25": "وفر 25%",
    "pd.save20": "وفر 20%",
    "pd.save15": "وفر 15%",
    "pd.proc1.name": "جراحة الساد",
    "pd.proc1.desc": "إجراء جراحي لإزالة عدسة العين المعتمة واستبدالها بعدسة اصطناعية",
    "pd.proc2.name": "عملية تكميم المعدة",
    "pd.proc2.desc": "جراحة تقليل حجم المعدة لمكافحة السمنة المفرطة",
    "pd.proc3.name": "إجراءات الولادة",
    "pd.proc3.desc": "رعاية شاملة أثناء الحمل والولادة مع نخبة من الأطباء المتخصصين",
    "pd.proc4.name": "جراحة القلب",
    "pd.proc4.desc": "جراحة قلب مفتوح وتركيب دعامات بأيدي أمهر الجراحين",
    "pdet.hospital": "المستشفى",
    "pdet.providerTag": "معتمد من تكافل العربية",
    "pdet.contact": "معلومات الاتصال",
    "pdet.phone": "هاتف المستشفى",
    "pdet.emergency": "رقم الطوارئ",
    "pdet.email": "البريد الإلكتروني",
    "pdet.dept": "القسم الطبي",
    "pdet.deptSub": "القسم",
    "pdet.deptHead": "رئيس القسم",
    "pdet.opDetails": "تفاصيل العملية",
    "pdet.opDuration": "مدة العملية",
    "pdet.opRecovery": "فترة التعافي",
    "pdet.opPrep": "التحضيرات المطلوبة:",
    "pdet.privacy": "سياسة الخصوصية",
    "pdet.privacyText": "تلتزم تكافل العربية بحماية خصوصية المرضى وعدم مشاركة بياناتهم الشخصية مع أي طرف ثالث دون موافقة صريحة.",
    "pdet.terms": "الشروط والأحكام",
    "pdet.termsText": "يشترط الإلغاء قبل 48 ساعة من موعد العملية. قد تُطبق رسوم إلغاء بعد ذلك.",
    "pdet.afterDisc": "بعد الخصم",
    "pbk.title": "إتمام الشراء",
    "pbk.sub": "متابعة الشراء",
    "pbk.summary": "ملخص الطلب",
    "pbk.sumProc": "الإجراء",
    "pbk.sumOriginal": "السعر الأصلي",
    "pbk.sumDiscount": "الخصم",
    "pbk.sumTotal": "المبلغ الإجمالي",
    "pbk.plan": "خطة الدفع",
    "pbk.planFull": "دفعة واحدة",
    "pbk.planFull0": "0%",
    "pbk.plan6": "6 أقساط",
    "pbk.plan12": "12 قسطًا",
    "pbk.perMonth": "ريال / شهر",
    "pbk.method": "طريقة الدفع",
    "pbk.mada": "مدى",
    "pbk.credit": "بطاقة ائتمانية",
    "pbk.patInfo": "معلومات المريض",
    "pbk.fullName": "الاسم الكامل",
    "pbk.natId": "رقم الهوية الوطنية",
    "pbk.nationality": "رقم الجوال",
    "pbk.apptDate": "الموعد المفضل (اختياري)",
    "pbk.notesHint": "* سيتم التواصل معك لتأكيد الموعد المناسب",
    "pbk.agreePrefix": "أوافق على ",
    "pbk.agreeTerms": "الشروط والأحكام",
    "pbk.agreeAnd": " و ",
    "pbk.agreePrivacy": "سياسة الخصوصية",
    "pbk.agreeFor": " الخاصة بالإجراء الطبي",
    "pbk.totalLabel": "المبلغ المطلوب",
    "pbk.confirm": "تأكيد الحجز والدفع",
    "pbk.secure": "جميع المعاملات آمنة ومشفرة",
    "asv.title": "جميع الخدمات",
    "asv.sub": "اختر فئة لاستعراض الخدمات المتاحة",
    "asv.network": "الشبكة الطبية",
    "asv.paid": "الخدمات المدفوعة",
    "asv.discounts": "الخصومات",
    "asv.pharmacy": "صيدليات",
    "asv.dental": "أسنان",
    "asv.gp": "طب عام",
    "asv.hospitals": "مستشفيات",
    "asv.homecare": "رعاية منزلية",
    "asv.heart": "قلب",
    "asv.birth": "ولادة",
    "asv.lasik": "ليزك",
    "asv.consult": "استشارات",
    "asv.lab": "تحاليل",
    "hv.title": "الزيارات المنزلية",
    "hv.desc": "احجز زيارة طبيب منزلي لتلقي العلاج في منزلك",
    "hv.cta": "احجز الآن",
    "hvs.title": "الزيارات المنزلية",
    "hvs.sub": "احصل على الرعاية الطبية في منزلك",
    "hvs.serviceType": "اختر نوع الخدمة",
    "hvs.svc1.name": "زيارة طبيب عام",
    "hvs.svc1.desc": "فحص طبي عام في المنزل",
    "hvs.svc2.name": "رعاية تمريضية",
    "hvs.svc2.desc": "خدمة تمريض منزلي وتغيير ضمادات",
    "hvs.svc3.name": "علاج طبيعي",
    "hvs.svc3.desc": "جلسات علاج طبيعي في المنزل",
    "hvs.svc4.name": "سحب عينات مخبرية",
    "hvs.svc4.desc": "سحب عينات للفحوصات",
    "hvs.min": "دقيقة",
    "hvs.free": "مجاني",
    "hvs.chooseDate": "اختر التاريخ",
    "hvs.chooseTime": "اختر الوقت",
    "hvs.address": "العنوان",
    "hvs.whyTitle": "لماذا الزيارات المنزلية؟",
    "hvs.why1": "راحة تامة في المنزل",
    "hvs.why2": "أطباء وممرضات معتمدون",
    "hvs.why3": "مواعيد مرنة",
    "hvs.why4": "أسعار مخفضة للأعضاء",
    "hvs.confirm": "تأكيد الحجز",
    "net.title": "الشبكة الطبية",
    "net.searchPh": "ابحث عن مستشفى أو عيادة أو صيدلية",
    "net.tab.hospitals": "مستشفيات",
    "net.tab.clinics": "عيادات",
    "net.tab.pharmacies": "صيدليات",
    "net.tab.dental": "أسنان",
    "net.viewServices": "عرض جميع الخدمات",
    "net.hours": "ساعات العمل",
    "fac.title": "معلومات المركز",
    "fac.visits": "زيارات الصفحة",
    "fac.ratings": "التقييمات",
    "fac.followers": "المتابعون",
    "fac.discount": "نسبة الخصم",
    "fac.details": "تفاصيل المركز",
    "cd.title": "معلومات المركز",
    "cd.contact": "معلومات الاتصال",
    "cd.rating": "التقييم",
    "cd.social": "وسائل التواصل الاجتماعي",
    "cd.location": "الموقع",
    "ms.title": "إصدار عضوية تكافل العربية",
    "ms.choosePlan": "اختر الخطة المناسبة",
    "ms.sar": "ريال",
    "ms.popular": "الأكثر طلبًا",
    "ms.plan1.name": "الخطة الأساسية",
    "ms.plan1.f1": "سنة واحدة، بطاقة واحدة",
    "ms.plan1.f2": "تغطية طبية شاملة",
    "ms.plan1.f3": "فحوصات دورية مجانية",
    "ms.plan1.f4": "خصم 30% على الأدوية",
    "ms.plan1.f5": "زيارة منزلية كل 3 أشهر",
    "ms.plan2.name": "الخطة المميزة",
    "ms.plan2.f1": "سنتان، بطاقتان لشخصين",
    "ms.plan2.f2": "تغطية طبية كاملة لشخصين",
    "ms.plan2.f3": "فحوصات دورية مجانية",
    "ms.plan2.f4": "خصم 40% على الأدوية",
    "ms.plan2.f5": "زيارات منزلية غير محدودة",
    "ms.plan2.f6": "صلاحية لمدة سنتين",
    "ms.plan3.name": "الخطة الذهبية",
    "ms.plan3.f1": "سنة واحدة، 5 بطاقات",
    "ms.plan3.f2": "تغطية طبية كاملة لـ5 أشخاص",
    "ms.plan3.f3": "فحوصات دورية مجانية للكل",
    "ms.plan3.f4": "خصم 50% على الأدوية",
    "ms.plan3.f5": "زيارات منزلية غير محدودة",
    "ms.plan3.f6": "رعاية طبية متقدمة",
    "ms.formTitle": "معلومات المشترك",
    "ms.name": "الاسم الكامل",
    "ms.namePh": "أدخل اسمك الكامل",
    "ms.idNum": "رقم الهوية الوطنية",
    "ms.idPh": "أدخل رقم الهوية",
    "ms.phone": "رقم الجوال",
    "ms.next": "التالي",
    qa: {
      pharmacies: "صيدليات",
      dental: "أسنان",
      general: "طب عام",
      hospitals: "مستشفيات",
      homecare: "رعاية منزلية",
    },
    tabs: {
      more: "المزيد",
      wallet: "بطاقتي",
      paid: "عمليات مدفوعة",
      map: "الخريطة",
      home: "الرئيسية",
    },
    // Wallet screen
    "wlt.title": "بطاقتي",
    "wlt.cardLabel": "بطاقة التأمين",
    "wlt.cardBrand": "تكافل الصحي",
    "wlt.memberName": "أحمد محمد الأحمد",
    "wlt.policyNo": "رقم العضوية",
    "wlt.planType": "نوع الخطة",
    "wlt.planFeatured": "الخطة المميزة",
    "wlt.expiry": "تاريخ الانتهاء",
    "wlt.active": "نشط",
    "wlt.share": "مشاركة",
    "wlt.download": "تحميل",
    "wlt.qr": "رمز QR",
    "wlt.coverageTitle": "تفاصيل التغطية",
    "wlt.covChecks": "الفحوصات الطبية",
    "wlt.covFree": "مجاني",
    "wlt.covMeds": "الأدوية",
    "wlt.covMedsDisc": "خصم 50%",
    "wlt.covDental": "الأسنان والعيون",
    "wlt.covDentalIncl": "مشمول",
    "wlt.covVisits": "الزيارات المنزلية",
    "wlt.covVisitsUnlim": "غير محدودة",
    "wlt.covSurg": "العمليات الجراحية",
    "wlt.covSurgDisc": "خصم 30%",
    "wlt.statsTitle": "إحصائيات الاستخدام",
    "wlt.statRx": "وصفة دواء",
    "wlt.statVisits": "زيارة طبية",
    "wlt.statHome": "زيارة منزلية",
    "wlt.statChecks": "فحوصات طبية",
    "map.title": "البحث بالخريطة",
    "map.searchPh": "ابحث عن أي موقع طبي",
    "map.cat.hospitals": "مستشفيات",
    "map.cat.clinics": "مراكز",
    "map.cat.general": "طب عام",
    "map.cat.pharmacy": "صيدليات",
    "map.pin1": "عيادة ذهب وجواهر الأيت",
    "map.pin2": "عيادة النجاح",
    "map.pin3": "مستشفى البسام",
    "map.pin4": "صيدلية الجزيرة",
    "map.pin5": "مركز الهلال الأحمر",
    "map.clinic1": "مستشفى البسام",
    "map.clinic2": "عيادة النجاح",
    "map.clinic3": "مركز الهلال الأحمر",
    "notif.title": "الإشعارات",
    "citySheet.title": "اختر المدينة",
    "notif.n1.title": "تم الاشتراك بنجاح",
    "notif.n1.desc": "تم تفعيل اشتراكك في باقة التأمين الصحي الشامل",
    "notif.n1.time": "منذ ساعتين",
    "notif.n2.title": "عرض خاص لك! 🎉",
    "notif.n2.desc": "خصم 30% على جميع الفحوصات الطبية حتى نهاية الشهر",
    "notif.n2.time": "منذ 5 ساعات",
    "notif.n3.title": "تذكير بموعد الزيارة",
    "notif.n3.desc": "لدينا موعد الزيارة المنزلية الساعة 10:00 صباحًا",
    "notif.n3.time": "منذ يوم واحد",
    toast: {
      comingSoon: "قريبًا",
      tabSelected: (label) => `تم الاختيار: ${label}`,
      actionSelected: (label) => `${label} - قريبًا`,
    },
    // More / Profile screen
    "more.profile": "البروفايل",
    "more.userName": "أحمد محمد الأحمد",
    "more.planName": "الخطة المميزة",
    "more.address": "الرياض - حي النرجس، شارع التخصص",
    "more.memberSince": "عضو منذ: يناير 2024",
    "more.qrTitle": "رمز QR للعضوية",
    "more.qrSub": "عرض الرمز",
    "more.memberId": "رقم العضوية: TA-2024-0018",
    "more.medVisits": "زيارات طبية",
    "more.prescriptions": "وصفة دواء",
    "more.homeVisits": "زيارات منزلية",
    "more.accountInfo": "معلومات الحساب",
    "more.membershipInfo": "معلومات العضوية",
    "more.digitalMembership": "العضوية الإلكترونية",
    "more.visitReport": "تقرير الزيارات",
    "more.favorites": "المفضلة",
    "more.plan": "الخطة والاشتراك",
    "more.myOrders": "طلباتك",
    "more.visitHistory": "سجل الزيارات",
    "more.settings": "الإعدادات",
    "more.logout": "تسجيل الخروج",
    "more.loginTitle": "تسجيل الدخول / الخروج",
    "more.personalInfo": "المعلومات الشخصية",
    "more.nationalId": "رقم الهوية",
    "more.dob": "تاريخ الميلاد",
    "more.gender": "الجنس",
    "more.male": "ذكر",
    "more.contactDetails": "معلومات التواصل",
    "more.editInfo": "تعديل المعلومات",
    "more.membershipDetails": "تفاصيل العضوية",
    "more.planType": "نوع الخطة",
    "more.startDate": "تاريخ البدء",
    "more.endDate": "تاريخ الانتهاء",
    "more.coverCount": "عدد المشمولين",
    "more.persons": "أشخاص",
    "more.status": "الحالة",
    "more.active": "نشط",
    "more.renewMembership": "تجديد العضوية",
    "more.valid": "ساري حتى:",
    "more.qrInstruction": "اعرض هذا الرمز عند الوصول إلى أي مستشفى أو عيادة للتحقق من خصمك",
    "more.shareCard": "مشاركة البطاقة",
    "more.labTests": "تحاليل مخبرية",
    "more.monthlyActivity": "النشاط الشهري",
    "more.topVisited": "الأكثر زيارة",
    "more.visits": "زيارات",
    "more.currentPlan": "الخطة الحالية",
    "more.year": "سنة",
    "more.validUntil": "ساري حتى يناير 2026",
    "more.planFeatures": "مزايا الخطة",
    "more.upgradePlan": "ترقية الخطة",
    "more.renewPlan": "تجديد الخطة",
    "more.order.consultation": "طلب استشارة طبية",
    "more.order.homevisit": "طلب زيارة منزلية",
    "more.order.labs": "طلب تحليل مخبري",
    "more.orderNum": "رقم الطلب: ",
    "more.completed": "مكتمل",
    "more.language": "اللغة",
    "more.notifications": "الإشعارات",
    "more.privacy": "الخصوصية والأمان",
    "more.help": "المساعدة والدعم",
    "more.about": "عن التطبيق",
    "more.password": "كلمة المرور",
    "more.passwordPh": "أدخل كلمة المرور",
    "more.or": "أو",
    "more.doLogin": "تسجيل الدخول",
    "more.doLogout": "تسجيل الخروج من الحساب",
    "stg.notif.appt": "إشعارات الموعد",
    "stg.notif.offers": "العروض والكوبونات",
    "stg.notif.news": "الأخبار الطبية",
    "stg.notif.meds": "تذكير بالأدوية",
    "stg.chooseLanguage": "اختر اللغة",
    "stg.darkMode": "الوضع الداكن",
    "stg.changePass": "تغيير كلمة المرور",
    "stg.twoFactor": "المصادقة الثنائية",
    "stg.privacySettings": "إعدادات الخصوصية",
    "stg.helpCenter": "مركز الدعم",
    "stg.contactUs": "تواصل معنا",
    "stg.sendFeedback": "أرسل ملاحظات",
    "stg.legal": "المعلومات القانونية",
    "stg.terms": "الشروط والأحكام",
    "stg.privacyPolicy": "سياسة الخصوصية",
    "stg.licenses": "التراخيص",
    "stg.appVersion": "إصدار التطبيق",
  },
  en: {
    brand: "Takaful Arabia",
    city: "Riyadh",
    "hero.title": "Premium Healthcare",
    "hero.desc": "Comprehensive coverage for all your medical needs",
    "promo.title": "Get your Takaful Arabia membership",
    "promo.desc": "Sign up today and enjoy full coverage at hospitals, centers, and pharmacies nationwide",
    "promo.cta": "Start now",
    "mn.title": "Medical Network",
    "mn.sub": "Browse accredited hospitals and medical clinics",
    "mn.cta": "View Network",
    "paid.title": "Coupons & Offers",
    "paid.sub": "Exclusive discounts on top services",
    "paid.cta": "More",
    "latest.title": "What's new",
    "latest.desc": "The latest offers and coupons added recently",
    "free.title": "View all services",
    "free.desc": "Free services",
    "pd.title": "Medical Procedures for You",
    "pd.sub": "Choose a plan for your procedure",
    "pd.sar": "SAR",
    "pd.12mo": "12 months",
    "pd.4pat": "4 patients",
    "pd.book": "Book Now",
    "pd.details": "Details",
    "pd.save30": "Save 30%",
    "pd.save25": "Save 25%",
    "pd.save20": "Save 20%",
    "pd.save15": "Save 15%",
    "pd.proc1.name": "Cataract Surgery",
    "pd.proc1.desc": "Surgical procedure to remove the clouded lens and replace it with an artificial one",
    "pd.proc2.name": "Gastric Sleeve",
    "pd.proc2.desc": "Stomach reduction surgery to combat morbid obesity",
    "pd.proc3.name": "Maternity Procedures",
    "pd.proc3.desc": "Comprehensive care during pregnancy and delivery with top specialist physicians",
    "pd.proc4.name": "Cardiac Surgery",
    "pd.proc4.desc": "Open-heart surgery and stent placement by the most skilled surgeons",
    "pdet.hospital": "Hospital",
    "pdet.providerTag": "Accredited by Takaful Arabia",
    "pdet.contact": "Contact Information",
    "pdet.phone": "Hospital Phone",
    "pdet.emergency": "Emergency Number",
    "pdet.email": "Email",
    "pdet.dept": "Medical Department",
    "pdet.deptSub": "Department",
    "pdet.deptHead": "Department Head",
    "pdet.opDetails": "Operation Details",
    "pdet.opDuration": "Duration",
    "pdet.opRecovery": "Recovery Period",
    "pdet.opPrep": "Required Preparations:",
    "pdet.privacy": "Privacy Policy",
    "pdet.privacyText": "Takaful Arabia is committed to protecting patient privacy and not sharing personal data with third parties without explicit consent.",
    "pdet.terms": "Terms & Conditions",
    "pdet.termsText": "Cancellation must be made 48 hours before the procedure. Cancellation fees may apply after that period.",
    "pdet.afterDisc": "after discount",
    "pbk.title": "Checkout",
    "pbk.sub": "Continue purchase",
    "pbk.summary": "Order Summary",
    "pbk.sumProc": "Procedure",
    "pbk.sumOriginal": "Original Price",
    "pbk.sumDiscount": "Discount",
    "pbk.sumTotal": "Total Amount",
    "pbk.plan": "Payment Plan",
    "pbk.planFull": "One payment",
    "pbk.planFull0": "0%",
    "pbk.plan6": "6 instalments",
    "pbk.plan12": "12 instalments",
    "pbk.perMonth": "SAR / mo",
    "pbk.method": "Payment Method",
    "pbk.mada": "Mada",
    "pbk.credit": "Credit Card",
    "pbk.patInfo": "Patient Information",
    "pbk.fullName": "Full Name",
    "pbk.natId": "National ID",
    "pbk.nationality": "Mobile Number",
    "pbk.apptDate": "Preferred Date (optional)",
    "pbk.notesHint": "* We will contact you to confirm a suitable date",
    "pbk.agreePrefix": "I agree to ",
    "pbk.agreeTerms": "Terms & Conditions",
    "pbk.agreeAnd": " and ",
    "pbk.agreePrivacy": "Privacy Policy",
    "pbk.agreeFor": " for this medical procedure",
    "pbk.totalLabel": "Amount Due",
    "pbk.confirm": "Confirm Booking & Pay",
    "pbk.secure": "All transactions are secure and encrypted",
    "asv.title": "All Services",
    "asv.sub": "Choose a category to browse available services",
    "asv.network": "Medical Network",
    "asv.paid": "Paid Services",
    "asv.discounts": "Discounts",
    "asv.pharmacy": "Pharmacies",
    "asv.dental": "Dental",
    "asv.gp": "General Practice",
    "asv.hospitals": "Hospitals",
    "asv.homecare": "Home Care",
    "asv.heart": "Cardiology",
    "asv.birth": "Maternity",
    "asv.lasik": "LASIK",
    "asv.consult": "Consultations",
    "asv.lab": "Lab Tests",
    "hv.title": "Home visits",
    "hv.desc": "Book a doctor home visit and receive treatment at home",
    "hv.cta": "Book now",
    "hvs.title": "Home Visits",
    "hvs.sub": "Get medical care at your home",
    "hvs.serviceType": "Choose service type",
    "hvs.svc1.name": "General Doctor Visit",
    "hvs.svc1.desc": "General medical check-up at home",
    "hvs.svc2.name": "Nursing Care",
    "hvs.svc2.desc": "Home nursing & wound dressing",
    "hvs.svc3.name": "Physical Therapy",
    "hvs.svc3.desc": "Home physical therapy sessions",
    "hvs.svc4.name": "Lab Sample Collection",
    "hvs.svc4.desc": "Sample collection for analysis",
    "hvs.min": "min",
    "hvs.free": "Free",
    "hvs.chooseDate": "Choose date",
    "hvs.chooseTime": "Choose time",
    "hvs.address": "Address",
    "hvs.whyTitle": "Why home visits?",
    "hvs.why1": "Full comfort at home",
    "hvs.why2": "Certified doctors & nurses",
    "hvs.why3": "Flexible appointments",
    "hvs.why4": "Discounted rates for members",
    "hvs.confirm": "Confirm Booking",
    // Network screen
    "net.title": "Medical Network",
    "net.searchPh": "Search hospitals, clinics, pharmacies",
    "net.tab.hospitals": "Hospitals",
    "net.tab.clinics": "Clinics",
    "net.tab.pharmacies": "Pharmacies",
    "net.tab.dental": "Dental",
    "net.viewServices": "View all services",
    "net.hours": "Working hours",
    // Facility detail screen
    "fac.title": "Center Info",
    "fac.visits": "Page visits",
    "fac.ratings": "Ratings",
    "fac.followers": "Followers",
    "fac.discount": "Discount Rate",
    "fac.details": "Center Details",
    // Center details screen
    "cd.title": "Center Info",
    "cd.contact": "Contact Information",
    "cd.rating": "Rating",
    "cd.social": "Social Media",
    "cd.location": "Location",
    // Membership screen
    "ms.title": "Get your Takaful Arabia membership",
    "ms.choosePlan": "Choose your plan",
    "ms.sar": "SAR",
    "ms.popular": "Most popular",
    "ms.plan1.name": "Basic Plan",
    "ms.plan1.f1": "1 year, 1 card",
    "ms.plan1.f2": "Full medical coverage",
    "ms.plan1.f3": "Free periodic check-ups",
    "ms.plan1.f4": "30% discount on medications",
    "ms.plan1.f5": "Home visit every 3 months",
    "ms.plan2.name": "Premium Plan",
    "ms.plan2.f1": "2 years, 2 cards for 2 people",
    "ms.plan2.f2": "Full coverage for 2 people",
    "ms.plan2.f3": "Free periodic check-ups",
    "ms.plan2.f4": "40% discount on medications",
    "ms.plan2.f5": "Unlimited home visits",
    "ms.plan2.f6": "Valid for 2 years",
    "ms.plan3.name": "Gold Plan",
    "ms.plan3.f1": "1 year, 5 cards",
    "ms.plan3.f2": "Full coverage for 5 people",
    "ms.plan3.f3": "Free check-ups for all",
    "ms.plan3.f4": "50% discount on medications",
    "ms.plan3.f5": "Unlimited home visits",
    "ms.plan3.f6": "Advanced medical care",
    "ms.formTitle": "Subscriber information",
    "ms.name": "Full name",
    "ms.namePh": "Enter your full name",
    "ms.idNum": "National ID number",
    "ms.idPh": "Enter your ID number",
    "ms.phone": "Mobile number",
    "ms.next": "Next",
    qa: {
      pharmacies: "Pharmacies",
      dental: "Dental",
      general: "General",
      hospitals: "Hospitals",
      homecare: "Home care",
    },
    tabs: {
      more: "More",
      wallet: "My Card",
      paid: "Paid ops",
      map: "Map",
      home: "Home",
    },
    // Wallet screen
    "wlt.title": "My Card",
    "wlt.cardLabel": "Insurance Card",
    "wlt.cardBrand": "Takaful Health",
    "wlt.memberName": "Ahmed Mohammed Al-Ahmad",
    "wlt.policyNo": "Policy No.",
    "wlt.planType": "Plan Type",
    "wlt.planFeatured": "Premium Plan",
    "wlt.expiry": "Expiry Date",
    "wlt.active": "Active",
    "wlt.share": "Share",
    "wlt.download": "Download",
    "wlt.qr": "QR Code",
    "wlt.coverageTitle": "Coverage Details",
    "wlt.covChecks": "Medical Checkups",
    "wlt.covFree": "Free",
    "wlt.covMeds": "Medications",
    "wlt.covMedsDisc": "50% off",
    "wlt.covDental": "Dental & Vision",
    "wlt.covDentalIncl": "Included",
    "wlt.covVisits": "Home Visits",
    "wlt.covVisitsUnlim": "Unlimited",
    "wlt.covSurg": "Surgical Procedures",
    "wlt.covSurgDisc": "30% off",
    "wlt.statsTitle": "Usage Statistics",
    "wlt.statRx": "Prescriptions",
    "wlt.statVisits": "Medical Visits",
    "wlt.statHome": "Home Visits",
    "wlt.statChecks": "Checkups",
    // Map screen
    "map.title": "Map Search",
    "map.searchPh": "Search for any medical location",
    "map.cat.hospitals": "Hospitals",
    "map.cat.clinics": "Clinics",
    "map.cat.general": "General",
    "map.cat.pharmacy": "Pharmacy",
    "map.pin1": "Dahab & Jawaher Clinic",
    "map.pin2": "Al Najah Clinic",
    "map.pin3": "Al Bassam Hospital",
    "map.pin4": "Al Jazira Pharmacy",
    "map.pin5": "Red Crescent Center",
    "map.clinic1": "Al Bassam Hospital",
    "map.clinic2": "Al Najah Clinic",
    "map.clinic3": "Red Crescent Center",
    // Notifications screen
    "notif.title": "Notifications",
    "citySheet.title": "Choose City",
    "notif.n1.title": "Subscription Successful",
    "notif.n1.desc": "Your comprehensive health insurance plan has been activated",
    "notif.n1.time": "2 hours ago",
    "notif.n2.title": "Special Offer for You! ًںژ‰",
    "notif.n2.desc": "30% off all medical checkups until end of month",
    "notif.n2.time": "5 hours ago",
    "notif.n3.title": "Visit Appointment Reminder",
    "notif.n3.desc": "You have a home visit appointment tomorrow at 10:00 AM",
    "notif.n3.time": "1 day ago",
    toast: {
      comingSoon: "Coming soon",
      tabSelected: (label) => `Selected: ${label}`,
      actionSelected: (label) => `${label} - coming soon`,
    },
    // More / Profile screen
    "more.profile": "Profile",
    "more.userName": "Ahmed Mohammed Al-Ahmad",
    "more.planName": "Premium Plan",
    "more.address": "Riyadh, Al Narjis, Al Tahlia Street",
    "more.memberSince": "Member since: January 2024",
    "more.qrTitle": "Membership QR Code",
    "more.qrSub": "Show code",
    "more.memberId": "Membership No: TA-2024-0018",
    "more.medVisits": "Medical visits",
    "more.prescriptions": "Prescriptions",
    "more.homeVisits": "Home visits",
    "more.accountInfo": "Account Info",
    "more.membershipInfo": "Membership Info",
    "more.digitalMembership": "Digital Membership",
    "more.visitReport": "Visit Report",
    "more.favorites": "Favorites",
    "more.plan": "Plan & Subscription",
    "more.myOrders": "My Orders",
    "more.visitHistory": "Visit History",
    "more.settings": "Settings",
    "more.logout": "Logout",
    "more.loginTitle": "Login / Logout",
    "more.personalInfo": "Personal Information",
    "more.nationalId": "National ID",
    "more.dob": "Date of Birth",
    "more.gender": "Gender",
    "more.male": "Male",
    "more.contactDetails": "Contact Details",
    "more.editInfo": "Edit Information",
    "more.membershipDetails": "Membership Details",
    "more.planType": "Plan Type",
    "more.startDate": "Start Date",
    "more.endDate": "End Date",
    "more.coverCount": "Covered Members",
    "more.persons": "people",
    "more.status": "Status",
    "more.active": "Active",
    "more.renewMembership": "Renew Membership",
    "more.valid": "Valid until:",
    "more.qrInstruction": "Show this code at any hospital or clinic to get your discount instantly",
    "more.shareCard": "Share Card",
    "more.labTests": "Lab Tests",
    "more.monthlyActivity": "Monthly Activity",
    "more.topVisited": "Most Visited",
    "more.visits": "visits",
    "more.currentPlan": "Current Plan",
    "more.year": "year",
    "more.validUntil": "Valid until January 2026",
    "more.planFeatures": "Your Plan Benefits",
    "more.upgradePlan": "Upgrade Plan",
    "more.renewPlan": "Renew Plan",
    "more.order.consultation": "Medical Consultation",
    "more.order.homevisit": "Home Visit",
    "more.order.labs": "Lab Tests",
    "more.orderNum": "Order No: ",
    "more.completed": "Completed",
    "more.language": "Language",
    "more.notifications": "Notifications",
    "more.privacy": "Privacy & Security",
    "more.help": "Help & Support",
    "more.about": "About App",
    "more.password": "Password",
    "more.passwordPh": "Enter your password",
    "more.or": "or",
    "more.doLogin": "Login",
    "more.doLogout": "Logout from current account",
    // Settings screen
    "stg.notif.appt": "Appointment Notifications",
    "stg.notif.offers": "Offers & Coupons",
    "stg.notif.news": "Medical News",
    "stg.notif.meds": "Medication Reminders",
    "stg.chooseLanguage": "Choose Language",
    "stg.darkMode": "Dark Mode",
    "stg.changePass": "Change Password",
    "stg.twoFactor": "Two-Factor Authentication",
    "stg.privacySettings": "Privacy Settings",
    "stg.helpCenter": "Help Center",
    "stg.contactUs": "Contact Us",
    "stg.sendFeedback": "Send Feedback",
    "stg.legal": "Legal Information",
    "stg.terms": "Terms & Conditions",
    "stg.privacyPolicy": "Privacy Policy",
    "stg.licenses": "Licenses",
    "stg.appVersion": "App Version",
  },
};

// Quick actions â€” homecare first in DOM: rightmost in RTL (Arabic), leftmost in LTR (English)
const QUICK_ACTIONS = [
  { key: "homecare", src: "../assets/website/images/container-1.svg" },
  { key: "hospitals", src: "../assets/website/images/container-2.svg" },
  { key: "general", src: "../assets/website/images/container.svg" },
  { key: "dental", src: "../assets/website/images/container-3.svg" },
  { key: "pharmacies", src: "../assets/website/images/container-4.svg" },
];

// Bottom navigation tabs â€” DOM order places home first so it is rightmost in RTL (Arabic) and leftmost in LTR (English)
const TABS = [
  { key: "home", src: "../assets/website/images/icon-3.svg" },
  { key: "map", src: "../assets/website/images/icon-4.svg" },
  { key: "paid", src: "../assets/website/images/icon.svg" },
  { key: "wallet", src: "../assets/website/images/icon-2.svg" },
  { key: "more", src: "../assets/website/images/icon-1.svg" },
];

const HERO_SLIDES = 4;
const HERO_IMAGE = "../assets/website/images/hero-doctor.png";

// ---------------- State ----------------
let lang = "ar";
try { lang = localStorage.getItem("ta_lang_ar") || "ar"; } catch (e) { }
let activeSlide = 2;
let activeTab = "home";
let heroTimer = null;

// ---------------- Toast ----------------
let toastEl = null;
let toastTimer = null;

// ---------------- DOM ----------------
const $ = (sel) => document.querySelector(sel);
const root = document.documentElement;


// ---- Procedures data ----
const PROCEDURES = [
  {
    key: "proc1",
    nameAr: "جراحة الساد", nameEn: "Cataract Surgery",
    origPrice: "8,000", discPrice: "5,600", discPct: 30,
    month6: "933", month12: "467",
    hospNameAr: "مستشفى الملك فيصل التخصصي", hospNameEn: "King Faisal Specialist Hospital",
    addrAr: "الرياض - حي الملك فهد", addrEn: "Riyadh - King Fahd District, King Fahd Road",
    hoursAr: "24 ساعة", hoursEn: "Open 24 hours",
    phone: "+966 11 442 7777", emergency: "+966 11 442 4444", email: "info@kfsh.med.sa",
    deptAr: "قسم العيون وجراحة الساد", deptEn: "Ophthalmology & Cataract Surgery",
    doctorAr: "د. عبدالله المحمد", doctorEn: "Dr. Abdullah Al-Mohammad",
    tags: [
      { textAr: "رعاية هارفارد", textEn: "Harvard Care", cls: "" },
      { textAr: "الفريق الكويتي", textEn: "Kuwaiti Team", cls: "pdet-tag-blue" },
      { textAr: "الفريق السعودي", textEn: "Saudi Team", cls: "pdet-tag-green" },
    ],
    durationAr: "15-30 دقيقة", durationEn: "15-30 minutes",
    recoveryAr: "يوم واحد", recoveryEn: "1 day",
    prepAr: ["الصيام لمدة 8 ساعات قبل العملية", "إيقاف بعض الأدوية حسب تعليمات الطبيب", "إجراء الفحوصات المخبرية المطلوبة", "الوصول قبل ساعتين من الإجراء"],
    prepEn: ["Fast for 8 hours before the procedure", "Stop certain medications per doctor's instructions", "Complete required lab tests", "Arrive 2 hours before the procedure"],
  },

  {
    key: "proc2",
    nameAr: "عملية تكميم المعدة", nameEn: "Gastric Sleeve",
    origPrice: "35,000", discPrice: "26,250", discPct: 25,
    month6: "4,375", month12: "2,188",
    hospNameAr: "مستشفى الملك فيصل التخصصي", hospNameEn: "King Faisal Specialist Hospital",
    addrAr: "الرياض - حي الملك فهد", addrEn: "Riyadh - King Fahd District, King Fahd Road",
    hoursAr: "24 ساعة", hoursEn: "Open 24 hours",
    phone: "+966 11 442 7777", emergency: "+966 11 442 4444", email: "info@kfsh.med.sa",
    deptAr: "قسم الجراحة العامة وجراحة السمنة", deptEn: "General & Bariatric Surgery",
    doctorAr: "د. سارة الأحمد", doctorEn: "Dr. Sara Al-Ahmad",
    tags: [
      { textAr: "جراحة التكميم", textEn: "Bariatric Surgery", cls: "" },
      { textAr: "معتمد دولياً", textEn: "Internationally Certified", cls: "pdet-tag-blue" },
      { textAr: "الفريق السعودي", textEn: "Saudi Team", cls: "pdet-tag-green" },
    ],
    durationAr: "2-3 ساعات", durationEn: "2-3 hours",
    recoveryAr: "يومان", recoveryEn: "2 days",
    prepAr: ["الصيام الكامل 12 ساعة قبل العملية", "التوقف عن التدخين قبل أسبوعين", "إجراء فحص غذائي قبل الجراحة", "استشارة أخصائي تغذية قبل العملية"],
    prepEn: ["Full fasting 12 hours before", "Full gastrointestinal examination", "Stop smoking 2 weeks prior", "Consult a nutritionist before surgery"],
  },
  {
    key: "proc3",
    nameAr: "ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظˆظ„ط§ط¯ط©", nameEn: "Maternity Procedures",
    origPrice: "16,000", discPrice: "12,000", discPct: 20,
    month6: "2,000", month12: "1,000",
    hospNameAr: "ظ…ط³طھط´ظپظ‰ ط§ظ„ظ…ظ„ظƒ ظپظٹطµظ„ ط§ظ„طھط®طµطµظٹ", hospNameEn: "King Faisal Specialist Hospital",
    addrAr: "ط§ظ„ط±ظٹط§ط¶ - ط­ظٹ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯طŒ ط·ط±ظٹظ‚ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯", addrEn: "Riyadh - King Fahd District, King Fahd Road",
    hoursAr: "ط¹ظ„ظ‰ ظ…ط¯ط§ط± 24 ط³ط§ط¹ط©", hoursEn: "Open 24 hours",
    phone: "+966 11 442 7777", emergency: "+966 11 442 4444", email: "info@kfsh.med.sa",
    deptAr: "ظ‚ط³ظ… ط§ظ„ظ†ط³ط§ط، ظˆط§ظ„ظˆظ„ط§ط¯ط©", deptEn: "Obstetrics & Gynecology",
    doctorAr: "ط¯. ظ…ظ†ظ‰ ط§ظ„ط²ظ‡ط±ط§ظ†ظٹ", doctorEn: "Dr. Mona Al-Zahrani",
    tags: [
      { textAr: "ط±ط¹ط§ظٹط© ط§ظ„ط£ظ…ظˆظ…ط©", textEn: "Maternity Care", cls: "" },
      { textAr: "ط­ط¶ط§ظ†ط© ظ…طھظƒط§ظ…ظ„ط©", textEn: "Full NICU", cls: "pdet-tag-blue" },
      { textAr: "ط§ظ„ظپط±ظٹظ‚ ط§ظ„ط³ط¹ظˆط¯ظٹ", textEn: "Saudi Team", cls: "pdet-tag-green" },
    ],
    durationAr: "ظ…طھط؛ظٹط± ط­ط³ط¨ ط§ظ„ط­ط§ظ„ط©", durationEn: "Varies by case",
    recoveryAr: "2-3 ط£ظٹط§ظ…", recoveryEn: "2-3 days",
    prepAr: ["ظ…طھط§ط¨ط¹ط© ظ…ظ†طھط¸ظ…ط© ظ…ط¹ ط§ظ„ط·ط¨ظٹط¨ط© ط§ظ„ظ…ط´ط±ظپط©", "ط¥ط­ط¶ط§ط± ظ†طھط§ط¦ط¬ ط§ظ„ظپط­ظˆطµط§طھ ط§ظ„ط³ط§ط¨ظ‚ط©", "ط§ظ„طھط³ط¬ظٹظ„ ط§ظ„ظ…ط³ط¨ظ‚ ظپظٹ ظ‚ط³ظ… ط§ظ„ظˆظ„ط§ط¯ط©", "ط§ظ„طھظˆط§ط¬ط¯ ط¹ظ†ط¯ ط£ظˆظ„ ط¨ظˆط§ط¯ط± ط§ظ„ط·ظ„ظ‚"],
    prepEn: ["Regular check-ups with assigned doctor", "Bring previous test results", "Pre-register in the maternity ward", "Arrive at first signs of labor"],
  },
  {
    key: "proc4",
    nameAr: "ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ‚ظ„ط¨", nameEn: "Cardiac Surgery",
    origPrice: "50,000", discPrice: "42,500", discPct: 15,
    month6: "7,084", month12: "3,542",
    hospNameAr: "ظ…ط³طھط´ظپظ‰ ط§ظ„ظ…ظ„ظƒ ظپظٹطµظ„ ط§ظ„طھط®طµطµظٹ", hospNameEn: "King Faisal Specialist Hospital",
    addrAr: "ط§ظ„ط±ظٹط§ط¶ - ط­ظٹ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯طŒ ط·ط±ظٹظ‚ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯", addrEn: "Riyadh - King Fahd District, King Fahd Road",
    hoursAr: "ط¹ظ„ظ‰ ظ…ط¯ط§ط± 24 ط³ط§ط¹ط©", hoursEn: "Open 24 hours",
    phone: "+966 11 442 7777", emergency: "+966 11 442 4444", email: "info@kfsh.med.sa",
    deptAr: "ظ‚ط³ظ… ط§ظ„ظ‚ظ„ط¨ ظˆط§ظ„ط£ظˆط¹ظٹط© ط§ظ„ط¯ظ…ظˆظٹط©", deptEn: "Cardiology & Vascular Surgery",
    doctorAr: "ط¯. ط®ط§ظ„ط¯ ط§ظ„ط¹طھظٹط¨ظٹ", doctorEn: "Dr. Khalid Al-Otaibi",
    tags: [
      { textAr: "ط¬ط±ط§ط­ط© ط§ظ„ظ‚ظ„ط¨ ط§ظ„ظ…ظپطھظˆط­", textEn: "Open Heart", cls: "" },
      { textAr: "طھظ‚ظ†ظٹط© ظ…طھط·ظˆط±ط©", textEn: "Advanced Tech", cls: "pdet-tag-blue" },
      { textAr: "ط§ظ„ظپط±ظٹظ‚ ط§ظ„ط³ط¹ظˆط¯ظٹ", textEn: "Saudi Team", cls: "pdet-tag-green" },
    ],
    durationAr: "4-6 ط³ط§ط¹ط§طھ", durationEn: "4-6 hours",
    recoveryAr: "7-10 ط£ظٹط§ظ…", recoveryEn: "7-10 days",
    prepAr: ["ط§ظ„طµظٹط§ظ… ط§ظ„ظƒط§ظ…ظ„ ظ‚ط¨ظ„ 8 ط³ط§ط¹ط§طھ", "ط¥ط¬ط±ط§ط، طھط®ط·ظٹط· ط§ظ„ظ‚ظ„ط¨ ظˆط§ظ„ط£ط´ط¹ط©", "ط¥ظٹظ‚ط§ظپ ظ…ط¶ط§ط¯ط§طھ ط§ظ„طھط¬ظ„ط· ظ‚ط¨ظ„ 5 ط£ظٹط§ظ…", "ط§ظ„ط¥ظ‚ط§ظ…ط© ظپظٹ ط§ظ„ظ…ط³طھط´ظپظ‰ ظ„ظٹظ„ط© ظ‚ط¨ظ„ ط§ظ„ط¹ظ…ظ„ظٹط©"],
    prepEn: ["Full fasting 8 hours before", "ECG and imaging tests required", "Stop anticoagulants 5 days prior", "Hospital stay the night before the procedure"],
  },
];

let currentProc = null; // currently selected procedure
// ================================================================
// NETWORK + FACILITY SCREENS
// ================================================================

/* ---------- Facilities data ---------- */
const FACILITIES = [
  {
    id: 1, tab: "hospitals",
    name: { ar: "ظ…ط³طھط´ظپظ‰ ط§ظ„ظ…ظ„ظƒ ظپظٹطµظ„ ط§ظ„طھط®طµطµظٹ", en: "King Faisal Specialist Hospital" },
    location: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Riyadh, Saudi Arabia" },
    phone: "+966 11 464 7272",
    hours: { ar: "24 ط³ط§ط¹ط©", en: "24 hours" },
    discount: 50, rating: 4.8,
    gradient: "linear-gradient(160deg,#1a3a5c 0%,#2564a8 50%,#5b9bd5 100%)",
    services: [
      { icon: "ًں©؛", bg: "#7c3aed", name: { ar: "ظƒط´ظپ ط¯ظƒطھظˆط± ط¹ط§ظ…", en: "GP Consultation" }, desc: { ar: "ظ…ط¹ ط§ظ„طھط®ظپظٹط¶", en: "With discount" }, discount: "50%", price: null, origPrice: null, save: null },
      { icon: "ًں”¬", bg: "#dc2626", name: { ar: "ط¹ط±ط¶ ط¹ظ„ظ‰ طµظˆط±ط© ط§ظ„ط£ط´ط¹ط© ط¨ط§ظ„ط±ظ†ظٹظ† ط§ظ„ظ…ط؛ظ†ط§ط·ظٹط³ظٹ", en: "MRI Scan Offer" }, desc: { ar: "600 ط¨ط¯ظ„ط§ظ‹ ظ…ظ† 1200", en: "600 instead of 1200" }, discount: "50%", price: { ar: "600 ط±ظٹط§ظ„", en: "600 SAR" }, origPrice: { ar: "ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ: 1200 ط±ظٹط§ظ„", en: "Original: 1200 SAR" }, save: null },
      { icon: "ًں’ٹ", bg: "#16a34a", name: { ar: "ط¹ظ†ط§ظˆظٹظ† ط§ظ„ط¹ط±ط¶ ظٹظƒطھط¨ ظ‡ظ†ط§", en: "Medication Delivery" }, desc: { ar: "ظˆظپط± 19 ط±ظٹط§ظ„ ط¹ظ„ظ‰ ط¹ظ†ط§ظˆظٹظ† ط§ظ„ط£ط¯ظˆظٹط© ظ‚ط§ط¨ظ„ ظ„ظ„ط§ط³طھط®ط¯ط§ظ…", en: "Save 19 SAR on medication delivery" }, discount: null, price: { ar: "ظ…ط¬ط§ظ†ظٹ", en: "Free" }, origPrice: { ar: "9 ط±ظٹط§ظ„", en: "9 SAR" }, save: null, freeLabel: { ar: "ظ…ط¬ط§ظ†ظٹ", en: "Free" } },
      { icon: "âœ¨", bg: "#d97706", name: { ar: "ظ„ظٹط²ط± ط¥ط²ط§ظ„ط© ط§ظ„ط´ط¹ط±", en: "Laser Hair Removal" }, desc: { ar: "ط¬ظ„ط³طھظٹظ† آ· 30 ظٹظˆظ… آ· ط§ظ„ط§ط¹طھظٹط§ط¯ظٹ", en: "2 sessions آ· 30 days آ· Regular" }, discount: null, price: { ar: "99 ط±ظٹط§ظ„", en: "99 SAR" }, origPrice: null, save: { ar: "ظˆظپط± 30 ط±ظٹط§ظ„ ظ…ط¹ظ†ط§", en: "Save 30 SAR with us" } },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 25% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط£ط®ط±ظ‰ ط§ظ„ظ…طھط§ط­ط© ظپظٹ ط§ظ„ظ…ظ†ط´ط£ط©", en: "25% off all other available services" }, discount: "25%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 2, tab: "hospitals",
    name: { ar: "ظ…ط®طھط¨ط±ط§طھ ط§ظ„ط±ط§ط²ظٹ", en: "Al-Razi Laboratories" },
    location: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Riyadh, Saudi Arabia" },
    phone: "+966 11 477 7777",
    hours: { ar: "7 طµ - 9 ظ…", en: "7 AM - 9 PM" },
    discount: 40, rating: 4.7,
    gradient: "linear-gradient(160deg,#e0eaf4 0%,#bdd5ec 50%,#92b9e0 100%)",
    services: [
      { icon: "ًں§ھ", bg: "#7c3aed", name: { ar: "طھط­ط§ظ„ظٹظ„ ط´ط§ظ…ظ„ط©", en: "Full Blood Panel" }, desc: { ar: "ظ…ط¹ ط®طµظ… 40%", en: "With 40% discount" }, discount: "40%", price: null, origPrice: null, save: null },
      { icon: "ًں©¸", bg: "#dc2626", name: { ar: "طµظˆط±ط© ط§ظ„ط¯ظ… ط§ظ„ظƒط§ظ…ظ„ط©", en: "Complete Blood Count" }, desc: { ar: "30 ط¨ط¯ظ„ط§ظ‹ ظ…ظ† 50", en: "30 instead of 50" }, discount: "40%", price: { ar: "30 ط±ظٹط§ظ„", en: "30 SAR" }, origPrice: { ar: "ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ: 50 ط±ظٹط§ظ„", en: "Original: 50 SAR" }, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 40% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط£ط®ط±ظ‰", en: "40% off all other services" }, discount: "40%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 3, tab: "clinics",
    name: { ar: "ظ…ط¬ظ…ط¹ ط¹ظٹط§ط¯ط§طھ ط§ظ„ط£ط³ط±ط©", en: "Family Clinics Complex" },
    location: { ar: "ط¬ط¯ط©طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Jeddah, Saudi Arabia" },
    phone: "+966 12 653 1000",
    hours: { ar: "8 طµ - 10 ظ…", en: "8 AM - 10 PM" },
    discount: 30, rating: 4.6,
    gradient: "linear-gradient(160deg,#1e4a7c 0%,#3572b5 50%,#6fa8e2 100%)",
    services: [
      { icon: "ًں‘¨â€چâڑ•ï¸ڈ", bg: "#7c3aed", name: { ar: "ظƒط´ظپ ط·ط¨ظٹط¨ ط¹ط§ط¦ظ„ط©", en: "Family Doctor Consultation" }, desc: { ar: "ظ…ط¹ ط§ظ„طھط®ظپظٹط¶", en: "With discount" }, discount: "30%", price: null, origPrice: null, save: null },
      { icon: "ًں¦·", bg: "#16a34a", name: { ar: "ظƒط´ظپ ط£ط³ظ†ط§ظ†", en: "Dental Check" }, desc: { ar: "35 ط¨ط¯ظ„ط§ظ‹ ظ…ظ† 50", en: "35 instead of 50" }, discount: "30%", price: { ar: "35 ط±ظٹط§ظ„", en: "35 SAR" }, origPrice: { ar: "ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ: 50 ط±ظٹط§ظ„", en: "Original: 50 SAR" }, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 30% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط£ط®ط±ظ‰", en: "30% off all other services" }, discount: "30%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 4, tab: "clinics",
    name: { ar: "ط¹ظٹط§ط¯ط© ط§ظ„ط±ط¹ط§ظٹط© ط§ظ„طµط­ظٹط©", en: "Healthcare Clinic" },
    location: { ar: "ط§ظ„ط¯ظ…ط§ظ…طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Dammam, Saudi Arabia" },
    phone: "+966 13 800 1234",
    hours: { ar: "9 طµ - 9 ظ…", en: "9 AM - 9 PM" },
    discount: 20, rating: 4.5,
    gradient: "linear-gradient(160deg,#064e3b 0%,#0d9488 50%,#6ee7b7 100%)",
    services: [
      { icon: "ًں©؛", bg: "#7c3aed", name: { ar: "ظƒط´ظپ ط¹ط§ظ…", en: "General Consultation" }, desc: { ar: "ظ…ط¹ ط§ظ„طھط®ظپظٹط¶", en: "With discount" }, discount: "20%", price: null, origPrice: null, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 20% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط£ط®ط±ظ‰", en: "20% off all other services" }, discount: "20%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 5, tab: "pharmacies",
    name: { ar: "طµظٹط¯ظ„ظٹط§طھ ط§ظ„طھظ‡ط§ظ†ظٹ", en: "Al-Tahani Pharmacies" },
    location: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Riyadh, Saudi Arabia" },
    phone: "+966 13 833 3333",
    hours: { ar: "24 ط³ط§ط¹ط©", en: "24 hours" },
    discount: 25, rating: 4.6,
    gradient: "linear-gradient(160deg,#e8f4f8 0%,#c3ddf0 50%,#9fc3e8 100%)",
    services: [
      { icon: "ًں’ٹ", bg: "#16a34a", name: { ar: "ط£ط¯ظˆظٹط© ظ…ط²ظ…ظ†ط©", en: "Chronic Medications" }, desc: { ar: "ط®طµظ… 25% ط¹ظ„ظ‰ ط§ظ„ط£ط¯ظˆظٹط© ط§ظ„ظ…ط²ظ…ظ†ط©", en: "25% off chronic medications" }, discount: "25%", price: null, origPrice: null, save: null },
      { icon: "ًں§´", bg: "#d97706", name: { ar: "ظ…ط³طھظ„ط²ظ…ط§طھ ط·ط¨ظٹط©", en: "Medical Supplies" }, desc: { ar: "20 ط¨ط¯ظ„ط§ظ‹ ظ…ظ† 25", en: "20 instead of 25" }, discount: "20%", price: { ar: "20 ط±ظٹط§ظ„", en: "20 SAR" }, origPrice: { ar: "ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ: 25 ط±ظٹط§ظ„", en: "Original: 25 SAR" }, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ظ…ظ†طھط¬ط§طھ", en: "Discount on All Other Products" }, desc: { ar: "ط®طµظ… 25% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¯ظˆظٹط© ط§ظ„ط£ط®ط±ظ‰", en: "25% off all other products" }, discount: "25%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 7, tab: "dental",
    name: { ar: "ظ…ط±ظƒط² ط§ظ„ط§ط¨طھط³ط§ظ…ط© ظ„ط·ط¨ ط§ظ„ط£ط³ظ†ط§ظ†", en: "Al-Ibtisama Dental Center" },
    location: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط­ظٹ ط§ظ„ط¹ظ„ظٹط§", en: "Riyadh, Al Olaya" },
    phone: "+966 11 234 5678",
    hours: { ar: "ط§ظ„ط£ط­ط¯ - ط§ظ„ط®ظ…ظٹط³: 9:00 طµ - 9:00 ظ…", en: "Sunâ€“Thu: 9 AM â€“ 9 PM" },
    discount: 35, rating: 4.8,
    gradient: "linear-gradient(160deg,#1a5276 0%,#2980b9 50%,#7fb3d3 100%)",
    services: [
      { icon: "ًں¦·", bg: "#7c3aed", name: { ar: "طھط¨ظٹظٹط¶ ط§ظ„ط£ط³ظ†ط§ظ†", en: "Teeth Whitening" }, desc: { ar: "ط®طµظ… 35% ط¹ظ„ظ‰ ط¬ظ„ط³ط§طھ ط§ظ„طھط¨ظٹظٹط¶", en: "35% off whitening sessions" }, discount: "35%", price: null, origPrice: null, save: null },
      { icon: "ًں”¬", bg: "#dc2626", name: { ar: "طھط±ظƒظٹط¨ طھظ‚ظˆظٹظ… ط§ظ„ط£ط³ظ†ط§ظ†", en: "Orthodontic Braces" }, desc: { ar: "2800 ط¨ط¯ظ„ط§ظ‹ ظ…ظ† 4000", en: "2800 instead of 4000" }, discount: "30%", price: { ar: "2800 ط±ظٹط§ظ„", en: "2800 SAR" }, origPrice: { ar: "ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ: 4000 ط±ظٹط§ظ„", en: "Original: 4000 SAR" }, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 35% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط£ط®ط±ظ‰", en: "35% off all other services" }, discount: "35%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 8, tab: "dental",
    name: { ar: "ط¹ظٹط§ط¯ط§طھ ط§ظ„ط¯ظƒطھظˆط± ط³ظ…ط§ظٹظ„ ظ„ط·ط¨ ط§ظ„ط£ط³ظ†ط§ظ†", en: "Dr. Smile Dental Clinics" },
    location: { ar: "ط¬ط¯ط©طŒ ط­ظٹ ط§ظ„ط±ظˆط¶ط©", en: "Jeddah, Al Rawdah" },
    phone: "+966 12 345 6789",
    hours: { ar: "ط§ظ„ط³ط¨طھ - ط§ظ„ط®ظ…ظٹط³: 8:00 طµ - 10:00 ظ…", en: "Satâ€“Thu: 8 AM â€“ 10 PM" },
    discount: 25, rating: 4.7,
    gradient: "linear-gradient(160deg,#0b3d0b 0%,#196f3d 50%,#58d68d 100%)",
    services: [
      { icon: "ًں¦·", bg: "#16a34a", name: { ar: "ظƒط´ظپ ط£ط³ظ†ط§ظ† ط´ط§ظ…ظ„", en: "Full Dental Check-up" }, desc: { ar: "ظƒط´ظپ ظ…ط¬ط§ظ†ظٹ ظ…ط¹ ط§ظ„ط­ط¬ط²", en: "Free check-up with booking" }, discount: null, price: { ar: "ظ…ط¬ط§ظ†ظٹ", en: "Free" }, origPrice: { ar: "150 ط±ظٹط§ظ„", en: "150 SAR" }, save: null, freeLabel: { ar: "ظ…ط¬ط§ظ†ظٹ", en: "Free" } },
      { icon: "âœ¨", bg: "#d97706", name: { ar: "ط²ط±ط§ط¹ط© ط§ظ„ط£ط³ظ†ط§ظ†", en: "Dental Implants" }, desc: { ar: "ط®طµظ… 25% ط¹ظ„ظ‰ ظƒظ„ ط²ط±ط§ط¹ط©", en: "25% off per implant" }, discount: "25%", price: null, origPrice: null, save: null },
      { icon: "âœ…", bg: "#2563eb", name: { ar: "طھط®ظپظٹط¶ ط¹ظ„ظ‰ ط¨ط§ظ‚ظٹ ط§ظ„ط®ط¯ظ…ط§طھ", en: "Discount on All Other Services" }, desc: { ar: "ط®طµظ… 25% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط®ط¯ظ…ط§طھ ط§ظ„ط£ط³ظ†ط§ظ†", en: "25% off all dental services" }, discount: "25%", price: null, origPrice: null, save: null },
    ]
  },
  {
    id: 6, tab: "pharmacies",
    name: { ar: "طµظٹط¯ظ„ظٹط© ط§ظ„ظ†ظ‡ط¯ظٹ", en: "Nahdi Pharmacy" },
    location: { ar: "ط¬ط¯ط©طŒ ط§ظ„ظ…ظ…ظ„ظƒط© ط§ظ„ط¹ط±ط¨ظٹط© ط§ظ„ط³ط¹ظˆط¯ظٹط©", en: "Jeddah, Saudi Arabia" },
    phone: "+966 12 200 0088",
    hours: { ar: "24 ط³ط§ط¹ط©", en: "24 hours" },
    discount: 15, rating: 4.8,
    gradient: "linear-gradient(160deg,#1e3a5f 0%,#2e6da4 50%,#7ab3e8 100%)",
    services: [
      { icon: "ًں’ٹ", bg: "#7c3aed", name: { ar: "ظƒظ„ ط§ظ„ط£ط¯ظˆظٹط©", en: "All Medications" }, desc: { ar: "ط®طµظ… 15% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¯ظˆظٹط©", en: "15% off all medications" }, discount: "15%", price: null, origPrice: null, save: null },
    ]
  },
];

/* ---------- State ---------- */
let activeNetTab = "hospitals";
let activeFacility = null;

/* ---------- Extended contact data per facility ---------- */
const FAC_DETAILS = {
  1: {
    phones: ["+966 11 464 7272", "+966 11 464 7273"],
    whatsapp: "+966 50 123 4567",
    email: "info@hospital.com",
    hours: { ar: "ط§ظ„ط³ط¨طھ - ط§ظ„ط®ظ…ظٹط³: 8:00 طµ - 10:00 ظ… آ· ط§ظ„ط¬ظ…ط¹ط©: ظ…ط؛ظ„ظ‚", en: "Satâ€“Thu: 8:00 AM â€“ 10:00 PM آ· Fri: Closed" },
    address: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط­ظٹ ط§ظ„ظ†ط®ظٹظ„طŒ ط´ط§ط±ط¹ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯", en: "Riyadh, Al Nakheel, King Fahd Street" },
  },
  2: {
    phones: ["+966 11 477 7777"],
    whatsapp: "+966 50 111 2222",
    email: "info@alrazi.com",
    hours: { ar: "ط§ظ„ط³ط¨طھ - ط§ظ„ط®ظ…ظٹط³: 7:00 طµ - 9:00 ظ… آ· ط§ظ„ط¬ظ…ط¹ط©: 4:00 ظ… - 9:00 ظ…", en: "Satâ€“Thu: 7 AM â€“ 9 PM آ· Fri: 4 PM â€“ 9 PM" },
    address: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط­ظٹ ط§ظ„ط¹ظ„ظٹط§طŒ ط·ط±ظٹظ‚ ط§ظ„ظ…ظ„ظƒ ظپظ‡ط¯", en: "Riyadh, Al Olaya, King Fahd Road" },
  },
  3: {
    phones: ["+966 12 653 1000", "+966 12 653 1001"],
    whatsapp: "+966 55 300 4000",
    email: "info@familyclinics.com",
    hours: { ar: "ط§ظ„ط£ط­ط¯ - ط§ظ„ط®ظ…ظٹط³: 8:00 طµ - 10:00 ظ… آ· ط§ظ„ط¬ظ…ط¹ط© - ط§ظ„ط³ط¨طھ: 4:00 ظ… - 10:00 ظ…", en: "Sunâ€“Thu: 8 AM â€“ 10 PM آ· Friâ€“Sat: 4 PM â€“ 10 PM" },
    address: { ar: "ط¬ط¯ط©طŒ ط­ظٹ ط§ظ„ط²ظ‡ط±ط§ط،طŒ ط´ط§ط±ط¹ ط§ظ„ط£ظ…ظٹط± ظ…ط­ظ…ط¯", en: "Jeddah, Al Zahraa, Prince Mohammed Street" },
  },
  4: {
    phones: ["+966 13 800 1234"],
    whatsapp: "+966 55 800 1234",
    email: "info@healthcare.com",
    hours: { ar: "ظٹظˆظ…ظٹط§ظ‹: 9:00 طµ - 9:00 ظ…", en: "Daily: 9:00 AM â€“ 9:00 PM" },
    address: { ar: "ط§ظ„ط¯ظ…ط§ظ…طŒ ط­ظٹ ط§ظ„ط´ط§ط·ط¦طŒ ط´ط§ط±ط¹ ط§ظ„ط£ظ…ظٹط± ظ†ط§ظٹظپ", en: "Dammam, Al Shati, Prince Naif Street" },
  },
  5: {
    phones: ["+966 13 833 3333"],
    whatsapp: "+966 55 833 0000",
    email: "info@altahani.com",
    hours: { ar: "24 ط³ط§ط¹ط© آ· 7 ط£ظٹط§ظ…", en: "24 hours آ· 7 days" },
    address: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط­ظٹ ط§ظ„ظ…ط±ظˆط¬طŒ ط·ط±ظٹظ‚ ط§ظ„ط¹ط±ظˆط¨ط©", en: "Riyadh, Al Muruj, Al Urubah Road" },
  },
  6: {
    phones: ["+966 12 200 0088"],
    whatsapp: "+966 55 200 0088",
    email: "info@nahdi.com",
    hours: { ar: "24 ط³ط§ط¹ط© آ· 7 ط£ظٹط§ظ…", en: "24 hours آ· 7 days" },
    address: { ar: "ط¬ط¯ط©طŒ ط­ظٹ ط§ظ„ظ†ط²ظ‡ط©طŒ ط´ط§ط±ط¹ ط§ظ„ظƒظˆط±ظ†ظٹط´", en: "Jeddah, Al Nuzha, Corniche Street" },
  },
  7: {
    phones: ["+966 11 234 5678"],
    whatsapp: "+966 55 234 5678",
    email: "info@ibtisama.com",
    hours: { ar: "ط§ظ„ط£ط­ط¯ - ط§ظ„ط®ظ…ظٹط³: 9:00 طµ - 9:00 ظ…", en: "Sunâ€“Thu: 9 AM â€“ 9 PM" },
    address: { ar: "ط§ظ„ط±ظٹط§ط¶طŒ ط­ظٹ ط§ظ„ط¹ظ„ظٹط§طŒ ط´ط§ط±ط¹ ط§ظ„ط¹ط±ظˆط¨ط©", en: "Riyadh, Al Olaya, Al Urubah Street" },
  },
  8: {
    phones: ["+966 12 345 6789"],
    whatsapp: "+966 55 345 6789",
    email: "info@drsmile.com",
    hours: { ar: "ط§ظ„ط³ط¨طھ - ط§ظ„ط®ظ…ظٹط³: 8:00 طµ - 10:00 ظ…", en: "Satâ€“Thu: 8 AM â€“ 10 PM" },
    address: { ar: "ط¬ط¯ط©طŒ ط­ظٹ ط§ظ„ط±ظˆط¶ط©طŒ ط´ط§ط±ط¹ ط§ظ„ط£ظ…ظٹط± ط³ظ„ط·ط§ظ†", en: "Jeddah, Al Rawdah, Prince Sultan Street" },
  },
};

// ================================================================
// MORE SCREEN + SUB-SCREENS
// ================================================================

const MORE_SUB_SCREENS = [
  "accountInfo", "membershipInfo", "digitalMembership", "visitReport",
  "favorites", "plan", "myOrders", "visitHistory", "settings", "login",
];

// ================================================================
// CITY SELECTION SHEET
// ================================================================
let selectedCity = { ar: "ط§ظ„ط±ظٹط§ط¶", en: "Riyadh" };

function t(key) {
  const dict = I18N[lang] || I18N.ar;
  if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
  const nested = key.split(".").reduce((o, k) => (o == null ? o : o[k]), dict);
  return nested == null ? key : nested;
}

function applyDirAndLang() {
  const dir = lang === "ar" ? "rtl" : "ltr";
  root.lang = lang;
  root.dir = dir;
  document.body.dir = dir;
  // Update all elements that carry an explicit dir attribute
  document.querySelectorAll("[dir]").forEach((el) => {
    if (el !== root && el !== document.body) el.dir = dir;
  });
  const labelEl = $("#langLabel");
  if (labelEl) labelEl.textContent = lang === "ar" ? "EN" : "AR";
  document.title = lang === "ar"
    ? "تكافل العربية | Takaful Arabia"
    : "Takaful Arabia | تكافل العربية";
  updateHeroPosition();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    // Preserve nested arrow span if present
    const arrowChild = el.querySelector(".arrow-i");
    if (arrowChild) {
      // Replace only text node before/after the arrow
      const arrowHtml = arrowChild.outerHTML;
      el.innerHTML = `${t(key)} ${arrowHtml}`;
    } else {
      el.textContent = t(key);
    }
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (key) el.placeholder = t(key);
  });

  // Quick actions labels
  document.querySelectorAll(".qa-label").forEach((el) => {
    const k = el.getAttribute("data-key");
    if (k) el.textContent = I18N[lang].qa[k];
  });
  // Tab labels
  document.querySelectorAll(".tab-label").forEach((el) => {
    const k = el.getAttribute("data-key");
    if (k) el.textContent = I18N[lang].tabs[k];
  });
}

// ---------------- Build hero ----------------
function buildHero() {
  
    console.warn("heroTrack or heroDots not found");
  const track = $("#heroTrack");
  const dotsWrap = $("#heroDots");
  if (!track || !dotsWrap) {
    console.warn("heroTrack or heroDots not found");
    return;
  }
  track.innerHTML = "";
  dotsWrap.innerHTML = "";

  for (let i = 0; i < HERO_SLIDES; i++) {
    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.style.backgroundImage = `url("${HERO_IMAGE}")`;
    slide.setAttribute("aria-hidden", i === activeSlide ? "false" : "true");
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot" + (i === activeSlide ? " active" : "");
    dot.setAttribute("aria-label", (lang === "ar" ? "الشريحة " : "Slide ") + (i + 1));
    dot.addEventListener("click", () => {
      setSlide(i, true);
    });
    dotsWrap.appendChild(dot);
  }
  updateHeroPosition();
}

function updateHeroPosition() {
  const track = $("#heroTrack");
  if (!track) return;
  const offset = activeSlide * 100;
  if (lang === "ar") {
    track.style.transform = `translateX(${offset}%)`;
  } else {
    track.style.transform = `translateX(-${offset}%)`;
  }
}

function setSlide(i, userTriggered) {
  activeSlide = (i + HERO_SLIDES) % HERO_SLIDES;
  updateHeroPosition();
  document.querySelectorAll(".hero-dot").forEach((d, idx) => {
    d.classList.toggle("active", idx === activeSlide);
  });
  if (userTriggered) restartHeroTimer();
}

function restartHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => setSlide(activeSlide + 1, false), 4500);
}

// ---------------- Build quick actions ----------------
function buildQuickActions() {
  const list = $("#quickActionsList");
  list.innerHTML = "";
  QUICK_ACTIONS.forEach((action) => {
    const li = document.createElement("li");
    li.className = "qa-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "qa-btn";
    btn.setAttribute("aria-label", I18N[lang].qa[action.key]);
    btn.innerHTML = `
        <img src="${action.src}" alt="" />
        <span class="qa-label" data-key="${action.key}">${I18N[lang].qa[action.key]}</span>
      `;
    btn.addEventListener("click", () => {
      if (action.key === "homecare") {
        const screen = document.getElementById("homeVisitScreen");
        if (screen) openInnerScreen(screen);
        return;
      }
      if (action.key === "hospitals") {
        const networkScreen = document.getElementById("networkScreen");
        if (networkScreen) {
          activeNetTab = "hospitals";
          setNetTab("hospitals");
          renderNetList("hospitals", "");
          buildNetworkBottomNav("networkTabs");
          const search = document.getElementById("netSearch");
          if (search) search.value = "";
          openInnerScreen(networkScreen);
        }
        return;
      }
      if (action.key === "dental") {
        const networkScreen = document.getElementById("networkScreen");
        if (networkScreen) {
          activeNetTab = "dental";
          setNetTab("dental");
          renderNetList("dental", "");
          buildNetworkBottomNav("networkTabs");
          const search = document.getElementById("netSearch");
          if (search) search.value = "";
          openInnerScreen(networkScreen);
        }
        return;
      }
      if (action.key === "pharmacies") {
        const networkScreen = document.getElementById("networkScreen");
        if (networkScreen) {
          activeNetTab = "pharmacies";
          setNetTab("pharmacies");
          renderNetList("pharmacies", "");
          buildNetworkBottomNav("networkTabs");
          const search = document.getElementById("netSearch");
          if (search) search.value = "";
          openInnerScreen(networkScreen);
        }
        return;
      }
      const label = I18N[lang].qa[action.key];
      showToast(I18N[lang].toast.actionSelected(label));
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// ---------------- Build bottom nav ----------------
function buildTabs() {
  const list = $("#bottomTabs");
  list.innerHTML = "";
  TABS.forEach((tab) => {
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (tab.key === activeTab ? " active" : "");
    btn.setAttribute("aria-current", tab.key === activeTab ? "page" : "false");
    btn.dataset.tab = tab.key;
    btn.innerHTML = `
        <img src="${tab.src}" alt="" />
        <span class="tab-label" data-key="${tab.key}">${I18N[lang].tabs[tab.key]}</span>
      `;
    btn.addEventListener("click", () => {
      if (tab.key === "more") {
        activeTab = "more";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "more";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
        buildMoreBottomNav("moreTabs");
        const moreScreen = document.getElementById("moreScreen");
        if (moreScreen) openInnerScreen(moreScreen);
        return;
      }
      if (tab.key === "wallet") {
        activeTab = "wallet";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "wallet";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
        buildWalletBottomNav("walletTabs");
        const walletScreen = document.getElementById("walletScreen");
        if (walletScreen) openInnerScreen(walletScreen);
        return;
      }
      if (tab.key === "map") {
        activeTab = "map";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "map";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
        buildMapBottomNav("mapTabs");
        const mapScreen = document.getElementById("mapScreen");
        if (mapScreen) openInnerScreen(mapScreen);
        return;
      }
      if (tab.key === "paid") {
        activeTab = "paid";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "paid";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
        buildPaidBottomNav("paidTabs");
        const paidScreen = document.getElementById("paidScreen");
        if (paidScreen) openInnerScreen(paidScreen);
        return;
      }
      activeTab = tab.key;
      document.querySelectorAll(".tab-btn").forEach((b) => {
        const isActive = b.dataset.tab === activeTab;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-current", isActive ? "page" : "false");
      });
      showToast(I18N[lang].toast.tabSelected(I18N[lang].tabs[tab.key]));
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

// ---------------- Membership screen ----------------
function buildMembershipTabs() {
  const list = $("#membershipTabs");
  if (!list) return;
  list.innerHTML = "";
  TABS.forEach((tab) => {
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (tab.key === activeTab ? " active" : "");
    btn.setAttribute("aria-current", tab.key === activeTab ? "page" : "false");
    btn.dataset.tab = tab.key;
    btn.innerHTML = `
        <img src="${tab.src}" alt="" />
        <span class="tab-label" data-key="${tab.key}">${I18N[lang].tabs[tab.key]}</span>
      `;
    btn.addEventListener("click", () => {
      if (tab.key === "home") {
        closeMembershipScreen();
      } else {
        showToast(I18N[lang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function openMembershipScreen() {
  const screen = $("#membershipScreen");
  if (!screen) return;
  screen.classList.add("is-open");
  screen.setAttribute("aria-hidden", "false");
  // Scroll to top
  const body = $("#membershipBody");
  if (body) body.scrollTop = 0;
}

function closeMembershipScreen() {
  const screen = $("#membershipScreen");
  if (!screen) return;
  screen.classList.remove("is-open");
  screen.setAttribute("aria-hidden", "true");
}

function setupMembershipScreen() {
  // Open on promo CTA
  const promoBtn = document.querySelector(".promo-btn");
  if (promoBtn) {
    promoBtn.addEventListener("click", openMembershipScreen);
  }
  // Back button
  const backBtn = $("#membershipBack");
  if (backBtn) {
    backBtn.addEventListener("click", closeMembershipScreen);
  }
  // Plan card selection
  document.querySelectorAll(".plan-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".plan-card").forEach((c) => {
        c.setAttribute("aria-checked", "false");
        c.classList.remove("selected");
      });
      card.setAttribute("aria-checked", "true");
      card.classList.add("selected");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
  // Next button
  const nextBtn = $("#msNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showToast(I18N[lang].toast.comingSoon);
    });
  }
  // Apply placeholder translations
  applyMembershipPlaceholders();
  // Build membership bottom nav
  buildMembershipTabs();
}

// ---- Paid Procedures Screen ----
function setupPaidScreen() {
  const screen = document.getElementById("paidScreen");
  if (!screen) return;

  // Back button closes screen
  const backBtn = document.getElementById("paidBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      screen.classList.remove("is-open");
      screen.setAttribute("aria-hidden", "true");
      activeTab = "home";
      document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
        const isHome = b.dataset.tab === "home";
        b.classList.toggle("active", isHome);
        b.setAttribute("aria-current", isHome ? "page" : "false");
      });
    });
  }

  // Wire detail + book buttons per card
  const cards = screen.querySelectorAll(".pd-card");
  cards.forEach((card, i) => {
    const proc = PROCEDURES[i];
    if (!proc) return;
    card.querySelector(".pd-btn-outline").addEventListener("click", () => openProcDetails(proc));
    card.querySelector(".pd-btn-primary").addEventListener("click", () => openProcBook(proc));
  });
}

function openProcDetails(proc) {
  currentProc = proc;
  const isAr = lang === "ar";
  // Title
  document.getElementById("pdetTitle").textContent = isAr ? proc.nameAr : proc.nameEn;
  // Hospital
  document.getElementById("pdetHospName").textContent = isAr ? proc.hospNameAr : proc.hospNameEn;
  document.getElementById("pdetAddr").textContent = isAr ? proc.addrAr : proc.addrEn;
  document.getElementById("pdetHours").textContent = isAr ? proc.hoursAr : proc.hoursEn;
  // Contact
  document.getElementById("pdetPhone").textContent = proc.phone;
  document.getElementById("pdetEmerg").textContent = proc.emergency;
  document.getElementById("pdetEmail").textContent = proc.email;
  // Dept
  document.getElementById("pdetDeptName").textContent = isAr ? proc.deptAr : proc.deptEn;
  document.getElementById("pdetDocName").textContent = isAr ? proc.doctorAr : proc.doctorEn;
  // Tags
  const tagsEl = document.getElementById("pdetTags");
  tagsEl.innerHTML = proc.tags.map((t) =>
    `<span class="pdet-tag ${t.cls}">${isAr ? t.textAr : t.textEn}</span>`
  ).join("");
  // Operation details
  document.getElementById("pdetDuration").textContent = isAr ? proc.durationAr : proc.durationEn;
  document.getElementById("pdetRecovery").textContent = isAr ? proc.recoveryAr : proc.recoveryEn;
  const prepItems = isAr ? proc.prepAr : proc.prepEn;
  document.getElementById("pdetPrepList").innerHTML = prepItems.map((p) => `<li>${p}</li>`).join("");
  // Footer prices
  document.getElementById("pdetFootOld").textContent = proc.origPrice;
  document.getElementById("pdetFootNew").textContent = proc.discPrice;
  document.getElementById("pdetFootDisc").textContent = proc.discPct + "%";
  // Open screen
  openInnerScreen(document.getElementById("procDetailsScreen"));
}

function openProcBook(proc) {
  currentProc = proc;
  const isAr = lang === "ar";
  const sarLabel = isAr ? "ط±ظٹط§ظ„" : "SAR";
  // Summary
  document.getElementById("pbkProcName").textContent = isAr ? proc.nameAr : proc.nameEn;
  document.getElementById("pbkOrigPrice").textContent = `${proc.origPrice} ${sarLabel}`;
  document.getElementById("pbkDiscPct").textContent = proc.discPct + "%";
  document.getElementById("pbkTotal").innerHTML = `${proc.discPrice} <span data-i18n="pd.sar">${sarLabel}</span>`;
  // Payment plan monthly amounts
  document.getElementById("pbkMonth6").textContent = proc.month6;
  document.getElementById("pbkMonth12").textContent = proc.month12;
  // Footer
  document.getElementById("pbkFootTotal").textContent = proc.discPrice;
  // Reset plan selection
  document.querySelectorAll(".pbk-plan-option").forEach((el, i) => {
    el.classList.toggle("pbk-plan-selected", i === 0);
    const chk = el.querySelector(".pbk-plan-check");
    chk.classList.toggle("pbk-plan-check-empty", i !== 0);
  });
  // Reset payment method
  document.querySelectorAll(".pbk-pay-btn").forEach((b) => b.classList.remove("pbk-pay-active"));
  const creditBtn = document.getElementById("pbkCredit");
  if (creditBtn) creditBtn.classList.add("pbk-pay-active");
  // Update placeholder text per language
  document.querySelectorAll(".pbk-input[data-ph-ar]").forEach((inp) => {
    inp.placeholder = isAr ? inp.dataset.phAr : inp.dataset.phEn;
  });
  openInnerScreen(document.getElementById("procBookScreen"));
}

// ---- Procedure Details Screen ----
function setupProcDetailsScreen() {
  const screen = document.getElementById("procDetailsScreen");
  if (!screen) return;

  // Back â†’ paid screen
  document.getElementById("pdetBack").addEventListener("click", () => {
    screen.classList.remove("is-open");
    screen.setAttribute("aria-hidden", "true");
  });

  // Book button at footer â†’ open booking screen
  document.getElementById("pdetBookBtn").addEventListener("click", () => {
    if (currentProc) openProcBook(currentProc);
  });

  // Collapsible sections
  screen.querySelectorAll(".pdet-collapse-hdr").forEach((hdr) => {
    hdr.addEventListener("click", () => {
      hdr.closest(".pdet-collapse").classList.toggle("is-open");
    });
  });
}

// ---- Booking Screen ----
function setupProcBookScreen() {
  const screen = document.getElementById("procBookScreen");
  if (!screen) return;

  // Back â†’ details screen (if came from details) or paid screen
  document.getElementById("pbkBack").addEventListener("click", () => {
    screen.classList.remove("is-open");
    screen.setAttribute("aria-hidden", "true");
  });

  // Payment plan selection
  screen.querySelectorAll(".pbk-plan-option").forEach((opt, i) => {
    opt.addEventListener("click", () => {
      screen.querySelectorAll(".pbk-plan-option").forEach((el, j) => {
        el.classList.toggle("pbk-plan-selected", j === i);
        const chk = el.querySelector(".pbk-plan-check");
        chk.classList.toggle("pbk-plan-check-empty", j !== i);
      });
    });
  });

  // Payment method selection
  screen.querySelectorAll(".pbk-pay-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      screen.querySelectorAll(".pbk-pay-btn").forEach((b) => b.classList.remove("pbk-pay-active"));
      btn.classList.add("pbk-pay-active");
    });
  });

  // Confirm button
  document.getElementById("pbkConfirmBtn").addEventListener("click", () => {
    showToast(I18N[lang].toast.comingSoon);
  });
}

// ---- Home Visit Screen ----
function setupHomeVisitScreen() {
  const screen = document.getElementById("homeVisitScreen");
  if (!screen) return;

  // Trigger: hv-cta button on home screen
  const hvCta = document.querySelector(".hv-cta");
  if (hvCta) hvCta.addEventListener("click", () => openInnerScreen(screen));

  // Back button
  document.getElementById("hvsBack").addEventListener("click", () => {
    screen.classList.remove("is-open");
    screen.setAttribute("aria-hidden", "true");
  });

  // Service card selection
  screen.querySelectorAll(".hvs-svc-card").forEach((card) => {
    card.addEventListener("click", () => {
      screen.querySelectorAll(".hvs-svc-card").forEach((c) => c.classList.remove("hvs-selected"));
      card.classList.add("hvs-selected");
    });
  });

  // Time slot selection
  screen.querySelectorAll(".hvs-time-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      screen.querySelectorAll(".hvs-time-btn").forEach((b) => b.classList.remove("hvs-time-active"));
      btn.classList.add("hvs-time-active");
    });
  });

  // Address placeholder per language
  const addrInput = document.getElementById("hvsAddress");
  if (addrInput) {
    addrInput.placeholder = lang === "ar" ? addrInput.dataset.phAr : addrInput.dataset.phEn;
  }

  // Confirm booking
  document.getElementById("hvsConfirmBtn").addEventListener("click", () => {
    showToast(I18N[lang].toast.comingSoon);
  });
}

// ---- All Services Screen ----
function setupAllServicesScreen() {
  const screen = document.getElementById("allServicesScreen");
  if (!screen) return;

  // Open: clicking "ط´ط§ظ‡ط¯ ط¬ظ…ظٹط¹ ط§ظ„ط®ط¯ظ…ط§طھ" card
  const freeServicesBtn = document.querySelector(".free-services");
  if (freeServicesBtn) {
    freeServicesBtn.addEventListener("click", () => openInnerScreen(screen));
  }

  // Close: back button
  const backBtn = document.getElementById("allServicesBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      screen.classList.remove("is-open");
      screen.setAttribute("aria-hidden", "true");
    });
  }

  // Category cards â†’ coming soon toast
  screen.querySelectorAll(".asv-card").forEach((card) => {
    card.addEventListener("click", () => showToast(I18N[lang].toast.comingSoon));
  });
}

function applyMembershipPlaceholders() {
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (key) el.placeholder = t(key);
  });
}

// ---------------- Status bar clock ----------------
function tickClock() {
  const el = $("#statusTime");
  if (!el) return;
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const hh = h % 12 === 0 ? 12 : h % 12;
  el.textContent = `${hh}:${m}`;
}

// ---------------- Hero swipe (touch) ----------------
function setupHeroSwipe() {
  const banner = document.querySelector(".hero-banner");
  if (!banner) return;
  let startX = 0;
  let dx = 0;
  let dragging = false;

  banner.addEventListener("touchstart", (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
    dx = 0;
  }, { passive: true });

  banner.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    dx = e.touches[0].clientX - startX;
  }, { passive: true });

  banner.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setSlide(activeSlide + 1, true);
      else setSlide(activeSlide - 1, true);
    }
  });
}

// ---------------- Language toggle ----------------
function doToggleLang() {
  lang = lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("ta_lang_ar", lang); } catch (e) { }
  applyDirAndLang();
  applyTranslations();
  applyMembershipPlaceholders();
  buildQuickActions();
  buildTabs();
  buildMembershipTabs();
  const searchEl = document.getElementById("netSearch");
  if (searchEl) searchEl.placeholder = I18N[lang]["net.searchPh"] || "";
  renderNetList(activeNetTab, searchEl ? searchEl.value : "");
  buildNetworkBottomNav("networkTabs");
  buildNetworkBottomNav("facilityTabs");
  if (activeFacility && document.getElementById("facilityScreen")?.classList.contains("is-open")) {
    openFacilityDetail(activeFacility);
  }
  buildNetworkBottomNav("centerDetailsTabs");
  if (activeFacility && document.getElementById("centerDetailsScreen")?.classList.contains("is-open")) {
    openCenterDetails(activeFacility);
  }
  buildMoreBottomNav("moreTabs");
  MORE_SUB_SCREENS.forEach((name) => buildMoreBottomNav(name + "Tabs"));
  buildWalletBottomNav("walletTabs");
  buildMapBottomNav("mapTabs");
  buildPaidBottomNav("paidTabs");
  updateSettingsLangVal();
  updateCityLabel();
  document.querySelectorAll(".city-item").forEach((item) => {
    const lbl = item.querySelector(".city-item-lbl");
    if (lbl) lbl.textContent = lang === "ar" ? item.dataset.cityAr : item.dataset.cityEn;
  });
  // Update home visit screen address placeholder
  const hvsAddr = document.getElementById("hvsAddress");
  if (hvsAddr) hvsAddr.placeholder = lang === "ar" ? hvsAddr.dataset.phAr : hvsAddr.dataset.phEn;
  // Update booking screen input placeholders
  document.querySelectorAll(".pbk-input[data-ph-ar]").forEach((inp) => {
    inp.placeholder = lang === "ar" ? inp.dataset.phAr : inp.dataset.phEn;
  });
}

function setupLanguageToggle() {
  // Language button removed from header â€” toggle now lives in Settings screen
}


/* ---------- Screen open/close helpers (mirror membership pattern) ---------- */
function openInnerScreen(screenEl) {
  screenEl.classList.add("is-open");
  screenEl.setAttribute("aria-hidden", "false");
  // Scroll body to top
  const body = screenEl.querySelector(".net-list, .fac-body, .cd-body, .more-body, .sub-body, .inner-body, .pd-body");
  if (body) body.scrollTop = 0;
}

function closeInnerScreen(screenEl) {
  screenEl.classList.remove("is-open");
  screenEl.setAttribute("aria-hidden", "true");
}

/* ---------- Build facility card HTML ---------- */
function buildFacilityCard(fac) {
  const lang = localStorage.getItem("ta_lang_ar") || "ar";
  const t = (obj) => (lang === "ar" ? obj.ar : obj.en);
  const viewLbl = lang === "ar" ? "عرض جميع الخدمات" : "View all services";

  const card = document.createElement("div");
  card.className = "fac-card";
  card.innerHTML = `
      <div class="fac-card-img">
        <div class="fac-card-img-inner" style="background:${fac.gradient}"></div>
        <div class="fac-card-discount">${fac.discount}% <span style="font-size:10px">${lang === "ar" ? "خصم" : "OFF"}</span></div>
      </div>
      <div class="fac-card-body">
        <div class="fac-card-rating">
          <span class="star">âک…</span>
          <span>${fac.rating}</span>
        </div>
        <h3 class="fac-card-name">${t(fac.name)}</h3>
        <div class="fac-card-meta">
          <div class="fac-card-meta-row">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${t(fac.location)}</span>
          </div>
          <div class="fac-card-meta-row">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.45a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>${fac.phone}</span>
          </div>
          <div class="fac-card-meta-row">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${t(fac.hours)}</span>
          </div>
        </div>
        <button class="fac-card-btn" type="button">${viewLbl}</button>
      </div>
    `;

  card.querySelector(".fac-card-btn").addEventListener("click", () => {
    openFacilityDetail(fac);
  });
  card.addEventListener("click", (e) => {
    if (!e.target.closest(".fac-card-btn")) openFacilityDetail(fac);
  });
  return card;
}

/* ---------- Render facilities list ---------- */
function renderNetList(tab, query) {
  const list = document.getElementById("netList");
  if (!list) return;
  list.innerHTML = "";
  const lang = localStorage.getItem("ta_lang_ar") || "ar";
  const q = (query || "").trim().toLowerCase();
  const filtered = FACILITIES.filter((f) => {
    if (f.tab !== tab) return false;
    if (!q) return true;
    const name = lang === "ar" ? f.name.ar : f.name.en;
    return name.toLowerCase().includes(q) || f.phone.includes(q);
  });
  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.style.cssText = "text-align:center;color:#9ca3af;font-size:13px;padding:24px 0;";
    empty.textContent = lang === "ar" ? "لا توجد نتائج" : "No results found";
    list.appendChild(empty);
  } else {
    filtered.forEach((fac) => list.appendChild(buildFacilityCard(fac)));
  }
}

/* ---------- Render facility detail ---------- */
function openFacilityDetail(fac) {
  activeFacility = fac;
  const lang = localStorage.getItem("ta_lang_ar") || "ar";
  const t = (obj) => (lang === "ar" ? obj.ar : obj.en);

  // Hero image
  const heroEl = document.getElementById("facHeroImg");
  if (heroEl) heroEl.style.background = fac.gradient;

  // Name
  const nameEl = document.getElementById("facName");
  if (nameEl) nameEl.textContent = t(fac.name);

  // Stats
  const statsEl = document.getElementById("facStats");
  if (statsEl) {
    const statsData = [
      { num: "1247", icon: "ًں‘پ", lbl: lang === "ar" ? "ط²ظٹط§ط±ط© ط§ظ„طµظپط­ط©" : "Page visits" },
      { num: "1247", icon: "â­گ", lbl: lang === "ar" ? "طھظ‚ظٹظٹظ…ط§طھ" : "Ratings" },
      { num: "340", icon: "ًں‘¤", lbl: lang === "ar" ? "ظ…طھط§ط¨ط¹ظˆظ†" : "Followers" },
    ];
    statsEl.innerHTML = statsData.map(s => `
        <div class="fac-stat">
          <span class="fac-stat-num">${s.num}</span>
          <span class="fac-stat-icon">${s.icon}</span>
          <span class="fac-stat-lbl">${s.lbl}</span>
        </div>
      `).join("");
  }

  // Services
  const svcEl = document.getElementById("facServices");
  if (svcEl) {
    svcEl.innerHTML = fac.services.map(svc => {
      const name = t(svc.name);
      const desc = t(svc.desc);
      const price = svc.price ? t(svc.price) : null;
      const orig = svc.origPrice ? t(svc.origPrice) : null;
      const save = svc.save ? t(svc.save) : null;

      const thumbContent = svc.discount
        ? `<span class="svc-thumb-icon">${svc.icon}</span>
             <div class="svc-discount-pill">${svc.discount}</div>
             <span class="svc-thumb-label">${lang === "ar" ? "ط®طµظ…" : "OFF"}</span>`
        : `<span class="svc-thumb-icon">${svc.icon}</span>
             ${price ? `<span class="svc-thumb-label" style="font-size:12px;font-weight:700;">${price}</span>` : ""}`;

      return `
          <div class="svc-card">
            <div class="svc-thumb" style="background:${svc.bg}">
              ${thumbContent}
            </div>
            <div class="svc-info">
              <span class="svc-name">${name}</span>
              ${desc ? `<span class="svc-desc">${desc}</span>` : ""}
              ${price && !svc.freeLabel ? `<span class="svc-price">${price}</span>` : ""}
              ${orig ? `<span class="svc-original-price">${orig}</span>` : ""}
              ${save ? `<span class="svc-save">${save}</span>` : ""}
            </div>
          </div>
        `;
    }).join("");
  }

  // Build bottom nav for facility screen
  buildNetworkBottomNav("facilityTabs");

  // Scroll to top
  const facBody = document.getElementById("facilityBody");
  if (facBody) facBody.scrollTop = 0;

  // Open facility screen on top of network screen (both inner-screens use CSS stacking)
  const facScreen = document.getElementById("facilityScreen");
  if (facScreen) {
    openInnerScreen(facScreen);
  }
}

/* ---------- Build bottom nav for inner network screens ---------- */
function buildNetworkBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const lang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[lang].tabs && I18N[lang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === activeTab ? " active" : "");
    btn.setAttribute("aria-current", key === activeTab ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        // Close all inner screens and go to home
        [document.getElementById("networkScreen"),
        document.getElementById("facilityScreen"),
        document.getElementById("centerDetailsScreen")]
          .forEach(s => s && closeInnerScreen(s));
      } else {
        showToast(I18N[lang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

/* ---------- Setup network screen ---------- */
function setupNetworkScreen() {
  const networkScreen = document.getElementById("networkScreen");
  const facilityScreen = document.getElementById("facilityScreen");
  if (!networkScreen || !facilityScreen) return;

  // Open network screen from home "ط¹ط±ط¶ ط§ظ„ط´ط¨ظƒط©" button
  document.querySelectorAll(".mn-cta").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeNetTab = "hospitals";
      setNetTab("hospitals");
      renderNetList("hospitals", "");
      buildNetworkBottomNav("networkTabs");
      const search = document.getElementById("netSearch");
      if (search) search.value = "";
      openInnerScreen(networkScreen);
    });
  });

  // Network screen back button â†’ home
  const networkBack = document.getElementById("networkBack");
  if (networkBack) {
    networkBack.addEventListener("click", () => {
      closeInnerScreen(networkScreen);
    });
  }

  // Facility screen back button â†’ network screen
  const facilityBack = document.getElementById("facilityBack");
  if (facilityBack) {
    facilityBack.addEventListener("click", () => {
      closeInnerScreen(facilityScreen);
    });
  }

  // Tab switching
  networkScreen.querySelectorAll(".net-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.netTab;
      activeNetTab = key;
      setNetTab(key);
      renderNetList(key, document.getElementById("netSearch")?.value || "");
    });
  });

  // Search input
  const searchInput = document.getElementById("netSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderNetList(activeNetTab, searchInput.value);
    });
  }

}

// ================================================================
// CENTER DETAILS SCREEN
// ================================================================


/* ---------- Build & open center details ---------- */
function openCenterDetails(fac) {
  const lang = localStorage.getItem("ta_lang_ar") || "ar";
  const t = (obj) => (obj && typeof obj === "object" ? (lang === "ar" ? obj.ar : obj.en) : obj);
  const details = FAC_DETAILS[fac.id] || {};

  // Image
  const imgEl = document.getElementById("cdImg");
  if (imgEl) imgEl.style.background = fac.gradient;

  // Name
  const nameEl = document.getElementById("cdName");
  if (nameEl) nameEl.textContent = t(fac.name);

  // Stats
  const statsEl = document.getElementById("cdStats");
  if (statsEl) {
    const statsData = [
      { num: "1247", icon: "ًں‘پ", lbl: lang === "ar" ? "زيارات الصفحة" : "Page visits" },
      { num: "1247", icon: "â­گ", lbl: lang === "ar" ? "التقييمات" : "Ratings" },
      { num: "340", icon: "ًں‘¤", lbl: lang === "ar" ? "المتابعون" : "Followers" },
    ];
    statsEl.innerHTML = statsData.map(s => `
        <div class="fac-stat">
          <span class="fac-stat-num">${s.num}</span>
          <span class="fac-stat-icon">${s.icon}</span>
          <span class="fac-stat-lbl">${s.lbl}</span>
        </div>
      `).join("");
  }

  // Update tab labels
  const tabDetails = document.getElementById("cdTabDetails");
  const tabDiscount = document.getElementById("cdTabDiscount");
  if (tabDetails) tabDetails.textContent = lang === "ar" ? "تفاصيل المركز" : "Center Details";
  if (tabDiscount) tabDiscount.textContent = lang === "ar" ? "نسبة الخصم" : "Discount Rate";

  // Contact info
  const contactEl = document.getElementById("cdContactList");
  if (contactEl) {
    const rows = [];
    (details.phones || []).forEach(phone => {
      rows.push(`
          <div class="cd-contact-row">
            <div class="cd-contact-icon" style="background:#dcfce7">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.45a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <span class="cd-contact-text">${phone}</span>
          </div>
        `);
    });
    if (details.whatsapp) {
      rows.push(`
          <div class="cd-contact-row">
            <div class="cd-contact-icon" style="background:#dcfce7">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            <span class="cd-contact-text">${details.whatsapp}</span>
          </div>
        `);
    }
    if (details.email) {
      rows.push(`
          <div class="cd-contact-row">
            <div class="cd-contact-icon" style="background:#dbeafe">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span class="cd-contact-text">${details.email}</span>
          </div>
        `);
    }
    if (details.hours) {
      rows.push(`
          <div class="cd-contact-row">
            <div class="cd-contact-icon" style="background:#fef3c7">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span class="cd-contact-text" style="direction:auto">${t(details.hours)}</span>
          </div>
        `);
    }
    contactEl.innerHTML = rows.join("");
  }

  // Rating
  const ratingEl = document.getElementById("cdRatingRow");
  if (ratingEl) {
    const r = fac.rating || 4.5;
    const fullStars = Math.floor(r);
    const halfStar = (r - fullStars) >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starSvg = (cls) => `<svg class="cd-star ${cls}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    ratingEl.innerHTML = `
        <span class="cd-rating-num">${r}</span>
        <div class="cd-rating-stars">
          ${"".concat(...Array(fullStars).fill(starSvg("")))}
          ${halfStar ? `<svg class="cd-star" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="#f59e0b"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half)"/></svg>` : ""}
          ${"".concat(...Array(emptyStars).fill(starSvg("empty")))}
        </div>
      `;
  }

  // Location
  const locEl = document.getElementById("cdLocationRow");
  if (locEl) {
    locEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" flex-shrink="0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${t(details.address) || ""}</span>
      `;
  }

  // Build bottom nav
  buildNetworkBottomNav("centerDetailsTabs");

  // Scroll to top
  const body = document.getElementById("cdBody");
  if (body) body.scrollTop = 0;

  // Open screen (stacked on facility screen)
  const facScreen = document.getElementById("facilityScreen");
  const cdScreen = document.getElementById("centerDetailsScreen");
  if (cdScreen) {
    openInnerScreen(cdScreen);
  }
}

/* ---------- Setup center details screen ---------- */
function setupCenterDetailsScreen() {
  // Back button â†’ facility screen
  const backBtn = document.getElementById("centerDetailsBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const cdScreen = document.getElementById("centerDetailsScreen");
      if (cdScreen) closeInnerScreen(cdScreen);
    });
  }

  // "ظ†ط³ط¨ط© ط§ظ„ط®طµظ…" tab â†’ go back to facility (discount) screen
  const tabDiscount = document.getElementById("cdTabDiscount");
  if (tabDiscount) {
    tabDiscount.addEventListener("click", () => {
      const cdScreen = document.getElementById("centerDetailsScreen");
      if (cdScreen) closeInnerScreen(cdScreen);
    });
  }

  // Wire up "طھظپط§طµظٹظ„ ط§ظ„ظ…ط±ظƒط²" button inside facility screen
  // This button is .fac-cta-secondary in #facilityScreen
  const facBody = document.getElementById("facilityBody");
  if (facBody) {
    const detailsBtn = facBody.querySelector(".fac-cta-secondary");
    if (detailsBtn) {
      detailsBtn.addEventListener("click", () => {
        if (activeFacility) openCenterDetails(activeFacility);
      });
    }
  }
}

/* ---------- Helper: set active tab style ---------- */
function setNetTab(key) {
  document.querySelectorAll(".net-tab").forEach((t) => {
    const isActive = t.dataset.netTab === key;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}


function closeAllMoreScreens() {
  const ids = ["loginScreen", "settingsScreen", "visitHistoryScreen", "myOrdersScreen",
    "planScreen", "favoritesScreen", "visitReportScreen", "digitalMembershipScreen",
    "membershipInfoScreen", "accountInfoScreen", "moreScreen", "walletScreen", "mapScreen", "notifScreen"];
  ids.forEach((id) => {
    const s = document.getElementById(id);
    if (s) closeInnerScreen(s);
  });
  activeTab = "home";
  document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
    const isActive = b.dataset.tab === "home";
    b.classList.toggle("active", isActive);
    b.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function buildMapBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[currentLang].tabs && I18N[currentLang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === "map" ? " active" : "");
    btn.setAttribute("aria-current", key === "map" ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        const ms = document.getElementById("mapScreen");
        if (ms) closeInnerScreen(ms);
        activeTab = "home";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "home";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
      } else if (key !== "map") {
        showToast(I18N[currentLang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function buildWalletBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[currentLang].tabs && I18N[currentLang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === "wallet" ? " active" : "");
    btn.setAttribute("aria-current", key === "wallet" ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        const ws = document.getElementById("walletScreen");
        if (ws) closeInnerScreen(ws);
        activeTab = "home";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "home";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
      } else if (key !== "wallet") {
        showToast(I18N[currentLang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function buildPaidBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[currentLang].tabs && I18N[currentLang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === "paid" ? " active" : "");
    btn.setAttribute("aria-current", key === "paid" ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        const ps = document.getElementById("paidScreen");
        if (ps) closeInnerScreen(ps);
        activeTab = "home";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "home";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
      } else if (key !== "paid") {
        showToast(I18N[currentLang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function buildMoreBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[currentLang].tabs && I18N[currentLang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === "more" ? " active" : "");
    btn.setAttribute("aria-current", key === "more" ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        closeAllMoreScreens();
      } else if (key !== "more") {
        showToast(I18N[currentLang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function updateSettingsLangVal() {
  const el = document.getElementById("settingsLangVal");
  if (el) el.textContent = lang === "ar" ? "العربية" : "English";
}

function setupMoreScreen() {
  // QR toggle
  const qrBtn = document.getElementById("qrToggleBtn");
  const qrArea = document.getElementById("qrExpandedArea");
  if (qrBtn && qrArea) {
    qrBtn.addEventListener("click", () => {
      const willOpen = qrArea.hidden;
      qrArea.hidden = !willOpen;
      qrBtn.classList.toggle("open", willOpen);
      qrBtn.setAttribute("aria-expanded", String(willOpen));
    });
  }

  // Profile avatar â†’ digital membership (open moreScreen underneath, then digitalMembership on top)
  document.querySelectorAll(".profile-wrap").forEach((wrap) => {
    wrap.style.cursor = "pointer";
    wrap.addEventListener("click", () => {
      const moreScr = document.getElementById("moreScreen");
      if (moreScr) { buildMoreBottomNav("moreTabs"); openInnerScreen(moreScr); }
      buildMoreBottomNav("digitalMembershipTabs");
      const dmScr = document.getElementById("digitalMembershipScreen");
      if (dmScr) openInnerScreen(dmScr);
    });
  });

  // Menu items: data-open attribute â†’ open corresponding screen
  document.querySelectorAll(".mmi[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const screenId = btn.dataset.open;
      const screen = document.getElementById(screenId);
      if (!screen) return;
      // Derive tab ul id: e.g. "accountInfoScreen" â†’ "accountInfoTabs"
      const ulId = screenId.replace("Screen", "Tabs");
      buildMoreBottomNav(ulId);
      openInnerScreen(screen);
    });
  });

  // Logout button (also has data-open="loginScreen")
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      buildMoreBottomNav("loginTabs");
      const screen = document.getElementById("loginScreen");
      if (screen) openInnerScreen(screen);
    });
  }

  // Back buttons for all sub-screens â†’ close sub, stay on moreScreen
  MORE_SUB_SCREENS.forEach((name) => {
    const backBtn = document.getElementById(name + "Back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        const screen = document.getElementById(name + "Screen");
        if (screen) closeInnerScreen(screen);
      });
    }
  });

  // Generic toggle handler for ALL si-toggle elements (notifications, dark mode, etc.)
  document.querySelectorAll(".si-toggle[role='switch']").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isOn = toggle.getAttribute("aria-checked") === "true";
      toggle.setAttribute("aria-checked", isOn ? "false" : "true");
    });
  });

  // Settings language button â†’ toggle language directly
  const stgLangBtn = document.getElementById("stgLangBtn");
  if (stgLangBtn) {
    stgLangBtn.addEventListener("click", () => {
      doToggleLang();
    });
  }

  // Settings arrow rows â†’ coming soon
  document.querySelectorAll("#settingsScreen .stg-arrow-row").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(I18N[lang].toast.comingSoon);
    });
  });

  // Action buttons in sub-screens (edit, renew, upgrade, share, login, logout)
  document.querySelectorAll(".full-blue-btn, .full-outline-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(I18N[lang].toast.comingSoon);
    });
  });

  // Favorites heart buttons
  document.querySelectorAll(".fav-heart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      showToast(I18N[lang].toast.comingSoon);
    });
  });

  updateSettingsLangVal();
}

// ================================================================
// MAP SCREEN
// ================================================================
function setupMapScreen() {
  // Back button
  const backBtn = document.getElementById("mapBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const ms = document.getElementById("mapScreen");
      if (ms) closeInnerScreen(ms);
      activeTab = "home";
      document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
        const isActive = b.dataset.tab === "home";
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-current", isActive ? "page" : "false");
      });
    });
  }

  // Category filter buttons
  document.querySelectorAll("#mapScreen .map-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#mapScreen .map-cat-btn").forEach((b) =>
        b.classList.remove("map-cat-active")
      );
      btn.classList.add("map-cat-active");
    });
  });

  // Filter button & search input â†’ toast
  const filterBtn = document.querySelector("#mapScreen .map-filter-btn");
  if (filterBtn) filterBtn.addEventListener("click", () => showToast(t("toast.comingSoon")));

  const searchInp = document.querySelector("#mapScreen .map-search-inp");
  if (searchInp) searchInp.addEventListener("focus", () => showToast(t("toast.comingSoon")));

  // Map pins â†’ toast
  document.querySelectorAll("#mapScreen .map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const lbl = pin.querySelector(".map-pin-lbl");
      showToast(lbl ? lbl.textContent : t("toast.comingSoon"));
    });
  });

  // Strip cards â†’ toast
  document.querySelectorAll("#mapScreen .map-strip-card").forEach((card) => {
    card.addEventListener("click", () => {
      const nm = card.querySelector(".map-strip-name");
      showToast(nm ? nm.textContent : t("toast.comingSoon"));
    });
  });
}

// ================================================================
// WALLET SCREEN
// ================================================================
function setupWalletScreen() {
  // Back button â†’ close wallet, return home
  const backBtn = document.getElementById("walletBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const ws = document.getElementById("walletScreen");
      if (ws) closeInnerScreen(ws);
      activeTab = "home";
      document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
        const isActive = b.dataset.tab === "home";
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-current", isActive ? "page" : "false");
      });
    });
  }

  // Action buttons â†’ toast
  ["wltShareBtn", "wltDownloadBtn", "wltQrBtn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => showToast(t("toast.comingSoon")));
  });
}

// ================================================================
// NOTIFICATIONS SCREEN
// ================================================================
function buildNotifBottomNav(ulId) {
  const ul = document.getElementById(ulId);
  if (!ul) return;
  ul.innerHTML = "";
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  TABS.forEach(({ key, src }) => {
    const label = (I18N[currentLang].tabs && I18N[currentLang].tabs[key]) || key;
    const li = document.createElement("li");
    li.className = "tab-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-btn" + (key === "home" ? " active" : "");
    btn.setAttribute("aria-current", key === "home" ? "page" : "false");
    btn.dataset.tab = key;
    btn.innerHTML = `<img src="${src}" alt="" aria-hidden="true" class="tab-icon"><span class="tab-label">${label}</span>`;
    btn.addEventListener("click", () => {
      if (key === "home") {
        const ns = document.getElementById("notifScreen");
        if (ns) closeInnerScreen(ns);
        activeTab = "home";
        document.querySelectorAll("#bottomTabs .tab-btn").forEach((b) => {
          const isActive = b.dataset.tab === "home";
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-current", isActive ? "page" : "false");
        });
      } else {
        showToast(I18N[currentLang].toast.comingSoon);
      }
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function setupNotifScreen() {
  // Back button â†’ close screen
  const backBtn = document.getElementById("notifBack");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const ns = document.getElementById("notifScreen");
      if (ns) closeInnerScreen(ns);
    });
  }

  // Bell button â†’ open notifications screen
  document.querySelectorAll(".bell-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      buildNotifBottomNav("notifTabs");
      const ns = document.getElementById("notifScreen");
      if (ns) openInnerScreen(ns);
    });
  });

  // Tapping a notification marks it as read
  document.querySelectorAll("#notifScreen .notif-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.remove("notif-unread");
      const dot = card.querySelector(".notif-dot");
      if (dot) dot.remove();
      // Update badge count
      updateBellBadge();
    });
  });
}

function updateBellBadge() {
  const unreadCount = document.querySelectorAll("#notifScreen .notif-unread").length;
  document.querySelectorAll(".bell-badge").forEach((badge) => {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = "";
    } else {
      badge.style.display = "none";
    }
  });
}

function openCitySheet() {
  const overlay = document.getElementById("cityOverlay");
  if (overlay) {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
  }
}

function closeCitySheet() {
  const overlay = document.getElementById("cityOverlay");
  if (overlay) {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
  }
}

function updateCityLabel() {
  const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
  const label = currentLang === "ar" ? selectedCity.ar : selectedCity.en;
  document.querySelectorAll(".city-name").forEach((el) => {
    el.textContent = label;
  });
}

function setupCitySheet() {
  // Open on city-pill click
  
  document.querySelectorAll(".city-pill").forEach((btn) => {
    btn.addEventListener("click", openCitySheet);
  });

  // Close on X button
  const closeBtn = document.getElementById("citySheetClose");
  if (closeBtn) closeBtn.addEventListener("click", closeCitySheet);

  // Close on overlay backdrop click (not on sheet itself)
  const overlay = document.getElementById("cityOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCitySheet();
    });
  }

  // City item selection
  document.querySelectorAll(".city-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectedCity = {
        ar: item.dataset.cityAr,
        en: item.dataset.cityEn,
      };
      // Update selection UI
      document.querySelectorAll(".city-item").forEach((el) => {
        const isSelected = el === item;
        el.classList.toggle("city-item-selected", isSelected);
        const radio = el.querySelector(".city-radio");
        if (radio) radio.classList.toggle("city-radio-on", isSelected);
        const lbl = el.querySelector(".city-item-lbl");
        if (lbl) {
          const currentLang = localStorage.getItem("ta_lang_ar") || "ar";
          lbl.textContent = currentLang === "ar" ? el.dataset.cityAr : el.dataset.cityEn;
        }
      });
      updateCityLabel();
      closeCitySheet();
    });
  });

  // Apply initial label
  updateCityLabel();

  // Update city item labels on language change (called from doToggleLang)
  document.getElementById("cityList")?.querySelectorAll(".city-item").forEach((item) => {
    item.querySelector(".city-item-lbl").textContent =
      (localStorage.getItem("ta_lang_ar") || "ar") === "ar"
        ? item.dataset.cityAr
        : item.dataset.cityEn;
  });
}


   applyDirAndLang();
   applyTranslations();

  buildHero();
  buildQuickActions();
  buildTabs();

  setupMembershipScreen();
   setupPaidScreen();
  // setupNetworksScreen();
  setupWalletScreen();
   setupNotifScreen();
   setupCitySheet();

   tickClock();
   setupHeroSwipe();
   setupLanguageToggle();
  
}
