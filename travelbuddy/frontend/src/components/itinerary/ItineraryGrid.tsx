import React from 'react';
import { Itinerary } from '@/types';
import ItineraryCard from './ItineraryCard';
import FadeIn from '@/components/animation/FadeIn';

interface ItineraryGridProps {
  itineraries: Itinerary[];
  columns?: 1 | 2 | 3 | 4;
  cardSize?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ItineraryGrid: React.FC<ItineraryGridProps> = ({
  itineraries,
  columns = 3,
  cardSize = 'medium',
  className,
}) => {
  // Set grid columns based on prop
  const getGridClass = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 3:
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (itineraries.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">No itineraries found.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClass()} gap-6 md:gap-8 ${className}`}>
      {itineraries.map((itinerary, index) => (
        <FadeIn 
          key={itinerary.id}
          delay={100 * (index % 3)} 
          duration={600}
        >
          <ItineraryCard 
            itinerary={itinerary} 
            size={cardSize}
          />
        </FadeIn>
      ))}
    </div>
  );
};

export default ItineraryGrid;
