
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  episode: string;
  views: string;
  genre: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  id,
  title,
  image,
  rating,
  year,
  episode,
  views,
  genre
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700 anime-card-hover group cursor-pointer">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={`https://images.unsplash.com/${image}?w=400&h=600&fit=crop`}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/watch/${id}`}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full glow-effect"
          >
            <Play className="h-8 w-8" />
          </Link>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md flex items-center space-x-1 text-sm font-bold">
          <Star className="h-3 w-3" />
          <span>{rating}</span>
        </div>

        {/* Episode Info */}
        <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
          {episode}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{year}</span>
          <span className="bg-gray-700 px-2 py-1 rounded text-xs">{genre}</span>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <Eye className="h-4 w-4 mr-1" />
          <span>{views}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
