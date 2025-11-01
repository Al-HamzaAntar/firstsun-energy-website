import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { t, language } = useLanguage();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['gallery-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_products')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      
      {/* Products Carousel Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t('products.subtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="relative px-12">
              <Carousel 
                className="w-full max-w-5xl mx-auto" 
                opts={{ 
                  direction: language === 'ar' ? 'rtl' : 'ltr',
                  loop: true,
                  align: "start"
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products
                    .filter(product => product.title_key && product.image_url)
                    .map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <Card className="group relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={product.image_url} 
                            alt={t(product.title_key)}
                            className="w-full h-32 object-contain bg-white p-2"
                          />
                          {product.category && (
                            <div className={`absolute top-2 ${language === 'ar' ? 'left-2' : 'right-2'}`}>
                              <span className="bg-solar-yellow text-black px-2 py-0.5 rounded-full text-xs font-semibold">
                                {product.category}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <a 
                              href="https://wa.me/201023004949" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-white font-semibold text-sm px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              {language === 'ar' ? 'تواصل عبر واتساب' : 'Click to contact via WhatsApp'}
                            </a>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                            {t(product.title_key)}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                            {t(product.description_key)}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          ) : null}

          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button size="lg" className="gap-2">
                {t('nav.gallery')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
