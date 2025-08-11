"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Wat is woningruil precies?",
      answer: "Woningruil is het uitwisselen van huurwoningen tussen huurders. In plaats van te verhuizen en een nieuwe woning te huren, ruil je direct van woning met iemand anders. Dit bespaart tijd, geld en gedoe."
    },
    {
      question: "Is woningruil legaal?",
      answer: "Ja, woningruil is volledig legaal in Nederland. Het is een erkende manier van verhuizen die al jaren wordt toegepast. Wel moet je altijd toestemming vragen aan je verhuurder voordat je gaat ruilen."
    },
    {
      question: "Hoeveel kost woningruil?",
      answer: "Woningruil via ons platform is volledig gratis. Je betaalt geen commissie of verborgen kosten. De enige kosten die je kunt hebben zijn eventuele administratiekosten van je verhuurder."
    },
    {
      question: "Wat als mijn verhuurder niet akkoord gaat?",
      answer: "In Nederland hebben verhuurders meestal geen redelijke gronden om woningruil te weigeren. Als je verhuurder toch weigert, kunnen we je helpen met het vinden van een oplossing of juridisch advies."
    },
    {
      question: "Hoe lang duurt het om een match te vinden?",
      answer: "Dit verschilt per situatie. Sommige mensen vinden binnen een week een match, anderen hebben meer tijd nodig. Het hangt af van je wensen, locatie en beschikbaarheid. We helpen je actief met het vinden van matches."
    },
    {
      question: "Kan ik ook ruilen als ik een sociale huurwoning heb?",
      answer: "Ja, woningruil is ook mogelijk met sociale huurwoningen. Wel gelden er vaak specifieke regels van de woningcorporatie. We helpen je graag met het uitzoeken van de mogelijkheden."
    },
    {
      question: "Wat gebeurt er als er problemen zijn na de ruil?",
      answer: "We bieden ondersteuning tijdens het hele ruilproces. Als er problemen ontstaan, helpen we je met het vinden van een oplossing. We werken ook samen met juridische partners voor complexe situaties."
    },
    {
      question: "Kan ik mijn woning ook ruilen als ik er nog niet lang woon?",
      answer: "Dit hangt af van je huurcontract. De meeste verhuurders staan woningruil toe na een bepaalde periode (meestal 1-2 jaar). We helpen je graag met het uitzoeken van de mogelijkheden voor jouw situatie."
    }
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
                Veelgestelde vragen
              </h1>
              <p className="mb-10 text-black opacity-60" style={{
                fontSize: '20px',
                color: '#000',
                opacity: '60%',
                lineHeight: '26px',
                fontWeight: '500',
                letterSpacing: '0'
              }}>
                Vind antwoorden op de meest gestelde vragen over woningruil
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Heb je nog andere vragen? Neem contact met ons op.
            </p>
            <button 
              onClick={() => window.location.href = 'mailto:info@mijnwoningruil.nl'}
              className="bg-[#ffe361] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#f5d95a] transition-colors"
            >
              Contact opnemen
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
