import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Package } from 'lucide-react';
import { ProductsManager } from '@/components/dashboard/ProductsManager';
import { Overview } from '@/components/dashboard/Overview';

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
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <Package className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products Manager</CardTitle>
                <CardDescription>Add and manage products for the gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
