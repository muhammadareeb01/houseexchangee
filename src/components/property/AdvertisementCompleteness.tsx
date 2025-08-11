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
    <div className="bg-gray-900 text-white rounded-xl p-6">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Advertentie Volledigheid</h2>
        <span className="text-2xl font-bold text-[#ffe361]">{completeness}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-700 rounded-full mb-4">
        <div 
          className="h-full bg-[#ffe361] rounded-full transition-all duration-300" 
          style={{ width: `${completeness}%` }}
        ></div>
      </div>
      
      <div className="text-right">
        <button 
          onClick={() => onImproveClick(propertyId)}
          className="text-[#ffe361] hover:text-[#f5d95a] font-medium flex items-center justify-end ml-auto transition-colors"
        >
          Verbeter je advertentie <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AdvertisementCompleteness; 