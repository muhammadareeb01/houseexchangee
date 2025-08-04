"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Maximize2, Key, Home, ChevronLeft, ChevronRight, Heart, Eye, Calendar, User, Flag } from 'lucide-react';
import ContactAdvertiser from '@/components/property/ContactAdvertiser';
import FloatingContactButton from '@/components/property/FloatingContactButton';
import MessageModal from '@/components/property/MessageModal';

// Sample properties data (in a real app, you would fetch this from an API)
const properties = [
  {
    id: "my-listing-1",
    address: "Wilhelminastraat 32-B",
    location: "Amsterdam, Noord-Holland",
    price: 1350,
    rooms: 3,
    size: 72,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 95,
    features: ["Balkon", "Lift", "Nieuwbouw"],
    description: "Prachtig appartement in het hart van Amsterdam. Deze moderne woning beschikt over 3 ruime kamers, een groot balkon en ligt op een toplocatie. Perfect voor wie midden in de stad wil wonen met alle voorzieningen binnen handbereik. De woning is recent gerenoveerd en instapklaar.",
    available: "Direct beschikbaar",
    energyLabel: "A",
    views: 425,
    advertiser: "Sanne (jij)",
    publishDate: "15-11-2024",
    amenities: ["Balkon", "Lift", "nearShops", "nearTransport", "Internet", "Parkeerplek"],
    neighborhood: ["Basisschool", "Bushalte", "Kinderdagopvang", "Apotheek", "Supermarkt"],
    location_details: ["In het centrum", "Aan drukke weg", "In woonwijk"]
  },
  {
    id: "1",
    address: "Wilhelminastraat 32-B",
    location: "Amsterdam, Noord-Holland",
    price: 1350,
    rooms: 3,
    size: 72,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 92,
    features: ["Balkon", "Lift", "Nieuwbouw"],
    description: "Dit moderne appartement bevindt zich in het centrum van Amsterdam. Het beschikt over een ruim balkon, lift toegang en is recent gebouwd. De woning heeft 3 kamers, waaronder 2 slaapkamers en een ruime woonkamer met open keuken. De badkamer is voorzien van een douche, toilet en wastafel. Daarnaast is er een separaat toilet. De woning is voorzien van alle gemakken en bevindt zich op een toplocatie.",
    available: "Direct beschikbaar",
    energyLabel: "A",
    views: 368,
    advertiser: 3,
    publishDate: "01-08-2024",
    amenities: ["Tuin", "Parkeerplek", "nearShops", "nearTransport", "Internet"],
    neighborhood: ["Basisschool", "Bushalte", "Kinderdagopvang", "Apotheek"],
    location_details: ["Aan drukke weg", "Aan het water", "In het centrum", "In woonwijk"]
  },
  {
    id: "2",
    address: "Herenstraat 14",
    location: "Utrecht, Utrecht",
    price: 1175,
    rooms: 2,
    size: 58,
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    ],
    type: "Studio",
    matchScore: 87,
    features: ["Dakterras", "Monumentaal pand", "Centrum"],
    description: "Dit prachtige monumentale pand is gelegen aan een van de mooiste grachten van Utrecht. Het studio appartement beschikt over een ruim dakterras met uitzicht over de stad. De woning heeft 2 kamers, waaronder een slaapkamer en een ruime woonkamer met open keuken. De badkamer is voorzien van een douche, toilet en wastafel. De woning is volledig gerenoveerd met behoud van authentieke details.",
    available: "Beschikbaar vanaf 1 juli 2023",
    energyLabel: "C",
    views: 245,
    advertiser: 2,
    publishDate: "28-07-2024",
    amenities: ["Dakterras", "Parkeerplek", "nearShops", "nearTransport", "Internet"],
    neighborhood: ["Basisschool", "Bushalte", "Kinderdagopvang", "Apotheek"],
    location_details: ["In het centrum", "In woonwijk"]
  },
  {
    id: "3",
    address: "Parkweg 55",
    location: "Rotterdam, Zuid-Holland",
    price: 1650,
    rooms: 4,
    size: 110,
    imageUrls: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Eengezinswoning",
    matchScore: 85,
    features: ["Tuin", "Nieuwbouw", "Garage"],
    description: "Deze ruime eengezinswoning in Rotterdam beschikt over 4 kamers en een prachtige tuin. De woning is recent gebouwd en heeft een garage. De woonkamer is ruim en licht met grote ramen en toegang tot de tuin. Er zijn 3 slaapkamers en een moderne badkamer. De keuken is volledig uitgerust met moderne apparatuur.",
    available: "Direct beschikbaar",
    energyLabel: "A+",
    views: 412,
    advertiser: 5,
    publishDate: "15-07-2024",
    amenities: ["Tuin", "Garage", "nearShops", "nearTransport", "Internet"],
    neighborhood: ["Basisschool", "Bushalte", "Kinderdagopvang", "Apotheek", "Supermarkt"],
    location_details: ["Aan het water", "In woonwijk"]
  },
  {
    id: "4",
    address: "Schoolstraat 27-A",
    location: "Den Haag, Zuid-Holland",
    price: 1225,
    rooms: 3,
    size: 68,
    imageUrls: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement",
    matchScore: 78,
    features: ["Balkon", "Gerenoveerd", "Centrum"],
    description: "Dit gerenoveerde appartement in het centrum van Den Haag heeft 3 kamers en een mooi balkon. De woning is volledig gerenoveerd en beschikt over moderne faciliteiten. Er zijn 2 slaapkamers en een lichte woonkamer. De badkamer is voorzien van een douche en wastafel, en er is een apart toilet.",
    available: "Beschikbaar vanaf 1 augustus 2023",
    energyLabel: "B",
    views: 198,
    advertiser: 1,
    publishDate: "20-07-2024",
    amenities: ["Balkon", "Parkeerplek", "nearShops", "nearTransport", "Internet"],
    neighborhood: ["Basisschool", "Bushalte", "Kinderdagopvang", "Apotheek"],
    location_details: ["In het centrum", "In woonwijk"]
  },
  // Add more properties as needed
];

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the property data from an API
    // For now, we'll find it in our sample data
    const foundProperty = properties.find(p => p.id === params.id);
    setProperty(foundProperty);
    setLoading(false);
  }, [params.id]);

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Woning niet gevonden</h1>
          <p className="text-gray-600 mb-6">De woning die je zoekt bestaat niet of is niet meer beschikbaar.</p>
          <button 
            onClick={() => router.push('/search')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Terug naar aanbod
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.imageUrls.length) % property.imageUrls.length);
  };

  const hasMultipleImages = property.imageUrls && property.imageUrls.length > 1;

  return (
    <div className="relative bg-gray-50">
      {/* Property Images - Full-width over hele scherm */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        {property.imageUrls && property.imageUrls.length > 0 && (
          <Image
            src={property.imageUrls[currentImageIndex]}
            alt={`Property at ${property.address} - image ${currentImageIndex + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setFavorite(!favorite)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white flex items-center justify-center"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              className={`${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>

        {hasMultipleImages && (
          <>
            <button 
              onClick={prevImage}
              className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white rounded-full shadow-md"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
              {property.imageUrls.map((imageUrl: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Property Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{property.address}</h1>
          <p className="text-gray-600">{property.location}</p>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 border-t border-gray-200 pt-2">
            <div className="flex items-center mr-4">
              <Eye size={14} className="mr-1" /> 
              <span>{property.views} keer bekeken</span>
            </div>
            <div className="flex items-center mr-4">
              <User size={14} className="mr-1" /> 
              <span>Advertentienr: {property.advertiser}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" /> 
              <span>Gepubliceerd: {property.publishDate}</span>
            </div>
          </div>
        </div>
        
        {/* Basic Property Info */}
        <div className="flex flex-wrap gap-6 py-4 border-y border-gray-200 mb-6">
          <div className="flex items-center">
            <Maximize2 size={16} className="mr-2 text-gray-500" /> 
            <span className="font-medium">{property.size} m²</span>
          </div>
          <div className="flex items-center">
            <Key size={16} className="mr-2 text-gray-500" /> 
            <span className="font-medium">{property.rooms} kamers</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">€ {property.price.toLocaleString('nl-NL')}/maand</span>
          </div>
        </div>
        
        {/* Contact Advertiser */}
        <div className="mb-6">
          <ContactAdvertiser 
            name="Thomas" 
            activeSince="15-03-2022" 
            profileImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            propertyAddress={property.address}
          />
        </div>
        
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">Omschrijving</h2>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </div>
        
        {/* Property Features */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">De woning</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
            <li>{property.type}</li>
            <li>{property.rooms} slaapkamers</li>
            <li>{property.size} m² woonoppervlak</li>
          </ul>
        </div>
        
        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">Voorzieningen</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
            {property.amenities.map((amenity: string, index: number) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        
        {/* Neighborhood */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">De buurt</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
            {property.neighborhood.map((item: string, index: number) => (
              <li key={index}>{item} (placeholder)</li>
            ))}
          </ul>
        </div>
        
        {/* Location Details */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">Ligging</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
            {property.location_details.map((item: string, index: number) => (
              <li key={index}>{item} (placeholder)</li>
            ))}
          </ul>
        </div>
        
        {/* Location Map */}
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-3">Locatie</h2>
          <p className="text-gray-700 mb-3">{property.address}, {property.location}</p>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Kaartintegratie hier (bijv. Google Maps / OpenStreetMap)</p>
          </div>
        </div>
        
        {/* Report Advertisement */}
        <div className="flex justify-center mb-8">
          <button className="flex items-center justify-center text-gray-500 text-sm hover:text-gray-700">
            <Flag size={14} className="mr-1" />
            <span>Deze advertentie rapporteren</span>
          </button>
        </div>
      </div>
      
      {/* Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        propertyAddress={property?.address || ''}
        advertiserName="Thomas"
      />
      
      {/* Floating Contact Button */}
      <FloatingContactButton onOpenModal={handleOpenMessageModal} />
    </div>
  );
} 