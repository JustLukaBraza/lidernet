import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { name: 'მთავარი', href: '/' },
    { name: 'ფილმები', href: '/browse' },
    { name: 'ლაივი', href: '/live' },
    { name: 'ჟანრები', href: '/browse?category=genres' },
    { name: 'ტოპ ფილმები', href: '/browse?sort=rating' },
  ];

  return (
    <>
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 tv:px-8">
          <div className="flex items-center justify-between h-16 tv:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl tv:text-3xl">
              <Film className="h-8 w-8 tv:h-12 tv:w-12 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                LiderNet
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 tv:space-x-12">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-base tv:text-xl">
                მთავარი
              </Link>
              <Link to="/browse" className="text-gray-300 hover:text-white transition-colors text-base tv:text-xl">
                ფილმები
              </Link>
              <Link to="/live" className="text-gray-300 hover:text-white transition-colors text-base tv:text-xl">
                ლაივი
              </Link>
              {user && (
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors text-base tv:text-xl">
                  პროფილი
                </Link>
              )}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 tv:h-6 tv:w-6" />
                <Input
                  type="text"
                  placeholder="ფილმის ძიება..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 tv:w-96 tv:py-4 tv:text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </form>

            {/* User Menu */}
            <div className="flex items-center space-x-4 tv:space-x-6">
              {user ? (
                <div className="flex items-center space-x-2 tv:space-x-4">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white tv:text-lg tv:px-6 tv:py-3">
                      <User className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                      პროფილი
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white tv:text-lg tv:px-6 tv:py-3"
                  >
                    <LogOut className="h-4 w-4 tv:h-6 tv:w-6 mr-2" />
                    გამოსვლა
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white tv:text-lg tv:px-8 tv:py-4"
                >
                  შესვლა
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-300 hover:text-white tv:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    პროფილი
                  </Link>
                )}
              </nav>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="ფილმის ძიება..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Header;
