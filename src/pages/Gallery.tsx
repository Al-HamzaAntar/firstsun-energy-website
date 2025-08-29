
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Types
type Lang = "ar" | "en";

type Category = {
  id: string;
  label: Record<Lang, string>;
};

type GalleryItem = {
  id: number;
  title: Record<Lang, string>;
  categoryId: string;
  image: string;
};

// Responsive columns hook (match Tailwind breakpoints)
const useGridColumns = () => {
  const getCols = () => {
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };
  const [cols, setCols] = useState<number>(getCols());
  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
};

const categories: Category[] = [
  { id: "all", label: { ar: "جميع المنتجات", en: "All Products" } },
  { id: "inverters", label: { ar: "عواكس", en: "Inverters" } },
  { id: "solar-panels", label: { ar: "ألواح شمسية", en: "Solar Panels" } },
  { id: "accessories", label: { ar: "معدات إضافية", en: "Accessories" } },
  { id: "install-tools", label: { ar: "أدوات التركيب", en: "Installation Tools" } },
  { id: "measurement-tools", label: { ar: "أدوات القياس", en: "Measurement Tools" } },
  { id: "security-systems", label: { ar: "أنظمة الأمان", en: "Security Systems" } },
  { id: "storage-systems", label: { ar: "أنظمة التخزين", en: "Storage Systems" } },
  { id: "control-systems", label: { ar: "أنظمة التحكم", en: "Control Systems" } },
  { id: "water-pumps", label: { ar: "مضخات المياه", en: "Water Pumps" } },
  { id: "safety-equipment", label: { ar: "معدات الأمان", en: "Safety Equipment" } },
];

const allItems: GalleryItem[] = [
  // Inverters
  {
    id: 1,
    title: { ar: "عاكس 1st SUN ENERGY الأزرق", en: "1st SUN ENERGY Inverter - Blue" },
    categoryId: "inverters",
    image: "/lovable-uploads/5156740a-47f9-40a0-ab6f-65a79e67963e.png",
  },
  {
    id: 2,
    title: { ar: "عاكس VALONIC الذكي", en: "VALONIC Smart Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/6208a4b6-da5e-4d62-99e5-efc72acb84bb.png",
  },
  {
    id: 3,
    title: { ar: "عاكس SSPCO للطاقة الشمسية", en: "SSPCO Solar Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/118b0b5b-70aa-4045-ac03-cd778a0a7139.png",
  },
  {
    id: 4,
    title: { ar: "عاكس Deye عالي الكفاءة", en: "Deye High-Efficiency Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/97f24b8c-1a79-49ef-97c3-465ba13d873d.png",
  },
  {
    id: 5,
    title: { ar: "عاكس Solis للطاقة المتجددة", en: "Solis Renewable Energy Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/7364515e-c971-452b-9798-d94af2338f96.png",
  },
  {
    id: 6,
    title: { ar: "عاكس KBCO الأحمر المتطور", en: "KBCO Advanced Red Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/fa8fe13a-f505-4b89-8f07-a3b9b37ea672.png",
  },
  // Solar Panels
  {
    id: 7,
    title: { ar: "لوحة شمسية عالية الكفاءة", en: "High-Efficiency Solar Panel" },
    categoryId: "solar-panels",
    image: "/lovable-uploads/398c6543-f93f-4c77-87f2-f7b496829112.png",
  },
  // Accessories
  {
    id: 8,
    title: { ar: "بروجيكتر LED Logo LP50", en: "LED Logo Projector LP50" },
    categoryId: "accessories",
    image: "/lovable-uploads/b8517038-2d65-4642-a890-9121cf0a9a78.png",
  },
  // Installation Tools
  {
    id: 9,
    title: { ar: "مجموعة عدد وأدوات التركيب", en: "Installation Tools Kit" },
    categoryId: "install-tools",
    image: "/lovable-uploads/d5c2348f-38ab-49c2-8778-04193b7be976.png",
  },
  // Measurement Tools
  {
    id: 10,
    title: { ar: "أداة قياس متخصصة", en: "Specialized Measuring Tool" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/5cbd295e-7444-4938-99f0-8d710d8ba0f6.png",
  },
  // New products
  {
    id: 11,
    title: { ar: "قفل ذكي KK1 متطور", en: "KK1 Advanced Smart Lock" },
    categoryId: "security-systems",
    image: "/lovable-uploads/8fe41692-6213-4492-87de-4b934d86c638.png",
  },
  {
    id: 12,
    title: { ar: "نظام تخزين RJETech المتقدم", en: "RJETech Advanced Storage System" },
    categoryId: "storage-systems",
    image: "/lovable-uploads/3501a0ee-512c-41e1-b0d0-a10c988429a9.png",
  },
  {
    id: 13,
    title: { ar: "وحدة تحكم RJETech الذكية", en: "RJETech Smart Control Unit" },
    categoryId: "control-systems",
    image: "/lovable-uploads/a42d1b03-4fa2-44fd-a316-3a5ae80232e9.png",
  },
  {
    id: 14,
    title: { ar: "مضخات مياه شمسية متطورة", en: "Advanced Solar Water Pumps" },
    categoryId: "water-pumps",
    image: "/lovable-uploads/6250537b-f5a8-4bda-8950-b869fb4456c5.png",
  },
  {
    id: 15,
    title: { ar: "مثقاب لاسلكي DANMI الأزرق", en: "DANMI Blue Cordless Drill" },
    categoryId: "install-tools",
    image: "/lovable-uploads/c0df7514-c0cf-4dc2-a899-ad02f6a54bb3.png",
  },
  {
    id: 16,
    title: { ar: "خوذة أمان DANMI البيضاء", en: "DANMI White Safety Helmet" },
    categoryId: "safety-equipment",
    image: "/lovable-uploads/45143443-2d07-4d09-9506-404526e139a8.png",
  },
  {
    id: 17,
    title: { ar: "منشار كهربائي DANMI احترافي", en: "DANMI Professional Electric Saw" },
    categoryId: "install-tools",
    image: "/lovable-uploads/c42695f5-3cb2-441b-9900-cf33fc947114.png",
  },
  {
    id: 18,
    title: { ar: "قفل ذكي KK1 أسود فاخر", en: "KK1 Premium Black Smart Lock" },
    categoryId: "security-systems",
    image: "/lovable-uploads/6dd1ce71-9f81-40d9-b781-b100b1f18923.png",
  },
  {
    id: 19,
    title: { ar: "جهاز اختبار متعدد الوظائف UNI-T", en: "UNI-T Multifunction Tester" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/a8e5b6b7-f470-4023-b3ab-b791e7422989.png",
  },
  {
    id: 20,
    title: { ar: "عدة أدوات DANMI الكاملة", en: "DANMI Complete Tools Set" },
    categoryId: "install-tools",
    image: "/lovable-uploads/f5f775a2-29a3-438a-bc05-0530ffff576f.png",
  },
  // New products from uploaded images
  {
    id: 21,
    title: { ar: "لوحة تحكم CNC الكهربائية مع شاشة", en: "CNC Electrical Control Panel with Display" },
    categoryId: "control-systems",
    image: "/lovable-uploads/4d1a7863-8651-4742-9e6a-9810e78cbf86.png",
  },
  {
    id: 22,
    title: { ar: "مجموعة مفاتيح ربط DANMI الاحترافية", en: "DANMI Professional Ratchet Wrench Set" },
    categoryId: "install-tools",
    image: "/lovable-uploads/cd772831-ff43-4746-85fe-4397ec93dd66.png",
  },
  {
    id: 23,
    title: { ar: "لوحة تحكم CNC الكهربائية", en: "CNC Electrical Control Panel" },
    categoryId: "control-systems",
    image: "/lovable-uploads/d3a247b0-c08d-4204-a310-f697179b41c3.png",
  },
  {
    id: 24,
    title: { ar: "لوحة قواطع CNC الكهربائية", en: "CNC Electrical Breaker Panel" },
    categoryId: "control-systems",
    image: "/lovable-uploads/c679098a-0352-4400-947f-32aa3efe52a0.png",
  },
  {
    id: 25,
    title: { ar: "جدار عرض CNC للمكونات الكهربائية", en: "CNC Electrical Components Display Wall" },
    categoryId: "control-systems",
    image: "/lovable-uploads/da6e5be8-4ee5-48d9-ab25-23a9c2390b44.png",
  },
  {
    id: 26,
    title: { ar: "مفاتيح تحكم برتقالية متخصصة", en: "Specialized Orange Control Switches" },
    categoryId: "control-systems",
    image: "/lovable-uploads/32654869-bf3d-4f27-bd2d-7f148f956721.png",
  },
  {
    id: 27,
    title: { ar: "قفل ذكي KK ذهبي فاخر", en: "KK Premium Gold Smart Lock" },
    categoryId: "security-systems",
    image: "/lovable-uploads/5b0175b8-ecc5-45ea-9553-0254096d45e2.png",
  },
  {
    id: 28,
    title: { ar: "قاطع كهربائي صناعي", en: "Industrial Circuit Breaker" },
    categoryId: "safety-equipment",
    image: "/lovable-uploads/67b18ec1-4a20-48ca-a110-6cc124beeb03.png",
  },
  {
    id: 29,
    title: { ar: "قفل ذكي KK أسود متطور", en: "KK Advanced Black Smart Lock" },
    categoryId: "security-systems",
    image: "/lovable-uploads/fbaddf53-fc3d-4462-b678-b9539c2788af.png",
  },
  {
    id: 30,
    title: { ar: "قفل KK أمني عالي الجودة", en: "KK High-Security Padlock" },
    categoryId: "security-systems",
    image: "/lovable-uploads/db57f41c-cbf7-445f-9449-1305db9e10a6.png",
  },
  // Additional new products from latest upload
  {
    id: 31,
    title: { ar: "نظام تخزين RJETech الأبيض المتطور", en: "RJETech Advanced White Storage System" },
    categoryId: "storage-systems",
    image: "/lovable-uploads/16997a4d-03ce-494c-bd47-4f02d9d6b43b.png",
  },
  {
    id: 32,
    title: { ar: "جهاز قياس DANMI الذكي متعدد الوظائف", en: "DANMI Smart Multimeter ART-390804" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/337fa4e4-67ed-49d0-8aa8-0bf68480b355.png",
  },
  {
    id: 33,
    title: { ar: "حقيبة أدوات DANMI الاحترافية", en: "DANMI Professional Tool Bag" },
    categoryId: "install-tools",
    image: "/lovable-uploads/7b23a094-bd4b-4a10-9688-cfb6bc8c87fb.png",
  },
  {
    id: 34,
    title: { ar: "مجموعة مفكات DANMI الاحترافية", en: "DANMI Professional Screwdriver Set" },
    categoryId: "install-tools",
    image: "/lovable-uploads/3f127859-c444-48f2-b6b8-36032ad2ca1b.png",
  },
  {
    id: 35,
    title: { ar: "عاكس GEFRAN ADV200 SP المتطور", en: "GEFRAN ADV200 SP Advanced Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/14315647-68a7-4310-9e80-99ce137b08f0.png",
  },
  {
    id: 36,
    title: { ar: "عاكس 1st SUN ENERGY الأزرق مع شاشة", en: "1st SUN ENERGY Blue Inverter with Display" },
    categoryId: "inverters",
    image: "/lovable-uploads/516b10cb-0079-46bf-b839-842d9cb96474.png",
  },
  {
    id: 37,
    title: { ar: "عاكس 1st SUN ENERGY الأزرق المدمج", en: "1st SUN ENERGY Compact Blue Inverter" },
    categoryId: "inverters",
    image: "/lovable-uploads/200d8967-8c72-4d35-a91c-7cb6c8f16da1.png",
  },
  {
    id: 38,
    title: { ar: "محرك تردد INVT المتغير", en: "INVT Variable Frequency Drive" },
    categoryId: "inverters",
    image: "/lovable-uploads/146ac15f-a374-4626-8b6f-630fe5f58837.png",
  },
  {
    id: 39,
    title: { ar: "نظام طاقة DAYS ENERGY الأزرق", en: "DAYS ENERGY Blue Power System" },
    categoryId: "storage-systems",
    image: "/lovable-uploads/7c77495e-90ba-4c88-9159-f9f9f7f39bf7.png",
  },
  {
    id: 40,
    title: { ar: "مجموعة أدوات الكبس الاحترافية", en: "Professional Crimping Tools Set" },
    categoryId: "install-tools",
    image: "/lovable-uploads/1e00f050-bfe8-4f10-9182-51e1f2ee5cb2.png",
  },
  // Latest batch of products
  {
    id: 41,
    title: { ar: "حقيبة أدوات UNI-T الاحترافية", en: "UNI-T Professional Tool Case" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/9f0e9993-4a92-4c44-bef6-aedbb5c96f71.png",
  },
  {
    id: 42,
    title: { ar: "موصلات كهربائية CONTECH ملونة", en: "CONTECH Colored Electrical Connectors" },
    categoryId: "accessories",
    image: "/lovable-uploads/b1766137-ac14-4468-a0af-448d0bf551bb.png",
  },
  {
    id: 43,
    title: { ar: "مجموعة مفاتيح DANMI السداسية القابلة للطي", en: "DANMI Folding Hex Key Set" },
    categoryId: "install-tools",
    image: "/lovable-uploads/fb4b24b4-2e89-4f2c-9c64-b93c501ef3a8.png",
  },
  {
    id: 44,
    title: { ar: "شريط قياس DANMI الاحترافي", en: "DANMI Professional Measuring Tape" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/cb2b0cf3-a06c-4341-aa9d-c5059c1742ba.png",
  },
  {
    id: 45,
    title: { ar: "أداة تجريد الأسلاك DANMI", en: "DANMI Wire Stripping Tool" },
    categoryId: "install-tools",
    image: "/lovable-uploads/dd4bf2dc-de57-4f0a-b43e-557c6566920b.png",
  },
  {
    id: 46,
    title: { ar: "كماشة DANMI الاحترافية", en: "DANMI Professional Pliers" },
    categoryId: "install-tools",
    image: "/lovable-uploads/84db1671-1311-4ca3-8f70-d38e9833d0d4.png",
  },
  {
    id: 47,
    title: { ar: "جهاز قياس CHNT الذكي مع مجسات", en: "CHNT Smart Meter with Sensors" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/fef18507-0c37-44d1-bcaa-b03156c16320.png",
  },
  {
    id: 48,
    title: { ar: "كاشف الجهد DANMI الاحترافي", en: "DANMI Professional Voltage Detector" },
    categoryId: "measurement-tools",
    image: "/lovable-uploads/f0968e03-22c9-4a35-aed5-c64a67e93a0e.png",
  },
  {
    id: 49,
    title: { ar: "أطراف كابلات نحاسية متنوعة الأحجام", en: "Various Size Copper Cable Lugs" },
    categoryId: "accessories",
    image: "/lovable-uploads/ac699cb8-bbdf-40a3-bbe0-549b229d9276.png",
  },
];

const Gallery = () => {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  const cols = useGridColumns();
  // SEO basics (title + meta description)
  useEffect(() => {
    const titleAr = "معرض المنتجات | طاقة شمسية";
    const titleEn = "Products Gallery | Solar";
    document.title = language === "ar" ? titleAr : titleEn;

    const descAr = "اكتشف مجموعتنا الواسعة من أحدث منتجات الطاقة الشمسية والمعدات المتخصصة";
    const descEn = "Explore our wide selection of the latest solar products and specialized equipment.";

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = language === "ar" ? descAr : descEn;
  }, [language]);

  // Reset pagination when category changes
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const items = useMemo(() => allItems, []);

  const getCategoryLabel = (id: string) =>
    (categories.find((c) => c.id === id)?.label[language as Lang]) || id;

  const filteredItems = (categoryId: string) => {
    if (categoryId === "all") return items;
    return items.filter((it) => it.categoryId === categoryId);
  };

  const handleProductClick = (item: GalleryItem) => {
    const title = item.title[language as Lang];
    const message = language === "ar" 
      ? `مرحباً، أرغب في الاستفسار عن المنتج: ${title}`
      : `Hello, I would like to inquire about the product: ${title}`;
    
    const whatsappNumber = "+966123456789"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const renderProductGrid = (list: GalleryItem[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {list.map((item) => {
        const title = item.title[language as Lang];
        const chip = getCategoryLabel(item.categoryId);
        return (
          <Card
            key={item.id}
            className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white cursor-pointer"
            onClick={() => handleProductClick(item)}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={title}
                className="w-full h-64 object-contain bg-gray-50 p-4 group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {chip}
                </span>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{chip}</p>
              <div className="mt-3 text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {language === "ar" ? "اضغط للتواصل عبر الواتساب" : "Click to contact via WhatsApp"}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const initialVisible = cols * 3;
  const totalActive = filteredItems(activeCategory).length;
  const shouldShowButton = !showAll && totalActive > initialVisible;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Link
                to="/"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                {isRTL ? (
                  <ArrowRight className="w-5 h-5 ml-2" />
                ) : (
                  <ArrowLeft className="w-5 h-5 mr-2" />
                )}
                {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "ar" ? "معرض منتجاتنا" : "Our Products Gallery"}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {language === "ar"
                ? "اكتشف مجموعتنا الواسعة من أحدث منتجات الطاقة الشمسية والمعدات المتخصصة"
                : "Explore our wide selection of the latest solar products and specialized equipment."}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v)} className="w-full">
            {/* Desktop Tabs */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 mb-8 h-auto p-1 bg-white shadow-lg rounded-xl gap-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm font-medium px-3 py-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
                >
                  {category.label[language as Lang]}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => {
              const list = filteredItems(category.id);
              const isActive = category.id === activeCategory;
              const itemsToRender = isActive ? (showAll ? list : list.slice(0, initialVisible)) : list;
              return (
                <TabsContent key={category.id} value={category.id} className="mt-8">
                  {renderProductGrid(itemsToRender)}
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Load More Button */}
          <div className="text-center mt-12">
            {shouldShowButton && (
              <button
                onClick={() => setShowAll(true)}
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {language === "ar" ? "عرض المزيد من المنتجات" : "Load more products"}
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
