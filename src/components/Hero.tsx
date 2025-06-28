
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with solar panels image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')"
        }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-orange-600/60"></div>
      
      {/* Floating solar panels animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-float absolute top-20 right-20 w-20 h-16 bg-blue-500 rounded-lg transform rotate-12"></div>
        <div className="animate-float absolute top-32 left-32 w-16 h-12 bg-orange-400 rounded-lg transform -rotate-12" style={{ animationDelay: '2s' }}></div>
        <div className="animate-float absolute bottom-32 right-32 w-24 h-18 bg-blue-600 rounded-lg transform rotate-6" style={{ animationDelay: '4s' }}></div>
        <div className="animate-float absolute bottom-20 left-20 w-18 h-14 bg-orange-500 rounded-lg transform -rotate-6" style={{ animationDelay: '6s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            فرست سن إنرجي
            <br />
            <span className="text-orange-400">شريكك نحو طاقة نظيفة</span>
            <br />
            <span className="text-2xl md:text-4xl">ومستقبل مستدام</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            كيان هندسي يمني متخصص في حلول الطاقة الشمسية المتكاملة، أنظمة التخزين، التشغيل الذكي، والتدريب الفني المتقدم. 
            نهدف إلى توفير الطاقة النظيفة والمستدامة للأفراد والشركات والمؤسسات، مع التركيز على تحسين الأداء البيئي وتخفيض التكاليف التشغيلية.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('services')}
            >
              استكشف خدماتنا
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-800 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
