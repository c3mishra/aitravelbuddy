import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ImageIcon, 
  MapPinIcon, 
  CalendarIcon,
  TagIcon,
  CheckIcon,
  UploadIcon,
  PlusIcon,
  TrashIcon,
  ClockIcon,
  Loader2Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { itineraryApi, getTripLengths, getExperienceTypes } from '@/lib/api';
import FadeIn from '@/components/animation/FadeIn';
import { DayDetail } from '@/types';

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for select options
  const [isLoading, setIsLoading] = useState(false);
  const [tripLengths, setTripLengths] = useState<string[]>([]);
  const [experienceTypes, setExperienceTypes] = useState<string[]>([]);
  
  // Fetch options for select fields
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [lengths, types] = await Promise.all([
          getTripLengths(),
          getExperienceTypes()
        ]);
        setTripLengths(lengths as string[]);
        setExperienceTypes(types as string[]);
      } catch (error) {
        console.error('Error fetching form options:', error);
        toast({
          title: 'Error',
          description: 'Failed to load form options',
          variant: 'destructive'
        });
      }
    };
    
    fetchOptions();
  }, [toast]);
  
  // Form state
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    location: '',
    tripLength: '',
    experienceType: '',
    coverImage: null as File | null,
    images: [] as File[],
    days: [] as DayDetail[],
  });
  
  // Preview URLs for selected images
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  
  // Update form field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle cover image upload
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormState(prev => ({ ...prev, coverImage: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle additional images upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormState(prev => ({ ...prev, images: [...prev.images, ...fileArray] }));
      
      // Create preview URLs
      const newPreviews: string[] = [];
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === fileArray.length) {
            setImagesPreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...formState.images];
    newImages.splice(index, 1);
    setFormState(prev => ({ ...prev, images: newImages }));
    
    const newPreviews = [...imagesPreviews];
    newPreviews.splice(index, 1);
    setImagesPreviews(newPreviews);
  };
  
  // Handle day detail changes
  const handleDayDetailChange = (id: string, field: keyof DayDetail, value: string | number) => {
    setFormState(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === id ? { ...day, [field]: value } : day
      )
    }));
  };
  
  // Add a new day
  const addDay = () => {
    const newDay: DayDetail = {
      id: crypto.randomUUID(),
      dayNumber: formState.days.length + 1,
      activities: '',
      accommodation: '',
      meals: '',
      notes: ''
    };
    
    setFormState(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }));
  };
  
  // Remove a day
  const removeDay = (id: string) => {
    setFormState(prev => {
      const filteredDays = prev.days.filter(day => day.id !== id);
      // Renumber remaining days
      const renumberedDays = filteredDays.map((day, index) => ({
        ...day,
        dayNumber: index + 1
      }));
      
      return {
        ...prev,
        days: renumberedDays
      };
    });
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.title || !formState.description || !formState.location ||
        !formState.tripLength || !formState.experienceType || !formState.coverImage) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and add a cover image",
        variant: "destructive"
      });
      return;
    }
    
    // Validate days (only if any have been added)
    if (formState.days.length > 0) {
      const incompleteDays = formState.days.filter(day => !day.activities);
      if (incompleteDays.length > 0) {
        toast({
          title: "Incomplete day details",
          description: `Please add activities for Day ${incompleteDays[0].dayNumber}`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, you would upload images to a storage service
      // and get back URLs to store in the database
      // Here we'll simulate this by using the preview URLs
      
      // Prepare data for API
      const itineraryData = {
        title: formState.title,
        description: formState.description,
        location: formState.location,
        tripLength: formState.tripLength,
        experienceType: formState.experienceType,
        coverImage: coverImagePreview || '',
        images: imagesPreviews,
        days: formState.days,
        userId: "tempuser123" // In a real app, this would come from authentication
      };
      
      // Create the itinerary
      await itineraryApi.create(itineraryData);
      
      // Success toast
      toast({
        title: "Itinerary created!",
        description: "Your itinerary has been successfully created"
      });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error creating itinerary:', error);
      toast({
        title: "Error",
        description: "Failed to create itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <FadeIn>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-semibold mb-2">Create New Itinerary</h1>
            <p className="text-muted-foreground">
              Share your travel experience with the world
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Give your itinerary a descriptive title"
                  value={formState.title}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell travelers about your experience"
                  value={formState.description}
                  onChange={handleInputChange}
                  className="mt-1 min-h-32 resize-none"
                />
              </div>
            </div>
            
            {/* Cover Image */}
            <div>
              <Label>Cover Image</Label>
              <div className="mt-1">
                {coverImagePreview ? (
                  <div className="relative rounded-lg overflow-hidden h-60 mb-2">
                    <img 
                      src={coverImagePreview} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Button 
                        type="button"
                        variant="secondary" 
                        size="sm"
                        onClick={() => {
                          setCoverImagePreview(null);
                          setFormState(prev => ({ ...prev, coverImage: null }));
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-muted-foreground transition-colors">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-2">Upload a cover image for your itinerary</p>
                    <p className="text-xs text-muted-foreground mb-4">Recommended size: 1920 x 1080 pixels</p>
                    
                    <div>
                      <Label htmlFor="coverImage" className="cursor-pointer">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2">
                          <UploadIcon className="mr-2 h-4 w-4" />
                          Choose Image
                        </div>
                      </Label>
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Location and Trip Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location" className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country"
                  value={formState.location}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="tripLength" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Trip Length
                </Label>
                <Select
                  value={formState.tripLength}
                  onValueChange={(value) => handleSelectChange('tripLength', value)}
                >
                  <SelectTrigger id="tripLength" className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {tripLengths.map((length) => (
                      <SelectItem key={length} value={length}>
                        {length}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experienceType" className="flex items-center gap-1">
                  <TagIcon className="h-4 w-4" />
                  Experience Type
                </Label>
                <Select
                  value={formState.experienceType}
                  onValueChange={(value) => handleSelectChange('experienceType', value)}
                >
                  <SelectTrigger id="experienceType" className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Additional Images */}
            <div>
              <Label htmlFor="images">
                Additional Images <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <div className="mt-1">
                <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-muted-foreground transition-colors">
                  {imagesPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {imagesPreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-video rounded-md overflow-hidden group">
                          <img 
                            src={preview} 
                            alt={`Preview ${index}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => removeImage(index)}
                              className="opacity-100"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Label htmlFor="additionalImages" className="cursor-pointer">
                      <div className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground h-10 px-4 py-2">
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Add Images
                      </div>
                    </Label>
                    <Input
                      id="additionalImages"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      You can upload multiple images to showcase your travel experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Day-by-Day Details Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Day-by-Day Schedule</Label>
                <Button
                  type="button"
                  onClick={addDay}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Day
                </Button>
              </div>
              
              {formState.days.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                  <ClockIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No day details added yet</p>
                  <p className="text-xs text-muted-foreground mb-4">Add details for each day of your trip</p>
                  <Button type="button" onClick={addDay} variant="secondary">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add First Day
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {formState.days.map((day) => (
                    <div key={day.id} className="border rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <Button
                          type="button"
                          onClick={() => removeDay(day.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <h3 className="text-lg font-medium mb-4">Day {day.dayNumber}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`activities-${day.id}`}>Activities</Label>
                          <Textarea
                            id={`activities-${day.id}`}
                            value={day.activities}
                            onChange={(e) => handleDayDetailChange(day.id, 'activities', e.target.value)}
                            placeholder="What activities did you do on this day?"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`accommodation-${day.id}`}>Accommodation</Label>
                          <Input
                            id={`accommodation-${day.id}`}
                            value={day.accommodation}
                            onChange={(e) => handleDayDetailChange(day.id, 'accommodation', e.target.value)}
                            placeholder="Where did you stay?"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`meals-${day.id}`}>Meals</Label>
                          <Textarea
                            id={`meals-${day.id}`}
                            value={day.meals}
                            onChange={(e) => handleDayDetailChange(day.id, 'meals', e.target.value)}
                            placeholder="What/where did you eat?"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`notes-${day.id}`}>Notes</Label>
                          <Textarea
                            id={`notes-${day.id}`}
                            value={day.notes}
                            onChange={(e) => handleDayDetailChange(day.id, 'notes', e.target.value)}
                            placeholder="Any other details or tips for travelers?"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full py-6" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Create Itinerary
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
};

export default CreateItinerary;
