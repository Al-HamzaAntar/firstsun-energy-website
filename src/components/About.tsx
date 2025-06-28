
const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              عن شركة <span className="text-solar-blue">فرست سن إنرجي</span>
            </h2>
            
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="mb-6">
                فرست سن إنرجي هي شركة متخصصة في تقديم حلول متكاملة للطاقة الشمسية، تأسست على رؤية واضحة لتحقيق 
                كفاءة عالية في استغلال الموارد الشمسية. نتمتع بخبرة طويلة في تصميم وتنفيذ مشاريع الطاقة الشمسية 
                لمختلف الاستخدامات السكنية، التجارية، والصناعية.
              </p>
              
              <p className="mb-6">
                فريق عملنا المتنوع يتألف من مهندسين متخصصين في الهندسة الكهربائية والميكانيكية والطاقات المتجددة، 
                يتمتعون بخبرة كبيرة في تصميم حلول مخصصة بدءًا من المشاريع الصغيرة وصولًا إلى المشاريع الضخمة.
              </p>
              
              <p className="mb-6">
                نلتزم بتقديم حلول مبتكرة ومستدامة، جودة عالية وفق أعلى المعايير الدولية، والالتزام بالمواعيد لرضا عملائنا. 
                نحن شريك موثوق يعمل جاهدًا لتعزيز الانتقال نحو الطاقة النظيفة والمستدامة في المنطقة.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-solar-blue mb-2">100+</div>
                <div className="text-gray-600">مشروع منفذ</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-solar-green mb-2">5+</div>
                <div className="text-gray-600">سنوات خبرة</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742" 
                alt="مبنى شركة فرست سن إنرجي" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-solar-blue/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
