"use client";

import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Tag, 
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Shield
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle artikelen', icon: <FileText className="w-4 h-4" /> },
    { id: 'tips', name: 'Tips & Tricks', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'market', name: 'Marktnieuws', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'legal', name: 'Juridisch', icon: <Shield className="w-4 h-4" /> }
  ];

  const articles = [
    {
      id: 1,
      title: "10 tips voor een succesvolle woningruil",
      excerpt: "Leer hoe je je kansen op een succesvolle woningruil kunt vergroten met deze praktische tips van ervaren gebruikers.",
      category: 'tips',
      date: '15 augustus 2024',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
      featured: true
    },
    {
      id: 2,
      title: "Nieuwe wetgeving voor woningruil in 2024",
      excerpt: "Wat verandert er voor woningruilers met de nieuwe wetgeving? We leggen het uit in begrijpelijke taal.",
      category: 'legal',
      date: '12 augustus 2024',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 3,
      title: "Huisvestingsmarkt stabiliseert in grote steden",
      excerpt: "De woningmarkt in Amsterdam, Utrecht en Rotterdam vertoont tekenen van stabilisatie. Wat betekent dit voor woningruilers?",
      category: 'market',
      date: '10 augustus 2024',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 4,
      title: "Hoe maak je een aantrekkelijke advertentie?",
      excerpt: "De do's en don'ts van het maken van een advertentie die aandacht trekt en serieuze reacties oplevert.",
      category: 'tips',
      date: '8 augustus 2024',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 5,
      title: "Veilig woningruilen: waar moet je op letten?",
      excerpt: "Veiligheid staat voorop bij woningruil. Lees hier hoe je jezelf kunt beschermen tegen fraude en misstanden.",
      category: 'tips',
      date: '5 augustus 2024',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 6,
      title: "Woningruil populairder dan ooit",
      excerpt: "Steeds meer mensen ontdekken de voordelen van woningruil. We kijken naar de cijfers en trends.",
      category: 'market',
      date: '3 augustus 2024',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Nieuws en tips</h1>
          <p className="text-gray-600">Blijf op de hoogte van de laatste ontwikkelingen en krijg handige tips</p>
        </div>

        <div className="space-y-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {selectedCategory === 'all' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                    alt="Featured article"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#ffe361] text-black px-2 py-1 rounded-full text-xs font-medium">
                      Uitgelicht
                    </span>
                    <span className="text-gray-500 text-sm">15 augustus 2024</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">10 tips voor een succesvolle woningruil</h2>
                  <p className="text-gray-600 mb-4">
                    Leer hoe je je kansen op een succesvolle woningruil kunt vergroten met deze praktische tips van ervaren gebruikers. Van het maken van een aantrekkelijke advertentie tot het voeren van effectieve onderhandelingen.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min lezen</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>Tips & Tricks</span>
                      </div>
                    </div>
                    <button className="text-black hover:text-gray-700 font-medium flex items-center gap-1">
                      Lees meer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles
              .filter(article => !article.featured || selectedCategory !== 'all')
              .map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'tips' ? 'bg-[#ffe361] text-black' :
                        article.category === 'market' ? 'bg-black text-white' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <span className="text-gray-500 text-sm">{article.date}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <button className="text-black hover:text-gray-700 font-medium text-sm flex items-center gap-1">
                        Lees meer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>


        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 