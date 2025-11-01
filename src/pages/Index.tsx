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
import { ArrowRight } from "lucide-react";
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
              <Carousel className="w-full max-w-5xl mx-auto" opts={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={product.image_url} 
                            alt={t(product.title_key)}
                            className="w-full h-48 object-contain bg-white p-4"
                          />
                          {product.category && (
                            <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'}`}>
                              <span className="bg-solar-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                                {product.category}
                              </span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {t(product.title_key)}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
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
