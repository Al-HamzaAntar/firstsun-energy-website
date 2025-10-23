
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const Products = () => {
  const { t } = useLanguage();
  
  const products = [
    {
      titleKey: "products.rjetech.title",
      descriptionKey: "products.rjetech.description",
      image: "/lovable-uploads/rge.webp",
      badgeKey: "products.rjetech.badge"
    },
    {
      titleKey: "products.inverters.title",
      descriptionKey: "products.inverters.description",
      image: "/lovable-uploads/sineng.webp",
      badgeKey: "products.inverters.badge"
    },
        {
      titleKey: "products.panels.title",
      descriptionKey: "products.panels.description",
      image: "/lovable-uploads/tw.webp",
      badgeKey: "products.panels.badge"
    },
        {
      titleKey: "products.meters.title",
      descriptionKey: "products.meters.description",
      image: "/lovable-uploads/hexcell.webp",
      badgeKey: "products.meters.badge"
    },
    {
      titleKey: "products.danmi.title",
      descriptionKey: "products.danmi.description",
      image: "/lovable-uploads/danmi.png",
      badgeKey: "products.danmi.badge"
    },
    {
      titleKey: "products.panels.title",
      descriptionKey: "products.panels.description",
      image: "/lovable-uploads/mibet.webp",
      badgeKey: "products.panels.badge"
    },
    {
      titleKey: "products.panels.title",
      descriptionKey: "products.panels.description",
      image: "/lovable-uploads/kuka.webp",
      badgeKey: "products.panels.badge"
    },
    {
      titleKey: "products.batteries.title",
      descriptionKey: "products.batteries.description",
      image: "/lovable-uploads/fnirsi.webp",
      badgeKey: "products.batteries.badge"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={t(product.titleKey)}
                  className="w-full h-48 object-contain bg-white p-4"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-solar-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {t(product.badgeKey)}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {t(product.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {t(product.descriptionKey)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
