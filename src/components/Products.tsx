
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      title: "ألواح شمسية عالية الكفاءة من Mibet Energy",
      description: "ألواح شمسية عالية الجودة من أشهر العلامات التجارية العالمية، معروفة بكفاءتها العالية في تحويل الطاقة الشمسية إلى كهرباء ومقاومتها للعوامل البيئية وعمرها الطويل. منتجات Mibet Energy اجتازت العديد من شهادات المنتجات مثل اختبار TUV وشهادة AS NZS 1170.",
      image: "/lovable-uploads/288e13f4-dfd8-42ba-8d2b-e5fc60e4eb89.png",
      badge: "منتج مميز"
    },
    {
      title: "بطاريات VALTEK الذكية لليثيوم",
      description: "قريبًا في الأسواق! بطاريات ذكية وآمنة بعمر افتراضي يصل إلى 6000 دورة شحن/تفريغ، نظام BMS متكامل بتحكم عبر البلوتوث، متوافقة مع الإنفرتر القديم، وهيكل معدني قوي. متوفرة بجميع المقاسات والجهود، وضمان حقيقي لمدة 5 سنوات.",
      image: "/lovable-uploads/fc714e7b-0e8c-41b8-bb63-3754c52e39e8.png",
      badge: "قريباً"
    },
    {
      title: "عواكس SINENG Electric",
      description: "عواكس من أفخم الأنواع بكفاءة عالية وتكنولوجيا متطورة، تضمن استقرار النظام الكهربائي وتقلل من الفاقد في الطاقة. SINENG Electric هي شركة عالمية ضمن أفضل 4 شركات عالميًا في شحنات محولات الطاقة، وحاصلة على تصنيف Tier 1 من Bloomberg.",
      image: "/lovable-uploads/d31f99a3-4676-428f-9a5e-d3874fc40f1f.png",
      badge: "Tier 1"
    },
    {
      title: "عدادات Hexcell الذكية",
      description: "عدادات ذكية للمياه والكهرباء من شركة Hexcell الصينية، الرائدة عالميًا في حلول الدفع المسبق (STS) والإدارة عن بُعد. تتميز بجودة تصنيع عالية وشهادات دولية معتمدة مثل STS، KEMA، وMID.",
      image: "/lovable-uploads/92f5f58d-99b6-47a1-9a0c-e8091c57d698.png",
      badge: "تقنية ذكية"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            أجود <span className="text-solar-blue">المنتجات العالمية</span> بين يديك
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم أفضل المنتجات من العلامات التجارية الرائدة عالمياً في مجال الطاقة الشمسية
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
                  alt={product.title}
                  className="w-full h-48 object-contain bg-white p-4"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-solar-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {product.description}
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
