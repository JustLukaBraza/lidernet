
export interface Movie {
  id: string;
  title: string;
  description?: string;
  poster_url?: string;
  video_url?: string;
  genre: string;
  year?: number;
  rating?: number;
  duration?: string;
  country?: string;
  views: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}
