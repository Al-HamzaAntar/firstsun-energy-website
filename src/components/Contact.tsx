
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      title: "البريد الإلكتروني الرئيسي",
      value: "Admin@FirstSunEn.com",
      type: "email"
    },
    {
      title: "المعلومات العامة",
      value: "Info@FirstSunEn.com",
      type: "email"
    },
    {
      title: "الصيانة والدعم الفني",
      value: "Maintenance@FirstSunEn.com",
      type: "email"
    },
    {
      title: "المشتريات",
      value: "purchases@FirstSunEn.com",
      type: "email"
    },
    {
      title: "المبيعات",
      value: "sales@FirstSunEn.com",
      type: "email"
    },
    {
      title: "رقم الهاتف",
      value: "0771 070 031",
      type: "phone"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تواصل <span className="text-solar-blue">معنا اليوم</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتكم في جميع استفساراتكم ومتطلباتكم في مجال الطاقة الشمسية
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">معلومات التواصل</h3>
            <div className="grid gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-solar-blue">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.type === "email" ? (
                      <a 
                        href={`mailto:${info.value}`}
                        className="text-gray-700 hover:text-solar-blue transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <a 
                        href={`tel:${info.value}`}
                        className="text-gray-700 hover:text-solar-blue transition-colors"
                      >
                        {info.value}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-solar-blue text-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold">العنوان</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">بيت بوس شارع الأربعين</p>
                <p className="text-lg">صنعاء، اليمن</p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">موقعنا على الخريطة</h3>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.23846478168036!2d44.220983105233195!3d15.290916651177463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603c50014c6b4e7%3A0xbcc5f407371eca4c!2z2YHYsdiz2Kog2LPZhiDYp9mG2LHYrNmKINmE2YTYt9in2YLYqSDYp9mE2LTZhdiz2YrYqQ!5e1!3m2!1sar!2s!4v1751106207467!5m2!1sar!2s" 
                width="100%" 
                height="400" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
