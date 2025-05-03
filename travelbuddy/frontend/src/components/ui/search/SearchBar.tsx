import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getExperienceTypes, getLocations, getTripLengths } from '@/lib/api';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  location: string;
  tripLength: string;
  experienceType: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    tripLength: '',
    experienceType: ''
  });
  
  // State for filter options
  const [locations, setLocations] = useState<string[]>([]);
  const [tripLengths, setTripLengths] = useState<string[]>([]);
  const [experienceTypes, setExperienceTypes] = useState<string[]>([]);
  
  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [locationsData, lengthsData, typesData] = await Promise.all([
          getLocations(),
          getTripLengths(),
          getExperienceTypes()
        ]);
        
        setLocations(locationsData as string[]);
        setTripLengths(lengthsData as string[]);
        setExperienceTypes(typesData as string[]);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };
  
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      location: '',
      tripLength: '',
      experienceType: ''
    });
  };
  
  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search destinations, experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 pr-4 bg-background border-border rounded-xl transition-shadow focus-visible:ring-travel-400"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button"
              variant="outline"
              className="flex items-center gap-2 bg-background py-6 px-4 border-border rounded-xl transition-shadow"
            >
              <FilterIcon className="h-5 w-5" />
              <span className="hidden md:inline">Filters</span>
              {Object.values(filters).some(Boolean) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-travel-500 text-[10px] font-medium text-white">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-4" align="end">
            <div className="grid gap-4">
              <h3 className="font-medium">Filter Results</h3>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange('location', value)}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tripLength" className="text-sm font-medium">Trip Length</label>
                <Select
                  value={filters.tripLength}
                  onValueChange={(value) => handleFilterChange('tripLength', value)}
                >
                  <SelectTrigger id="tripLength">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    {tripLengths.map((length) => (
                      <SelectItem key={length} value={length}>
                        {length}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="experienceType" className="text-sm font-medium">Experience Type</label>
                <Select
                  value={filters.experienceType}
                  onValueChange={(value) => handleFilterChange('experienceType', value)}
                >
                  <SelectTrigger id="experienceType">
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any experience</SelectItem>
                    {experienceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between mt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  Clear filters
                </Button>
                <Button 
                  type="button"
                  onClick={() => onSearch(searchQuery, filters)}
                >
                  Apply filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          type="submit" 
          className="py-6 px-6 bg-travel-600 hover:bg-travel-700 rounded-xl transition-colors"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
