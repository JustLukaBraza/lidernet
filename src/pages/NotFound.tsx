import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft, Film, Radio, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <SEOHead 
        title="404 - გვერდი ვერ მოიძებნა"
        description="სამწუხაროდ, მოთხოვნილი გვერდი ვერ მოიძებნა"
      />
      <Header />
      
      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        <div className="max-w-4xl tv:max-w-6xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8 tv:mb-16">
            <h1 className="text-8xl md:text-9xl tv:text-[20rem] font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8 tv:mb-16">
            <h2 className="text-3xl md:text-4xl tv:text-6xl font-bold text-white mb-4 tv:mb-8">
              გვერდი ვერ მოიძებნა
            </h2>
            <p className="text-lg md:text-xl tv:text-3xl text-gray-400 max-w-2xl tv:max-w-4xl mx-auto leading-relaxed">
              სამწუხაროდ, მოთხოვნილი გვერდი არ არსებობს ან გადატანილია სხვა მისამართზე.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 tv:gap-8 justify-center mb-8 tv:mb-16">
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 tv:px-12 tv:py-6 text-lg tv:text-2xl font-semibold">
                <Home className="h-5 w-5 tv:h-8 tv:w-8 mr-2" />
                მთავარ გვერდზე დაბრუნება
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-4 tv:px-12 tv:py-6 text-lg tv:text-2xl">
                <Film className="h-5 w-5 tv:h-8 tv:w-8 mr-2" />
                ფილმების ნახვა
              </Button>
            </Link>
          </div>

          {/* Search Section */}
          <Card className="bg-gray-800 border-gray-700 max-w-2xl tv:max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white tv:text-2xl">ძიება</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4 tv:mb-6 tv:text-lg">
                იპოვეთ ის, რასაც ეძებთ
              </p>
              <div className="flex gap-2 tv:gap-4">
                <Input
                  type="text"
                  placeholder="ფილმის სახელი..."
                  className="flex-1 tv:text-lg tv:py-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4">
                  <Search className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                  ძიება
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Pages */}
          <div className="mt-8 tv:mt-16">
            <h3 className="text-xl tv:text-3xl font-semibold text-white mb-4 tv:mb-8">
              პოპულარული გვერდები
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tv:gap-6">
              <Link to="/browse">
                <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <CardContent className="p-4 tv:p-6 text-center">
                    <Film className="h-8 w-8 tv:h-12 tv:w-12 text-purple-400 mx-auto mb-2 tv:mb-4" />
                    <h4 className="text-white font-semibold tv:text-lg">ფილმები</h4>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/live">
                <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <CardContent className="p-4 tv:p-6 text-center">
                    <Radio className="h-8 w-8 tv:h-12 tv:w-12 text-red-400 mx-auto mb-2 tv:mb-4" />
                    <h4 className="text-white font-semibold tv:text-lg">ლაივი</h4>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/profile">
                <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <CardContent className="p-4 tv:p-6 text-center">
                    <User className="h-8 w-8 tv:h-12 tv:w-12 text-blue-400 mx-auto mb-2 tv:mb-4" />
                    <h4 className="text-white font-semibold tv:text-lg">პროფილი</h4>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/">
                <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                  <CardContent className="p-4 tv:p-6 text-center">
                    <Home className="h-8 w-8 tv:h-12 tv:w-12 text-green-400 mx-auto mb-2 tv:mb-4" />
                    <h4 className="text-white font-semibold tv:text-lg">მთავარი</h4>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
