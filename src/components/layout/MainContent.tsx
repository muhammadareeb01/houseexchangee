"use client";

import { usePathname } from 'next/navigation';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();
  
  // No bottom padding on homepage since navigation is hidden
  const paddingClass = pathname === '/' ? '' : 'pb-16';
  
  return (
    <main className={paddingClass}>
      {children}
    </main>
  );
} 