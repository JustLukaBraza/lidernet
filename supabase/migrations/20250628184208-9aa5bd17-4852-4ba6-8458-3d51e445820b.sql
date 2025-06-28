
-- Create function to increment movie views
CREATE OR REPLACE FUNCTION public.increment_movie_views(movie_id UUID)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  UPDATE public.movies 
  SET views = views + 1 
  WHERE id = movie_id;
$$;
