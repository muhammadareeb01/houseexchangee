"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import PropertyListingCard from "@/components/property/PropertyListingCard";
import PropertyCard from "@/components/search/PropertyCard";
import { Eye, Heart, MessageCircle, Star } from "lucide-react";

/**
 * Dashboard Page
 *
 * The main dashboard page that shows an overview of the user's activity and property matches.
 * Located at: src/app/dashboard/page.tsx
 *
 * Features:
 * - Overview statistics
 * - Recent activity
 * - Quick actions
 * - Property matches
 * - Profile completion status
 */

// Sample property data
const myProperty = {
  id: "5",
  address: "Musholm 262",
  location: "Hoofddorp, Haarlemmermeer",
  price: 656,
  rooms: 2,
  size: 45,
  imageUrl:
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  type: "Appartement",
  status: "Actief",
  completeness: 75,
  publishDate: "15 april 2023",
  inExchangeProcess: false,
};

// Sample new listings data
const newListings = [
  {
    id: "1",
    address: "Kerkstraat 123",
    location: "Amsterdam, Noord-Holland",
    price: 1200,
    rooms: 3,
    size: 75,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ],
    type: "Appartement",
    features: ["Balkon", "Lift"],
  },
  {
    id: "2",
    address: "Hoofdweg 45",
    location: "Rotterdam, Zuid-Holland",
    price: 950,
    rooms: 2,
    size: 60,
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ],
    type: "Studio",
    features: ["Dakterras"],
  },
  {
    id: "3",
    address: "Parkweg 78",
    location: "Utrecht, Utrecht",
    price: 1100,
    rooms: 4,
    size: 90,
    imageUrls: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ],
    type: "Huis",
    features: ["Tuin", "Garage"],
  },
  {
    id: "4",
    address: "Stationsweg 12",
    location: "Den Haag, Zuid-Holland",
    price: 850,
    rooms: 2,
    size: 55,
    imageUrls: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ],
    type: "Appartement",
    features: ["Centrum", "Monumentaal"],
  },
];

// Sample recent activity data
const recentActivity = [
  {
    id: 1,
    type: "view",
    property: "Musholm 262",
    time: "2 uur geleden",
    icon: Eye,
  },
  {
    id: 2,
    type: "favorite",
    property: "Kerkstraat 123",
    time: "5 uur geleden",
    icon: Heart,
  },
  {
    id: 3,
    type: "message",
    property: "Hoofdweg 45",
    time: "1 dag geleden",
    icon: MessageCircle,
  },
  {
    id: 4,
    type: "match",
    property: "Parkweg 78",
    time: "2 dagen geleden",
    icon: Star,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welkom terug, {user?.email || "Gebruiker"}
        </h1>
        <p className="text-gray-600 mt-1">
          Hier is een overzicht van je woningruil activiteiten
        </p>
      </div>

      {/* Your Property Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Jouw woning</h2>
        <PropertyListingCard
          property={myProperty}
          showActionButtons={true}
          onEditClick={() => (window.location.href = "/profile/my-listings")}
        />
      </div>

      {/* New Listings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Nieuw aanbod</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newListings.map((listing) => (
            <PropertyCard
              key={listing.id}
              id={listing.id}
              address={listing.address}
              location={listing.location}
              price={listing.price}
              rooms={listing.rooms}
              size={listing.size}
              imageUrls={listing.imageUrls}
              type={listing.type}
              features={listing.features}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recente activiteit</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                <activity.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.type === "view" && "Je woning is bekeken"}
                  {activity.type === "favorite" &&
                    "Je woning is toegevoegd aan favorieten"}
                  {activity.type === "message" &&
                    "Je hebt een nieuw bericht ontvangen"}
                  {activity.type === "match" && "Nieuwe match gevonden"}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.property} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
