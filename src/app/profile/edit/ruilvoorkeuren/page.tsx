"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Heart, MapPin, Home, X, Plus } from 'lucide-react';

export default function RuilvoorkeurenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gewensteLocaties: [] as string[],
    gewensteWoningtypen: [] as string[],
    maxHuur: '',
    minKamers: '',
    maxAfstand: ''
  });
  const [newLocation, setNewLocation] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: 'gewensteWoningtypen', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !formData.gewensteLocaties.includes(newLocation.trim())) {
      setFormData(prev => ({
        ...prev,
        gewensteLocaties: [...prev.gewensteLocaties, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      gewensteLocaties: prev.gewensteLocaties.filter(loc => loc !== location)
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving exchange preferences:', formData);
    router.push('/profile/my-listings');
  };

  const woningtypen = [
    'Appartement',
    'Huis',
    'Studio',
    'Penthouse',
    'Villa'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Ruilvoorkeuren</h1>
          <p className="text-gray-600">Gewenste locaties en woningtypen</p>
        </div>

        <div className="space-y-6">
          {/* Exchange Preferences Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Gewenste Locaties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewenste locaties
                </label>
                
                {/* Add Location Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Voeg locatie toe..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent transition-colors bg-gray-50"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                  />
                  <button
                    onClick={handleAddLocation}
                    className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Location Tags */}
                {formData.gewensteLocaties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.gewensteLocaties.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        <MapPin size={14} className="mr-1" />
                        {location}
                        <button
                          onClick={() => handleRemoveLocation(location)}
                          className="ml-2 text-gray-600 hover:text-gray-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gewenste Woningtypen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewenste woningtypen
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {woningtypen.map((type) => (
                    <label key={type} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.gewensteWoningtypen.includes(type)}
                        onChange={() => handleCheckboxChange('gewensteWoningtypen', type)}
                        className="h-4 w-4 border-gray-300 rounded mr-3"
                        style={{ accentColor: '#000000' }}
                      />
                      <Home size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Huur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum huurprijs (€)
                </label>
                <input
                  type="number"
                  value={formData.maxHuur}
                  onChange={(e) => handleInputChange('maxHuur', e.target.value)}
                  placeholder="1500"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Min Kamers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum aantal kamers
                </label>
                <input
                  type="number"
                  value={formData.minKamers}
                  onChange={(e) => handleInputChange('minKamers', e.target.value)}
                  placeholder="2"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Max Afstand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum afstand (km)
                </label>
                <input
                  type="number"
                  value={formData.maxAfstand}
                  onChange={(e) => handleInputChange('maxAfstand', e.target.value)}
                  placeholder="50"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent transition-colors bg-gray-50"
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
              <ArrowLeft size={20} className="mr-2" />
              Annuleren
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Save size={20} className="mr-2" />
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
