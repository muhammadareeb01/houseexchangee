"use client";

import Image from 'next/image';
import { MapPin, Maximize2, Key, Home, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface PropertyMatchCardProps {
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
  matchPercentage?: number;
  userAvatar?: string;
  userName?: string;
  userLocation?: string;
  onSendMessage?: (id: string) => void;
}

const PropertyMatchCard = ({
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
  matchPercentage,
  userAvatar,
  userName,
  userLocation,
  onSendMessage,
}: PropertyMatchCardProps) => {
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

  const handleSendMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSendMessage) {
      onSendMessage(id);
    }
  };

  return (
    <div 
      className={`group bg-white rounded-xl ${noShadow ? '' : 'shadow-md'} overflow-hidden ${noShadow ? '' : 'hover:shadow-lg'} transition-shadow duration-200 cursor-pointer h-full flex flex-col min-h-[380px]`}
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
          {matchPercentage && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
              {matchPercentage}% match
            </div>
          )}
        </div>

        {/* User info in bottom left */}
        {userAvatar && userName && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={userAvatar}
                alt={userName}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{userName}</p>
            </div>
          </div>
        )}

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
        
        {/* Property specs */}
        <div className="pt-2.5 border-t border-gray-200 flex items-center flex-nowrap gap-x-2 text-xs text-gray-600 overflow-hidden mb-3">
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

        {/* CTA Button */}
        <div className="mt-auto">
          <button
            onClick={handleSendMessage}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
          >
            <MessageCircle size={16} />
            <span>Stuur bericht</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMatchCard; 