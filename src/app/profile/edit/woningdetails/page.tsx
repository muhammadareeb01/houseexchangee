"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WoningdetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    voorzieningen: [] as string[],
    buitenruimte: '',
    locatie: '',
    beschrijving: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      voorzieningen: prev.voorzieningen.includes(value)
        ? prev.voorzieningen.filter(item => item !== value)
        : [...prev.voorzieningen, value]
    }));
  };

  const handleSave = () => {
    console.log('Saving property details:', formData);
    router.push('/profile/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Woningdetails</h1>
          <p className="text-gray-600">Voorzieningen, buitenruimte en locatie</p>
        </div>

        <div className="space-y-6">
          {/* Property Details Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Voorzieningen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voorzieningen
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('wifi')}
                      onChange={() => handleCheckboxChange('wifi')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">WiFi</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('parking')}
                      onChange={() => handleCheckboxChange('parking')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">Parkeerplaats</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('balkon')}
                      onChange={() => handleCheckboxChange('balkon')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">Balkon</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('lift')}
                      onChange={() => handleCheckboxChange('lift')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">Lift</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('airco')}
                      onChange={() => handleCheckboxChange('airco')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">Airconditioning</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.voorzieningen.includes('wasmachine')}
                      onChange={() => handleCheckboxChange('wasmachine')}
                      className="h-4 w-4 border-gray-300 rounded mr-3"
                      style={{ accentColor: '#000000' }}
                    />
                    <span className="text-sm">Wasmachine</span>
                  </label>
                </div>
              </div>

              {/* Buitenruimte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buitenruimte
                </label>
                <select
                  value={formData.buitenruimte}
                  onChange={(e) => handleInputChange('buitenruimte', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                >
                  <option value="">Selecteer buitenruimte</option>
                  <option value="balkon">Balkon</option>
                  <option value="terras">Terras</option>
                  <option value="tuin">Tuin</option>
                  <option value="geen">Geen</option>
                </select>
              </div>

              {/* Locatie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locatie beschrijving
                </label>
                <input
                  type="text"
                  value={formData.locatie}
                  onChange={(e) => handleInputChange('locatie', e.target.value)}
                  placeholder="Centrum, nabij station en winkels"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Beschrijving */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschrijving
                </label>
                <textarea
                  value={formData.beschrijving}
                  onChange={(e) => handleInputChange('beschrijving', e.target.value)}
                  placeholder="Beschrijf je woning..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/profile/my-listings')}
              className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
