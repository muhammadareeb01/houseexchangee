"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Camera, Upload, X, Star } from 'lucide-react';
import Image from 'next/image';

export default function FotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState<number | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
      if (mainPhotoIndex === null && photos.length === 0) {
        setMainPhotoIndex(0);
      }
    }
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => {
      const newPhotos = prev.filter((_, i) => i !== index);
      if (mainPhotoIndex === index) {
        setMainPhotoIndex(newPhotos.length > 0 ? 0 : null);
      } else if (mainPhotoIndex !== null && index < mainPhotoIndex) {
        setMainPhotoIndex(mainPhotoIndex - 1);
      }
      return newPhotos;
    });
  };

  const handleSetMainPhoto = (index: number) => {
    setMainPhotoIndex(index);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving photos:', photos);
    console.log('Main photo index:', mainPhotoIndex);
    router.push('/profile/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Foto's</h1>
          <p className="text-gray-600">Upload en beheer woningfoto's</p>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Foto's uploaden
                  </p>
                  <p className="text-sm text-gray-500">
                    Sleep foto's hierheen of klik om te selecteren
                  </p>
                </label>
              </div>

              {/* Photo Grid */}
              {photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Geüploade foto's ({photos.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={photo}
                            alt={`Foto ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Main Photo Badge */}
                        {mainPhotoIndex === index && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <Star size={12} className="mr-1" />
                            Hoofdfoto
                          </div>
                        )}
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeletePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        
                        {/* Set as Main Photo Button */}
                        {mainPhotoIndex !== index && (
                          <button
                            onClick={() => handleSetMainPhoto(index)}
                            className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Hoofdfoto maken
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
