"use client";

import React, { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import FilterPanel from '@/components/search/FilterPanel';
import PropertyCard from '@/components/search/PropertyCard';
import FloatingFilterButton from '@/components/search/FloatingFilterButton';

// Sample property data
const sampleProperties = [
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
    type: "Appartement"
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
    type: "Studio"
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
    type: "Eengezinswoning"
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
    type: "Appartement"
  },
  {
    id: "5",
    address: "Markt 4",
    location: "Groningen, Groningen",
    price: 995,
    rooms: 2,
    size: 45,
    imageUrls: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=853&q=80"
    ],
    type: "Studio"
  },
  {
    id: "6",
    address: "Burgemeestersplein 10",
    location: "Eindhoven, Noord-Brabant",
    price: 1495,
    rooms: 3,
    size: 85,
    imageUrls: [
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement"
  },
  {
    id: "7",
    address: "Prinsengracht 184",
    location: "Amsterdam, Noord-Holland",
    price: 1850,
    rooms: 3,
    size: 92,
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement"
  },
  {
    id: "8",
    address: "Lindenlaan 22",
    location: "Haarlem, Noord-Holland",
    price: 1375,
    rooms: 2,
    size: 65,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    type: "Appartement"
  },
  {
    id: "9",
    address: "Zuidstraat 76",
    location: "Maastricht, Limburg",
    price: 1050,
    rooms: 2,
    size: 58,
    imageUrls: [
      "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Studio"
  },
  {
    id: "10",
    address: "Kerklaan 44",
    location: "Deventer, Overijssel",
    price: 1195,
    rooms: 3,
    size: 75,
    imageUrls: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
    ],
    type: "Eengezinswoning"
  },
  {
    id: "11",
    address: "Buitenhof 15",
    location: "Den Haag, Zuid-Holland",
    price: 1750,
    rooms: 4,
    size: 115,
    imageUrls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement"
  },
  {
    id: "12",
    address: "Pastoor Janssenstraat 8",
    location: "Tilburg, Noord-Brabant",
    price: 995,
    rooms: 2,
    size: 62,
    imageUrls: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    ],
    type: "Appartement"
  }
];

export default function SearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Aanbod</h1>
        <p className="text-gray-700">We hebben <span className="text-green-600 font-medium">20.234</span> huurwoningen voor je gevonden.</p>
      </div>
      <div id="search-container" className="mb-6">
        <SearchBar onFilterClick={handleFilterClick} />
      </div>
      <FilterPanel isOpenFromParent={isFilterOpen} setIsOpenFromParent={setIsFilterOpen} />
      <FloatingFilterButton onFilterClick={handleFilterClick} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleProperties.map(property => (
          <PropertyCard 
            key={property.id}
            id={property.id}
            address={property.address}
            location={property.location}
            price={property.price}
            rooms={property.rooms}
            size={property.size}
            imageUrls={property.imageUrls}
            type={property.type}
          />
        ))}
      </div>
    </div>
  );
}
