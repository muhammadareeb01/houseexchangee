"use client";

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress: string;
  advertiserName: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  propertyAddress,
  advertiserName,
}) => {
  const [message, setMessage] = useState(
    `Beste ${advertiserName},\n\nIk heb interesse in je woning aan ${propertyAddress}. Graag zou ik meer informatie willen ontvangen of een bezichtiging inplannen.\n\nMet vriendelijke groet,`
  );
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simuleer het verzenden van een bericht
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Sluit de modal na een paar seconden
      setTimeout(() => {
        onClose();
        setIsSent(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Stuur bericht naar {advertiserName}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Sluiten"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        {!isSent ? (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Bericht
              </label>
              <textarea
                id="message"
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                disabled={isSending}
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
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
                    <span>Versturen</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Bericht verstuurd!</h3>
            <p className="text-gray-600">
              Je bericht is succesvol verzonden naar {advertiserName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageModal; 