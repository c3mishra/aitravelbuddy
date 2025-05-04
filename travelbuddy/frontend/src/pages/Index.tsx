import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GlobeIcon, 
  ArrowRightIcon, 
  HeartIcon, 
  MapPinIcon, 
  CalendarIcon,
  Loader2Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { itineraryApi, Itinerary, ItineraryFilters } from '@/lib/api';
import ItineraryGrid from '@/components/itinerary/ItineraryGrid';
import ItineraryCard from '@/components/itinerary/ItineraryCard';
import SearchBar, { SearchFilters } from '@/components/ui/search/SearchBar';
import FadeIn from '@/components/animation/FadeIn';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<Itinerary[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for featured and popular itineraries
  const [featuredItineraries, setFeaturedItineraries] = useState<Itinerary[]>([]);
  const [popularItineraries, setPopularItineraries] = useState<Itinerary[]>([]);
  
  // State for experience types (categories)
  const [experienceTypes, setExperienceTypes] = useState<string[]>([]);
  
  // Fetch itineraries data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all itineraries
        const itineraries = await itineraryApi.getAll();
        
        // Set initial search results
        setSearchResults(itineraries);
        
        // Set featured itineraries (first 3)
        setFeaturedItineraries(itineraries.slice(0, 3));
        
        // Set popular itineraries (sorted by likes)
        const sortedByPopularity = [...itineraries].sort((a, b) => 
          (b.likes || 0) - (a.likes || 0)
        ).slice(0, 6);
        setPopularItineraries(sortedByPopularity);
        
        // Extract unique experience types
        const uniqueExperienceTypes = Array.from(
          new Set(itineraries.map(item => item.experienceType))
        );
        setExperienceTypes(uniqueExperienceTypes);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch itineraries:', err);
        setError('Failed to fetch itineraries. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load itineraries",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Search function
  const handleSearch = async (query: string, filters: SearchFilters) => {
    try {
      setIsLoading(true);
      
      // Create filters object for API call
      const apiFilters: ItineraryFilters = {};
      if (filters.location) apiFilters.location = filters.location;
      if (filters.tripLength) apiFilters.tripLength = filters.tripLength;
      if (filters.experienceType) apiFilters.experienceType = filters.experienceType;
      
      // Fetch filtered itineraries from API
      const filteredResults = await itineraryApi.getAll(apiFilters);
      
      // Apply search query (text search) client-side if needed
      let results = filteredResults;
      if (query) {
        results = results.filter(item => 
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.location?.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setHasSearched(true);
      setError(null);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
      toast({
        title: "Error",
        description: "Failed to search itineraries",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Travel" 
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <FadeIn delay={200} duration={800} distance={20}>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold max-w-3xl leading-tight md:leading-tight">
              Share Your Journey, Inspire Others
            </h1>
          </FadeIn>
          
          <FadeIn delay={400} duration={800} distance={20}>
            <p className="text-white/90 text-lg md:text-xl mt-6 max-w-2xl">
              Discover and share remarkable travel experiences from around the world. Create, explore, and save detailed itineraries.
            </p>
          </FadeIn>
          
          <FadeIn delay={600} duration={800} distance={20}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/create">
                <Button size="lg" className="rounded-full bg-white text-foreground hover:bg-white/90">
                  Create Itinerary
                </Button>
              </Link>
              <Link to="/itineraries">
                <Button variant="outline" size="lg" className="rounded-full bg-transparent text-white border-white hover:bg-white/10">
                  Explore Itineraries
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Search Box Container */}
      <div className="relative z-30 container mx-auto px-4 md:px-6 -mt-16 mb-16">
        <FadeIn delay={800} duration={800} distance={20}>
          <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-glass max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </FadeIn>
      </div>
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="container mx-auto px-4 md:px-6 py-8 flex justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 md:px-6 py-8 text-center">
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      )}
      
      {/* Results Section (only shown after search) */}
      {!isLoading && !error && hasSearched && (
        <section className="container mx-auto px-4 md:px-6 py-8">
          <h2 className="text-2xl font-display font-semibold mb-8">
            Search Results 
            <span className="text-muted-foreground font-normal ml-2">
              ({searchResults.length} itineraries found)
            </span>
          </h2>
          {searchResults.length > 0 ? (
            <ItineraryGrid itineraries={searchResults} />
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No itineraries found matching your search criteria.</p>
            </div>
          )}
        </section>
      )}
      
      {/* Featured Itineraries Section */}
      {!isLoading && !error && !hasSearched && featuredItineraries.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-display font-semibold">Featured Itineraries</h2>
            <Link to="/itineraries" className="text-sm text-travel-600 hover:text-travel-700 font-medium flex items-center gap-1 group">
              View all
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <ItineraryGrid itineraries={featuredItineraries} cardSize="large" columns={3} />
        </section>
      )}
      
      {/* Experience Categories */}
      {!isLoading && !error && !hasSearched && experienceTypes.length > 0 && (
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-display font-semibold mb-3">Browse by Experience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover itineraries tailored to your preferred travel style and interests
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {experienceTypes.map((type, index) => (
                <FadeIn key={type} delay={index * 100} duration={600}>
                  <Link to={`/search?experienceType=${type}`}>
                    <div className="glass-card rounded-xl p-6 text-center hover:shadow-glass transition-all group">
                      <div className="w-12 h-12 rounded-full bg-travel-100 text-travel-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <GlobeIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">{type}</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore {type.toLowerCase()} travel experiences
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Popular Itineraries */}
      {!isLoading && !error && !hasSearched && popularItineraries.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-display font-semibold">Popular Itineraries</h2>
            <Link to="/popular" className="text-sm text-travel-600 hover:text-travel-700 font-medium flex items-center gap-1 group">
              View all
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <ItineraryGrid itineraries={popularItineraries} cardSize="medium" columns={3} />
        </section>
      )}
      
      {/* CTA Section */}
      {!isLoading && !hasSearched && (
        <section className="bg-travel-600 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-semibold mb-4">Ready to Share Your Journey?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Create and share your travel itineraries with travelers around the world. 
                Inspire others with your unique experiences and discoveries.
              </p>
              <Link to="/create">
                <Button size="lg" className="rounded-full bg-white text-travel-600 hover:bg-white/90">
                  Create Your Itinerary
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
