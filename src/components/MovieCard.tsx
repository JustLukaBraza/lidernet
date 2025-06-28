
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Eye } from 'lucide-react';
import { Movie } from '@/types/database';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="group overflow-hidden bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=600&h=900&fit=crop'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/watch/${movie.id}`}>
            <div className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transform transition-transform hover:scale-110">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </Link>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-purple-600 hover:bg-purple-700">
            {movie.genre}
          </Badge>
        </div>
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{movie.rating}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {movie.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{movie.year}</span>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{movie.views}</span>
          </div>
        </div>
        {movie.duration && (
          <div className="mt-2 text-xs text-gray-500">
            {movie.duration}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
