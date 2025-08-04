"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Star, ArrowLeft, ArrowRight, Users, BarChart, Home as HomeIcon, Map } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PropertyCard from '@/components/search/PropertyCard';

// Sample properties for the match algorithm
const matchProperties = [
  {
    id: "101",
    address: "Herengracht 432",
    location: "Amsterdam, Noord-Holland",
    price: 1650,
    rooms: 3,
    size: 85,
    imageUrls: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 92,
    features: ["Balkon", "Lift", "Nieuwbouw"]
  },
  {
    id: "102",
    address: "Reguliersgracht 17",
    location: "Amsterdam, Noord-Holland",
    price: 1850,
    rooms: 2,
    size: 70,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 87,
    features: ["Dakterras", "Monumentaal pand", "Centrum"]
  },
  {
    id: "103",
    address: "Prinsengracht 265",
    location: "Amsterdam, Noord-Holland",
    price: 2100,
    rooms: 4,
    size: 110,
    imageUrls: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 84,
    features: ["Grachten", "Historisch", "Volledig gerenoveerd"]
  },
  {
    id: "104",
    address: "Keizersgracht 178",
    location: "Amsterdam, Noord-Holland",
    price: 1950,
    rooms: 3,
    size: 95,
    imageUrls: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    type: "Appartement",
    matchScore: 79,
    features: ["Grachten", "Serre", "Wijnkelder"]
  },
  {
    id: "105",
    address: "Singel 94",
    location: "Amsterdam, Noord-Holland",
    price: 1750,
    rooms: 2,
    size: 65,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=853&q=80"
    ],
    type: "Appartement",
    matchScore: 76,
    features: ["Vloerverwarming", "Parkeerplaats", "Luxe keuken"]
  }
];

export default function MatchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showNewCardAnimation, setShowNewCardAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const currentProperty = matchProperties[currentIndex];
  
  // Disable scrolling on mount, enable on unmount (mobile only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
    
    return () => {
      if (isMobile) {
        // Re-enable scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };
  }, []);
  
  // Reset the card animation when moving to a new card
  useEffect(() => {
    if (currentIndex < matchProperties.length) {
      setShowNewCardAnimation(true);
      const timer = setTimeout(() => {
        setShowNewCardAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);
  
  const handleSwipe = (dir: 'left' | 'right' | 'up') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    setTimeout(() => {
      if (dir === 'left') {
        setRejected([...rejected, currentProperty.id]);
      } else if (dir === 'right') {
        setLiked([...liked, currentProperty.id]);
      } else if (dir === 'up') {
        setFavorites([...favorites, currentProperty.id]);
      }
      
      // Move to next property
      if (currentIndex < matchProperties.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      
      setDirection(null);
      setIsAnimating(false);
    }, 500); // Increased from 300ms to match animation duration
  };
  
  const toggleFavorite = () => {
    handleSwipe('up');
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchPosition({ x: 0, y: 0 });
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || isAnimating) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    setTouchPosition({ x: deltaX, y: deltaY });
  };
  
  const handleTouchEnd = () => {
    if (!isDragging || isAnimating) return;
    
    setIsDragging(false);
    
    // Determine swipe direction based on distance
    const threshold = 100; // Minimum distance to trigger a swipe
    
    if (Math.abs(touchPosition.x) > threshold || Math.abs(touchPosition.y) > threshold) {
      // Determine dominant direction
      if (Math.abs(touchPosition.x) > Math.abs(touchPosition.y)) {
        // Horizontal swipe
        if (touchPosition.x > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      } else {
        // Vertical swipe (only if it's upward)
        if (touchPosition.y < 0) {
          handleSwipe('up');
        }
      }
    } else {
      // Reset position if not swiped enough
      setTouchPosition({ x: 0, y: 0 });
    }
  };
  
  // Animation classes based on swipe direction
  const getAnimationClass = () => {
    if (!direction) return '';
    if (direction === 'left') return 'animate-swipe-left';
    if (direction === 'right') return 'animate-swipe-right';
    if (direction === 'up') return 'animate-swipe-up';
    return '';
  };
  
  // Calculate style for dragging animation
  const getCardStyle = () => {
    if (!isDragging || direction) return {};
    
    const rotationFactor = 0.1; // Rotation degree per pixel moved
    const rotation = touchPosition.x * rotationFactor;
    
    return {
      transform: `translate(${touchPosition.x}px, ${touchPosition.y}px) rotate(${rotation}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };
  
  // Get the color class based on match score
  const getMatchScoreColorClass = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-green-400';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-orange-400';
  };
  
  // Prevent navigation when using the PropertyCard in match context
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 md:relative md:top-auto md:left-auto md:right-auto md:bottom-auto md:container md:mx-auto px-4 md:py-6 md:h-auto overflow-hidden touch-none md:touch-auto overscroll-none md:overscroll-auto">
      <div className="mb-4 hidden md:block">
        <h1 className="text-2xl font-semibold mb-1">Match</h1>
        <p className="text-gray-700">
          We hebben <span className="text-green-600 font-medium">{matchProperties.length}</span> potentiële matches gevonden.
        </p>
      </div>
      
      {currentIndex < matchProperties.length ? (
        <div className="flex flex-col h-full md:h-[70vh] relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
          </div>
          
          {/* Property Card Wrapper - takes most space */}
          <div className="flex-1 flex items-start md:items-center justify-center pt-4 pb-2">
            <div 
              ref={cardRef}
              className={`relative w-full max-w-sm md:max-w-md ${getAnimationClass()} ${showNewCardAnimation ? 'animate-card-in' : ''}`}
              style={getCardStyle()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleCardClick}
            >
              {/* Match score badge */}
              <div className={`absolute top-4 right-4 z-20 ${getMatchScoreColorClass(currentProperty.matchScore)} text-white rounded-lg px-3 py-1 text-sm font-bold shadow-md animate-pulse-scale`}>
                {currentProperty.matchScore}% match
              </div>
              
              {/* Swipe indicators - show while dragging */}
              {isDragging && touchPosition.x > 50 && (
                <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-green-500 text-white rounded-full p-3 shadow-lg transform scale-110 transition-transform">
                  <Heart size={30} className="drop-shadow-md" />
                </div>
              )}
              
              {isDragging && touchPosition.x < -50 && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-red-500 text-white rounded-full p-3 shadow-lg transform scale-110 transition-transform">
                  <X size={30} className="drop-shadow-md" />
                </div>
              )}
              
              {isDragging && touchPosition.y < -50 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-yellow-500 text-white rounded-full p-3 shadow-lg transform scale-110 transition-transform">
                  <Star size={30} className="drop-shadow-md" />
                </div>
              )}
              
              <PropertyCard 
                id={currentProperty.id}
                address={currentProperty.address}
                location={currentProperty.location}
                price={currentProperty.price}
                rooms={currentProperty.rooms}
                size={currentProperty.size}
                imageUrls={currentProperty.imageUrls}
                isFavorite={favorites.includes(currentProperty.id)}
                type={currentProperty.type}
                noShadow={isDragging}
                features={currentProperty.features}
              />
            </div>
          </div>
          
          {/* Swipe buttons and instructions - fixed at bottom */}
          <div className="flex-shrink-0 pb-20 md:pb-0">
            {/* Swipe buttons */}
            <div className="flex justify-center items-center space-x-6 mb-2 md:mb-4">
              <button 
                onClick={() => handleSwipe('left')}
                className="bg-white shadow-lg rounded-full p-4 md:p-4 lg:p-5 hover:bg-gray-50 transition-all transform hover:-translate-y-1 active:translate-y-0 border border-gray-200"
                disabled={isAnimating}
                aria-label="Afwijzen"
              >
                <X size={24} className="text-red-500 md:w-6 md:h-6" />
              </button>
              
              <button 
                onClick={toggleFavorite}
                className="bg-white shadow-lg rounded-full p-4 md:p-4 lg:p-5 hover:bg-gray-50 transition-all transform hover:-translate-y-1 active:translate-y-0 border border-gray-200"
                disabled={isAnimating}
                aria-label="Favoriet"
              >
                <Star size={24} className="text-yellow-500 md:w-6 md:h-6" />
              </button>
              
              <button 
                onClick={() => handleSwipe('right')}
                className="bg-white shadow-lg rounded-full p-4 md:p-4 lg:p-5 hover:bg-gray-50 transition-all transform hover:-translate-y-1 active:translate-y-0 border border-gray-200"
                disabled={isAnimating}
                aria-label="Interessant"
              >
                <Heart size={24} className="text-green-500 md:w-6 md:h-6" />
              </button>
            </div>
            
            {/* Swipe instructions */}
            <div className="text-center text-gray-500">
              <p className="text-xs md:text-sm">Swipe naar links om af te wijzen, naar rechts om te liken of naar boven voor favorieten</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
            <div className="mb-6 inline-block p-4 bg-blue-50 rounded-full">
              <BarChart size={40} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Je hebt alle woningen bekeken!</h2>
            <p className="text-gray-600 mb-6">
              We hebben geen matches meer voor je op dit moment. Kom later terug voor nieuwe suggesties of pas je woonwensen aan.
            </p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-md transform hover:-translate-y-1 active:translate-y-0"
            >
              Opnieuw bekijken
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 