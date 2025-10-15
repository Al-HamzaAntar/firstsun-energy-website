
import { useLanguage } from '@/contexts/LanguageContext';

const Partners = () => {
  const { t, isRTL } = useLanguage();
  const partners = [
    {
      name: "Mibet Energy",
      logo: "/lovable-uploads/288e13f4-dfd8-42ba-8d2b-e5fc60e4eb89.png"
    },
    {
      name: "RJETech",
      logo: "/lovable-uploads/d7c59264-36cc-4866-b489-2f02ffd738b2.png"
    },
    {
      name: "SINENG Electric",
      logo: "/lovable-uploads/d31f99a3-4676-428f-9a5e-d3874fc40f1f.png"
    },
    {
      name: "JNTech",
      logo: "/lovable-uploads/jntech.png"
    },
    {
      name: "Hexcell",
      logo: "/lovable-uploads/92f5f58d-99b6-47a1-9a0c-e8091c57d698.png"
    },
    {
      name: "DANMI",
      logo: "/lovable-uploads/a9b51979-1ea3-4125-853a-8748aa3f4680.png"
    }
  ];

  return (
    <section id="partners" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          <div
            className={`flex w-max will-change-transform ${isRTL ? 'animate-scroll-rtl' : 'animate-scroll'}`}
          >
            {/* Two identical sets for seamless looping */}
            {[...Array(2)].map((_, dup) => (
              <div className="flex shrink-0" aria-hidden={dup === 1} key={dup}>
                {partners.map((partner, index) => (
                  <div
                    key={`${dup}-${index}`}
                    className="flex-shrink-0 mx-6 flex items-center justify-center w-36 h-20 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-28 max-h-14 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
