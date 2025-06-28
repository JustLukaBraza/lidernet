import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Users, 
  Video, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Film,
  X,
  Save,
  Link as LinkIcon
} from 'lucide-react';
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie } from '@/hooks/useMovies';
import { useIsAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Movie } from '@/types/database';

interface MovieFormData {
  title: string;
  description: string;
  poster_url: string;
  video_url: string;
  genre: string;
  year: number | '';
  rating: number | '';
  duration: string;
  country: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    description: '',
    poster_url: '',
    video_url: '',
    genre: '',
    year: '',
    rating: '',
    duration: '',
    country: '',
  });

  const { user } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: movies = [], isLoading: moviesLoading } = useMovies();
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovie = useDeleteMovie();
  const { toast } = useToast();

  const stats = [
    { title: 'მომხმარებლები', value: '12,543', icon: Users, color: 'text-blue-400' },
    { title: 'ფილმები', value: movies.length.toString(), icon: Video, color: 'text-purple-400' },
    { title: 'ნახვები', value: movies.reduce((acc, movie) => acc + movie.views, 0).toLocaleString(), icon: Eye, color: 'text-green-400' },
    { title: 'ზრდა', value: '+12%', icon: TrendingUp, color: 'text-orange-400' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'მთავარი', icon: TrendingUp },
    { id: 'content', label: 'კონტენტი', icon: Film },
    { id: 'users', label: 'მომხმარებლები', icon: Users },
    { id: 'settings', label: 'პარამეტრები', icon: Settings },
  ];

  const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Adventure', 'Animation', 'Documentary'];

  const handleInputChange = (field: keyof MovieFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      poster_url: '',
      video_url: '',
      genre: '',
      year: '',
      rating: '',
      duration: '',
      country: '',
    });
    setEditingMovie(null);
    setShowAddForm(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.genre) {
      toast({
        title: 'შეცდომა',
        description: 'სათაური და ჟანრი აუცილებელია',
        variant: 'destructive',
      });
      return;
    }

    const movieData = {
      ...formData,
      year: formData.year ? Number(formData.year) : undefined,
      rating: formData.rating ? Number(formData.rating) : undefined,
      status: 'active' as const,
    };

    try {
      if (editingMovie) {
        await updateMovie.mutateAsync({ id: editingMovie.id, ...movieData });
      } else {
        await createMovie.mutateAsync(movieData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setFormData({
      title: movie.title,
      description: movie.description || '',
      poster_url: movie.poster_url || '',
      video_url: movie.video_url || '',
      genre: movie.genre,
      year: movie.year || '',
      rating: movie.rating || '',
      duration: movie.duration || '',
      country: movie.country || '',
    });
    setEditingMovie(movie);
    setShowAddForm(true);
    setActiveTab('content');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('ნამდვილად გსურთ ამ ფილმის წაშლა?')) {
      try {
        await deleteMovie.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  // Check if user is admin
  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-white">იტვირთება...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">შესვლა აუცილებელია</h2>
            <p className="text-gray-400">ადმინისტრაციის პანელზე წვდომისთვის გთხოვთ შეხვიდეთ სისტემაში</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">წვდომა აკრძალულია</h2>
            <p className="text-gray-400">თქვენ არ გაქვთ ადმინისტრაციის უფლებები</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-8">LiderNet - ადმინისტრაციის პანელი</h1>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Movies */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">ბოლო ატვირთული ფილმები</CardTitle>
              </CardHeader>
              <CardContent>
                {moviesLoading ? (
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-16 bg-gray-700" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {movies.slice(0, 5).map((movie) => (
                      <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={movie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=100&h=150&fit=crop'}
                            alt={movie.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{movie.title}</h4>
                            <p className="text-gray-400 text-sm">{movie.genre} • {movie.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-green-600 text-white">აქტიური</Badge>
                          <span className="text-gray-400 text-sm">{movie.views} ნახვა</span>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-600 text-white hover:bg-gray-600"
                              onClick={() => handleEdit(movie)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-600 text-white hover:bg-gray-600"
                              onClick={() => handleDelete(movie.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">ფილმების მართვა</h2>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                ახალი ფილმი
              </Button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Film className="h-5 w-5 mr-2" />
                    {editingMovie ? 'ფილმის რედაქტირება' : 'ახალი ფილმის დამატება'}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetForm}
                    className="border-gray-600 text-white hover:bg-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">ფილმის სათაური *</label>
                      <Input 
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="ფილმის სათაური"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">ჟანრი *</label>
                      <select
                        value={formData.genre}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:bg-gray-600 focus:border-purple-500"
                      >
                        <option value="">ჟანრის არჩევა</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">აღწერა</label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="ფილმის აღწერა..."
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">წელი</label>
                      <Input 
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value ? Number(e.target.value) : '')}
                        placeholder="2024" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">რეიტინგი</label>
                      <Input 
                        type="number" 
                        step="0.1"
                        min="0"
                        max="10"
                        value={formData.rating}
                        onChange={(e) => handleInputChange('rating', e.target.value ? Number(e.target.value) : '')}
                        placeholder="8.5" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">ხანგრძლივობა</label>
                      <Input 
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="120 წთ" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm block mb-2">ქვეყანა</label>
                      <Input 
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="USA" 
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* URL Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm block mb-2 flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        პოსტერის URL
                      </label>
                      <Input
                        type="url"
                        value={formData.poster_url}
                        onChange={(e) => handleInputChange('poster_url', e.target.value)}
                        placeholder="https://example.com/poster.jpg"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                      {formData.poster_url && (
                        <div className="mt-2">
                          <img
                            src={formData.poster_url}
                            alt="Poster preview"
                            className="w-32 h-48 object-cover rounded border border-gray-600"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm block mb-2 flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        ფილმის ვიდეო URL (MP4)
                      </label>
                      <Input
                        type="url"
                        value={formData.video_url}
                        onChange={(e) => handleInputChange('video_url', e.target.value)}
                        placeholder="https://example.com/movie.mp4"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:bg-gray-600 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      onClick={handleSubmit}
                      disabled={createMovie.isPending || updateMovie.isPending}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingMovie ? 'განახლება' : 'დამატება'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetForm}
                      className="border-gray-600 text-white hover:bg-gray-800"
                    >
                      გაუქმება
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Movies List */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">ყველა ფილმი ({movies.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {moviesLoading ? (
                  <div className="space-y-4">
                    {Array(10).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-20 bg-gray-700" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {movies.map((movie) => (
                      <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={movie.poster_url || 'https://images.unsplash.com/photo-1489599843-9d71bb3b1cc4?w=100&h=150&fit=crop'}
                            alt={movie.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{movie.title}</h4>
                            <p className="text-gray-400 text-sm">{movie.genre} • {movie.year}</p>
                            <p className="text-gray-500 text-xs">
                              {new Date(movie.created_at).toLocaleDateString('ka-GE')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-green-600 text-white">აქტიური</Badge>
                          <span className="text-gray-400 text-sm">{movie.views} ნახვა</span>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-600 text-white hover:bg-gray-600"
                              onClick={() => handleEdit(movie)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-600 text-white hover:bg-gray-600"
                              onClick={() => handleDelete(movie.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs */}
        {activeTab === 'users' && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">მომხმარებლების მართვა</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">მომხმარებლების მართვის ფუნქციონალობა განვითარების პროცესშია...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">სისტემის პარამეტრები</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">სისტემის პარამეტრების ფუნქციონალობა განვითარების პროცესშია...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
