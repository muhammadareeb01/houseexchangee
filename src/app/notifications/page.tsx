"use client";

import React from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();

  // Sample notifications data
  const notifications = [
    {
      id: '1',
      type: 'new_property',
      message: 'Nieuwe woning beschikbaar in jouw zoekgebied',
      property: 'Kerkstraat 123, Amsterdam',
      timestamp: '2 uur geleden',
      isRead: false
    },
    {
      id: '2',
      type: 'match',
      message: 'Je hebt een nieuwe match!',
      property: 'Hoofdweg 45, Rotterdam',
      timestamp: '1 dag geleden',
      isRead: false
    },
    {
      id: '3',
      type: 'message',
      message: 'Je hebt een nieuw bericht ontvangen',
      property: 'Prinsengracht 67, Amsterdam',
      timestamp: '2 dagen geleden',
      isRead: true
    },
    {
      id: '4',
      type: 'favorite',
      message: 'Je woning is toegevoegd aan favorieten',
      property: 'Museumplein 12, Amsterdam',
      timestamp: '3 dagen geleden',
      isRead: true
    },
    {
      id: '5',
      type: 'view',
      message: 'Je woning is bekeken',
      property: 'Vondelstraat 89, Amsterdam',
      timestamp: '1 week geleden',
      isRead: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Notificaties</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 ${!notification.isRead ? 'bg-gray-100' : ''}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">
                  {notification.message}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {notification.property}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.timestamp}
                </p>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            {/* Bell Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                <Bell className="w-10 h-10 text-black" />
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-black mb-3">
              Nog geen notificaties
            </h2>
            
            {/* Description */}
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              We zullen je op de hoogte houden wanneer er updates binnenkomen!
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 