import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CATEGORIES = [
  { en: 'Inverters', ar: 'العاكسات' },
  { en: 'Solar Panels', ar: 'الألواح الشمسية' },
  { en: 'Accessories', ar: 'الإكسسوارات' },
  { en: 'Installation Tools', ar: 'أدوات التركيب' },
  { en: 'Measurement Tools', ar: 'أدوات القياس' },
  { en: 'Security Systems', ar: 'أنظمة الأمان' },
  { en: 'Storage Systems', ar: 'أنظمة التخزين' },
  { en: 'Control Systems', ar: 'أنظمة التحكم' },
  { en: 'Water Pumps', ar: 'مضخات المياه' },
  { en: 'Safety Equipment', ar: 'معدات السلامة' },
];

export const ProductsManager = () => {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['main_products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('main_products')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (product: any) => {
      const { error } = await supabase
        .from('main_products')
        .update(product)
        .eq('id', product.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['main_products'] });
      toast.success('Product updated');
      setEditingId(null);
    },
    onError: () => toast.error('Failed to update product'),
  });

  const createMutation = useMutation({
    mutationFn: async (product: any) => {
      const { error } = await supabase
        .from('main_products')
        .insert(product);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['main_products'] });
      toast.success('Product created');
      setShowNew(false);
    },
    onError: () => toast.error('Failed to create product'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('main_products')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['main_products'] });
      toast.success('Product deleted');
    },
    onError: () => toast.error('Failed to delete product'),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setShowNew(true)} disabled={showNew}>
        <Plus className="w-4 h-4 mr-2" />
        {t('productsManager.addProduct')}
      </Button>

      {showNew && (
        <ProductForm
          onSave={(product) => createMutation.mutate(product)}
          onCancel={() => setShowNew(false)}
          isPending={createMutation.isPending}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="pt-6 space-y-4">
              {editingId === product.id ? (
                <ProductForm
                  product={product}
                  onSave={(updated) => updateMutation.mutate({ ...updated, id: product.id })}
                  onCancel={() => setEditingId(null)}
                  isPending={updateMutation.isPending}
                />
              ) : (
                <>
                  <img src={product.image_url} alt="" className="w-full h-48 object-cover rounded" />
                  <div className="space-y-2">
                    <p><strong>EN:</strong> {product.name_en}</p>
                    <p><strong>AR:</strong> {product.name_ar}</p>
                    {product.badge_en && <p><strong>{t('productsManager.badge')}:</strong> {product.badge_en} / {product.badge_ar}</p>}
                    <p><strong>{t('productsManager.order')}:</strong> {product.display_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setEditingId(product.id)} variant="outline" size="sm">{t('productsManager.edit')}</Button>
                    <Button onClick={() => deleteMutation.mutate(product.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductForm = ({ product, onSave, onCancel, isPending }: any) => {
  const { t } = useLanguage();
  const [nameEn, setNameEn] = useState(product?.name_en || '');
  const [nameAr, setNameAr] = useState(product?.name_ar || '');
  const [descEn, setDescEn] = useState(product?.description_en || '');
  const [descAr, setDescAr] = useState(product?.description_ar || '');
  const [badgeEn, setBadgeEn] = useState(product?.badge_en || '');
  const [badgeAr, setBadgeAr] = useState(product?.badge_ar || '');
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');
  const [order, setOrder] = useState(product?.display_order || 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('productsManager.imageUrl')}</Label>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder={t('productsManager.imageUrlPlaceholder')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('productsManager.nameEn')}</Label>
          <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder={t('productsManager.nameEnPlaceholder')} />
        </div>
        <div className="space-y-2">
          <Label>{t('productsManager.nameAr')}</Label>
          <Input value={nameAr} onChange={(e) => setNameAr(e.target.value)} placeholder={t('productsManager.nameArPlaceholder')} dir="rtl" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('productsManager.descEn')}</Label>
          <Input value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder={t('productsManager.descEnPlaceholder')} />
        </div>
        <div className="space-y-2">
          <Label>{t('productsManager.descAr')}</Label>
          <Input value={descAr} onChange={(e) => setDescAr(e.target.value)} placeholder={t('productsManager.descArPlaceholder')} dir="rtl" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>{t('productsManager.category')}</Label>
        <Select 
          value={badgeEn} 
          onValueChange={(value) => {
            setBadgeEn(value);
            const category = CATEGORIES.find(c => c.en === value);
            if (category) setBadgeAr(category.ar);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('productsManager.selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.en} value={category.en}>
                {category.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>{t('productsManager.displayOrder')}</Label>
        <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSave({ 
            name_en: nameEn, 
            name_ar: nameAr, 
            description_en: descEn, 
            description_ar: descAr, 
            badge_en: badgeEn || null,
            badge_ar: badgeAr || null,
            image_url: imageUrl, 
            display_order: order 
          })}
          disabled={isPending}
          size="sm"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {t('productsManager.save')}
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">{t('productsManager.cancel')}</Button>
      </div>
    </div>
  );
};
