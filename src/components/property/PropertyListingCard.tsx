"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Home, Euro, Eye, Edit } from 'lucide-react';

interface PropertyListingCardProps {
  property: {
    id: string;
    address: string;
    location: string;
    price: number;
    rooms: number;
    size: number;
    imageUrl: string;
    status?: string;
    publishDate?: string;
    inExchangeProcess?: boolean;
  };
  showActionButtons?: boolean;
  onToggleExchangeProcess?: () => void;
  onEditClick?: () => void;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  property,
  showActionButtons = true,
  onToggleExchangeProcess,
  onEditClick
}) => {
  const router = useRouter();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Property Image */}
        <div className="relative w-full md:w-80 h-48 md:h-auto md:flex-shrink-0">
          <Image
            src={property.imageUrl}
            alt={property.address}
            fill
            className="object-cover"
          />
          
          {/* Status Badge */}
          {property.status && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                {property.status}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
          {/* Header with Toggle */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div className="flex-1 mb-3 md:mb-0">
              <h2 className="text-lg md:text-xl font-semibold mb-1">{property.address}</h2>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm md:text-base">{property.location}</span>
              </div>
            </div>
            
            {/* Exchange Process Toggle */}
            {typeof property.inExchangeProcess !== 'undefined' && onToggleExchangeProcess && (
              <div className="flex flex-row items-center justify-between md:justify-start md:ml-4 gap-3">
                <span className="text-sm text-gray-600">In ruilproces</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={property.inExchangeProcess}
                    onChange={onToggleExchangeProcess}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col">
            {/* Property Specs */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6 mb-4 text-sm">
              <div className="flex items-center">
                <Home size={16} className="mr-1 text-gray-500" />
                <span className="font-medium">{property.rooms} kamers</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1 text-gray-500">□</span>
                <span className="font-medium">{property.size} m²</span>
              </div>
              <div className="flex items-center">
                <Euro size={16} className="mr-1 text-gray-500" />
                <span className="font-medium">€{property.price}/mnd</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            {showActionButtons && (
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 sm:justify-end mt-auto">
                <button 
                  onClick={() => router.push(`/property/${property.id}`)}
                  className="flex items-center justify-center gap-2 py-2 px-3 md:px-4 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition w-full sm:w-auto"
                >
                  <Eye size={16} />
                  <span>Bekijken</span>
                </button>
                <button 
                  onClick={onEditClick ? onEditClick : () => router.push(`/profile/my-listings/edit/${property.id}`)}
                  className="flex items-center justify-center gap-2 py-2 px-3 md:px-4 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  <Edit size={16} />
                  <span>Bewerken</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard; 