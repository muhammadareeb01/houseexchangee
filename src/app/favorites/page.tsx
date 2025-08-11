"use client";

import React from 'react';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-black" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-black mb-3">
            Nog geen favorieten
          </h2>
          
          {/* Description */}
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Klik op het hartje bij een woning om deze aan je favorieten toe te voegen!
          </p>
        </div>
      </div>
    </div>
  );
}
