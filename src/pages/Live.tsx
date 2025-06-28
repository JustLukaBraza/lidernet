import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { 
  Users, 
  Eye, 
  Wifi
} from 'lucide-react';

const Live: React.FC = () => {
  const [embedUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHead 
        title="UFC 317 ლაივი - უფასო სტრიმინგი"
        description="UFC 317 ლაივი სტრიმინგი უფასოდ. ყურება UFC ბრძოლები ონლაინ HD ხარისხით."
      />
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 via-purple-900 to-blue-900 py-8 tv:py-16">
        <div className="container mx-auto px-4 tv:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4 tv:mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 tv:w-4 tv:h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold tv:text-xl">LIVE</span>
              </div>
              <Badge variant="outline" className="border-red-500 text-red-400 tv:text-lg tv:px-4 tv:py-2">
                UFC
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl tv:text-8xl font-bold text-white mb-4 tv:mb-8">
              UFC ლაივი
            </h1>
            <p className="text-lg tv:text-3xl text-gray-300 max-w-2xl tv:max-w-4xl mx-auto">
              უფასო ლაივი სტრიმინგი. ყურება ყველასთვის ხელმისაწვდომია.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        <div className="max-w-6xl tv:max-w-7xl mx-auto">
          {/* Main Live Stream */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardHeader className="bg-gray-700 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 tv:w-3 tv:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-semibold text-sm tv:text-xl">LIVE</span>
                  </div>
                  <CardTitle className="text-white tv:text-2xl">UFC 317</CardTitle>
                </div>
                <div className="flex items-center gap-4 tv:gap-8">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye className="h-4 w-4 tv:h-6 tv:w-6" />
                    <span className="text-sm tv:text-lg">HD</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Live Stream Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Stream Info */}
          <Card className="bg-gray-800 border-gray-700 mt-6 tv:mt-12">
            <CardContent className="p-6 tv:p-12">
              <div className="flex items-start justify-between mb-4 tv:mb-8">
                <div>
                  <h2 className="text-xl tv:text-4xl font-bold text-white mb-2 tv:mb-4">UFC 317 - მთავარი ბრძოლა</h2>
                  <p className="text-gray-400 mb-3 tv:mb-6 tv:text-xl">
                    უდიდესი UFC ღონისძიება წელს. ყველა ბრძოლა უფასოდ.
                  </p>
                  <div className="flex items-center gap-4 tv:gap-8 text-sm tv:text-xl text-gray-300">
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 tv:h-6 tv:w-6" />
                      <span>1080p</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-red-600 hover:bg-red-700 text-white tv:text-lg tv:px-4 tv:py-2">
                  ლაივი
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 tv:gap-4">
                <Badge variant="outline" className="border-purple-500 text-purple-400 tv:text-lg tv:px-3 tv:py-1">
                  UFC
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-400 tv:text-lg tv:px-3 tv:py-1">
                  ბრძოლა
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-400 tv:text-lg tv:px-3 tv:py-1">
                  უფასო
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Live; 