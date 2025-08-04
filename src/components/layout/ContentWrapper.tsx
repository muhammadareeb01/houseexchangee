"use client";

import React from 'react';
import { useMenu } from '@/lib/contexts/MenuContext';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export default ContentWrapper; 