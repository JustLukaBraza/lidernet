import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Star, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Movie } from '@/types/database';

interface MovieSliderProps {
  movies: Movie[];
  title: string;
  subtitle?: string;
  isLoading?: boolean;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ 
  movies, 
  title, 
  subtitle, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-64 h-96 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 tv:mb-20">
      <div className="mb-6 tv:mb-12">
        <h2 className="text-2xl tv:text-4xl font-bold text-white mb-2 tv:mb-4">{title}</h2>
        {subtitle && <p className="text-gray-400 tv:text-xl">{subtitle}</p>}
      </div>
      
      <div className="relative group">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 tv:-ml-6">
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="pl-2 md:pl-4 tv:pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 tv:basis-1/6">
                <Card className="group/card overflow-hidden bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 h-full">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=600&h=900&fit=crop'}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                    />
                    
                    {/* Overlay with play button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 tv:bottom-6 tv:left-6 tv:right-6">
                        <Link to={`/watch/${movie.id}`}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 tv:py-4 tv:text-lg">
                            <Play className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                            ყურება
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Genre badge */}
                    <div className="absolute top-2 left-2 tv:top-4 tv:left-4">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-xs tv:text-sm tv:px-2 tv:py-1">
                        {movie.genre}
                      </Badge>
                    </div>
                    
                    {/* Rating */}
                    {movie.rating && (
                      <div className="absolute top-2 right-2 tv:top-4 tv:right-4 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 tv:px-3 tv:py-2 flex items-center space-x-1">
                        <Star className="h-3 w-3 tv:h-4 tv:w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs tv:text-sm font-medium">{movie.rating}</span>
                      </div>
                    )}
                    
                    {/* Views count */}
                    <div className="absolute bottom-2 right-2 tv:bottom-4 tv:right-4 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 tv:px-3 tv:py-2 flex items-center space-x-1">
                      <Eye className="h-3 w-3 tv:h-4 tv:w-4 text-gray-300" />
                      <span className="text-white text-xs tv:text-sm">{movie.views}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 tv:p-6">
                    <h3 className="text-white font-semibold text-sm tv:text-lg mb-2 tv:mb-3 line-clamp-1 group-hover/card:text-purple-300 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs tv:text-sm mb-3 tv:mb-4 line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex items-center justify-between text-xs tv:text-sm text-gray-500">
                      <span>{movie.year}</span>
                      {movie.duration && (
                        <span>{movie.duration}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom navigation buttons */}
          <CarouselPrevious className="left-2 tv:left-4 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:border-purple-500 transition-all duration-300 opacity-0 group-hover:opacity-100 tv:p-4 tv:h-12 tv:w-12" />
          <CarouselNext className="right-2 tv:right-4 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:border-purple-500 transition-all duration-300 opacity-0 group-hover:opacity-100 tv:p-4 tv:h-12 tv:w-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default MovieSlider; 