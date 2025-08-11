'use client';

import { ArrowRight, Home as HomeIcon, Users, Shield, Star, Check, MapPin, Bed, Wifi } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Partner logos for the slider
  const logos = [
    { name: 'Fressnapf', src: '/images/partners/fressnapf.svg' },
    { name: 'eBay', src: '/images/partners/ebay.svg' },
    { name: 'Zooplus', src: '/images/partners/zooplus.svg' },
    { name: 'Douglas', src: '/images/partners/douglas.svg' },
    { name: 'Cemma', src: '/images/partners/cemma.svg' },
    { name: 'Lidl', src: '/images/partners/lidl.svg' },
    { name: 'MediaMarkt', src: '/images/partners/mediamarkt.svg' },
    { name: 'OT', src: '/images/partners/ot.svg' },
    { name: 'Partner 9', src: '/images/partners/partner9.svg' },
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, logos.length - 8)); // Show 9 logos at once
    }, 5000);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* 1. Gele vlak met H1 en CTA */}
        <div className="bg-[#fef4d6] py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-left max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-jakarta font-bold mb-4 leading-tight text-black lg:whitespace-nowrap">
                Vind jouw perfecte woningruil in Nederland
              </h1>
              <p className="mb-10 text-black opacity-60 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                Ruil eenenvoudig van woning en vind je nieuwe thuis. Snel, veilig en zonder gedoe.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start">
                <button 
                  onClick={() => router.push('/onboarding')}
                  className="bg-[#ffe361] text-black px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#f5d95a] transition-colors"
                >
                  Plaats je woning
                </button>
                <button 
                  onClick={() => router.push('/search')}
                  className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors"
                >
                  Bekijk aanbod
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Background Image Section */}
        <div className="relative overflow-hidden">
          <img 
            src="/images/backgrounds/header.jpg" 
            alt="Header background" 
            className="w-full h-[400px] lg:h-[500px] object-cover"
          />
        </div>

        {/* 3. Witte baan met logo slider */}
        <div className="bg-white py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-center overflow-hidden">
                <div className="flex transition-transform duration-1000 ease-in-out" 
                     style={{ transform: `translateX(-${currentSlide * (100 / 9)}%)` }}>
                  {logos.map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-1/9 px-2 md:px-4 flex items-center justify-center">
                      <div className="flex items-center justify-center h-16 md:h-20 w-24 md:w-32">
                        <img 
                          src={logo.src} 
                          alt={logo.name}
                          className="h-12 md:h-16 w-auto object-contain max-w-full"
                          onError={(e) => {
                            // Fallback to text if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'block';
                          }}
                        />
                        <span className="hidden text-sm font-medium text-gray-600">{logo.name}</span>
                      </div>
                    </div>
                  ))}
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
            <div className="bg-[#ffe361]/20 w-16 h-16 rounded-full flex items-center justify-center text-[#ffe361] text-2xl font-bold mx-auto mb-6 border-2 border-[#ffe361]/30">
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
            <div className="bg-[#ffe361]/20 w-16 h-16 rounded-full flex items-center justify-center text-[#ffe361] text-2xl font-bold mx-auto mb-6 border-2 border-[#ffe361]/30">
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
            <div className="bg-[#ffe361]/20 w-16 h-16 rounded-full flex items-center justify-center text-[#ffe361] text-2xl font-bold mx-auto mb-6 border-2 border-[#ffe361]/30">
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
              className="bg-[#ffe361] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#f5d95a] transition-colors inline-flex items-center gap-2 text-lg"
            >
              Start direct met je woningruil
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Populaire woningen
            </h2>
            <p className="text-xl text-gray-600">
              Ontdek enkele van de meest gewilde woningen voor ruil
            </p>
          </div>

          {/* Property Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Property 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <HomeIcon className="h-16 w-16 text-blue-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Amsterdam Centrum</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Karakteristiek grachtenpand
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>3 kamers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>100 Mbps</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prachtig grachtenpand in het hart van Amsterdam. Perfect voor stadsliefhebbers.
                </p>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <HomeIcon className="h-16 w-16 text-green-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Utrecht Centrum</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Modern appartement
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>2 kamers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>500 Mbps</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nieuwbouw appartement met alle moderne gemakken en dichtbij het centrum.
                </p>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <HomeIcon className="h-16 w-16 text-yellow-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Den Haag Scheveningen</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Appartement aan zee
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>4 kamers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>200 Mbps</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ruim appartement op loopafstand van het strand. Ideaal voor strandliefhebbers.
                </p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button 
              onClick={() => router.push('/search')}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              Bekijk alle woningen
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#fef4d6] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Waarom kiezen voor woningruil?
            </h2>
            <p className="text-xl text-gray-600">
              Ontdek de voordelen van woningruil ten opzichte van traditioneel verhuizen
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="h-8 w-8 text-[#ffe361]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Volledig gratis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Geen makelaarkosten, geen bemiddelingskosten. Woningruil is 100% gratis.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="h-8 w-8 text-[#ffe361]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Veilig & betrouwbaar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Alle gebruikers worden geverifieerd en we bieden ondersteuning tijdens het proces.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-[#ffe361]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Grote community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Duizenden actieve gebruikers door heel Nederland zoeken naar hun perfecte match.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <HomeIcon className="h-8 w-8 text-[#ffe361]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Sneller verhuizen
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Geen wachtlijsten of lange procedures. Vind direct je nieuwe woning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Onze resultaten spreken voor zich
            </h2>
            <p className="text-xl text-gray-300">
              Duizenden tevreden gebruikers gingen je voor
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#ffe361] mb-2">
                15.000+
              </div>
              <div className="text-white text-lg">
                Geregistreerde woningen
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#ffe361] mb-2">
                8.500+
              </div>
              <div className="text-white text-lg">
                Succesvolle ruilen
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#ffe361] mb-2">
                98%
              </div>
              <div className="text-white text-lg">
                Tevredenheid
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#ffe361] mb-2">
                24/7
              </div>
              <div className="text-white text-lg">
                Ondersteuning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Wat zeggen onze gebruikers?
            </h2>
            <p className="text-xl text-gray-600">
              Lees de ervaringen van mensen die succesvol hebben geruild
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-[#ffe361] fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Binnen 2 weken hadden we onze droomwoning gevonden! Het proces was zo eenvoudig en persoonlijk. Echt een aanrader."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffe361] flex items-center justify-center text-black font-semibold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Marieke de Jong</div>
                  <div className="text-sm text-gray-500">Amsterdam → Utrecht</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-[#ffe361] fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Fantastische service! We hebben niet alleen een nieuwe woning gevonden, maar ook nieuwe vrienden gemaakt."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffe361] flex items-center justify-center text-black font-semibold">
                  P
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Peter Jansen</div>
                  <div className="text-sm text-gray-500">Rotterdam → Den Haag</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-[#ffe361] fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Eindelijk konden we verhuizen zonder de enorme kosten! Woningruil heeft ons leven veranderd."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffe361] flex items-center justify-center text-black font-semibold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Sarah van der Berg</div>
                  <div className="text-sm text-gray-500">Eindhoven → Amsterdam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#ffe361] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Klaar om je droomwoning te vinden?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Sluit je aan bij duizenden tevreden gebruikers en start vandaag nog met woningruil. Het is gratis en je kunt direct beginnen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/onboarding')}
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2 text-lg"
            >
              Start nu gratis
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/search')}
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
            >
              Bekijk woningen
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
