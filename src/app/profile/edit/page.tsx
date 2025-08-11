"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Settings, 
  Camera, 
  Heart,
  Check,
  ChevronRight
} from 'lucide-react';

export default function EditAdvertisementPage() {
  const router = useRouter();
  
  // Track completed sections (would normally come from API/database)
  const [completedSections, setCompletedSections] = useState({
    adres: true,
    basisgegevens: true,
    woningdetails: false,
    fotos: true,
    ruilvoorkeuren: false
  });

  // Check if all sections are completed
  const allSectionsCompleted = Object.values(completedSections).every(completed => completed);

  const editOptions = [
    {
      id: 'adres',
      title: 'Adres',
      description: 'Postcode, huisnummer, straat en plaats',
      icon: MapPin,
      href: '/profile/edit/adres',
      completed: completedSections.adres
    },
    {
      id: 'basisgegevens',
      title: 'Basisgegevens',
      description: 'Type woning, kamers, oppervlakte en huur',
      icon: Home,
      href: '/profile/edit/basisgegevens',
      completed: completedSections.basisgegevens
    },
    {
      id: 'woningdetails',
      title: 'Woningdetails',
      description: 'Voorzieningen, buitenruimte en locatie',
      icon: Settings,
      href: '/profile/edit/woningdetails',
      completed: completedSections.woningdetails
    },
    {
      id: 'fotos',
      title: "Foto's",
      description: 'Upload en beheer woningfoto\'s',
      icon: Camera,
      href: '/profile/edit/fotos',
      completed: completedSections.fotos
    },
    {
      id: 'ruilvoorkeuren',
      title: 'Ruilvoorkeuren',
      description: 'Gewenste locaties en woningtypen',
      icon: Heart,
      href: '/profile/edit/ruilvoorkeuren',
      completed: completedSections.ruilvoorkeuren
    }
  ];

  const handleEditOptionClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Advertentie bewerken</h1>
          <p className="text-gray-600">Beheer alle onderdelen van je woningadvertentie</p>
        </div>

        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-gray-900 text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Voortgang</h2>
              <div className="text-sm text-[#ffe361]">
                {Object.values(completedSections).filter(Boolean).length} van {Object.keys(completedSections).length} voltooid
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-[#ffe361] h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(completedSections).filter(Boolean).length / Object.keys(completedSections).length) * 100}%` 
                }}
              ></div>
            </div>

            {allSectionsCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Alle onderdelen zijn voltooid!</span>
                </div>
              </div>
            )}
          </div>

          {/* Edit Options */}
          <div className="space-y-3">
            {editOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleEditOptionClick(option.href)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  <div className="flex-shrink-0 mr-3">
                    {option.completed ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Icon size={16} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <span className="font-medium text-gray-900 block">{option.title}</span>
                    <span className="text-sm text-gray-500">{option.description}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <button
              onClick={() => router.push('/profile/my-listings')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Terug naar mijn advertenties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
