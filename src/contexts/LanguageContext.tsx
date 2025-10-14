import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.about': { ar: 'من نحن', en: 'About' },
  'nav.services': { ar: 'خدماتنا', en: 'Services' },
  'nav.products': { ar: 'منتجاتنا', en: 'Products' },
  'nav.partners': { ar: 'شركاؤنا', en: 'Partners' },
  'nav.gallery': { ar: 'المعرض', en: 'Gallery' },
  'nav.contact': { ar: 'اتصل بنا', en: 'Contact' },

  // Hero Section
  'hero.title': { 
    ar: 'شركة متخصصة في تقديم حلول متكاملة للطاقة الشمسية، تهدف إلى توفير الطاقة النظيفة والمستدامة', 
    en: 'A company specialized in providing integrated solar energy solutions, aiming to deliver clean and sustainable energy' 
  },
  'hero.subtitle': { 
    ar: 'نحن متخصصون في تقديم حلول الطاقة الشمسية المتكاملة والمبتكرة لجميع القطاعات', 
    en: 'We specialize in providing integrated and innovative solar energy solutions for all sectors' 
  },
  'hero.cta': { ar: 'اكتشف خدماتنا', en: 'Discover Our Services' },
  'hero.contact': { ar: 'تواصل معنا', en: 'Contact Us' },

  // About Section
  'about.title': { ar: 'من نحن', en: 'About Us' },
  'about.subtitle': { 
    ar: 'شركة رائدة في مجال الطاقة الشمسية', 
    en: 'A leading company in solar energy' 
  },
  'about.description': { 
    ar: 'شركة النظم المتطورة للطاقة الشمسية هي شركة متخصصة في تقديم حلول الطاقة الشمسية المتكاملة والمبتكرة. نحن نعمل على توفير أنظمة طاقة شمسية عالية الجودة وموثوقة لمختلف القطاعات السكنية والتجارية والصناعية.', 
    en: 'Advanced Solar Energy Systems Company specializes in providing integrated and innovative solar energy solutions. We work to provide high-quality and reliable solar energy systems for various residential, commercial, and industrial sectors.' 
  },
  // Brand
  // 'brand.name': { ar: 'فرست سن إنرجي', en: 'First Sun Energy' },
  
  // About - Detailed content
  'about.heading': { ar: 'عن شركة فرست سن إنرجي', en: 'About First Sun Energy' },
  'about.p1': { 
    ar: 'فرست سن إنرجي هي شركة متخصصة في تقديم حلول متكاملة للطاقة الشمسية، تأسست على رؤية واضحة لتحقيق كفاءة عالية في استغلال الموارد الشمسية. نتمتع بخبرة طويلة في تصميم وتنفيذ مشاريع الطاقة الشمسية لمختلف الاستخدامات السكنية، التجارية، والصناعية.', 
    en: 'First Sun Energy is specialized in providing end-to-end solar energy solutions, founded on a clear vision to maximize solar resource efficiency. We have extensive experience designing and executing solar projects for residential, commercial, and industrial uses.' 
  },
  'about.p2': { 
    ar: 'فريق عملنا المتنوع يتألف من مهندسين متخصصين في الهندسة الكهربائية والميكانيكية والطاقات المتجددة، يتمتعون بخبرة كبيرة في تصميم حلول مخصصة بدءًا من المشاريع الصغيرة وصولًا إلى المشاريع الضخمة.', 
    en: 'Our diverse team consists of engineers specialized in electrical, mechanical, and renewable energy disciplines, with strong experience crafting tailored solutions from small installations to large-scale projects.' 
  },
  'about.p3': { 
    ar: 'نلتزم بتقديم حلول مبتكرة ومستدامة، جودة عالية وفق أعلى المعايير الدولية، والالتزام بالمواعيد لرضا عملائنا. نحن شريك موثوق يعمل جاهدًا لتعزيز الانتقال نحو الطاقة النظيفة والمستدامة في المنطقة.', 
    en: 'We are committed to innovative, sustainable solutions, high quality to international standards, and on-time delivery to ensure customer satisfaction. We are a trusted partner driving the transition to clean, sustainable energy.' 
  },
  'about.stats.projects': { ar: 'مشروع منفذ', en: 'Projects Completed' },
  'about.stats.experience': { ar: 'سنوات خبرة', en: 'Years of Experience' },
  'about.image.alt': { ar: 'مبنى شركة فرست سن إنرجي', en: 'First Sun Energy company building' },

  // Services Section
  'services.title': { ar: 'خدماتنا المتكاملة في الطاقة الشمسية', en: 'Our Comprehensive Solar Energy Services' },
  'services.subtitle': { 
    ar: 'نقدم مجموعة شاملة من الخدمات المتخصصة في الطاقة الشمسية لتلبية جميع احتياجاتكم', 
    en: 'We offer a comprehensive range of specialized solar energy services to meet all your needs' 
  },
  'services.design.title': { 
    ar: 'تصميم وتنفيذ مشاريع الطاقة الشمسية', 
    en: 'Solar Energy Project Design and Implementation' 
  },
  'services.design.description': { 
    ar: 'دراسة جدوى، تصميم هندسي، وتركيب أنظمة شمسية لمختلف القطاعات، بدءًا من السكنات الفردية وصولًا إلى المشاريع الكبرى.', 
    en: 'Feasibility studies, engineering design, and installation of solar systems for various sectors, from individual residences to major projects.' 
  },
  'services.battery.title': { 
    ar: 'تركيب وتشغيل أنظمة البطاريات', 
    en: 'Battery System Installation and Operation' 
  },
  'services.battery.description': { 
    ar: 'حلول تخزين طاقة متقدمة لضمان توفر الطاقة عند الحاجة، مع فريق متخصص في حساب كميات الطاقة المطلوبة وتصميم الأنظمة.', 
    en: 'Advanced energy storage solutions to ensure power availability when needed, with a specialized team in calculating required energy quantities and system design.' 
  },
  'services.offgrid.title': { 
    ar: 'حلول مستقلة وخارج الشبكة (Off-Grid)', 
    en: 'Independent and Off-Grid Solutions' 
  },
  'services.offgrid.description': { 
    ar: 'توفير أنظمة طاقة شمسية مستقلة تلبي احتياجات المناطق التي لا تتوفر فيها شبكة الكهرباء.', 
    en: 'Providing independent solar energy systems that meet the needs of areas without electrical grid access.' 
  },
  'services.equipment.title': { 
    ar: 'توفير المعدات والمستلزمات', 
    en: 'Equipment and Supplies Provision' 
  },
  'services.equipment.description': { 
    ar: 'نوفر ألواحًا شمسية عالية الجودة، بطاريات ليثيوم متطورة، وعواكس (إنفرتر) من أفضل العلامات التجارية العالمية، بالإضافة إلى عدادات ذكية.', 
    en: 'We provide high-quality solar panels, advanced lithium batteries, and inverters from the best global brands, in addition to smart meters.' 
  },
  'services.support.title': { 
    ar: 'دعم فني وتدريب مستمر', 
    en: 'Technical Support and Continuous Training' 
  },
  'services.support.description': { 
    ar: 'خدمات صيانة وإصلاح الأنظمة الشمسية، بالإضافة إلى الدعم الفني والتدريب المتقدم لضمان استمرارية وكفاءة التشغيل.', 
    en: 'Solar system maintenance and repair services, in addition to technical support and advanced training to ensure operational continuity and efficiency.' 
  },
  'services.consultation.title': { 
    ar: 'استشارات ومشورة فنية', 
    en: 'Technical Consultation and Advisory' 
  },
  'services.consultation.description': { 
    ar: 'فريق هندسي متخصص يقدم أفضل الحلول لتقدير التكلفة وتصميم النظام وفقًا لأعلى المعايير، بالتعاون مع أكبر الشركات الاستشارية.', 
    en: 'A specialized engineering team provides the best solutions for cost estimation and system design according to the highest standards, in collaboration with major consulting companies.' 
  },

  // Contact Section
  'contact.title': { ar: 'تواصل معنا', en: 'Contact Us' },
  'contact.subtitle': { 
    ar: 'نحن هنا لمساعدتكم في جميع استفساراتكم حول الطاقة الشمسية', 
    en: 'We are here to help you with all your solar energy inquiries' 
  },
  'contact.name': { ar: 'الاسم', en: 'Name' },
  'contact.email': { ar: 'البريد الإلكتروني', en: 'Email' },
  'contact.message': { ar: 'الرسالة', en: 'Message' },
  'contact.send': { ar: 'إرسال الرسالة', en: 'Send Message' },
  'contact.phone': { ar: 'الهاتف', en: 'Phone' },
  'contact.address': { ar: 'العنوان', en: 'Address' },
  'contact.infoHeading': { ar: 'معلومات التواصل', en: 'Contact Information' },
  'contact.mapHeading': { ar: 'موقعنا على الخريطة', en: 'Our Location' },
  'contact.primaryEmail': { ar: 'البريد الإلكتروني الرئيسي', en: 'Primary Email' },
  'contact.generalInfo': { ar: 'معلومات عامة', en: 'General Information' },
  'contact.maintenance': { ar: 'الصيانة', en: 'Maintenance' },
  'contact.purchases': { ar: 'المشتريات', en: 'Purchases' },
  'contact.sales': { ar: 'المبيعات', en: 'Sales' },
  'contact.street': { ar: 'شارع الأربعين، بيت بوس، صنعاء', en: 'Al-Arbaeen Street, Sana\'a' },
  'contact.cityCountry': { ar: 'صنعاء، اليمن', en: 'Sana\'a, Yemen' },

  // Footer
  'footer.company': { ar: 'شركة النظم المتطورة للطاقة الشمسية', en: 'Advanced Solar Energy Systems Company' },
  'footer.description': { 
    ar: 'نحن شركة رائدة في مجال الطاقة الشمسية، نقدم حلولاً مبتكرة ومستدامة لمستقبل أفضل.', 
    en: 'We are a leading company in solar energy, providing innovative and sustainable solutions for a better future.' 
  },
  'footer.tagline': { 
    ar: 'شريكك نحو طاقة نظيفة ومستقبل مستدام. نتخصص في حلول الطاقة الشمسية المتكاملة لجميع القطاعات السكنية والتجارية والصناعية.',
    en: 'Your partner for clean energy and a sustainable future. We specialize in integrated solar solutions for residential, commercial, and industrial sectors.'
  },
  'footer.quickLinks': { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.contact': { ar: 'تواصل معنا', en: 'Contact' },
  'footer.rights': { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  'social.facebook': { ar: 'فيسبوك', en: 'Facebook' },
  'social.instagram': { ar: 'إنستجرام', en: 'Instagram' },

  // Products Section
  'products.title': { ar: 'منتجاتنا المتخصصة', en: 'Our Specialized Products' },
  'products.subtitle': { ar: 'نقدم مجموعة شاملة من المنتجات عالية الجودة لأنظمة الطاقة الشمسية', en: 'We offer a comprehensive range of high-quality products for solar energy systems' },
  
  'products.panels.badge': { ar: 'الأكثر شعبية', en: 'Most Popular' },
  'products.panels.title': { ar: 'الألواح الشمسية عالية الكفاءة', en: 'High-Efficiency Solar Panels' },
  'products.panels.description': { ar: 'ألواح شمسية من أحدث التقنيات بكفاءة عالية ومتانة استثنائية لتوليد أقصى قدر من الطاقة', en: 'Latest technology solar panels with high efficiency and exceptional durability for maximum power generation' },
  
  'products.inverters.badge': { ar: 'تقنية متقدمة', en: 'Advanced Technology' },
  'products.inverters.title': { ar: 'العواكس الذكية (إنفرتر)', en: 'Smart Inverters' },
  'products.inverters.description': { ar: 'عواكس ذكية بتقنيات متطورة لتحويل التيار المستمر إلى متردد بكفاءة عالية ومراقبة ذكية', en: 'Smart inverters with advanced technologies for converting DC to AC with high efficiency and intelligent monitoring' },
  
  'products.batteries.badge': { ar: 'طويل المدى', en: 'Long-lasting' },
  'products.batteries.title': { ar: 'بطاريات الليثيوم المتطورة', en: 'Advanced Lithium Batteries' },
  'products.batteries.description': { ar: 'بطاريات ليثيوم عالية السعة مع دورات شحن طويلة وأمان عالي لتخزين الطاقة الشمسية', en: 'High-capacity lithium batteries with long charge cycles and high safety for solar energy storage' },
  
  'products.systems.badge': { ar: 'حل متكامل', en: 'Complete Solution' },
  'products.systems.title': { ar: 'الأنظمة المتكاملة خارج الشبكة', en: 'Complete Off-Grid Systems' },
  'products.systems.description': { ar: 'أنظمة طاقة شمسية متكاملة ومستقلة مصممة خصيصاً للمناطق النائية والتطبيقات الخاصة', en: 'Complete and independent solar energy systems specially designed for remote areas and special applications' },
  
  'products.meters.badge': { ar: 'ذكي', en: 'Smart' },
  'products.meters.title': { ar: 'العدادات الذكية', en: 'Smart Meters' },
  'products.meters.description': { ar: 'عدادات ذكية متطورة لمراقبة وإدارة استهلاك الطاقة بدقة عالية مع إمكانية التحكم عن بُعد', en: 'Advanced smart meters for monitoring and managing energy consumption with high accuracy and remote control capabilities' },
  
  'products.accessories.badge': { ar: 'ملحقات', en: 'Accessories' },
  'products.accessories.title': { ar: 'الإكسسوارات والملحقات', en: 'Accessories and Components' },
  'products.accessories.description': { ar: 'مجموعة شاملة من الملحقات والمكونات اللازمة لتركيب وتشغيل أنظمة الطاقة الشمسية بكفاءة', en: 'Comprehensive range of accessories and components needed for efficient installation and operation of solar energy systems' },
  
  'products.rjetech.badge': { ar: 'متقدم', en: 'Advanced' },
  'products.rjetech.title': { ar: 'RJEtech', en: 'RJEtech' },
  'products.rjetech.description': { ar: 'حلول تقنية متطورة ومعدات عالية الجودة لأنظمة الطاقة الشمسية بأحدث التقنيات', en: 'Advanced technical solutions and high-quality equipment for solar energy systems with cutting-edge technology' },
  
  'products.danmi.badge': { ar: 'موثوق', en: 'Reliable' },
  'products.danmi.title': { ar: 'DANMI', en: 'DANMI' },
  'products.danmi.description': { ar: 'منتجات موثوقة وعالية الأداء لأنظمة الطاقة الشمسية مع ضمان طويل المدى', en: 'Reliable and high-performance products for solar energy systems with long-term warranty' },

  // Partners Section
  'partners.title': { ar: 'شركاء النجاح حول العالم', en: 'Global Success Partners' },
  'partners.subtitle': { ar: 'نتعاون مع أفضل الشركات العالمية لنقدم لكم أجود المنتجات والحلول', en: 'We collaborate with the world\'s best companies to provide you with the finest products and solutions' },
  
  // Auth Page
  'auth.title': {
    ar: 'دخول المشرف',
    en: 'Admin Access'
  },
  'auth.description': {
    ar: 'سجل الدخول لإدارة محتوى موقعك',
    en: 'Sign in to manage your website content'
  },
  'auth.signin': {
    ar: 'تسجيل الدخول',
    en: 'Sign In'
  },
  'auth.signup': {
    ar: 'إنشاء حساب',
    en: 'Sign Up'
  },
  'auth.email': {
    ar: 'البريد الإلكتروني',
    en: 'Email'
  },
  'auth.password': {
    ar: 'كلمة المرور',
    en: 'Password'
  },
  'auth.signinButton': {
    ar: 'تسجيل الدخول',
    en: 'Sign In'
  },
  'auth.signupButton': {
    ar: 'إنشاء حساب',
    en: 'Create Account'
  },
  'auth.signinLoading': {
    ar: 'جاري تسجيل الدخول...',
    en: 'Signing in...'
  },
  'auth.signupLoading': {
    ar: 'جاري إنشاء الحساب...',
    en: 'Creating account...'
  },
  
  // Dashboard Page
  'dashboard.loading': {
    ar: 'جاري التحميل...',
    en: 'Loading...'
  },
  'dashboard.accessDenied': {
    ar: 'تم رفض الوصول',
    en: 'Access Denied'
  },
  'dashboard.accessDeniedDesc': {
    ar: 'ليس لديك صلاحيات المشرف. يرجى الاتصال بالمسؤول.',
    en: "You don't have admin permissions. Please contact the administrator."
  },
  'dashboard.signOut': {
    ar: 'تسجيل الخروج',
    en: 'Sign Out'
  },
  'dashboard.title': {
    ar: 'لوحة تحكم المحتوى',
    en: 'Content Dashboard'
  },
  'dashboard.subtitle': {
    ar: 'إدارة محتوى موقعك',
    en: 'Manage your website content'
  },
  'dashboard.overview': {
    ar: 'نظرة عامة',
    en: 'Overview'
  },
  'dashboard.translations': {
    ar: 'الترجمات',
    en: 'Translations'
  },
  'dashboard.gallery': {
    ar: 'المعرض',
    en: 'Gallery'
  },
  'dashboard.products': {
    ar: 'المنتجات',
    en: 'Products'
  },
  'dashboard.partners': {
    ar: 'الشركاء',
    en: 'Partners'
  },
  'dashboard.hero': {
    ar: 'القسم الرئيسي',
    en: 'Hero'
  },
  'dashboard.about': {
    ar: 'من نحن',
    en: 'About'
  },
  'dashboard.contact': {
    ar: 'اتصل بنا',
    en: 'Contact'
  },
  'dashboard.manage': {
    ar: 'إدارة',
    en: 'Manage'
  },
  'dashboard.arabicEnglishText': {
    ar: 'النصوص العربية والإنجليزية',
    en: 'Arabic & English text'
  },
  'dashboard.galleryItems': {
    ar: 'عناصر المعرض',
    en: 'Gallery items'
  },
  'dashboard.mainProducts': {
    ar: 'المنتجات الرئيسية',
    en: 'Main Products'
  },
  'dashboard.items': {
    ar: 'عناصر',
    en: 'Items'
  },
  'dashboard.featuredProducts': {
    ar: 'المنتجات المميزة',
    en: 'Featured products'
  },
  'dashboard.partnerLogos': {
    ar: 'شعارات الشركاء',
    en: 'Partner logos'
  },
  'dashboard.welcomeTitle': {
    ar: 'مرحباً في لوحة التحكم',
    en: 'Welcome to Your Dashboard'
  },
  'dashboard.welcomeDesc': {
    ar: 'إدارة جميع محتوى موقعك من مكان واحد. يتم حفظ التغييرات فوراً في قاعدة البيانات.',
    en: 'Manage all your website content from one place. Changes are saved instantly to the database.'
  },
  'dashboard.useTabsAbove': {
    ar: 'استخدم علامات التبويب أعلاه للتنقل بين أقسام المحتوى المختلفة:',
    en: 'Use the tabs above to navigate between different content sections:'
  },
  'dashboard.translationsDesc': {
    ar: 'تحرير جميع النصوص بالعربية والإنجليزية',
    en: 'Edit all text in Arabic and English'
  },
  'dashboard.galleryDesc': {
    ar: 'إدارة منتجات المعرض مع الصور',
    en: 'Manage gallery products with images'
  },
  'dashboard.productsDesc': {
    ar: 'تحرير عناصر عرض المنتجات الرئيسية',
    en: 'Edit main product showcase items'
  },
  'dashboard.partnersDesc': {
    ar: 'إضافة/تحرير شعارات الشركاء',
    en: 'Add/edit partner logos'
  },
  'dashboard.sectionsDesc': {
    ar: 'تحديث أقسام الصفحة',
    en: 'Update page sections'
  },
  'dashboard.translationsManager': {
    ar: 'مدير الترجمات',
    en: 'Translations Manager'
  },
  'dashboard.editTextContent': {
    ar: 'تحرير محتوى النص بالعربية والإنجليزية',
    en: 'Edit text content in Arabic and English'
  },
  'dashboard.galleryProducts': {
    ar: 'منتجات المعرض',
    en: 'Gallery Products'
  },
  'dashboard.manageGallery': {
    ar: 'إدارة عناصر منتجات المعرض',
    en: 'Manage gallery product items'
  },
  'dashboard.editFeatured': {
    ar: 'تحرير المنتجات المميزة',
    en: 'Edit featured products'
  },
  'dashboard.managePartners': {
    ar: 'إدارة شعارات الشركاء',
    en: 'Manage partner logos'
  },
  'dashboard.heroSection': {
    ar: 'القسم الرئيسي',
    en: 'Hero Section'
  },
  'dashboard.editHero': {
    ar: 'تحرير محتوى القسم الرئيسي',
    en: 'Edit homepage hero content'
  },
  'dashboard.aboutSection': {
    ar: 'قسم من نحن',
    en: 'About Section'
  },
  'dashboard.editAbout': {
    ar: 'تحرير محتوى صفحة من نحن',
    en: 'Edit about page content'
  },
  'dashboard.contactInfo': {
    ar: 'معلومات الاتصال',
    en: 'Contact Information'
  },
  'dashboard.editContact': {
    ar: 'تحرير تفاصيل الاتصال',
    en: 'Edit contact details'
  },
  'dashboard.comingSoon': {
    ar: 'قريباً...',
    en: 'coming soon...'
  },
  'dashboard.6Items': {
    ar: '6 عناصر',
    en: '6 Items'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};