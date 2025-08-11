"use client";

import { useState } from 'react';
import { Search, ChevronDown, Home, Square, DollarSign } from 'lucide-react';

interface PropertyFilterProps {
  onFilterChange: (filters: any) => void;
}

const PropertyFilter = ({ onFilterChange }: PropertyFilterProps) => {
  const [rooms, setRooms] = useState<[number, number]>([1, 6]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handleRoomsChange = (value: number, index: number) => {
    const newRooms = [...rooms] as [number, number];
    newRooms[index] = value;
    setRooms(newRooms);
    applyFilters({ rooms: newRooms });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    applyFilters({ priceRange: newPriceRange });
  };

  const applyFilters = (updatedFilters: any) => {
    onFilterChange({
      rooms,
      priceRange,
      ...updatedFilters
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Provincie, gebied, straat, vrije tekst"
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffe361]"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rooms filter */}
        <div className="relative">
          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-300 bg-white"
            onClick={() => setIsRoomsOpen(!isRoomsOpen)}
          >
            <div className="flex items-center gap-2">
              <Home size={18} className="text-gray-500" />
              <span>Kies aantal kamers</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${isRoomsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isRoomsOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <p className="mb-2 font-medium">{rooms[0]} tot {rooms[1] === 6 ? '6+' : rooms[1]} Kamers</p>
              <div className="relative h-2 bg-gray-200 rounded-full my-6">
                <div 
                  className="absolute h-2 bg-blue-500 rounded-full"
                  style={{ 
                    left: `${((rooms[0] - 1) / 5) * 100}%`, 
                    width: `${((rooms[1] - rooms[0]) / 5) * 100}%` 
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer"
                  style={{ left: `calc(${((rooms[0] - 1) / 5) * 100}% - 4px)` }}
                  onMouseDown={() => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const container = e.currentTarget as HTMLElement;
                      const rect = container.getBoundingClientRect();
                      const percent = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
                      const value = Math.round(percent * 5) + 1;
                      if (value < rooms[1]) {
                        handleRoomsChange(value, 0);
                      }
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer"
                  style={{ left: `calc(${((rooms[1] - 1) / 5) * 100}% - 4px)` }}
                  onMouseDown={() => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const container = e.currentTarget as HTMLElement;
                      const rect = container.getBoundingClientRect();
                      const percent = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
                      const value = Math.round(percent * 5) + 1;
                      if (value > rooms[0]) {
                        handleRoomsChange(value, 1);
                      }
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
              </div>
              <div className="flex justify-between">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>
          )}
        </div>

        {/* Price filter */}
        <div className="relative">
          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-300 bg-white"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-gray-500" />
              <span>Kies huur</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isPriceOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <p className="mb-2 font-medium">€{priceRange[0]} tot €{priceRange[1] === 3000 ? '3000+' : priceRange[1]}</p>
              <div className="relative h-2 bg-gray-200 rounded-full my-6">
                <div 
                  className="absolute h-2 bg-blue-500 rounded-full"
                  style={{ 
                    left: `${(priceRange[0] / 3000) * 100}%`, 
                    width: `${((priceRange[1] - priceRange[0]) / 3000) * 100}%` 
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer"
                  style={{ left: `calc(${(priceRange[0] / 3000) * 100}% - 4px)` }}
                  onMouseDown={() => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const container = e.currentTarget as HTMLElement;
                      const rect = container.getBoundingClientRect();
                      const percent = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
                      const value = Math.round(percent * 3000 / 100) * 100;
                      if (value < priceRange[1]) {
                        handlePriceChange(value, 0);
                      }
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer"
                  style={{ left: `calc(${(priceRange[1] / 3000) * 100}% - 4px)` }}
                  onMouseDown={() => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const container = e.currentTarget as HTMLElement;
                      const rect = container.getBoundingClientRect();
                      const percent = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1);
                      const value = Math.round(percent * 3000 / 100) * 100;
                      if (value > priceRange[0]) {
                        handlePriceChange(value, 1);
                      }
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                ></div>
              </div>
              <div className="flex justify-between">
                <span>€0</span>
                <span>€1000</span>
                <span>€2000</span>
                <span>€3000+</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter; 