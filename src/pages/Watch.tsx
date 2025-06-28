import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieSlider from '@/components/MovieSlider';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Globe,
  Eye,
  Play,
  Share2,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share,
  Download
} from 'lucide-react';
import { useMovie, useMovies, useIncrementViews } from '@/hooks/useMovies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovie(id!);
  const { data: allMovies = [] } = useMovies();
  const incrementViews = useIncrementViews();

  // Get related movies (same genre, excluding current movie)
  const relatedMovies = allMovies
    .filter(m => m.id !== id && m.genre === movie?.genre)
    .slice(0, 6);

  useEffect(() => {
    if (movie) {
      // Increment view count
      incrementViews.mutate(movie.id);
    }
  }, [movie, incrementViews]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <SEOHead title="იტვირთება..." />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="aspect-video w-full bg-gray-800 rounded-lg mb-6" />
          <Skeleton className="h-8 w-2/3 bg-gray-800 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] bg-gray-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900">
        <SEOHead title="ფილმი ვერ მოიძებნა" description="მოთხოვნილი ფილმი ვერ მოიძებნა ან წაშლილია." />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <div className="bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">ფილმი ვერ მოიძებნა</h2>
            <p className="text-gray-400 mb-6">შესაძლოა ფილმი წაშლილია ან არ არსებობს</p>
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                მთავარ გვერდზე დაბრუნება
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${window.location.origin}/watch/${movie.id}`;

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHead 
        title={movie?.title ? `${movie.title} - ყურება ონლაინ` : 'ფილმის ყურება'}
        description={movie?.description || 'ფილმის ყურება ონლაინ უფასოდ HD ხარისხით'}
        movie={movie}
      />
      <Header />
      
      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        <div className="max-w-7xl tv:max-w-8xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 tv:mb-12">
            <ol className="flex items-center space-x-2 tv:space-x-4 text-sm tv:text-lg">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  მთავარი
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  ფილმები
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-white font-medium">{movie?.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 tv:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <Card className="bg-gray-800 border-gray-700 overflow-hidden mb-6 tv:mb-12">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black">
                    <VideoPlayer 
                      src={movie?.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                      poster={movie?.poster_url}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Movie Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl tv:text-4xl mb-2 tv:mb-4">
                        {movie?.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 tv:gap-8 text-sm tv:text-lg text-gray-400">
                        {movie?.year && (
                          <span>{movie.year}</span>
                        )}
                        {movie?.duration && (
                          <span>{movie.duration}</span>
                        )}
                        {movie?.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 tv:h-6 tv:w-6 text-yellow-400 fill-yellow-400" />
                            <span>{movie.rating}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 tv:h-6 tv:w-6" />
                          <span>{movie?.views || 0} ნახვა</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-4 tv:py-2">
                      {movie?.genre}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-base tv:text-xl leading-relaxed mb-6 tv:mb-8">
                    {movie?.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 tv:gap-6">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4">
                      <Heart className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                      ფავორიტებში დამატება
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 tv:text-lg tv:px-8 tv:py-4">
                      <Share className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                      გაზიარება
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 tv:text-lg tv:px-8 tv:py-4">
                      <Download className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                      ჩამოტვირთვა
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Movies */}
              <Card className="bg-gray-800 border-gray-700 mb-6 tv:mb-12">
                <CardHeader>
                  <CardTitle className="text-white tv:text-2xl">მსგავსი ფილმები</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 tv:space-y-6">
                  {relatedMovies.map((relatedMovie) => (
                    <Link key={relatedMovie.id} to={`/watch/${relatedMovie.id}`}>
                      <div className="flex gap-4 tv:gap-6 group cursor-pointer">
                        <div className="relative w-20 h-28 tv:w-24 tv:h-32 flex-shrink-0">
                          <img
                            src={relatedMovie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=200&h=300&fit=crop'}
                            alt={relatedMovie.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Play className="h-6 w-6 tv:h-8 tv:w-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm tv:text-lg mb-1 tv:mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                            {relatedMovie.title}
                          </h4>
                          <p className="text-gray-400 text-xs tv:text-sm mb-2 tv:mb-3 line-clamp-2">
                            {relatedMovie.description}
                          </p>
                          <div className="flex items-center gap-2 tv:gap-4 text-xs tv:text-sm text-gray-500">
                            <span>{relatedMovie.year}</span>
                            {relatedMovie.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 tv:h-4 tv:w-4 text-yellow-400 fill-yellow-400" />
                                <span>{relatedMovie.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Movie Details */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white tv:text-2xl">ფილმის დეტალები</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 tv:space-y-6">
                  <div>
                    <Label className="text-gray-400 text-sm tv:text-lg">ჟანრი</Label>
                    <p className="text-white font-medium tv:text-lg">{movie?.genre}</p>
                  </div>
                  {movie?.year && (
                    <div>
                      <Label className="text-gray-400 text-sm tv:text-lg">წელი</Label>
                      <p className="text-white font-medium tv:text-lg">{movie.year}</p>
                    </div>
                  )}
                  {movie?.duration && (
                    <div>
                      <Label className="text-gray-400 text-sm tv:text-lg">ხანგრძლივობა</Label>
                      <p className="text-white font-medium tv:text-lg">{movie.duration}</p>
                    </div>
                  )}
                  {movie?.rating && (
                    <div>
                      <Label className="text-gray-400 text-sm tv:text-lg">რეიტინგი</Label>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 tv:h-6 tv:w-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-medium tv:text-lg">{movie.rating}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-gray-400 text-sm tv:text-lg">ნახვები</Label>
                    <p className="text-white font-medium tv:text-lg">{movie?.views || 0}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
