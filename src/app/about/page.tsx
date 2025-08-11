"use client";

import { ArrowRight, Users, Shield, Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Grote community",
      description: "Duizenden actieve gebruikers die op zoek zijn naar hun perfecte woningruil"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Veilig en betrouwbaar",
      description: "Verificatie van alle gebruikers en veilige communicatie via ons platform"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Persoonlijke begeleiding",
      description: "Ons team helpt je bij elke stap van het ruilproces"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Gratis service",
      description: "Geen verborgen kosten of commissies, volledig gratis te gebruiken"
    }
  ];

  const stats = [
    { number: "10.000+", label: "Actieve gebruikers" },
    { number: "5.000+", label: "Succesvolle ruilen" },
    { number: "98%", label: "Tevreden klanten" },
    { number: "24/7", label: "Ondersteuning" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Top Section with Text */}
        <div className="bg-[#fef4d6] py-16">
          <div className="container mx-auto px-4">
            <div className="text-left max-w-3xl">
              <h1 className="text-[54px] font-jakarta font-bold mb-4 leading-tight text-black whitespace-nowrap">
                Over woningruil
              </h1>
              <p className="mb-10 text-black opacity-60" style={{
                fontSize: '20px',
                color: '#000',
                opacity: '60%',
                lineHeight: '26px',
                fontWeight: '500',
                letterSpacing: '0'
              }}>
                Ontdek meer over ons platform en waarom woningruil de toekomst is
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Mission */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
              Onze missie
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed text-center">
              Wij geloven dat verhuizen eenvoudiger, goedkoper en duurzamer kan zijn. 
              Door woningruil te faciliteren, helpen we mensen om hun droomwoning te vinden 
              zonder de hoge kosten en stress van traditioneel verhuizen.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Onze cijfers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
              Ons verhaal
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <p className="text-gray-600 leading-relaxed mb-6">
                Mijnwoningruil.nl is ontstaan uit de frustratie met het traditionele verhuisproces. 
                Als huurders ervoeren we zelf hoe moeilijk en duur het was om van woning te veranderen. 
                Er moest een betere manier zijn.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Woningruil bleek de perfecte oplossing. Het is sneller, goedkoper en duurzamer dan 
                traditioneel verhuizen. Toch was er geen goed platform om woningruil te faciliteren. 
                Daarom besloten we om mijnwoningruil.nl op te richten.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Vandaag de dag helpen we duizenden mensen om hun droomwoning te vinden via woningruil. 
                Onze missie is om woningruil toegankelijk te maken voor iedereen in Nederland.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Klaar om te beginnen?
            </h3>
            <p className="text-gray-600 mb-8">
              Sluit je aan bij onze community en vind je perfecte woningruil
            </p>
            <button 
              onClick={() => router.push('/onboarding')}
              className="bg-[#ffe361] text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#f5d95a] transition-colors inline-flex items-center gap-2"
            >
              Start je woningruil
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
