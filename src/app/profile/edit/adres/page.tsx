"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, MapPin } from 'lucide-react';

export default function AdresPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    postcode: '',
    huisnummer: '',
    straatnaam: '',
    plaats: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving address:', formData);
    router.push('/profile/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Adres</h1>
          <p className="text-gray-600">Postcode, huisnummer, straat en plaats</p>
        </div>

        <div className="space-y-6">
          {/* Address Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {/* Postcode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  placeholder="1234 AB"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Huisnummer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Huisnummer
                </label>
                <input
                  type="text"
                  value={formData.huisnummer}
                  onChange={(e) => handleInputChange('huisnummer', e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Straatnaam */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Straatnaam
                </label>
                <input
                  type="text"
                  value={formData.straatnaam}
                  onChange={(e) => handleInputChange('straatnaam', e.target.value)}
                  placeholder="Hoofdstraat"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Plaats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plaats
                </label>
                <input
                  type="text"
                  value={formData.plaats}
                  onChange={(e) => handleInputChange('plaats', e.target.value)}
                  placeholder="Amsterdam"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
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
