"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Bell, ArrowLeft } from 'lucide-react';
import ProfileMenu from '../profile/ProfileMenu';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we're on a property detail page
  const isPropertyDetailPage = pathname.startsWith('/property/') && pathname !== '/property';
  
  // Check if we're on a chat page
  const isChatPage = pathname.startsWith('/messages/') && pathname !== '/messages';
  
  // Check if we're on a public page (homepage, how-it-works, etc.)
  const isPublicPage = ['/', '/how-it-works', '/faq', '/about', '/auth/signin', '/register', '/verify'].includes(pathname);
  

  
  // Check if we're on a property page (should show auth-style menu)
  const isPropertyPage = pathname.startsWith('/property/');

  // Mock user state - replace with actual auth context
  // For property pages and logged-in user pages, simulate logged in user to show correct menu
  const loggedInPages = ['/dashboard', '/search', '/favorites', '/messages', '/notifications', '/settings', '/help', '/news', '/premium', '/profile'];
  const isLoggedInPage = loggedInPages.some(page => pathname.startsWith(page));
  const user = (isPropertyPage || isLoggedInPage) ? { name: "Mock User" } : null;

  const handleBackClick = () => {
    router.back();
  };

  const handleMobileNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hide header on chat pages
  if (isChatPage) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-20 bg-white shadow-md h-16">
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          {/* Always use normal layout for property pages - no special property detail layout */}
          {false ? (
            <>
              {/* Left: Back button */}
              <button 
                onClick={handleBackClick}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="mr-1" size={18} />
                <span className="text-sm font-medium">Terug</span>
              </button>
              
              {/* Center: Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="/" className="flex items-center h-full">
                  <div className="flex items-center h-full">
                    <img 
                      src="/images/logos/logo.svg" 
                      alt="mijnwoningruil.nl logo" 
                      className="h-8 md:h-10"
                    />
                  </div>
                </Link>
              </div>
              
              {/* Right: Notifications */}
              <button 
                onClick={() => router.push('/notifications')}
                className="relative cursor-pointer flex items-center justify-center h-10 w-10"
              >
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">3</span>
                </div>
              </button>
            </>
          ) : (
            <>
              {/* Logo */}
              <Link href="/" className="flex items-center h-full">
                <div className="flex items-center h-full">
                  <img 
                    src="/images/logos/logo.svg" 
                    alt="mijnwoningruil.nl logo" 
                    className="h-8 md:h-10"
                  />
                </div>
              </Link>
              
              {/* Navigation and buttons */}
              <div className="flex items-center justify-between h-full w-full">
                {isPublicPage ? (
                  <>
                    {/* Desktop navigation for homepage */}
                    <nav className="hidden md:flex items-center justify-center space-x-8 h-full flex-1">
                      <button
                        onClick={() => router.push('/search')}
                        className="text-gray-700 hover:text-black font-medium transition-colors"
                      >
                        Aanbod
                      </button>
                      <button
                        onClick={() => router.push('/how-it-works')}
                        className="text-gray-700 hover:text-black font-medium transition-colors"
                      >
                        Hoe het werkt
                      </button>
                      <button
                        onClick={() => router.push('/faq')}
                        className="text-gray-700 hover:text-black font-medium transition-colors"
                      >
                        Veelgestelde vragen
                      </button>
                      <button
                        onClick={() => router.push('/about')}
                        className="text-gray-700 hover:text-black font-medium transition-colors"
                      >
                        Over woningruil
                      </button>
                    </nav>
                    
                    {/* Right side buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                      {pathname === '/register' || pathname === '/verify' ? (
                        <>
                          <button
                            onClick={() => router.push('/auth/signin')}
                            className="bg-[#ffe361] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                          >
                            Inloggen
                          </button>
                        </>
                      ) : pathname === '/auth/signin' ? (
                        <>
                          <button
                            onClick={() => router.push('/register')}
                            className="bg-[#ffe361] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                          >
                            Registreren
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => router.push('/auth/signin')}
                            className="text-gray-700 hover:text-black font-medium transition-colors"
                          >
                            Inloggen
                          </button>
                          <button
                            onClick={() => router.push('/onboarding')}
                            className="bg-[#ffe361] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                          >
                            Plaats woning
                          </button>
                        </>
                      )}
                    </div>
                  </>
                ) : user ? (
                  <>
                    {/* Desktop navigation for logged in users */}
                    <nav className="hidden md:flex items-center justify-center space-x-8 h-full flex-1">
                      <button
                        onClick={() => router.push('/dashboard')}
                        className={`text-gray-700 hover:text-black font-medium transition-colors ${pathname === '/dashboard' ? 'text-black' : ''}`}
                      >
                        Overzicht
                      </button>
                      <button
                        onClick={() => router.push('/search')}
                        className={`text-gray-700 hover:text-black font-medium transition-colors ${pathname === '/search' ? 'text-black' : ''}`}
                      >
                        Zoeken
                      </button>
                      <button
                        onClick={() => router.push('/favorites')}
                        className={`text-gray-700 hover:text-black font-medium transition-colors ${pathname === '/favorites' ? 'text-black' : ''}`}
                      >
                        Favorieten
                      </button>
                      <button
                        onClick={() => router.push('/messages')}
                        className={`text-gray-700 hover:text-black font-medium transition-colors ${pathname === '/messages' ? 'text-black' : ''}`}
                      >
                        Berichten
                      </button>
                    </nav>
                    
                    {/* Right side - notification bell and profile icon */}
                    <div className="hidden md:flex items-center space-x-4">
                      <button 
                        onClick={() => router.push('/notifications')}
                        className="relative cursor-pointer flex items-center justify-center h-10 w-10"
                      >
                        <div className="relative">
                          <Bell className="h-6 w-6 text-gray-600" />
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">3</span>
                        </div>
                      </button>
                      <button
                        onClick={toggleMenu}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#ffe361] flex items-center justify-center text-black font-semibold text-sm">
                          JJ
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-black flex items-center justify-center">
                          <Menu className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </div>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}

          {/* Mobile menu buttons - positioned at the end for right alignment */}
          {isPublicPage && (
            <div className="md:hidden flex items-center ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}

        </div>
      </header>

      {/* Mobile Menu Overlay - only for public pages */}
      {isMobileMenuOpen && isPublicPage && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden">
          <div className="fixed top-16 left-0 right-0 bg-white shadow-lg">
            <div className="p-4 space-y-4">
              <button
                onClick={() => handleMobileNavigation('/search')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Aanbod
              </button>
              <button
                onClick={() => handleMobileNavigation('/how-it-works')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hoe het werkt
              </button>
              <button
                onClick={() => handleMobileNavigation('/faq')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Veelgestelde vragen
              </button>
              <button
                onClick={() => handleMobileNavigation('/about')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Over woningruil
              </button>
              <div className="border-t pt-4 space-y-2">
                {pathname === '/register' || pathname === '/verify' ? (
                  <button
                    onClick={() => handleMobileNavigation('/auth/signin')}
                    className="block w-full text-left py-3 px-4 bg-[#ffe361] text-black rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                  >
                    Inloggen
                  </button>
                ) : pathname === '/auth/signin' ? (
                  <button
                    onClick={() => handleMobileNavigation('/register')}
                    className="block w-full text-left py-3 px-4 bg-[#ffe361] text-black rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                  >
                    Registreren
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleMobileNavigation('/auth/signin')}
                      className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Inloggen
                    </button>
                    <button
                      onClick={() => handleMobileNavigation('/onboarding')}
                      className="block w-full text-left py-3 px-4 bg-[#ffe361] text-black rounded-lg font-medium hover:bg-[#f5d95a] transition-colors"
                    >
                      Plaats woning
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Menu - Desktop */}
      <ProfileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slideContent={false}
      />
    </>
  );
}