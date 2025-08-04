"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import MessageModal from './MessageModal';

interface ContactAdvertiserProps {
  name: string;
  activeSince: string;
  profileImage?: string;
  propertyAddress: string;
}

const ContactAdvertiser: React.FC<ContactAdvertiserProps> = ({
  name,
  activeSince,
  profileImage = '/placeholder-profile.jpg',
  propertyAddress
}) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="contact-advertiser-block bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image 
              src={profileImage} 
              alt={`Profielfoto van ${name}`} 
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-medium">{name}</h3>
            <p className="text-gray-500 text-sm">Actief sinds: {activeSince}</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowPreferences(!showPreferences)}
          className="flex items-center justify-between w-full py-3 border-y border-gray-200 text-gray-700"
        >
          <div className="flex items-center">
            <span className="font-medium">Bekijk ruilvoorkeuren</span>
          </div>
          {showPreferences ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {showPreferences && (
          <div className="py-4 px-2 border-b border-gray-200">
            <p className="text-gray-700 mb-3">Voorkeuren van {name}:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Minimaal 3 slaapkamers</li>
              <li>Woonoppervlak: 70-100m²</li>
              <li>Regio: Amsterdam, Utrecht</li>
              <li>Max. huurprijs: €1.500/maand</li>
            </ul>
          </div>
        )}
        
        <button 
          onClick={handleOpenModal}
          className="flex items-center justify-center w-full gap-2 py-3 px-5 mt-5 mb-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <MessageCircle size={20} />
          <span className="font-medium">Stuur een bericht</span>
        </button>
        
        <p className="text-center text-gray-500 text-sm">Reageert meestal binnen 24 uur</p>
      </div>

      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        propertyAddress={propertyAddress}
        advertiserName={name}
      />
    </>
  );
};

export default ContactAdvertiser; 