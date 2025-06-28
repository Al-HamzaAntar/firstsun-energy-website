
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <img 
                src="/lovable-uploads/8094d4f9-52f3-414c-a63b-974f3d69d914.png" 
                alt="فرست سن إنرجي" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-solar-yellow">فرست سن إنرجي</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              شريكك نحو طاقة نظيفة ومستقبل مستدام. نتخصص في حلول الطاقة الشمسية المتكاملة 
              لجميع القطاعات السكنية والتجارية والصناعية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-solar-yellow">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-solar-yellow transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-solar-yellow transition-colors"
                >
                  عنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-solar-yellow transition-colors"
                >
                  خدماتنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-solar-yellow transition-colors"
                >
                  منتجاتنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-solar-yellow transition-colors"
                >
                  تواصل معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-solar-yellow">تواصل معنا</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-300">
                <span className="font-semibold">الهاتف:</span> 0771 070 031
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">البريد:</span> Admin@FirstSunEn.com
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">العنوان:</span> بيت بوس شارع الأربعين
              </p>
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="#" 
                className="w-10 h-10 bg-solar-blue hover:bg-solar-yellow text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="فيسبوك"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-solar-blue hover:bg-solar-yellow text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="إنستجرام"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            جميع الحقوق محفوظة لدى فرست سن إنرجي © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
