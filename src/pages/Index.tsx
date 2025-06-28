import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import MovieSlider from '@/components/MovieSlider';
import HeroSlider from '@/components/HeroSlider';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/hooks/useMovies';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Radio, Zap, Heart, Star, Eye, Clock, Users, Award } from 'lucide-react';

const Index = () => {
  const { data: movies = [], isLoading } = useMovies();

  // Sample data for different movie categories
  const featuredMovies = movies.slice(0, 10);
  const popularMovies = movies.slice(5, 15);
  const recentMovies = movies.slice(10, 20);

  // Genres data
  const genres = [
    { name: 'Action', count: 150, icon: <Zap className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Drama', count: 200, icon: <Heart className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Comedy', count: 120, icon: <Star className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Horror', count: 80, icon: <Eye className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Sci-Fi', count: 90, icon: <Clock className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Romance', count: 110, icon: <Heart className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Thriller', count: 130, icon: <Zap className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
    { name: 'Adventure', count: 100, icon: <Award className="h-6 w-6 tv:h-8 tv:w-8 text-white" /> },
  ];

  // Stats data
  const stats = {
    totalMovies: 2500,
    totalGenres: 15,
    totalViews: '2.5M',
    activeUsers: 15000
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHead 
        title="LiderNet - ფილმები ქართულად უფასოდ"
        description="ყურება ფილმები ონლაინ უფასოდ LiderNet-ზე. ყოველდღე ახალი ფილმები, უკეთესი ხარისხი და სურათი. ქართულად ყურება."
      />
      <Header />
      
      {/* Hero Section */}
      <HeroSlider movies={featuredMovies} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        {/* Featured Movies */}
        <MovieSlider
          movies={featuredMovies}
          title="ფიჩერი ფილმები"
          subtitle="ყველაზე პოპულარული და ხარისხიანი ფილმები"
        />

        {/* Popular Movies */}
        <MovieSlider
          movies={popularMovies}
          title="პოპულარული ფილმები"
          subtitle="ყველაზე ნახვადი ფილმები ამ კვირაში"
        />

        {/* Recent Movies */}
        <MovieSlider
          movies={recentMovies}
          title="ახალი ფილმები"
          subtitle="უახლესი დამატებული ფილმები"
        />

        {/* Categories Section */}
        <section className="mb-12 tv:mb-20">
          <div className="mb-6 tv:mb-12">
            <h2 className="text-2xl tv:text-4xl font-bold text-white mb-2 tv:mb-4">ჟანრები</h2>
            <p className="text-gray-400 tv:text-xl">აირჩიეთ თქვენი საყვარელი ჟანრი</p>
            </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 tv:grid-cols-8 gap-4 tv:gap-6">
            {genres.map((genre) => (
              <Link key={genre.name} to={`/browse?genre=${genre.name}`}>
                <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <CardContent className="p-4 tv:p-6 text-center">
                    <div className="w-12 h-12 tv:w-16 tv:h-16 mx-auto mb-3 tv:mb-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      {genre.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm tv:text-lg group-hover:text-purple-300 transition-colors">
                      {genre.name}
                    </h3>
                    <p className="text-gray-400 text-xs tv:text-sm mt-1">
                      {genre.count} ფილმი
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

        {/* Stats Section */}
        <section className="mb-12 tv:mb-20">
          <Card className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-purple-500">
            <CardContent className="p-8 tv:p-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 tv:gap-12 text-center">
                <div>
                  <div className="text-3xl tv:text-5xl font-bold text-white mb-2 tv:mb-4">
                    {stats.totalMovies}
                  </div>
                  <div className="text-gray-300 tv:text-xl">ფილმი</div>
                </div>
                <div>
                  <div className="text-3xl tv:text-5xl font-bold text-white mb-2 tv:mb-4">
                    {stats.totalGenres}
              </div>
                  <div className="text-gray-300 tv:text-xl">ჟანრი</div>
              </div>
                <div>
                  <div className="text-3xl tv:text-5xl font-bold text-white mb-2 tv:mb-4">
                    {stats.totalViews}
              </div>
                  <div className="text-gray-300 tv:text-xl">ნახვა</div>
              </div>
                <div>
                  <div className="text-3xl tv:text-5xl font-bold text-white mb-2 tv:mb-4">
                    {stats.activeUsers}
              </div>
                  <div className="text-gray-300 tv:text-xl">მომხმარებელი</div>
              </div>
              </div>
            </CardContent>
          </Card>
          </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 tv:p-16">
              <h2 className="text-2xl tv:text-4xl font-bold text-white mb-4 tv:mb-8">
                დაიწყეთ ფილმების ყურება
              </h2>
              <p className="text-gray-400 mb-6 tv:mb-12 tv:text-xl max-w-2xl tv:max-w-4xl mx-auto">
                შეუერთდით ათასობით მომხმარებელს, რომლებიც უკვე უყურებენ ფილმებს LiderNet-ზე
              </p>
              <div className="flex flex-col sm:flex-row gap-4 tv:gap-8 justify-center">
          <Link to="/browse">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 tv:px-12 tv:py-6 text-lg tv:text-2xl font-semibold">
                    <Film className="h-5 w-5 tv:h-8 tv:w-8 mr-2" />
                    ფილმების ნახვა
                  </Button>
                </Link>
                <Link to="/live">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-4 tv:px-12 tv:py-6 text-lg tv:text-2xl">
                    <Radio className="h-5 w-5 tv:h-8 tv:w-8 mr-2" />
                    ლაივი ტრანსლაცია
            </Button>
          </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
