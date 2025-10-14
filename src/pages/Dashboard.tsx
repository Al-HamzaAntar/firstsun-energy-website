import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Globe, Image, Package, Users, Mail, Building2 } from 'lucide-react';
import { TranslationsManager } from '@/components/dashboard/TranslationsManager';
import { GalleryManager } from '@/components/dashboard/GalleryManager';
import { ProductsManager } from '@/components/dashboard/ProductsManager';
import { PartnersManager } from '@/components/dashboard/PartnersManager';
import { SiteContentManager } from '@/components/dashboard/SiteContentManager';

const Dashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">{t('dashboard.loading')}</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('dashboard.accessDenied')}</CardTitle>
            <CardDescription>
              {t('dashboard.accessDeniedDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => signOut()} variant="outline" className="w-full">
              {t('dashboard.signOut')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            <p className="text-sm text-gray-600">{t('dashboard.subtitle')}</p>
          </div>
          <Button onClick={() => signOut()} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            {t('dashboard.signOut')}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.overview')}</span>
            </TabsTrigger>
            <TabsTrigger value="translations" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.translations')}</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.gallery')}</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.products')}</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.partners')}</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.hero')}</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.about')}</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.contact')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.translations')}</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{t('dashboard.manage')}</div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.arabicEnglishText')}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.gallery')}</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{t('dashboard.products')}</div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.galleryItems')}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.mainProducts')}</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{t('dashboard.6Items')}</div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.featuredProducts')}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.partners')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{t('dashboard.manage')}</div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.partnerLogos')}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.welcomeTitle')}</CardTitle>
                <CardDescription>
                  {t('dashboard.welcomeDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {t('dashboard.useTabsAbove')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li><strong>{t('dashboard.translations')}:</strong> {t('dashboard.translationsDesc')}</li>
                  <li><strong>{t('dashboard.gallery')}:</strong> {t('dashboard.galleryDesc')}</li>
                  <li><strong>{t('dashboard.products')}:</strong> {t('dashboard.productsDesc')}</li>
                  <li><strong>{t('dashboard.partners')}:</strong> {t('dashboard.partnersDesc')}</li>
                  <li><strong>{t('dashboard.hero')}, {t('dashboard.about')}, {t('dashboard.contact')}:</strong> {t('dashboard.sectionsDesc')}</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translations">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.translationsManager')}</CardTitle>
                <CardDescription>{t('dashboard.editTextContent')}</CardDescription>
              </CardHeader>
              <CardContent>
                <TranslationsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.galleryProducts')}</CardTitle>
                <CardDescription>{t('dashboard.manageGallery')}</CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.mainProducts')}</CardTitle>
                <CardDescription>{t('dashboard.editFeatured')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.partners')}</CardTitle>
                <CardDescription>{t('dashboard.managePartners')}</CardDescription>
              </CardHeader>
              <CardContent>
                <PartnersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero">
            <SiteContentManager section="hero" />
          </TabsContent>

          <TabsContent value="about">
            <SiteContentManager section="about" />
          </TabsContent>

          <TabsContent value="contact">
            <SiteContentManager section="contact" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
