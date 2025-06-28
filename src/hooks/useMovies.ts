
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Movie } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Movie[];
    },
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Movie;
    },
    enabled: !!id,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (movieData: Omit<Movie, 'id' | 'created_at' | 'updated_at' | 'views'>) => {
      const { data, error } = await supabase
        .from('movies')
        .insert([movieData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast({
        title: 'ფილმი წარმატებით დაემატა!',
        description: 'ახალი ფილმი დაემატა კატალოგში.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'შეცდომა',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...movieData }: Partial<Movie> & { id: string }) => {
      const { data, error } = await supabase
        .from('movies')
        .update({ ...movieData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast({
        title: 'ფილმი განახლდა!',
        description: 'ფილმის ინფორმაცია წარმატებით განახლდა.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'შეცდომა',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast({
        title: 'ფილმი წაიშალა!',
        description: 'ფილმი წარმატებით წაიშალა კატალოგიდან.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'შეცდომა',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc('increment_movie_views', { movie_id: id });
      if (error) throw error;
    },
  });
};
