"use client";

import React from 'react';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Jouw Favorieten</h1>
          <p className="text-blue-100">Bekijk je opgeslagen woningen</p>
        </div>
      </div>

    <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-600 mb-4">Je hebt nog geen woningen als favoriet gemarkeerd.</p>
        <p className="text-gray-500 text-sm">Klik op het hartje bij een woning om deze aan je favorieten toe te voegen.</p>
        </div>
      </div>
    </div>
  );
}
