"use client";

import { useState } from 'react';
import { 
  Crown, 
  ArrowRight
} from 'lucide-react';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Maandelijks',
      price: '€9,99',
      period: 'per maand',
      popular: false,
      savings: null
    },
    {
      id: 'yearly',
      name: 'Jaarlijks',
      price: '€99,99',
      period: 'per jaar',
      popular: true,
      savings: '€19,89'
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Upgrade naar Premium</h1>
          <p className="text-gray-600">Ontgrendel alle functies en krijg meer matches</p>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#ffe361] via-[#ffd93d] to-[#ffcc02] rounded-2xl p-8 text-black text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Word Premium lid</h2>
            <p className="text-black opacity-80 max-w-md mx-auto">
              Krijg toegang tot alle premium functies en verhoog je kansen op een succesvolle woningruil
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Kies je abonnement</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-black bg-gray-100'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#ffe361] text-black px-3 py-1 rounded-full text-sm font-medium">
                        Meest populair
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="font-semibold text-lg mb-2">{plan.name}</h4>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <p className="text-green-600 text-sm font-medium">
                        Bespaar €{plan.savings} per jaar
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upgrade Button */}
            <button className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <span>Upgrade naar Premium</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>


        </div>
      </div>
    </div>
  );
} 