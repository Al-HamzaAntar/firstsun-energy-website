import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Globe, Image, Package, Users, Mail, Building2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have admin permissions. Please contact the administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => signOut()} variant="outline" className="w-full">
              Sign Out
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
            <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your website content</p>
          </div>
          <Button onClick={() => signOut()} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="translations" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Translations</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Partners</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Translations</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Manage</div>
                  <p className="text-xs text-muted-foreground">Arabic & English text</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gallery</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Products</div>
                  <p className="text-xs text-muted-foreground">Gallery items</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Main Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6 Items</div>
                  <p className="text-xs text-muted-foreground">Featured products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Partners</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Manage</div>
                  <p className="text-xs text-muted-foreground">Partner logos</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>
                  Manage all your website content from one place. Changes are saved instantly to the database.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Use the tabs above to navigate between different content sections:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li><strong>Translations:</strong> Edit all text in Arabic and English</li>
                  <li><strong>Gallery:</strong> Manage gallery products with images</li>
                  <li><strong>Products:</strong> Edit main product showcase items</li>
                  <li><strong>Partners:</strong> Add/edit partner logos</li>
                  <li><strong>Hero, About, Contact:</strong> Update page sections</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translations">
            <Card>
              <CardHeader>
                <CardTitle>Translations Manager</CardTitle>
                <CardDescription>Edit text content in Arabic and English</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Translations editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Products</CardTitle>
                <CardDescription>Manage gallery product items</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gallery manager coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Main Products</CardTitle>
                <CardDescription>Edit featured products</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Products editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Partners</CardTitle>
                <CardDescription>Manage partner logos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Partners manager coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit homepage hero content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Hero editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Edit about page content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">About editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Edit contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Contact editor coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
