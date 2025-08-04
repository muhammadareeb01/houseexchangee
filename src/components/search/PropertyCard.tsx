"use client";

import Image from 'next/image';
import { Heart, MapPin, Maximize2, Key, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface PropertyCardProps {
  id: string;
  address: string;
  location: string;
  price?: number;
  rooms?: number;
  size?: number;
  imageUrls: string[];
  isFavorite?: boolean;
  type?: string;
  noShadow?: boolean;
  features?: string[];
}

const PropertyCard = ({
  id,
  address,
  location,
  price,
  rooms,
  size,
  imageUrls,
  isFavorite = false,
  type,
  noShadow = false,
  features = [],
}: PropertyCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const hasMultipleImages = imageUrls && imageUrls.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleCardClick = () => {
    router.push(`/property/${id}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`group bg-white rounded-xl ${noShadow ? '' : 'shadow-md'} overflow-hidden ${noShadow ? '' : 'hover:shadow-lg'} transition-shadow duration-200 cursor-pointer h-full flex flex-col min-h-[320px]`}
      onClick={handleCardClick}
    >
      {/* 1: Foto bovenaan */}
      <div className="w-full h-48 relative shrink-0 group/image">
        {imageUrls && imageUrls.length > 0 && (
          <Image
            src={imageUrls[currentImageIndex] || '/placeholder-image.jpg'}
            alt={`Property at ${address} - image ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-200 ease-in-out rounded-t-xl`}
            priority={id === "1"} 
          />
        )}
        <div className="absolute top-3 right-3 z-10">
          <button 
            onClick={(e) => { stopPropagation(e); setFavorite(!favorite); }}
            className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white flex items-center justify-center"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={16} 
              className={`${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>

        {hasMultipleImages && (
          <>
            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-1.5 bg-white/70 hover:bg-white rounded-full shadow-md transition-opacity opacity-0 group-hover/image:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-1.5 bg-white/70 hover:bg-white rounded-full shadow-md transition-opacity opacity-0 group-hover/image:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5">
              {imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { stopPropagation(e); setCurrentImageIndex(index); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* 2: Content in het midden */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-semibold text-gray-800 leading-tight truncate pr-2" title={address}>{address}</h3>
          <p className="text-base font-bold text-gray-800 whitespace-nowrap">
            €{(price || 0).toLocaleString('nl-NL')}<span className="text-xs font-normal text-gray-500">/mnd</span>
          </p>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={12} className="mr-1 text-gray-400 flex-shrink-0" />
          <p className="text-xs truncate" title={location}>{location}</p>
        </div>
        
        {/* Feature tags */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {features.map((feature, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-2.5 border-t border-gray-200 flex items-center flex-nowrap gap-x-2 text-xs text-gray-600 overflow-hidden">
          <div className="flex items-center flex-shrink-0">
            <Maximize2 size={14} className="mr-1 text-gray-400" /> 
            <span className="whitespace-nowrap">{size || 0} m²</span>
          </div>
          <span className="text-gray-300 px-1 flex-shrink-0">|</span>
          <div className="flex items-center flex-shrink-0">
            <Key size={14} className="mr-1 text-gray-400" /> 
            <span className="whitespace-nowrap">{rooms || 0}</span>
          </div>
          {type && (
            <>
              <span className="text-gray-300 px-1 flex-shrink-0">|</span>
              <div className="flex items-center min-w-0">
                <Home size={14} className="mr-1 text-gray-400 flex-shrink-0" />
                <span className="truncate" title={type}>{type}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
