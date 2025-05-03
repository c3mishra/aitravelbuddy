import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GlobeIcon, 
  MailIcon, 
  ImageIcon, 
  Settings2Icon,
  Heart, 
  Bookmark,
  Loader2Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userApi, itineraryApi } from '@/lib/api';
import { adaptUser, adaptItineraries } from '@/lib/adapters';
import { Itinerary, User } from '@/types';
import ItineraryGrid from '@/components/itinerary/ItineraryGrid';
import FadeIn from '@/components/animation/FadeIn';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userItineraries, setUserItineraries] = useState<Itinerary[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (!authUser?._id) {
        throw new Error('User not authenticated');
      }
      
      // Fetch user data and their itineraries in parallel
      const [userData, itinerariesData] = await Promise.all([
        userApi.getById(authUser._id),
        itineraryApi.getByUser(authUser._id)
      ]);
      
      const adaptedUser = adaptUser(userData);
      const adaptedItineraries = adaptItineraries(itinerariesData);
      
      setUser(adaptedUser);
      setUserItineraries(adaptedItineraries);
      
      // For demo purposes, we'll create some saved itineraries (first 2 from user's itineraries)
      setSavedItineraries(adaptedItineraries.slice(0, 2));
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [authUser, toast]);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchProfileData();
  }, [isAuthenticated, navigate, fetchProfileData]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-24">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  // Show error state if no user was found
  if (!user) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-2xl font-medium mb-2">User not found</h2>
        <p className="text-muted-foreground">The requested profile could not be loaded.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <FadeIn>
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-border">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-display font-semibold">{user.name}</h1>
              
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {user.bio}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{userItineraries.length}</span>
                  <span className="text-muted-foreground">Itineraries</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{user.followers}</span>
                  <span className="text-muted-foreground">Followers</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{user.following}</span>
                  <span className="text-muted-foreground">Following</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <Button variant="outline" size="sm">
                  <Settings2Icon className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <MailIcon className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <GlobeIcon className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="itineraries" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 max-w-md mx-auto md:justify-start">
              <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="itineraries">
              {userItineraries.length > 0 ? (
                <ItineraryGrid itineraries={userItineraries} />
              ) : (
                <div className="text-center py-16">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No Itineraries Yet</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    You haven't created any itineraries yet. Share your travel experiences with the world!
                  </p>
                  <Button>Create Itinerary</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {savedItineraries.length > 0 ? (
                <ItineraryGrid itineraries={savedItineraries} />
              ) : (
                <div className="text-center py-16">
                  <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No Saved Itineraries</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    You haven't saved any itineraries yet. Save itineraries to find them easily later!
                  </p>
                  <Button>Explore Itineraries</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="likes">
              {savedItineraries.length > 0 ? (
                <ItineraryGrid itineraries={savedItineraries} />
              ) : (
                <div className="text-center py-16">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No Liked Itineraries</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    You haven't liked any itineraries yet. Like itineraries to show appreciation to creators!
                  </p>
                  <Button>Explore Itineraries</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </div>
  );
};

export default Profile;
