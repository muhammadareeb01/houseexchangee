"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Home, Bed, Square } from 'lucide-react';

export default function BasisgegevensPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    typeWoning: '',
    kamers: '',
    oppervlakte: '',
    huur: '',
    etage: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving basic info:', formData);
    router.push('/profile/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Basisgegevens</h1>
          <p className="text-gray-600">Type woning, kamers, oppervlakte en huur</p>
        </div>

        <div className="space-y-6">
          {/* Basic Info Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {/* Type Woning */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type woning
                </label>
                <select
                  value={formData.typeWoning}
                  onChange={(e) => handleInputChange('typeWoning', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                >
                  <option value="">Selecteer type woning</option>
                  <option value="appartement">Appartement</option>
                  <option value="huis">Huis</option>
                  <option value="studio">Studio</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Kamers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aantal kamers
                </label>
                <input
                  type="number"
                  value={formData.kamers}
                  onChange={(e) => handleInputChange('kamers', e.target.value)}
                  placeholder="2"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Oppervlakte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oppervlakte (m²)
                </label>
                <input
                  type="number"
                  value={formData.oppervlakte}
                  onChange={(e) => handleInputChange('oppervlakte', e.target.value)}
                  placeholder="75"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Huur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Huurprijs (€)
                </label>
                <input
                  type="number"
                  value={formData.huur}
                  onChange={(e) => handleInputChange('huur', e.target.value)}
                  placeholder="1200"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                />
              </div>

              {/* Etage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etage
                </label>
                <input
                  type="text"
                  value={formData.etage}
                  onChange={(e) => handleInputChange('etage', e.target.value)}
                  placeholder="3e verdieping"
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
