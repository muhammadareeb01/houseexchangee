"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Home, ArrowLeft, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [viewMode, setViewMode] = useState(pathname === '/match' ? 'match' : 'zoeken');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on messages pages
  if (pathname.startsWith('/messages')) {
    return null;
  }

  const isSearchOrMatchPage = pathname === '/search' || pathname === '/match';
  const isPropertyDetailPage = pathname.startsWith('/property/');
  const isHomepage = pathname === '/';

  const handleToggleChange = (mode: string) => {
    setViewMode(mode);
    if (mode === 'match' && pathname !== '/match') {
      router.push('/match');
    } else if (mode === 'zoeken' && pathname !== '/search') {
      router.push('/search');
    }
  };

  const handleBackClick = () => {
    router.push('/search');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleMobileNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white shadow-md h-16">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {isPropertyDetailPage ? (
          // Layout for property detail pages
          <>
            {/* Left: Back button */}
            <button 
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="mr-1" size={18} />
              <span className="text-sm font-medium">Terug</span>
            </button>
            
            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className="flex items-center h-full">
                <div className="flex items-center h-full">
                  <span className="font-bold text-lg text-blue-600">mijnwoningruil</span>
                  <span className="font-bold text-lg text-gray-800">.nl</span>
                </div>
              </Link>
            </div>
            
            {/* Right: Notifications */}
            <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
          </>
        ) : (
          // Original layout for other pages
          <>
            <Link href="/" className="flex items-center h-full">
              <div className="flex items-center h-full">
                <span className="font-bold text-lg md:text-2xl text-blue-600">mijnwoningruil</span>
                <span className="font-bold text-lg md:text-2xl text-gray-800">.nl</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4 h-full">
                {isHomepage ? (
                  <>
                    {/* Desktop navigation for homepage */}
                    <nav className="hidden md:flex items-center space-x-6 h-full">
                      <button
                        onClick={() => router.push('/search')}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Aanbod
                      </button>
                      <button
                        onClick={() => scrollToSection('how-it-works')}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Hoe het werkt
                      </button>
                      <button
                        onClick={() => router.push('/auth/signin')}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Inloggen
                      </button>
                      <button
                        onClick={() => router.push('/onboarding')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Plaats woning
                      </button>
                    </nav>
                    
                    {/* Mobile menu button for homepage */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </button>
                  </>
                ) : isSearchOrMatchPage ? (
                <div className="bg-gray-200 p-1 rounded-full flex items-center h-10">
                  <button
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all h-8 flex items-center justify-center ${
                      viewMode === 'zoeken' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleToggleChange('zoeken')}
                  >
                    Zoeken
                  </button>
                  <button
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all h-8 flex items-center justify-center ${
                      viewMode === 'match' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => handleToggleChange('match')}
                  >
                    Match
                  </button>
                </div>
              ) : (
                // Placeholder to maintain consistent header height when toggle isn't shown
                <div className="h-10"></div>
              )}
              
                {/* Hide notification bell on homepage */}
                {!isHomepage && (
              <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </div>
                )}
            </div>
          </>
        )}
      </div>
    </header>

      {/* Mobile Menu Dropdown for Homepage */}
      {isHomepage && isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavigation('/search')}
                className="text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Aanbod
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Hoe het werkt
              </button>
              <button
                onClick={() => handleMobileNavigation('/auth/signin')}
                className="text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Inloggen
              </button>
              <button
                onClick={() => handleMobileNavigation('/auth/signup')}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Plaats woning
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay to close mobile menu when clicking outside */}
      {isHomepage && isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-5 top-16"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
