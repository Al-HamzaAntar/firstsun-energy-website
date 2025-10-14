import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';

export const ProductsManager = () => {
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
        Add Main Product
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
                    <p><strong>Title Key:</strong> {product.title_key}</p>
                    <p><strong>Description Key:</strong> {product.description_key}</p>
                    <p><strong>Badge Key:</strong> {product.badge_key}</p>
                    <p><strong>Order:</strong> {product.display_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setEditingId(product.id)} variant="outline" size="sm">Edit</Button>
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
  const [titleKey, setTitleKey] = useState(product?.title_key || '');
  const [descKey, setDescKey] = useState(product?.description_key || '');
  const [badgeKey, setBadgeKey] = useState(product?.badge_key || '');
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');
  const [order, setOrder] = useState(product?.display_order || 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Title Key</Label>
        <Input value={titleKey} onChange={(e) => setTitleKey(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Description Key</Label>
        <Input value={descKey} onChange={(e) => setDescKey(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Badge Key</Label>
        <Input value={badgeKey} onChange={(e) => setBadgeKey(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Display Order</Label>
        <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSave({ title_key: titleKey, description_key: descKey, badge_key: badgeKey, image_url: imageUrl, display_order: order })}
          disabled={isPending}
          size="sm"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">Cancel</Button>
      </div>
    </div>
  );
};
