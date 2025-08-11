"use client";

import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';

type SearchBarProps = {
  onFilterClick?: () => void;
};

const SearchBar = ({ onFilterClick }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="flex gap-3 w-full">
      <div className="flex-grow">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Provincie, gebied, straat..."
              className="w-full h-14 px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </form>
      </div>
      
      <button 
        onClick={onFilterClick}
        className="flex items-center justify-center w-14 h-14 bg-[#ffe361] rounded-lg hover:bg-[#f5d95a] transition text-black"
        aria-label="Filter"
      >
        <Sliders className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SearchBar;
