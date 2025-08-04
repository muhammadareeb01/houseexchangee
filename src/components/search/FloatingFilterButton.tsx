"use client";

import React, { useEffect, useState } from 'react';
import { Sliders } from 'lucide-react';

interface FloatingFilterButtonProps {
  onFilterClick: () => void;
}

const FloatingFilterButton: React.FC<FloatingFilterButtonProps> = ({ onFilterClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the search bar element position
      const searchBarElement = document.getElementById('search-container');
      if (searchBarElement) {
        const searchBarPosition = searchBarElement.getBoundingClientRect();
        
        // Show floating button when the search bar is scrolled out of view
        // (when the bottom of the search container is above the viewport)
        if (searchBarPosition.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-16 lg:bottom-6 z-20">
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 py-2 px-5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Filter"
      >
        <Sliders className="h-4 w-4" />
        <span>Filters</span>
      </button>
    </div>
  );
};

export default FloatingFilterButton; 