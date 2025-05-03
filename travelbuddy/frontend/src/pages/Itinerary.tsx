import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  HeartIcon, 
  MessageSquareIcon, 
  ShareIcon, 
  FileIcon, 
  CalendarIcon, 
  MapPinIcon, 
  TagIcon,
  ArrowLeftIcon,
  ClockIcon,
  MapIcon,
  Loader2Icon,
  HomeIcon,
  UtensilsIcon,
  BookOpenIcon
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { itineraryApi, commentApi } from '@/lib/api';
import { adaptItinerary, adaptComments, adaptItineraries, adaptComment } from '@/lib/adapters';
import { Itinerary as ItineraryType, Comment, DayDetail } from '@/types';
import FadeIn from '@/components/animation/FadeIn';
import ItineraryGrid from '@/components/itinerary/ItineraryGrid';
import { useToast } from '@/hooks/use-toast';

const Itinerary = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // State for data
  const [itinerary, setItinerary] = useState<ItineraryType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [moreFromUser, setMoreFromUser] = useState<ItineraryType[]>([]);
  
  console.log('[Itinerary] Component initialized with id:', id);
  
  // Fetch itinerary data
  useEffect(() => {
    console.log('[Itinerary] useEffect triggered with id:', id);
    
    const fetchItineraryData = async () => {
      if (!id) {
        console.log('[Itinerary] No ID provided, aborting data fetch');
        return;
      }
      
      setLoading(true);
      setError(null);
      console.log('[Itinerary] Starting data fetch for itinerary:', id);
      
      try {
        // Get itinerary details
        console.log('[Itinerary] Fetching itinerary details');
        const itineraryData = await itineraryApi.getById(id);
        console.log('[Itinerary] Received itinerary data:', itineraryData);
        const adaptedItinerary = adaptItinerary(itineraryData);
        console.log('[Itinerary] Adapted itinerary:', adaptedItinerary);
        setItinerary(adaptedItinerary);
        
        // Get comments for this itinerary
        console.log('[Itinerary] Fetching comments');
        const commentsData = await commentApi.getByItinerary(id);
        console.log('[Itinerary] Received comments data:', commentsData);
        const adaptedComments = adaptComments(commentsData);
        setComments(adaptedComments);
        
        // Get more from this user if we have itinerary data
        if (adaptedItinerary.userId) {
          console.log('[Itinerary] Fetching more itineraries from user:', adaptedItinerary.userId);
          const userItineraries = await itineraryApi.getByUser(adaptedItinerary.userId);
          console.log('[Itinerary] Received user itineraries:', userItineraries);
          // Filter out current itinerary and adapt
          const adaptedUserItineraries = adaptItineraries(userItineraries)
            .filter(item => item._id !== adaptedItinerary._id)
            .slice(0, 3);
          console.log('[Itinerary] Adapted user itineraries:', adaptedUserItineraries);
          setMoreFromUser(adaptedUserItineraries);
        }
      } catch (err) {
        console.error('[Itinerary] Error fetching data:', err);
        setError('Failed to load itinerary data.');
        toast({
          title: "Error",
          description: "Failed to load itinerary data.",
          variant: "destructive"
        });
      } finally {
        console.log('[Itinerary] Data fetch completed, setting loading to false');
        setLoading(false);
      }
    };

    fetchItineraryData();
    
    // Reset liked state when itinerary changes
    setLiked(false);
    setActiveTab("overview");
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id, toast]);
  
  // Handle like action
  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from liked itineraries" : "Added to liked itineraries",
      description: liked ? "Itinerary removed from your likes" : "Itinerary added to your likes",
    });
  };
  
  // Handle share action
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Itinerary link has been copied to clipboard",
    });
  };
  
  // Handle export action
  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Your PDF is being generated and will download shortly",
    });
    
    // Simulate PDF download after a delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your itinerary PDF has been downloaded",
      });
    }, 2000);
  };
  
  // Handle add comment
  const handleAddComment = async (content: string) => {
    if (!id || !content.trim()) return;
    
    try {
      // In a real app, userId would come from authentication context
      // We're using a placeholder user ID here
      const newComment = await commentApi.create({
        content,
        itineraryId: id,
        userId: "tempuser123" // This would normally come from auth
      });
      
      // Convert API comment to frontend format
      const adaptedComment = adaptComment(newComment);
      
      // Update comments list
      setComments(prev => [adaptedComment, ...prev]);
      
      // Update comment count on itinerary
      if (itinerary) {
        setItinerary({
          ...itinerary,
          comments: itinerary.comments + 1
        });
      }
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };
  
  // Loading state
  if (loading) {
    console.log('[Itinerary] Rendering loading state');
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <Loader2Icon className="h-12 w-12 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading itinerary...</p>
      </div>
    );
  }
  
  // Error state
  if (error || !itinerary) {
    console.log('[Itinerary] Rendering error state:', error, 'itinerary:', !!itinerary);
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <h1 className="text-3xl font-display font-semibold mb-4">Itinerary Not Found</h1>
        <p className="text-muted-foreground mb-8">
          {error || "The itinerary you're looking for doesn't exist or has been removed."}
        </p>
        <Link to="/">
          <Button>
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <img 
          src={itinerary.coverImage} 
          alt={itinerary.title}
          className="h-full w-full object-cover"
        />
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link to="/">
            <Button variant="outline" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-transparent text-white">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-transparent text-white"
                  onClick={handleShare}
                >
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share itinerary</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-transparent text-white"
                  onClick={handleExport}
                >
                  <FileIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-subtle">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                      <MapPinIcon className="mr-1 h-3 w-3" />
                      {itinerary.location}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {itinerary.tripLength}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                      <TagIcon className="mr-1 h-3 w-3" />
                      {itinerary.experienceType}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-display font-semibold">{itinerary.title}</h1>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={itinerary.user.profileImage} alt={itinerary.user.name} />
                        <AvatarFallback>{itinerary.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{itinerary.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(itinerary.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
                        onClick={handleLike}
                      >
                        <HeartIcon 
                          className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} 
                        />
                        <span>{liked ? itinerary.likes + 1 : itinerary.likes}</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                      >
                        <MessageSquareIcon className="h-4 w-4" />
                        <span>{itinerary.comments}</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Tabs for Overview, Daily Itinerary */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="daily">Daily Itinerary</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab Content */}
                  <TabsContent value="overview" className="space-y-6">
                    {/* Description */}
                    <div>
                      <h2 className="text-xl font-medium mb-4">Overview</h2>
                      <p className="text-muted-foreground">{itinerary.description}</p>
                    </div>
                    
                    {/* Gallery */}
                    <div>
                      <h2 className="text-xl font-medium mb-4">Gallery</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {itinerary.images.map((image, index) => (
                          <div 
                            key={index} 
                            className="aspect-video overflow-hidden rounded-lg"
                          >
                            <img 
                              src={image} 
                              alt={`${itinerary.title} - Photo ${index + 1}`}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Daily Itinerary Tab Content */}
                  <TabsContent value="daily">
                    <div className="space-y-6">
                      <h2 className="text-xl font-medium mb-4">Day by Day Itinerary</h2>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {itinerary.days.map((day) => (
                          <AccordionItem key={day.dayNumber} value={`day-${day.dayNumber}`}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center space-x-3 text-left">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                  {day.dayNumber}
                                </div>
                                <div>
                                  <h3 className="font-medium">Day {day.dayNumber}</h3>
                                  <p className="text-xs text-muted-foreground">{day.activities.length} activities</p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pt-2 pb-4">
                                {/* Day details */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {day.accommodation && (
                                    <div className="bg-secondary/50 p-3 rounded-md">
                                      <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                                        <HomeIcon className="h-4 w-4" />
                                        Accommodation
                                      </h4>
                                      <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                                    </div>
                                  )}
                                  {day.meals && (
                                    <div className="bg-secondary/50 p-3 rounded-md">
                                      <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                                        <UtensilsIcon className="h-4 w-4" />
                                        Meals
                                      </h4>
                                      <p className="text-sm text-muted-foreground">{day.meals}</p>
                                    </div>
                                  )}
                                  {day.notes && (
                                    <div className="bg-secondary/50 p-3 rounded-md">
                                      <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                                        <BookOpenIcon className="h-4 w-4" />
                                        Notes
                                      </h4>
                                      <p className="text-sm text-muted-foreground">{day.notes}</p>
                                    </div>
                                  )}
                                </div>
                                
                                <h4 className="font-medium mb-3">Activities</h4>
                                <div className="space-y-4">
                                  {day.activities.map((activity, index) => (
                                    <Card key={index} className="overflow-hidden">
                                      <div className="grid grid-cols-1 md:grid-cols-4">
                                        {activity.image && (
                                          <div className="md:col-span-1 h-32 md:h-full">
                                            <img 
                                              src={activity.image} 
                                              alt={activity.title}
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                        )}
                                        <CardContent className={`p-4 ${activity.image ? 'md:col-span-3' : 'md:col-span-4'}`}>
                                          <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{activity.time}</span>
                                          </div>
                                          <h4 className="font-medium text-base">{activity.title}</h4>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {activity.description}
                                          </p>
                                          {activity.location && (
                                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                              <MapIcon className="h-3 w-3" />
                                              <span>{activity.location}</span>
                                            </div>
                                          )}
                                        </CardContent>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Comments */}
                <div className="mt-10">
                  <h2 className="text-xl font-medium mb-4">Comments ({comments.length})</h2>
                  
                  {comments.length > 0 ? (
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment._id} className="bg-secondary/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.user.profileImage} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{comment.user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn delay={200}>
              <div className="bg-card rounded-2xl p-6 shadow-subtle mb-6">
                <h2 className="text-xl font-medium mb-4">More from {itinerary.user.name}</h2>
                <div className="space-y-6">
                  {moreFromUser.length > 0 ? (
                    moreFromUser.map((item) => (
                      <Link key={item._id} to={`/itinerary/${item._id}`}>
                        <div className="group">
                          <div className="aspect-video overflow-hidden rounded-lg mb-2">
                            <img 
                              src={item.coverImage} 
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-medium text-sm group-hover:text-travel-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No other itineraries from this user yet.</p>
                  )}
                </div>
                
                {moreFromUser.length > 0 && (
                  <div className="mt-6">
                    <Link to={`/user/${itinerary.userId}`}>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="bg-card rounded-2xl p-6 shadow-subtle">
                <h2 className="text-xl font-medium mb-4">About the Creator</h2>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={itinerary.user.profileImage} alt={itinerary.user.name} />
                    <AvatarFallback>{itinerary.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{itinerary.user.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{itinerary.user.followers} followers</span>
                      <span>•</span>
                      <span>{itinerary.user.following} following</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">{itinerary.user.bio}</p>
                
                <Button className="w-full">Follow</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
