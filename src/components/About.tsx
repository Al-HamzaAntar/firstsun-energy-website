import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.heading')}
            </h2>
            
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p className="mb-6">{t('about.p1')}</p>
              <p className="mb-6">{t('about.p2')}</p>
              <p className="mb-6">{t('about.p3')}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">{t('about.stats.projects')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
                <div className="text-gray-600">{t('about.stats.experience')}</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/lovable-uploads/5a318c08-a8f7-400a-b3e9-313118456e3a.png" 
                alt={t('about.image.alt')} 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
