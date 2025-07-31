
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("جميع المنتجات");

  const galleryItems = [
    // العواكس
    {
      id: 1,
      title: "عاكس 1st SUN ENERGY الأزرق",
      category: "عواكس",
      image: "/lovable-uploads/5156740a-47f9-40a0-ab6f-65a79e67963e.png"
    },
    {
      id: 2,
      title: "عاكس VALONIC الذكي",
      category: "عواكس",
      image: "/lovable-uploads/6208a4b6-da5e-4d62-99e5-efc72acb84bb.png"
    },
    {
      id: 3,
      title: "عاكس SSPCO للطاقة الشمسية",
      category: "عواكس",
      image: "/lovable-uploads/118b0b5b-70aa-4045-ac03-cd778a0a7139.png"
    },
    {
      id: 4,
      title: "عاكس Deye عالي الكفاءة",
      category: "عواكس",
      image: "/lovable-uploads/97f24b8c-1a79-49ef-97c3-465ba13d873d.png"
    },
    {
      id: 5,
      title: "عاكس Solis للطاقة المتجددة",
      category: "عواكس",
      image: "/lovable-uploads/7364515e-c971-452b-9798-d94af2338f96.png"
    },
    {
      id: 6,
      title: "عاكس KBCO الأحمر المتطور",
      category: "عواكس",
      image: "/lovable-uploads/fa8fe13a-f505-4b89-8f07-a3b9b37ea672.png"
    },
    // الألواح الشمسية
    {
      id: 7,
      title: "لوحة شمسية عالية الكفاءة",
      category: "ألواح شمسية",
      image: "/lovable-uploads/398c6543-f93f-4c77-87f2-f7b496829112.png"
    },
    // المعدات الإضافية
    {
      id: 8,
      title: "بروجيكتر LED Logo LP50",
      category: "معدات إضافية",
      image: "/lovable-uploads/b8517038-2d65-4642-a890-9121cf0a9a78.png"
    },
    // أدوات التركيب
    {
      id: 9,
      title: "مجموعة عدد وأدوات التركيب",
      category: "أدوات التركيب",
      image: "/lovable-uploads/d5c2348f-38ab-49c2-8778-04193b7be976.png"
    },
    // أدوات القياس
    {
      id: 10,
      title: "أداة قياس متخصصة",
      category: "أدوات القياس",
      image: "/lovable-uploads/5cbd295e-7444-4938-99f0-8d710d8ba0f6.png"
    },
    // المنتجات الجديدة
    {
      id: 11,
      title: "قفل ذكي KK1 متطور",
      category: "أنظمة الأمان",
      image: "/lovable-uploads/8fe41692-6213-4492-87de-4b934d86c638.png"
    },
    {
      id: 12,
      title: "نظام تخزين RJETech المتقدم",
      category: "أنظمة التخزين",
      image: "/lovable-uploads/3501a0ee-512c-41e1-b0d0-a10c988429a9.png"
    },
    {
      id: 13,
      title: "وحدة تحكم RJETech الذكية",
      category: "أنظمة التحكم",
      image: "/lovable-uploads/a42d1b03-4fa2-44fd-a316-3a5ae80232e9.png"
    },
    {
      id: 14,
      title: "مضخات مياه شمسية متطورة",
      category: "مضخات المياه",
      image: "/lovable-uploads/6250537b-f5a8-4bda-8950-b869fb4456c5.png"
    },
    {
      id: 15,
      title: "مثقاب لاسلكي DANMI الأزرق",
      category: "أدوات التركيب",
      image: "/lovable-uploads/c0df7514-c0cf-4dc2-a899-ad02f6a54bb3.png"
    },
    {
      id: 16,
      title: "خوذة أمان DANMI البيضاء",
      category: "معدات الأمان",
      image: "/lovable-uploads/45143443-2d07-4d09-9506-404526e139a8.png"
    },
    {
      id: 17,
      title: "منشار كهربائي DANMI احترافي",
      category: "أدوات التركيب",
      image: "/lovable-uploads/c42695f5-3cb2-441b-9900-cf33fc947114.png"
    },
    {
      id: 18,
      title: "قفل ذكي KK1 أسود فاخر",
      category: "أنظمة الأمان",
      image: "/lovable-uploads/6dd1ce71-9f81-40d9-b781-b100b1f18923.png"
    },
    {
      id: 19,
      title: "جهاز اختبار متعدد الوظائف UNI-T",
      category: "أدوات القياس",
      image: "/lovable-uploads/a8e5b6b7-f470-4023-b3ab-b791e7422989.png"
    },
    {
      id: 20,
      title: "عدة أدوات DANMI الكاملة",
      category: "أدوات التركيب",
      image: "/lovable-uploads/f5f775a2-29a3-438a-bc05-0530ffff576f.png"
    }
  ];

  const categories = [
    "جميع المنتجات", 
    "عواكس", 
    "ألواح شمسية", 
    "معدات إضافية", 
    "أدوات التركيب", 
    "أدوات القياس",
    "أنظمة الأمان",
    "أنظمة التخزين",
    "أنظمة التحكم",
    "مضخات المياه",
    "معدات الأمان"
  ];

  const getFilteredItems = (category: string) => {
    if (category === "جميع المنتجات") {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === category);
  };

  const renderProductGrid = (items: typeof galleryItems) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card 
          key={item.id}
          className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white"
        >
          <div className="relative overflow-hidden">
            <img 
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-contain bg-gray-50 p-4 group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {item.category}
              </span>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {item.category}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5 ml-2" />
                العودة للرئيسية
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              معرض منتجاتنا
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من أحدث منتجات الطاقة الشمسية والمعدات المتخصصة
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="جميع المنتجات" className="w-full">
            {/* Desktop Tabs */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 mb-8 h-auto p-1 bg-white shadow-lg rounded-xl gap-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-sm font-medium px-3 py-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>


            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-8">
                {renderProductGrid(getFilteredItems(category))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              عرض المزيد من المنتجات
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
