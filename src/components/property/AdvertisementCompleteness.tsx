"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AdvertisementCompletenessProps {
  completeness: number;
  propertyId: string;
  onImproveClick: (id: string) => void;
}

const AdvertisementCompleteness: React.FC<AdvertisementCompletenessProps> = ({
  completeness,
  propertyId,
  onImproveClick
}) => {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-700">Advertentie Volledigheid</h2>
        <span className="text-2xl font-bold text-blue-700">{completeness}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-3 bg-blue-100 rounded-full mb-4">
        <div 
          className="h-full bg-blue-600 rounded-full" 
          style={{ width: `${completeness}%` }}
        ></div>
      </div>
      
      <div className="text-right">
        <button 
          onClick={() => onImproveClick(propertyId)}
          className="text-blue-600 hover:underline font-medium flex items-center justify-end ml-auto"
        >
          Verbeter je advertentie <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AdvertisementCompleteness; 