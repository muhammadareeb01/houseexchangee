"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, MessageSquare, Menu, Bell } from 'lucide-react';
import ProfileMenu from '../profile/ProfileMenu';
import { useMenu } from '@/lib/contexts/MenuContext';

export default function Navigation() {
  const pathname = usePathname();
  const { isMenuOpen, setIsMenuOpen, toggleMenu } = useMenu();
  
  // Hide navigation on homepage and auth pages
  const isHomepage = pathname === '/';
  const isAuthPage = ['/auth/signin', '/auth/signup', '/register', '/verify'].includes(pathname);
  
  if (isHomepage || isAuthPage) {
    return null;
  }
  
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home className="h-6 w-6" /> },
    { name: 'Zoeken', path: '/search', icon: <Search className="h-6 w-6" /> },
    { name: 'Favorieten', path: '/favorites', icon: <Heart className="h-6 w-6" /> },
    { 
      name: 'Berichten', 
      path: '/messages', 
      icon: (
        <div className="relative">
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">2</span>
        </div>
      ) 
    },
  ];

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMenu();
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 md:hidden">
        <div className="flex justify-between items-center px-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex flex-col items-center py-2 px-3 ${
                pathname === item.path ? 'text-black' : 'text-gray-500'
              }`}
            >
              <div className={pathname === item.path ? 'text-black' : 'text-gray-500'}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          

          
          {/* Profile Button */}
          <button 
            onClick={handleToggleMenu}
            className="flex flex-col items-center py-2 px-3 text-gray-500"
          >
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-[#ffe361] flex items-center justify-center text-black font-semibold text-xs">
                JJ
              </div>
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-black flex items-center justify-center">
                <Menu className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </nav>
      
      {/* Profile Menu */}
      <ProfileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slideContent={false}
      />
    </>
  );
}
