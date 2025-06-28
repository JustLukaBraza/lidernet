
-- Create movies table
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  video_url TEXT,
  genre TEXT NOT NULL,
  year INTEGER,
  rating DECIMAL(3,1),
  duration TEXT,
  country TEXT,
  views INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to view movies
CREATE POLICY "Anyone can view movies" 
  ON public.movies 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to insert movies (admin only in practice)
CREATE POLICY "Authenticated users can create movies" 
  ON public.movies 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows authenticated users to update movies (admin only in practice)
CREATE POLICY "Authenticated users can update movies" 
  ON public.movies 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to delete movies (admin only in practice)
CREATE POLICY "Authenticated users can delete movies" 
  ON public.movies 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Insert some sample movies
INSERT INTO public.movies (title, description, poster_url, video_url, genre, year, rating, duration, country) VALUES
('Interstellar', 'კოსმოსური ეპოსი კაცობრიობის მომავალზე, როდესაც დედამიწა კვდება და ადამიანები ახალი პლანეტის ძებნაში არიან ჩართული.', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Sci-Fi', 2014, 8.6, '169 წთ', 'USA'),
('The Dark Knight', 'ბეთმენის ბრძოლა ჯოკერთან გოთემ სიტიში', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'Action', 2008, 9.0, '152 წთ', 'USA'),
('Inception', 'სიზმრების სამყაროში შეღწევის შესახებ', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Sci-Fi', 2010, 8.8, '148 წთ', 'USA'),
('Parasite', 'სოციალური კლასების შესახებ კორეული ფილმი', 'https://images.unsplash.com/photo-1489599143042-3b71d5a2a5e0?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'Thriller', 2019, 8.5, '132 წთ', 'South Korea'),
('Avengers: Endgame', 'სუპერგმირების ფინალური ბრძოლა თანოსთან', 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'Action', 2019, 8.4, '181 წთ', 'USA'),
('Joker', 'ჯოკერის წარმოშობის ისტორია', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'Drama', 2019, 8.4, '122 წთ', 'USA'),
('Dune', 'ეპიკური კოსმოსური ფილმი მომავლის შესახებ', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 'Sci-Fi', 2021, 8.0, '155 წთ', 'USA'),
('John Wick', 'კილერის შურისძიების ისტორია', 'https://images.unsplash.com/photo-1489599143042-3b71d5a2a5e0?w=600&h=900&fit=crop', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 'Action', 2014, 7.4, '101 წთ', 'USA');

-- Create admin_users table for admin management
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admins to view admin users
CREATE POLICY "Admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = $1
  );
$$;
