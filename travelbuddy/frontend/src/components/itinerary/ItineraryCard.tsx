import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  HeartIcon, 
  MessageSquareIcon, 
  MapPinIcon, 
  TagIcon
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Itinerary } from '@/types';
import { cn } from '@/lib/utils';

interface ItineraryCardProps {
  itinerary: Itinerary;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ 
  itinerary,
  className,
  size = 'medium'
}) => {
  const { 
    _id, 
    title, 
    description, 
    coverImage, 
    location, 
    likes, 
    comments, 
    user, 
    tripLength, 
    experienceType 
  } = itinerary;

  // Determine size-specific styles
  const getSizeClasses = () => {
    switch(size) {
      case 'small':
        return {
          card: 'max-w-xs',
          imageHeight: 'h-48',
          titleClass: 'text-lg',
          descriptionVisible: false,
          detailsVisible: false
        };
      case 'large':
        return {
          card: 'max-w-2xl',
          imageHeight: 'h-80',
          titleClass: 'text-2xl',
          descriptionVisible: true,
          detailsVisible: true
        };
      case 'medium':
      default:
        return {
          card: 'max-w-md',
          imageHeight: 'h-64',
          titleClass: 'text-xl',
          descriptionVisible: true,
          detailsVisible: true
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <Card className={cn(
      "overflow-hidden border-none bg-transparent shadow-none transition-transform duration-300 hover:-translate-y-1",
      sizeClasses.card,
      className
    )}>
      <Link to={`/itinerary/${_id}`} className="block h-full">
        <div className="relative overflow-hidden rounded-2xl shadow-subtle">
          {/* Image */}
          <div className={cn("relative w-full overflow-hidden", sizeClasses.imageHeight)}>
            <img 
              src={coverImage} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Content overlay */}
          <CardContent className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Location */}
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                <MapPinIcon className="mr-1 h-3 w-3" />
                {location}
              </span>
            </div>
            
            {/* Title */}
            <h3 className={cn("font-medium text-white text-balance", sizeClasses.titleClass)}>
              {title}
            </h3>

            {/* Details */}
            {sizeClasses.detailsVisible && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {tripLength}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                  <TagIcon className="mr-1 h-3 w-3" />
                  {experienceType}
                </span>
              </div>
            )}
          </CardContent>
        </div>
        
        <CardFooter className="flex items-center justify-between px-1 pt-4 pb-0">
          {/* User info */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7 border border-border">
              {user ? (
                <>
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </>
              ) : (
                <AvatarFallback>?</AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm font-medium">{user ? user.name : 'Anonymous'}</span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-muted-foreground">
              <HeartIcon className="mr-1 h-4 w-4" />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MessageSquareIcon className="mr-1 h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </div>
          </div>
        </CardFooter>
        
        {/* Description - Only shown on medium and large cards */}
        {sizeClasses.descriptionVisible && (
          <div className="px-1 pt-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        )}
      </Link>
    </Card>
  );
};

export default ItineraryCard;
