/**
 * ExchangeRequestModal Component
 * Modal for sending exchange requests between users
 * Location: /components/exchange/ExchangeRequestModal.tsx
 */

"use client";

import { useState } from 'react';
import { X, Send, Home, MapPin, Users, Calendar, Euro } from 'lucide-react';
import Image from 'next/image';

interface ExchangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  targetUser: {
    name: string;
    avatar: string;
    property: {
      address: string;
      type: string;
      rooms: number;
      size: string;
      rent: string;
      imageUrl?: string;
    };
  };
  yourProperty: {
    address: string;
    type: string;
    rooms: number;
    size: string;
    rent: string;
    imageUrl?: string;
  };
}

const ExchangeRequestModal: React.FC<ExchangeRequestModalProps> = ({
  isOpen,
  onClose,
  onSend,
  targetUser,
  yourProperty,
}) => {
  const [message, setMessage] = useState(
    `Hallo ${targetUser.name},\n\nIk ben geïnteresseerd in een woningruil met jouw woning aan ${targetUser.property.address}.\n\nIk bied mijn woning aan ${yourProperty.address} aan in ruil voor jouw woning.\n\nGraag zou ik hierover in contact komen om de mogelijkheden te bespreken.\n\nMet vriendelijke groet,`
  );
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending the exchange request
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      onSend(message);
      
      // Close modal after success message
      setTimeout(() => {
        onClose();
        setIsSent(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">Ruilverzoek versturen</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Sluiten"
          >
            <X size={20} />
          </button>
        </div>

        {!isSent ? (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Property Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Your Property */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Home size={16} className="mr-2" />
                  Jouw woning
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {yourProperty.imageUrl && (
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={yourProperty.imageUrl}
                        alt={yourProperty.address}
                        width={300}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center text-gray-700 text-sm mb-2">
                      <MapPin size={14} className="mr-2 flex-shrink-0" />
                      <span className="font-medium">{yourProperty.address}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                      <div>Type: {yourProperty.type}</div>
                      <div>Kamers: {yourProperty.rooms}</div>
                      <div>Grootte: {yourProperty.size}</div>
                      <div>Huur: {yourProperty.rent}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="flex flex-col items-center text-gray-400">
                  <div className="text-xs mb-2">Ruil met</div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Property */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Home size={16} className="mr-2" />
                  {targetUser.name}&apos;s woning
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  {targetUser.property.imageUrl && (
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={targetUser.property.imageUrl}
                        alt={targetUser.property.address}
                        width={300}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center text-gray-700 text-sm mb-2">
                      <MapPin size={14} className="mr-2 flex-shrink-0" />
                      <span className="font-medium">{targetUser.property.address}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                      <div>Type: {targetUser.property.type}</div>
                      <div>Kamers: {targetUser.property.rooms}</div>
                      <div>Grootte: {targetUser.property.size}</div>
                      <div>Huur: {targetUser.property.rent}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Persoonlijk bericht
                </label>
                <textarea
                  id="message"
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSending}
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Ruilverzoek versturen</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ruilverzoek verstuurd!</h3>
            <p className="text-gray-600">
              Je ruilverzoek is succesvol verzonden naar {targetUser.name}. 
              Je ontvangt een notificatie zodra er gereageerd wordt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRequestModal; 