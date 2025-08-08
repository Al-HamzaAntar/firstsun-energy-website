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
    ar: 'مرحباً بكم في شركة النظم المتطورة للطاقة الشمسية', 
    en: 'Welcome to Advanced Solar Energy Systems Company' 
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
  'brand.name': { ar: 'فرست سن إنرجي', en: 'First Sun Energy' },
  
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
  'social.instagram': { ar: 'إنستجرام', en: 'Instagram' }
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