import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchIcon, MenuIcon, XIcon, PlusCircleIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-subtle" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-travel-600 flex items-center justify-center">
            <span className="text-white font-semibold text-xl">E</span>
          </div>
          <span className="font-display font-semibold text-xl">EarthInNews</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary">
            Explore
          </Link>
          <Link to="/itineraries" className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary">
            Itineraries
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Link to="/search">
            <Button variant="outline" size="icon" className="rounded-full">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="outline" size="sm" className="rounded-full">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Create
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="rounded-full">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full"
                onClick={handleLogout}
              >
                <LogOutIcon className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="rounded-full">
                <UserIcon className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className={cn(
        "fixed inset-0 top-[57px] bg-background/95 dark:bg-background/95 backdrop-blur-md z-40 transition-all duration-300 ease-in-out md:hidden",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
              Explore
            </Link>
            <Link to="/itineraries" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
              Itineraries
            </Link>
            <Link to="/search" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
              Search
            </Link>
            <div className="border-t border-border my-4" />
            <Link to="/create" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
              Create Itinerary
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-left px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-secondary">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
