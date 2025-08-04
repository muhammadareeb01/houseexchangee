'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Vind jouw perfecte woningruil
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Ruil eenvoudig van woning en vind je nieuwe thuis. Snel, veilig en zonder gedoe.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => router.push('/onboarding')}
                  className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Plaats je woning
                </button>
                <button 
                  onClick={() => router.push('/search')}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Bekijk aanbod
                </button>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="flex-1 max-w-md">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="aspect-[16/9] bg-white bg-opacity-30 rounded-xl flex items-center justify-center text-white text-lg font-medium">
                  Woningfoto
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Zo werkt het
            </h2>
            <p className="text-xl text-gray-600">
              In drie eenvoudige stappen regel je jouw perfecte woningruil
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Plaats je woning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Maak een gratis account aan en plaats je huidige woning. Voeg foto&apos;s toe en beschrijf jouw ideale ruilwoning.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Vind een match
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ontdek potentiële ruilwoningen die bij jouw wensen passen en maak eenvoudig contact met de bewoners.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Regel je ruil
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Maak afspraken voor bezichtigingen en regel samen de details van de woningruil.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              onClick={() => router.push('/onboarding')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg"
            >
              Start direct met je woningruil
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
