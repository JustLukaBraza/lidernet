import { useState } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieSlider from '@/components/MovieSlider';
import SEOHead from '@/components/SEOHead';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Star, Calendar, Eye, Grid, List } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Film } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: movies = [], isLoading } = useMovies();

  // Get unique genres
  const genres = [...new Set(movies.map(movie => movie.genre))];

  // Filter and sort movies
  const filteredAndSortedMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHead 
        title="ფილმების ბიბლიოთეკა - ყველა ჟანრი"
        description="ფილმების ბიბლიოთეკა ყველა ჟანრით. ძიება, ფილტრი და ყურება უფასოდ."
      />
      <Header />
      
      <div className="container mx-auto px-4 tv:px-8 py-8 tv:py-16">
        {/* Page Header */}
        <div className="mb-8 tv:mb-16">
          <h1 className="text-3xl tv:text-6xl font-bold text-white mb-4 tv:mb-8">ფილმების ბიბლიოთეკა</h1>
          <p className="text-gray-400 tv:text-2xl">აღმოაჩინეთ ათასობით ფილმი ყველა ჟანრით</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 tv:gap-12">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white tv:text-2xl">ფილტრები</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 tv:space-y-8">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="text-white tv:text-lg">ძიება</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="ფილმის სახელი..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-2 tv:mt-4 tv:text-lg tv:py-3 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Genre Filter */}
                <div>
                  <Label className="text-white tv:text-lg">ჟანრი</Label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="mt-2 tv:mt-4 tv:text-lg tv:py-3 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="ყველა ჟანრი" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="">ყველა ჟანრი</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-600">
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Filter */}
                <div>
                  <Label className="text-white tv:text-lg">წელი</Label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="mt-2 tv:mt-4 tv:text-lg tv:py-3 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="ყველა წელი" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="">ყველა წელი</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-600">
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div>
                  <Label className="text-white tv:text-lg">დალაგება</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="mt-2 tv:mt-4 tv:text-lg tv:py-3 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="title" className="text-white hover:bg-gray-600">სახელი A-Z</SelectItem>
                      <SelectItem value="title-desc" className="text-white hover:bg-gray-600">სახელი Z-A</SelectItem>
                      <SelectItem value="year" className="text-white hover:bg-gray-600">წელი (ახალი)</SelectItem>
                      <SelectItem value="year-desc" className="text-white hover:bg-gray-600">წელი (ძველი)</SelectItem>
                      <SelectItem value="rating" className="text-white hover:bg-gray-600">რეიტინგი</SelectItem>
                      <SelectItem value="views" className="text-white hover:bg-gray-600">პოპულარობა</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('all');
                    setSortBy('newest');
                  }}
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 tv:text-lg tv:py-3"
                >
                  ფილტრების გასუფთავება
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Movies Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6 tv:mb-12">
              <p className="text-gray-400 tv:text-xl">
                ნაპოვნია <span className="text-white font-semibold">{filteredAndSortedMovies.length}</span> ფილმი
              </p>
              <div className="flex items-center gap-2 tv:gap-4">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="tv:text-lg tv:px-4 tv:py-2"
                >
                  <Grid className="h-4 w-4 tv:h-6 tv:w-6" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="tv:text-lg tv:px-4 tv:py-2"
                >
                  <List className="h-4 w-4 tv:h-6 tv:w-6" />
                </Button>
              </div>
            </div>

            {/* Movies Grid/List */}
            {filteredAndSortedMovies.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tv:grid-cols-5 gap-6 tv:gap-8" 
                : "space-y-4 tv:space-y-6"
              }>
                {filteredAndSortedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-12 tv:p-20 text-center">
                  <Film className="h-16 w-16 tv:h-24 tv:w-24 text-gray-600 mx-auto mb-4 tv:mb-8" />
                  <h3 className="text-xl tv:text-3xl font-semibold text-white mb-2 tv:mb-4">
                    ფილმი ვერ მოიძებნა
                  </h3>
                  <p className="text-gray-400 tv:text-xl">
                    სცადეთ სხვა ძიების ტერმინები ან გაასუფთავეთ ფილტრები
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {filteredAndSortedMovies.length > 0 && (
              <div className="mt-8 tv:mt-16 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious className="tv:text-lg tv:px-6 tv:py-3" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="tv:text-lg tv:px-6 tv:py-3">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="tv:text-lg tv:px-6 tv:py-3">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="tv:text-lg tv:px-6 tv:py-3">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext className="tv:text-lg tv:px-6 tv:py-3" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
