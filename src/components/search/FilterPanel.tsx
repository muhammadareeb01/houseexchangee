"use client";

import React, { useState, useEffect } from 'react';
import { Sliders, X } from 'lucide-react';
import PropertyFilterSidebar from './PropertyFilterSidebar';

type FilterPanelProps = {
  isOpenFromParent?: boolean;
  setIsOpenFromParent?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPanel = ({ isOpenFromParent, setIsOpenFromParent }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Define default active filters
  const [activeFilters, setActiveFilters] = useState({
    searchText: '',
    rooms: [1, 6] as [number, number],
    priceRange: [0, 3000] as [number, number],
    sizeRange: [0, 200] as [number, number],
    features: [] as string[],
    propertyTypes: [] as string[],
    amenities: [] as string[],
    neighborhoodFeatures: [] as string[],
    locationFeatures: [] as string[]
  });

  // Sync with parent state if provided
  useEffect(() => {
    if (isOpenFromParent !== undefined) {
      setIsOpen(isOpenFromParent);
    }
  }, [isOpenFromParent]);

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Sync with parent if provided
    if (setIsOpenFromParent) {
      setIsOpenFromParent(newIsOpen);
    }
  };

  const handleFilterChange = (updatedFilters: any) => {
    setActiveFilters(prev => ({
      ...prev,
      ...updatedFilters
    }));
  };

  const removeFilter = (type: string, value: string | number) => {
    setActiveFilters(prev => {
      if (type === 'features' || type === 'amenities' || type === 'neighborhoodFeatures' || type === 'locationFeatures') {
        return {
          ...prev,
          [type]: prev[type].filter((item: string) => item !== value)
        };
      } else if (type === 'propertyTypes') {
        return {
          ...prev,
          propertyTypes: []
        };
      } else if (type === 'searchText') {
        return {
          ...prev,
          searchText: ''
        };
      } else if (type === 'priceRange') {
        return {
          ...prev,
          priceRange: [0, 3000] as [number, number]
        };
      } else if (type === 'rooms') {
        return {
          ...prev,
          rooms: [1, 6] as [number, number]
        };
      } else if (type === 'sizeRange') {
        return {
          ...prev,
          sizeRange: [0, 200] as [number, number]
        };
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      searchText: '',
      rooms: [1, 6] as [number, number],
      priceRange: [0, 3000] as [number, number],
      sizeRange: [0, 200] as [number, number],
      features: [] as string[],
      propertyTypes: [] as string[],
      amenities: [] as string[],
      neighborhoodFeatures: [] as string[],
      locationFeatures: [] as string[]
    });
  };

  // Check if any filters are active
  const hasActiveFilters = activeFilters.searchText || 
    activeFilters.features.length > 0 || 
    activeFilters.amenities.length > 0 ||
    activeFilters.neighborhoodFeatures.length > 0 ||
    activeFilters.locationFeatures.length > 0 ||
    activeFilters.propertyTypes.length > 0 ||
    activeFilters.priceRange[0] > 0 || 
    activeFilters.priceRange[1] < 3000 ||
    activeFilters.sizeRange[0] > 0 ||
    activeFilters.sizeRange[1] < 200 ||
    activeFilters.rooms[0] > 1 ||
    activeFilters.rooms[1] < 6;

  return (
    <div className="relative">
      {/* Filter Button - Only show if not controlled by parent */}
      {isOpenFromParent === undefined && (
        <button 
          onClick={toggleSidebar}
          className="flex items-center gap-2 py-2 px-4 bg-[#ffe361] text-black rounded-full hover:bg-[#f5d95a] transition"
        >
          <Sliders className="h-4 w-4" />
          <span>Filters {hasActiveFilters ? `(${
            (activeFilters.features.length || 0) + 
            (activeFilters.propertyTypes.length || 0) + 
            (activeFilters.amenities.length || 0) +
            (activeFilters.neighborhoodFeatures.length || 0) +
            (activeFilters.locationFeatures.length || 0) +
            (activeFilters.searchText ? 1 : 0) +
            (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 3000 ? 1 : 0) +
            (activeFilters.sizeRange[0] > 0 || activeFilters.sizeRange[1] < 200 ? 1 : 0) +
            (activeFilters.rooms[0] > 1 || activeFilters.rooms[1] < 6 ? 1 : 0)
          })` : ''}</span>
        </button>
      )}

      {/* Filter Tags/Labels (when filters are active) */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeFilters.searchText && (
            <div className="flex items-center gap-1 py-1 px-3 bg-black text-[#ffe361] rounded-full text-sm">
              <span>Zoekterm: {activeFilters.searchText}</span>
              <button onClick={() => removeFilter('searchText', '')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {activeFilters.propertyTypes.length > 0 && (
            <div className="flex items-center gap-1 py-1 px-3 bg-black text-[#ffe361] rounded-full text-sm">
              <span>Type: {activeFilters.propertyTypes[0]}</span>
              <button onClick={() => removeFilter('propertyTypes', '')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {(activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 3000) && (
            <div className="flex items-center gap-1 py-1 px-3 bg-black text-[#ffe361] rounded-full text-sm">
              <span>Prijs: €{activeFilters.priceRange[0]} - €{activeFilters.priceRange[1] === 3000 ? '3000+' : activeFilters.priceRange[1]}</span>
              <button onClick={() => removeFilter('priceRange', '')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {(activeFilters.rooms[0] > 1 || activeFilters.rooms[1] < 6) && (
            <div className="flex items-center gap-1 py-1 px-3 bg-black text-[#ffe361] rounded-full text-sm">
              <span>Kamers: {activeFilters.rooms[0]} - {activeFilters.rooms[1] === 6 ? '6+' : activeFilters.rooms[1]}</span>
              <button onClick={() => removeFilter('rooms', '')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {activeFilters.features.map(feature => (
            <div 
              key={feature}
              className="flex items-center gap-1 py-1 px-3 bg-black text-[#ffe361] rounded-full text-sm"
            >
              <span>{feature}</span>
              <button onClick={() => removeFilter('features', feature)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          <button 
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Wis alles
          </button>
        </div>
      )}

      {/* Sidebar - Full width on mobile/tablet */}
      <div 
        className={`fixed inset-y-0 inset-x-0 md:right-0 md:left-auto md:w-96 lg:w-[450px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b border-gray-200 mb-2">
          <h3 className="text-xl font-bold text-gray-800">Filter</h3>
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div>
          <PropertyFilterSidebar 
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            removeFilter={removeFilter}
            clearAllFilters={clearAllFilters}
          />
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
          <button 
            onClick={toggleSidebar}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-base"
          >
            Toon resultaten
          </button>
          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="w-full py-3 mt-3 text-gray-600 hover:text-gray-800 transition"
            >
              Wis alle filters
            </button>
          )}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default FilterPanel;
