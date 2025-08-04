"use client";

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingContactButtonProps {
  onOpenModal: () => void;
}

const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the contact advertiser element position
      const contactBlock = document.querySelector('.contact-advertiser-block');
      
      if (contactBlock) {
        const contactPosition = contactBlock.getBoundingClientRect();
        
        // Show floating button when the contact block is scrolled out of view
        // (when the bottom of the contact container is above the viewport or below the viewport)
        if (contactPosition.bottom < 0 || contactPosition.top > window.innerHeight) {
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
        onClick={onOpenModal}
        className="flex items-center gap-2 py-2 px-5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Contact"
      >
        <MessageCircle className="h-4 w-4" />
        <span>Stuur bericht</span>
      </button>
    </div>
  );
};

export default FloatingContactButton; 