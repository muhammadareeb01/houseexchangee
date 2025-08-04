"use client";

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Mail, 
  Phone, 
  Search,
  HelpCircle,
  FileText,
  Shield,
  Home,
  Users,
  CreditCard
} from 'lucide-react';

// FAQ data
const faqData = [
  {
    category: "Algemeen",
    icon: <HelpCircle size={20} />,
    questions: [
      {
        question: "Hoe werkt woningruil?",
        answer: "Woningruil werkt door je eigen woning aan te bieden en te zoeken naar andere woningen die je interesseren. Je kunt contact opnemen met andere gebruikers om een ruil te bespreken. Beide partijen moeten akkoord gaan voordat een ruil definitief wordt."
      },
      {
        question: "Is woningruil legaal?",
        answer: "Ja, woningruil is volledig legaal. Het is belangrijk om je verhuurder op de hoogte te stellen en toestemming te krijgen. Wij adviseren altijd om schriftelijke afspraken te maken."
      },
      {
        question: "Wat kost het gebruik van het platform?",
        answer: "Het aanmelden en zoeken is gratis. Voor het plaatsen van een advertentie en het gebruik van premium functies hanteren wij een kleine maandelijkse bijdrage."
      }
    ]
  },
  {
    category: "Account & Profiel",
    icon: <Users size={20} />,
    questions: [
      {
        question: "Hoe maak ik een account aan?",
        answer: "Klik op &apos;Registreren&apos; en vul je gegevens in. Je ontvangt een bevestigingsmail om je account te activeren."
      },
      {
        question: "Kan ik mijn profiel later aanpassen?",
        answer: "Ja, je kunt altijd je profiel bewerken via de instellingen. We raden aan om je profiel zo compleet mogelijk in te vullen voor betere matches."
      },
      {
        question: "Hoe verwijder ik mijn account?",
        answer: "Je kunt je account verwijderen via de instellingen. Let op: dit is permanent en kan niet ongedaan worden gemaakt."
      }
    ]
  },
  {
    category: "Advertenties",
    icon: <Home size={20} />,
    questions: [
      {
        question: "Hoe plaats ik een advertentie?",
        answer: "Ga naar je profiel en klik op &apos;Advertentie plaatsen&apos;. Vul alle gevraagde informatie in en voeg foto&apos;s toe voor het beste resultaat."
      },
      {
        question: "Waarom is mijn advertentie niet zichtbaar?",
        answer: "Nieuwe advertenties worden eerst gecontroleerd. Dit duurt meestal 24 uur. Zorg ervoor dat je advertentie compleet is en voldoet aan onze richtlijnen."
      },
      {
        question: "Kan ik meerdere woningen aanbieden?",
        answer: "Momenteel kun je één woning per account aanbieden. Voor meerdere woningen neem je contact met ons op."
      }
    ]
  },
  {
    category: "Veiligheid",
    icon: <Shield size={20} />,
    questions: [
      {
        question: "Hoe controleren jullie gebruikers?",
        answer: "We verifiëren alle accounts en controleren advertenties. Verdachte activiteiten worden onderzocht en kunnen leiden tot accountsuspensie."
      },
      {
        question: "Wat moet ik doen bij verdacht gedrag?",
        answer: "Rapporteer verdacht gedrag direct via de &apos;Rapporteren&apos; knop. Ons team onderzoekt alle meldingen binnen 24 uur."
      },
      {
        question: "Zijn mijn gegevens veilig?",
        answer: "Ja, we nemen privacy en veiligheid zeer serieus. Je gegevens worden versleuteld opgeslagen en nooit gedeeld met derden."
      }
    ]
  },
  {
    category: "Betaling",
    icon: <CreditCard size={20} />,
    questions: [
      {
        question: "Welke betaalmethoden accepteren jullie?",
        answer: "We accepteren alle gangbare betaalmethoden: iDEAL, creditcard, PayPal en bankoverschrijving."
      },
      {
        question: "Kan ik mijn abonnement opzeggen?",
        answer: "Ja, je kunt je abonnement altijd opzeggen. Het blijft actief tot het einde van de betaalde periode."
      },
      {
        question: "Krijg ik een factuur?",
        answer: "Ja, je ontvangt automatisch een factuur per email na elke betaling."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Filter FAQ based on search term
  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-blue-100">We helpen je graag verder met al je vragen</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Zoek in veelgestelde vragen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a 
            href="mailto:support@mijnwoningruil.nl"
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-600">support@mijnwoningruil.nl</p>
              </div>
            </div>
          </a>

          <a 
            href="tel:+31201234567"
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Telefoon</h3>
                <p className="text-sm text-gray-600">020 123 45 67</p>
              </div>
            </div>
          </a>

          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-600">Direct contact</p>
              </div>
            </div>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText size={24} className="text-blue-600" />
              Veelgestelde Vragen
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredFAQ.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                    <span className="font-medium text-left">{category.category}</span>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {category.questions.length}
                    </span>
                  </div>
                  {expandedCategory === category.category ? 
                    <ChevronUp size={20} className="text-gray-400" /> : 
                    <ChevronDown size={20} className="text-gray-400" />
                  }
                </button>

                {expandedCategory === category.category && (
                  <div className="bg-gray-50">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-t border-gray-200">
                        <button
                          onClick={() => toggleQuestion(`${category.category}-${index}`)}
                          className="w-full p-4 text-left hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {expandedQuestion === `${category.category}-${index}` ? 
                              <ChevronUp size={16} className="text-gray-400 flex-shrink-0 ml-2" /> : 
                              <ChevronDown size={16} className="text-gray-400 flex-shrink-0 ml-2" />
                            }
                          </div>
                        </button>
                        
                        {expandedQuestion === `${category.category}-${index}` && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Vraag niet gevonden?</h2>
          <p className="text-gray-600 mb-6">Stuur ons een bericht en we helpen je zo snel mogelijk verder.</p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Je volledige naam"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="je@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50">
                <option>Selecteer een onderwerp</option>
                <option>Technische problemen</option>
                <option>Account vragen</option>
                <option>Advertentie problemen</option>
                <option>Betalingen</option>
                <option>Veiligheid</option>
                <option>Anders</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bericht</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Beschrijf je vraag of probleem..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Verstuur bericht
            </button>
          </form>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Gebruikershandleiding</h3>
            <p className="text-gray-600 text-sm mb-4">Leer hoe je het platform optimaal gebruikt</p>
            <button className="text-blue-600 hover:underline text-sm font-medium">
              Download PDF →
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Video tutorials</h3>
            <p className="text-gray-600 text-sm mb-4">Bekijk onze stap-voor-stap video&apos;s</p>
            <button className="text-blue-600 hover:underline text-sm font-medium">
              Bekijk video&apos;s →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 