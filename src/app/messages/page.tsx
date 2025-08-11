"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Search, MessageCircle, Users, Menu, Home, X, Check, MapPin, ChevronRight, Settings, HelpCircle, FileText, Star, LogOut, Bell, CheckCheck, Archive, Filter, Trash2, MessageSquareMore, Bed, Square } from 'lucide-react';
import PropertyMatchCard from '@/components/search/PropertyMatchCard';

export default function MessagesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'requests' | 'matches'>('inbox');
  const [subTab, setSubTab] = useState<'all' | 'unread'>('all');

  // Sample exchange requests data
  const [exchangeRequests, setExchangeRequests] = useState([
    {
      id: 'ex1',
      name: 'Maria van Dijk',
      property: 'Kerkstraat 45, Amsterdam',
      yourProperty: 'Musholm 262, Hoofddorp',
      status: 'pending',
      timestamp: '2 uur geleden',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      message: 'Hallo, ik ben geïnteresseerd in een woningruil met jouw woning. Mijn woning ligt centraal in Amsterdam en zou perfect zijn voor een ruil.',
      senderProperty: {
        type: 'Appartement',
        rooms: 2,
        size: '65m²',
        rent: '€1.400',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80'
      }
    },
    {
      id: 'ex2',
      name: 'Peter Janssen',
      property: 'Prinsengracht 123, Amsterdam',
      yourProperty: 'Musholm 262, Hoofddorp',
      status: 'accepted',
      timestamp: '1 dag geleden',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      message: 'Beste, ik zou graag mijn woning willen ruilen met jouw prachtige appartement. Laten we contact opnemen!',
      senderProperty: {
        type: 'Appartement',
        rooms: 3,
        size: '80m²',
        rent: '€1.350',
        imageUrl: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    }
  ]);

  // Sample conversations data
  const conversations = [
    {
      id: '1',
      name: 'Eva de Vries',
      lastMessage: 'Ja, dat klinkt goed! Zullen we dat doen?',
      timestamp: '10:30',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: true,
      property: 'Kerkstraat 12, Amsterdam',
      isRead: false,
      type: 'directe_ruil'
    },
    {
      id: '2',
      name: 'Mark Jansen',
      lastMessage: 'Ok, top! Ik stuur je later vandaag de details.',
      timestamp: 'Gisteren',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: false,
      property: 'Westersingel 55, Rotterdam',
      isRead: true,
      type: 'directe_ruil'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      lastMessage: 'Ik ben zeer geïnteresseerd in een bezichtiging.',
      timestamp: 'Gisteren',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: false,
      property: 'Jordaan 45, Amsterdam',
      isRead: false,
      type: 'directe_ruil'
    },
    {
      id: '4',
      name: 'Tom Bakker',
      lastMessage: 'Bedankt voor de info! Ik ga er over nadenken.',
      timestamp: '12:20',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: false,
      property: 'Vondelstraat 45, Amsterdam',
      isRead: true,
      type: 'directe_ruil'
    },
    {
      id: '5',
      name: 'Anna Smit',
      lastMessage: 'Wanneer kunnen we een afspraak maken?',
      timestamp: '2 dagen',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: false,
      property: 'Museumplein 7, Amsterdam',
      isRead: true,
      type: 'directe_ruil'
    },
    {
      id: '6',
      name: 'Robert de Wit',
      lastMessage: 'Bedankt voor de snelle reactie!',
      timestamp: '3 dagen',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      online: false,
      property: 'Leidsestraat 89, Amsterdam',
      isRead: true,
      type: 'directe_ruil'
    }
  ];

  // Sample matches data
  const matches = [
    {
      id: 'match1',
      name: 'Laura Meijer',
      location: 'Utrecht',
      matchPercentage: 85,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      address: 'Kerkstraat 45',
      propertyLocation: 'Utrecht, Utrecht',
      price: 450,
      rooms: 4,
      size: 85,
      imageUrls: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
      type: 'Appartement',
      features: ['Balkon', 'Nieuwbouw']
    },
    {
      id: 'match2',
      name: 'Emma de Vries',
      location: 'Amsterdam',
      matchPercentage: 92,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      address: 'Prinsengracht 123',
      propertyLocation: 'Amsterdam, Noord-Holland',
      price: 675,
      rooms: 5,
      size: 95,
      imageUrls: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
      type: 'Herenhuis',
      features: ['Grachten', 'Monumentaal']
    },
    {
      id: 'match3',
      name: 'Sophie van der Berg',
      location: 'Den Haag',
      matchPercentage: 78,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      address: 'Lange Voorhout 67',
      propertyLocation: 'Den Haag, Zuid-Holland',
      price: 385,
      rooms: 3,
      size: 72,
      imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
      type: 'Appartement',
      features: ['Centrum', 'Gerenoveerd']
    },
    {
      id: 'match4',
      name: 'Lisa Janssen',
      location: 'Rotterdam',
      matchPercentage: 88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      address: 'Westersingel 89',
      propertyLocation: 'Rotterdam, Zuid-Holland',
      price: 425,
      rooms: 4,
      size: 110,
      imageUrls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
      type: 'Rijwoning',
      features: ['Tuin', 'Garage']
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = subTab === 'all' || (subTab === 'unread' && conv.unread > 0);
    
    return matchesSearch && matchesTab;
  });

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  const handleAcceptRequest = (requestId: string) => {
    // Update the request status to accepted
    setExchangeRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted', timestamp: 'Zojuist geaccepteerd' }
          : req
      )
    );
    
    // Find the accepted request
    const acceptedRequest = exchangeRequests.find(req => req.id === requestId);
    if (acceptedRequest) {
      // In real app, this would:
      // 1. Create a new conversation with the requester
      // 2. Send notification to the requester
      // 3. Update database
      console.log('Accepting request from:', acceptedRequest.name);
      
      // Add to conversations (simulate creating a new chat)
      // This would normally be handled by the backend
      alert(`Ruilverzoek geaccepteerd! Je kunt nu chatten met ${acceptedRequest.name}.`);
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    // Remove the request from the list
    setExchangeRequests(prev => prev.filter(req => req.id !== requestId));
    
    // In real app, this would:
    // 1. Send notification to the requester about the decline
    // 2. Update database
    console.log('Declining request:', requestId);
    alert('Ruilverzoek afgewezen.');
  };

  const handleViewProperty = (property: string) => {
    // In real app, this would navigate to the property page
    console.log('Viewing property:', property);
    router.push('/property/1'); // Example navigation
  };

  const handleSendMessage = (matchId: string) => {
    // In real app, this would create a new conversation or navigate to existing one
    console.log('Sending message to match:', matchId);
    router.push(`/messages/${matchId}`);
  };

  const renderMatchesView = () => (
    <div className="bg-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Jouw matches</h2>
        <div className="space-y-6">
          {matches.map((match) => (
            <div key={match.id} className="relative">
              {/* Property Card with integrated CTA */}
              <PropertyMatchCard
                id={match.id}
                address={match.address}
                location={match.propertyLocation}
                price={match.price}
                rooms={match.rooms}
                size={match.size}
                imageUrls={match.imageUrls}
                type={match.type}
                features={match.features}
                matchPercentage={match.matchPercentage}
                userAvatar={match.avatar}
                userName={match.name}
                userLocation={match.location}
                onSendMessage={handleSendMessage}
              />
            </div>
          ))}
        </div>
        
        {matches.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg font-medium mb-2">Geen matches gevonden</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">Verbeter je profiel en voeg meer foto&apos;s toe om meer matches te krijgen</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">




      {/* Inbox Content */}
        <>
          {/* Search */}
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Zoeken..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Sub-tabs for Inbox */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSubTab('all')}
                className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-200 rounded-md text-sm ${
                  subTab === 'all' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Alle berichten
              </button>
              <button
                onClick={() => setSubTab('unread')}
                className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-200 rounded-md text-sm relative ${
                  subTab === 'unread' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Ongelezen
                {totalUnread > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {totalUnread}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="bg-white">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => router.push(`/messages/${conversation.id}`)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  index !== filteredConversations.length - 1 ? 'border-b border-gray-100' : ''
                } ${!conversation.isRead ? 'bg-gray-100' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {conversation.isGroup ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">3H</span>
                        </div>
                      ) : (
                        <Image
                          src={conversation.avatar}
                          alt={conversation.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {conversation.online && !conversation.isGroup && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Message content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {conversation.name}
                          </h3>
                        </div>
                        
                        {conversation.property && (
                          <p className="text-sm text-blue-600 mb-1">
                            {conversation.property}
                          </p>
                        )}

                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        {conversation.unread > 0 && (
                          <div className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm truncate ${
                      !conversation.isRead ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Geen berichten gevonden</p>
              </div>
            )}
          </div>
        </>
    </div>
  );
}