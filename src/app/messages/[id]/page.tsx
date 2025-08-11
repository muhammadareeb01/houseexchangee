"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  MoreVertical,
  Home,
  MapPin,
  Users,
  Calendar,
  Euro,
  RefreshCw,
  Flag
} from 'lucide-react';
import Image from 'next/image';
import ExchangeRequestModal from '@/components/exchange/ExchangeRequestModal';
import Link from 'next/link';

// Sample conversation data
const conversationData = {
  1: {
    name: "Thomas van der Berg",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    isOnline: true,
    lastSeen: "Nu online",
    property: {
      address: "Musholm 262, Hoofddorp",
      type: "Appartement",
      rooms: 3,
      size: "75m²",
      rent: "€1.250",
      available: "Direct beschikbaar",
      description: "Ruim 3-kamer appartement in rustige buurt van Hoofddorp. Volledig gerenoveerd met moderne keuken en badkamer.",
      preferences: {
        location: "Amsterdam, Utrecht, Den Haag",
        minRooms: 2,
        maxRent: "€1.400",
        type: "Appartement of woning"
      }
    },
    messages: [
      {
        id: 1,
        text: "Hoi! Ik ben geïnteresseerd in je woning in Hoofddorp.",
        timestamp: "14:30",
        isOwn: false,
        isRead: true,
        date: "Vandaag"
      },
      {
        id: 2,
        text: "Kunnen we een afspraak maken voor een bezichtiging?",
        timestamp: "14:31",
        isOwn: false,
        isRead: true,
        date: "Vandaag"
      },
      {
        id: 3,
        text: "Hallo Thomas! Leuk dat je interesse hebt. Natuurlijk kunnen we een afspraak maken.",
        timestamp: "14:45",
        isOwn: true,
        isRead: true,
        date: "Vandaag"
      },
      {
        id: 4,
        text: "Wanneer zou het jou uitkomen? Ik ben vrij dit weekend.",
        timestamp: "14:46",
        isOwn: true,
        isRead: true,
        date: "Vandaag"
      },
      {
        id: 5,
        text: "Perfect! Zaterdag om 15:00 zou mij goed uitkomen. Wat is het adres precies?",
        timestamp: "15:02",
        isOwn: false,
        isRead: false,
        date: "Vandaag"
      }
    ]
  }
};

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversationData[1]?.messages || []);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const conversation = conversationData[1]; // In real app, use params.id

  // Your property data (in real app, this would come from user's profile/database)
  const yourProperty = {
    address: "Wilhelminastraat 32-B, Amsterdam",
    type: "Appartement",
    rooms: 3,
    size: "72m²",
    rent: "€1.350",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRead: false,
        date: "Vandaag"
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate typing indicator and response
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          text: "Bedankt voor je bericht! Ik kom zo snel mogelijk bij je terug.",
          timestamp: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          isRead: false,
          date: "Vandaag"
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendExchangeRequest = () => {
    setShowExchangeModal(true);
  };

  const handleExchangeRequestSend = (message: string) => {
    console.log('Exchange request sent with message:', message);
    // In real app, this would:
    // 1. Send the request to the backend
    // 2. Create a notification for the recipient
    // 3. Add to the recipient's ruilverzoeken list
    // 4. Show success message to sender
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Conversatie niet gevonden</h2>
          <button 
            onClick={() => router.push('/messages')}
            className="text-blue-600 hover:text-blue-700"
          >
            Terug naar berichten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-30 bg-black text-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.back()}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div>
                  <h1 className="font-semibold">{conversation.name}</h1>
                  <p className="text-gray-300 text-sm">
                    {conversation.property.address}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <MoreVertical size={20} />
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 whitespace-nowrap">
                  <div className="py-2">
                    <Link 
                      href={`/property/1`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Home size={16} className="mr-3" />
                      Bekijk advertentie
                    </Link>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // Handle block conversation
                        setShowDropdown(false);
                      }}
                    >
                      <Users size={16} className="mr-3" />
                      Blokkeer conversatie
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // Handle report user
                        setShowDropdown(false);
                      }}
                    >
                      <Flag size={16} className="mr-3" />
                      Gebruiker rapporteren
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        // Handle remove from list
                        setShowDropdown(false);
                        router.push('/messages');
                      }}
                    >
                      <RefreshCw size={16} className="mr-3" />
                      Verwijder uit lijst
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((msg, index) => {
          const showDate = index === 0 || messages[index - 1].date !== msg.date;
          
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {msg.date}
                  </span>
                </div>
              )}
              
              <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-gray-800 text-white rounded-br-md'
                        : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                    msg.isOwn ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.isOwn && (
                      <>
                        {msg.isRead ? (
                          <CheckCheck size={14} className="text-gray-400" />
                        ) : (
                          <Check size={14} className="text-gray-400" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>



      {/* Message Input - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="flex items-end gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Typ een bericht..."
              className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:bg-white transition-colors"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile size={18} />
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-colors ${
              message.trim()
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Exchange Request Modal */}
      <ExchangeRequestModal
        isOpen={showExchangeModal}
        onClose={() => setShowExchangeModal(false)}
        onSend={handleExchangeRequestSend}
        targetUser={{
          name: conversation.name,
          avatar: conversation.avatar,
          property: {
            address: conversation.property.address,
            type: conversation.property.type,
            rooms: conversation.property.rooms,
            size: conversation.property.size,
            rent: conversation.property.rent,
            imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
          }
        }}
        yourProperty={yourProperty}
      />
    </div>
  );
} 