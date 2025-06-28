import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/database';

interface HeroSliderProps {
  movies: Movie[];
  isLoading?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ movies, isLoading = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="relative bg-gradient-to-r from-purple-900 to-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ყურება ფილმები ონლაინ
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ყოველდღე ახალი ფილმები, უკეთესი ხარისხი და სურათი. ყურება ფილმები უფასოდ.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentMovie = movies[currentSlide];

  return (
    <section className="relative h-[70vh] min-h-[500px] tv:h-[80vh] tv:min-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=1920&h=1080&fit=crop'}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 tv:px-8">
          <div className="max-w-2xl tv:max-w-4xl">
            {/* Genre Badge */}
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white mb-4 tv:mb-8 tv:text-lg tv:px-4 tv:py-2">
              {currentMovie.genre}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl tv:text-8xl font-bold text-white mb-4 tv:mb-8 leading-tight">
              {currentMovie.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl tv:text-3xl text-gray-300 mb-6 tv:mb-12 line-clamp-3">
              {currentMovie.description}
            </p>

            {/* Movie Info */}
            <div className="flex items-center gap-6 tv:gap-12 mb-8 tv:mb-16 text-white">
              {currentMovie.year && (
                <span className="text-lg tv:text-2xl">{currentMovie.year}</span>
              )}
              {currentMovie.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 tv:h-8 tv:w-8 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg tv:text-2xl">{currentMovie.rating}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 tv:h-8 tv:w-8 text-gray-300" />
                <span className="text-lg tv:text-2xl">{currentMovie.views} ნახვა</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 tv:gap-8">
              <Link to={`/watch/${currentMovie.id}`}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 tv:px-12 tv:py-6 text-lg tv:text-2xl font-semibold">
                  <Play className="h-5 w-5 tv:h-8 tv:w-8 mr-2" />
                  ყურება ახლა
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8 py-3 tv:px-12 tv:py-6 text-lg tv:text-2xl">
                  ყველა ფილმი
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 tv:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 tv:p-6 rounded-full transition-all duration-300 opacity-0 hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6 tv:h-10 tv:w-10" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 tv:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 tv:p-6 rounded-full transition-all duration-300 opacity-0 hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6 tv:h-10 tv:w-10" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 tv:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 tv:gap-4">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 tv:w-4 tv:h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-purple-600 w-8 tv:w-12'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider; 