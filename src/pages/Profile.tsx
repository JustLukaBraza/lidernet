import React, { useState } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieSlider from '@/components/MovieSlider';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Heart, 
  Clock, 
  Settings, 
  Edit, 
  Save, 
  X, 
  Star,
  Eye,
  Calendar,
  Trophy,
  Award,
  LogOut
} from 'lucide-react';
import { Link } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'აბრაამ მაისურაძე',
    email: 'abram@example.com',
    joinDate: '2024-01-15',
    watchedMovies: 245,
    favoriteGenre: 'Action',
    totalWatchTime: '1,234 საათი',
    memberLevel: 'Gold'
  });

  const favoriteMovies = [
    {
      id: '1',
      title: "Inception",
      poster_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop",
      rating: 9.2,
      year: 2023,
      views: 2400000,
      genre: "Action",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
      id: '2',
      title: "The Dark Knight",
      poster_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=900&fit=crop",
      rating: 8.9,
      year: 2024,
      views: 1800000,
      genre: "Action",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
      id: '3',
      title: "Interstellar",
      poster_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=900&fit=crop",
      rating: 9.1,
      year: 2023,
      views: 3100000,
      genre: "Sci-Fi",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    }
  ];

  const watchHistory = [
    {
      id: '4',
      title: "The Shawshank Redemption",
      poster_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=900&fit=crop",
      rating: 8.7,
      year: 2024,
      views: 4200000,
      genre: "Drama",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      watchedAt: "2024-01-20"
    },
    {
      id: '5',
      title: "Pulp Fiction",
      poster_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=900&fit=crop",
      rating: 8.6,
      year: 2024,
      views: 1500000,
      genre: "Crime",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      watchedAt: "2024-01-19"
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here would be API call to save user info
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  const [activeTab, setActiveTab] = useState('favorites');

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHead 
        title="პროფილი - ჩემი ფილმები"
        description="თქვენი პროფილი და ფავორიტი ფილმები"
      />
      <Header />
      
      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        <div className="max-w-6xl tv:max-w-7xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-gray-800 border-gray-700 mb-8 tv:mb-16">
            <CardContent className="p-6 tv:p-12">
              <div className="flex items-center gap-6 tv:gap-12">
                <div className="relative">
                  <div className="w-20 h-20 tv:w-32 tv:h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 tv:h-16 tv:w-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 tv:-bottom-4 tv:-right-4 w-6 h-6 tv:w-8 tv:h-8 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl tv:text-4xl font-bold text-white mb-2 tv:mb-4">
                    {userInfo.email || 'მომხმარებელი'}
                  </h1>
                  <p className="text-gray-400 tv:text-xl mb-4 tv:mb-6">
                    LiderNet-ის წევრი
                  </p>
                  <div className="flex items-center gap-6 tv:gap-12 text-sm tv:text-lg">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl tv:text-3xl">{favoriteMovies.length}</div>
                      <div className="text-gray-400">ფავორიტი</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-xl tv:text-3xl">{userInfo.watchedMovies}</div>
                      <div className="text-gray-400">ნანახი</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-xl tv:text-3xl">{watchHistory.length}</div>
                      <div className="text-gray-400">სანახავი</div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleCancel}
                  variant="outline" 
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white tv:text-lg tv:px-8 tv:py-4"
                >
                  <LogOut className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                  გამოსვლა
                </Button>
              </div>
              </CardContent>
            </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 tv:space-y-12">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
              <TabsTrigger 
                value="favorites" 
                className="tv:text-lg tv:py-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Heart className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                  ფავორიტები
                </TabsTrigger>
              <TabsTrigger 
                value="watched" 
                className="tv:text-lg tv:py-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Eye className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                ნანახი
                </TabsTrigger>
              <TabsTrigger 
                value="watchlist" 
                className="tv:text-lg tv:py-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Clock className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                სანახავი
                </TabsTrigger>
              </TabsList>

            <TabsContent value="favorites" className="space-y-6 tv:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tv:text-4xl font-bold text-white">ფავორიტი ფილმები</h2>
                <Badge className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-4 tv:py-2">
                  {favoriteMovies.length} ფილმი
                </Badge>
              </div>
              
              {favoriteMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tv:grid-cols-5 gap-6 tv:gap-8">
                  {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                    ) : (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 tv:p-20 text-center">
                    <Heart className="h-16 w-16 tv:h-24 tv:w-24 text-gray-600 mx-auto mb-4 tv:mb-8" />
                    <h3 className="text-xl tv:text-3xl font-semibold text-white mb-2 tv:mb-4">
                      ფავორიტი ფილმები არ გაქვთ
                    </h3>
                    <p className="text-gray-400 tv:text-xl mb-6 tv:mb-8">
                      დაამატეთ ფილმები ფავორიტებში ყურებისას
                    </p>
                    <Link to="/browse">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4">
                        ფილმების ნახვა
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              </TabsContent>

            <TabsContent value="watched" className="space-y-6 tv:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tv:text-4xl font-bold text-white">ნანახი ფილმები</h2>
                <Badge className="bg-green-600 hover:bg-green-700 text-white tv:text-lg tv:px-4 tv:py-2">
                  {watchHistory.length} ფილმი
                </Badge>
              </div>
              
                    {watchHistory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tv:grid-cols-5 gap-6 tv:gap-8">
                  {watchHistory.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                    ) : (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 tv:p-20 text-center">
                    <Eye className="h-16 w-16 tv:h-24 tv:w-24 text-gray-600 mx-auto mb-4 tv:mb-8" />
                    <h3 className="text-xl tv:text-3xl font-semibold text-white mb-2 tv:mb-4">
                      ნანახი ფილმები არ გაქვთ
                    </h3>
                    <p className="text-gray-400 tv:text-xl mb-6 tv:mb-8">
                      დაიწყეთ ფილმების ყურება და ისინი აქ გამოჩნდება
                    </p>
                    <Link to="/browse">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4">
                        ფილმების ნახვა
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              </TabsContent>

            <TabsContent value="watchlist" className="space-y-6 tv:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tv:text-4xl font-bold text-white">სანახავი ფილმები</h2>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white tv:text-lg tv:px-4 tv:py-2">
                  {watchHistory.length} ფილმი
                </Badge>
              </div>
              
              {watchHistory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tv:grid-cols-5 gap-6 tv:gap-8">
                  {watchHistory.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 tv:p-20 text-center">
                    <Clock className="h-16 w-16 tv:h-24 tv:w-24 text-gray-600 mx-auto mb-4 tv:mb-8" />
                    <h3 className="text-xl tv:text-3xl font-semibold text-white mb-2 tv:mb-4">
                      სანახავი ფილმები არ გაქვთ
                    </h3>
                    <p className="text-gray-400 tv:text-xl mb-6 tv:mb-8">
                      დაამატეთ ფილმები სანახავ სიაში
                    </p>
                    <Link to="/browse">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4">
                        ფილმების ნახვა
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
