"use client";

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Top Section with Text */}
        <div className="bg-[#fef4d6] py-16">
          <div className="container mx-auto px-4">
            <div className="text-left max-w-3xl">
              <h1 className="text-[54px] font-jakarta font-bold mb-4 leading-tight text-black whitespace-nowrap">
                Hoe woningruil werkt
              </h1>
              <p className="mb-10 text-black opacity-60" style={{
                fontSize: '20px',
                color: '#000',
                opacity: '60%',
                lineHeight: '26px',
                fontWeight: '500',
                letterSpacing: '0'
              }}>
                Ontdek hoe je eenvoudig van woning kunt ruilen in drie simpele stappen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Block Layout */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Block 1: Meld je aan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              {/* Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#ffe361] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-black">1</span>
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-4">
                Meld je aan en plaats je woning
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 text-center leading-relaxed mb-6">
                Maak een gratis account aan en plaats je huidige woning. Voeg gedetailleerde informatie toe over je woning, 
                upload hoogwaardige foto's en beschrijf jouw ideale ruilwoning.
              </p>
              
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">📱</div>
                  <span className="text-gray-500 text-sm font-medium">Foto placeholder</span>
                </div>
              </div>
            </div>

            {/* Block 2: Verken woningen */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              {/* Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#ffe361] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-black">2</span>
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-4">
                Verken woningen voor ruil
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 text-center leading-relaxed mb-6">
                Ga naar de "Verken" pagina en bekijk woningen één voor één. Filter op criteria zoals locatie, 
                aantal kamers, internet snelheid of huisdieren toegestaan.
              </p>
              
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">🏠</div>
                  <span className="text-gray-500 text-sm font-medium">Foto placeholder</span>
                </div>
              </div>
            </div>

            {/* Block 3: Start chatten */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              {/* Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#ffe361] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-black">3</span>
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-4">
                Start chatten en regel je ruil
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 text-center leading-relaxed mb-6">
                Wanneer twee gebruikers elkaars woningen leuk vinden, ontstaat er een "match". Je kunt nu direct 
                met elkaar chatten en de ruil plannen.
              </p>
              
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">💬</div>
                  <span className="text-gray-500 text-sm font-medium">Foto placeholder</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Klaar om te beginnen?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sluit je aan bij onze community van gelijkgestemde reizigers en ruil woningen over de hele wereld—gratis!
          </p>
          <button 
            onClick={() => router.push('/onboarding')}
            className="bg-[#ffe361] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#fdd835] transition-colors shadow-lg"
          >
            Start je woningruil avontuur
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
