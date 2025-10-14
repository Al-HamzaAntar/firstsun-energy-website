import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';

export const PartnersManager = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (partner: any) => {
      const { error } = await supabase
        .from('partners')
        .update(partner)
        .eq('id', partner.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partner updated');
      setEditingId(null);
    },
    onError: () => toast.error('Failed to update partner'),
  });

  const createMutation = useMutation({
    mutationFn: async (partner: any) => {
      const { error } = await supabase
        .from('partners')
        .insert(partner);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partner created');
      setShowNew(false);
    },
    onError: () => toast.error('Failed to create partner'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partner deleted');
    },
    onError: () => toast.error('Failed to delete partner'),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setShowNew(true)} disabled={showNew}>
        <Plus className="w-4 h-4 mr-2" />
        Add Partner
      </Button>

      {showNew && (
        <PartnerForm
          onSave={(partner) => createMutation.mutate(partner)}
          onCancel={() => setShowNew(false)}
          isPending={createMutation.isPending}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners?.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="pt-6 space-y-4">
              {editingId === partner.id ? (
                <PartnerForm
                  partner={partner}
                  onSave={(updated) => updateMutation.mutate({ ...updated, id: partner.id })}
                  onCancel={() => setEditingId(null)}
                  isPending={updateMutation.isPending}
                />
              ) : (
                <>
                  <img src={partner.logo_url} alt={partner.name} className="w-full h-24 object-contain" />
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {partner.name}</p>
                    <p><strong>Order:</strong> {partner.display_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setEditingId(partner.id)} variant="outline" size="sm">Edit</Button>
                    <Button onClick={() => deleteMutation.mutate(partner.id)} variant="destructive" size="sm">
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

const PartnerForm = ({ partner, onSave, onCancel, isPending }: any) => {
  const [name, setName] = useState(partner?.name || '');
  const [logoUrl, setLogoUrl] = useState(partner?.logo_url || '');
  const [order, setOrder] = useState(partner?.display_order || 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Logo URL</Label>
        <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Display Order</Label>
        <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSave({ name, logo_url: logoUrl, display_order: order })}
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
