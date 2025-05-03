import React, { useState, useEffect } from 'react';
import { 
  itineraryApi,
  Itinerary,
  ItineraryFilters
} from '@/lib/api';
import ItineraryGrid from '@/components/itinerary/ItineraryGrid';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowUpDown, 
  MapPin, 
  Calendar, 
  Tag, 
  Search,
  X
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import FadeIn from '@/components/animation/FadeIn';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedTripLength, setSelectedTripLength] = useState<string>('');
  const [selectedExperienceType, setSelectedExperienceType] = useState<string>('');
  
  // Sort options
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  
  // Filter options - will be populated from API data
  const [locations, setLocations] = useState<string[]>([]);
  const [tripLengths, setTripLengths] = useState<string[]>([]);
  const [experienceTypes, setExperienceTypes] = useState<string[]>([]);
  
  // Count of active filters
  const activeFilterCount = [
    selectedLocation, 
    selectedTripLength, 
    selectedExperienceType
  ].filter(Boolean).length;

  // Fetch itineraries when component mounts or when filters change
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setLoading(true);
        
        // Create filters object for API call
        const filters: ItineraryFilters = {};
        if (selectedLocation) filters.location = selectedLocation;
        if (selectedTripLength) filters.tripLength = selectedTripLength;
        if (selectedExperienceType) filters.experienceType = selectedExperienceType;
        
        // Fetch itineraries from API
        const data = await itineraryApi.getAll(filters);
        
        // Apply search filter (client-side)
        let filtered = data;
        if (searchQuery) {
          filtered = filtered.filter((item: Itinerary) => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Apply sorting (client-side)
        if (sortBy === 'newest') {
          filtered = [...filtered].sort((a: Itinerary, b: Itinerary) => 
            new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          );
        } else if (sortBy === 'popular') {
          filtered = [...filtered].sort((a: Itinerary, b: Itinerary) => 
            (b.likes || 0) - (a.likes || 0)
          );
        }
        
        setItineraries(filtered);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch itineraries:', err);
        setError('Failed to fetch itineraries. Please try again later.');
        setItineraries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [selectedLocation, selectedTripLength, selectedExperienceType, searchQuery, sortBy]);
  
  // Extract unique filter options from fetched data
  useEffect(() => {
    if (itineraries.length > 0) {
      // Extract unique locations
      const uniqueLocations = Array.from(
        new Set(itineraries.map(item => item.location))
      );
      setLocations(uniqueLocations);
      
      // Extract unique trip lengths
      const uniqueTripLengths = Array.from(
        new Set(itineraries.map(item => item.tripLength))
      );
      setTripLengths(uniqueTripLengths);
      
      // Extract unique experience types
      const uniqueExperienceTypes = Array.from(
        new Set(itineraries.map(item => item.experienceType))
      );
      setExperienceTypes(uniqueExperienceTypes);
    }
  }, [itineraries]);
  
  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedTripLength('');
    setSelectedExperienceType('');
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <FadeIn>
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">Explore Itineraries</h1>
            <p className="text-muted-foreground text-lg">
              Discover travel plans created by fellow adventurers
            </p>
          </div>
          
          {/* Filters and Search Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Filters (mobile accordion / desktop card) */}
            <div className="flex flex-col gap-4">
              {/* Sort options */}
              <Card className="border shadow-sm lg:sticky lg:top-24">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Filters</h3>
                      {activeFilterCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearFilters}
                          className="h-auto p-0 text-muted-foreground"
                        >
                          Clear ({activeFilterCount})
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <ArrowUpDown className="h-4 w-4" />
                        Sort By
                      </h4>
                      <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value as 'newest' | 'popular')}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select sort option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Accordion type="multiple" className="w-full">
                      {/* Location filter */}
                      <AccordionItem value="location">
                        <AccordionTrigger className="py-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Location
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2.5 pt-1">
                            {locations.map(location => (
                              <div className="flex items-center space-x-2" key={location}>
                                <Checkbox 
                                  id={`location-${location}`}
                                  checked={selectedLocation === location}
                                  onCheckedChange={() => {
                                    setSelectedLocation(
                                      selectedLocation === location ? '' : location
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={`location-${location}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Trip length filter */}
                      <AccordionItem value="trip-length">
                        <AccordionTrigger className="py-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Trip Length
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2.5 pt-1">
                            {tripLengths.map(length => (
                              <div className="flex items-center space-x-2" key={length}>
                                <Checkbox 
                                  id={`length-${length}`}
                                  checked={selectedTripLength === length}
                                  onCheckedChange={() => {
                                    setSelectedTripLength(
                                      selectedTripLength === length ? '' : length
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={`length-${length}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {length}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Experience type filter */}
                      <AccordionItem value="experience-type">
                        <AccordionTrigger className="py-3">
                          <span className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            Experience Type
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2.5 pt-1">
                            {experienceTypes.map(type => (
                              <div className="flex items-center space-x-2" key={type}>
                                <Checkbox 
                                  id={`type-${type}`}
                                  checked={selectedExperienceType === type}
                                  onCheckedChange={() => {
                                    setSelectedExperienceType(
                                      selectedExperienceType === type ? '' : type
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={`type-${type}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search itineraries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Results counter */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {itineraries.length} {itineraries.length === 1 ? 'itinerary' : 'itineraries'} found
                </p>
              </div>
              
              {/* Itinerary grid */}
              {loading ? (
                <div className="text-center py-10">
                  <p>Loading itineraries...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">
                  <p>{error}</p>
                </div>
              ) : itineraries.length === 0 ? (
                <div className="text-center py-10">
                  <p>No itineraries found. Try adjusting your filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <ItineraryGrid 
                  itineraries={itineraries} 
                  columns={3}
                  className="pb-8"
                />
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Itineraries;
