
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Wrench, Package, Image, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/8094d4f9-52f3-414c-a63b-974f3d69d914.png" 
              alt="فرست سن إنرجي" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-solar-blue">فرست سن إنرجي</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Home size={18} />
              <span>الرئيسية</span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Info size={18} />
              <span>عنا</span>
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Wrench size={18} />
              <span>خدماتنا</span>
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Package size={18} />
              <span>منتجاتنا</span>
            </button>
            <Link 
              to="/gallery"
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Image size={18} />
              <span>المعرض</span>
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium"
            >
              <Phone size={18} />
              <span>تواصل معنا</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-lg border-t">
            <nav className="flex flex-col p-4 space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
              >
                <Home size={18} />
                <span>الرئيسية</span>
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
              >
                <Info size={18} />
                <span>عنا</span>
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
              >
                <Wrench size={18} />
                <span>خدماتنا</span>
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
              >
                <Package size={18} />
                <span>منتجاتنا</span>
              </button>
              <Link 
                to="/gallery"
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image size={18} />
                <span>المعرض</span>
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-solar-blue transition-colors font-medium text-right py-2"
              >
                <Phone size={18} />
                <span>تواصل معنا</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
