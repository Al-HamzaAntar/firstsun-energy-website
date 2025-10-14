import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

export const SiteContentManager = ({ section }: { section: string }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const { data: siteContent, isLoading } = useQuery({
    queryKey: ['site_content', section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', section)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setContent(JSON.stringify(data.content, null, 2));
      }
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      let parsedContent;
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }

      if (siteContent) {
        const { error } = await supabase
          .from('site_content')
          .update({ content: parsedContent })
          .eq('section', section);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_content')
          .insert({ section, content: parsedContent });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_content', section] });
      toast.success('Content updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update content');
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{section} Section Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Content (JSON format)</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
            placeholder='{"key": "value"}'
          />
        </div>
        <Button
          onClick={() => updateMutation.mutate()}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
