import React from 'react';

export default function MatchPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Jouw Matches</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <p className="text-blue-800">
          Hier zie je woningen die mogelijk een match zijn met jouw woonwensen.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Match listings will go here */}
        <div className="p-10 border rounded-lg flex items-center justify-center text-gray-400">
          Geen matches gevonden
        </div>
      </div>
    </div>
  );
} 