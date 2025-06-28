
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "تصميم وتنفيذ مشاريع الطاقة الشمسية",
      description: "دراسة جدوى، تصميم هندسي، وتركيب أنظمة شمسية لمختلف القطاعات، بدءًا من السكنات الفردية وصولًا إلى المشاريع الكبرى.",
      icon: "🏗️"
    },
    {
      title: "تركيب وتشغيل أنظمة البطاريات",
      description: "حلول تخزين طاقة متقدمة لضمان توفر الطاقة عند الحاجة، مع فريق متخصص في حساب كميات الطاقة المطلوبة وتصميم الأنظمة.",
      icon: "🔋"
    },
    {
      title: "حلول مستقلة وخارج الشبكة (Off-Grid)",
      description: "توفير أنظمة طاقة شمسية مستقلة تلبي احتياجات المناطق التي لا تتوفر فيها شبكة الكهرباء.",
      icon: "🌐"
    },
    {
      title: "توفير المعدات والمستلزمات",
      description: "نوفر ألواحًا شمسية عالية الجودة، بطاريات ليثيوم متطورة، وعواكس (إنفرتر) من أفضل العلامات التجارية العالمية، بالإضافة إلى عدادات ذكية.",
      icon: "⚡"
    },
    {
      title: "دعم فني وتدريب مستمر",
      description: "خدمات صيانة وإصلاح الأنظمة الشمسية، بالإضافة إلى الدعم الفني والتدريب المتقدم لضمان استمرارية وكفاءة التشغيل.",
      icon: "🔧"
    },
    {
      title: "استشارات ومشورة فنية",
      description: "فريق هندسي متخصص يقدم أفضل الحلول لتقدير التكلفة وتصميم النظام وفقًا لأعلى المعايير، بالتعاون مع أكبر الشركات الاستشارية.",
      icon: "💡"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            خدماتنا <span className="text-solar-blue">المتكاملة</span> في الطاقة الشمسية
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات المتخصصة في الطاقة الشمسية لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-solar-blue"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
