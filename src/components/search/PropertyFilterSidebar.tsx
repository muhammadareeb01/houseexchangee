"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PropertyFilterSidebarProps {
  onFilterChange: (filters: any) => void;
  activeFilters: {
    searchText: string;
    rooms: [number, number];
    priceRange: [number, number];
    sizeRange: [number, number];
    features: string[];
    propertyTypes: string[];
    amenities: string[];
    neighborhoodFeatures: string[];
    locationFeatures: string[];
  };
  removeFilter: (type: string, value: string | number) => void;
  clearAllFilters: () => void;
}

const PropertyFilterSidebar = ({ 
  onFilterChange, 
  activeFilters, 
  removeFilter, 
  clearAllFilters 
}: PropertyFilterSidebarProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(activeFilters.features);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(activeFilters.amenities || []);
  const [selectedNeighborhoodFeatures, setSelectedNeighborhoodFeatures] = useState<string[]>(activeFilters.neighborhoodFeatures || []);
  const [selectedLocationFeatures, setSelectedLocationFeatures] = useState<string[]>(activeFilters.locationFeatures || []);
  const [minPrice, setMinPrice] = useState<string>(activeFilters.priceRange[0] > 0 ? activeFilters.priceRange[0].toString() : '');
  const [maxPrice, setMaxPrice] = useState<string>(activeFilters.priceRange[1] < 3000 ? activeFilters.priceRange[1].toString() : '');
  const [minSize, setMinSize] = useState<string>(activeFilters.sizeRange[0] > 0 ? activeFilters.sizeRange[0].toString() : '');
  const [maxSize, setMaxSize] = useState<string>(activeFilters.sizeRange[1] < 200 ? activeFilters.sizeRange[1].toString() : '');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('Alle woningtypes');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [totalRooms, setTotalRooms] = useState<string>('');
  
  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState({
    propertyType: true,
    price: true,
    surface: true,
    rooms: true,
    outdoor: false,
    amenities: false,
    neighborhood: false,
    location: false
  });

  // Synchronize local state with active filters
  useEffect(() => {
    setSelectedFeatures(activeFilters.features);
    setSelectedAmenities(activeFilters.amenities || []);
    setSelectedNeighborhoodFeatures(activeFilters.neighborhoodFeatures || []);
    setSelectedLocationFeatures(activeFilters.locationFeatures || []);
    setMinPrice(activeFilters.priceRange[0] > 0 ? activeFilters.priceRange[0].toString() : '');
    setMaxPrice(activeFilters.priceRange[1] < 3000 ? activeFilters.priceRange[1].toString() : '');
    setMinSize(activeFilters.sizeRange[0] > 0 ? activeFilters.sizeRange[0].toString() : '');
    setMaxSize(activeFilters.sizeRange[1] < 200 ? activeFilters.sizeRange[1].toString() : '');
  }, [activeFilters]);
  
  const handleFeatureToggle = (feature: string) => {
    let newFeatures;
    if (selectedFeatures.includes(feature)) {
      newFeatures = selectedFeatures.filter(f => f !== feature);
    } else {
      newFeatures = [...selectedFeatures, feature];
    }
    setSelectedFeatures(newFeatures);
    onFilterChange({ features: newFeatures });
  };

  const handleAmenityToggle = (amenity: string) => {
    let newAmenities;
    if (selectedAmenities.includes(amenity)) {
      newAmenities = selectedAmenities.filter(a => a !== amenity);
    } else {
      newAmenities = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(newAmenities);
    onFilterChange({ amenities: newAmenities });
  };

  const handleNeighborhoodToggle = (feature: string) => {
    let newFeatures;
    if (selectedNeighborhoodFeatures.includes(feature)) {
      newFeatures = selectedNeighborhoodFeatures.filter(f => f !== feature);
    } else {
      newFeatures = [...selectedNeighborhoodFeatures, feature];
    }
    setSelectedNeighborhoodFeatures(newFeatures);
    onFilterChange({ neighborhoodFeatures: newFeatures });
  };

  const handleLocationToggle = (feature: string) => {
    let newFeatures;
    if (selectedLocationFeatures.includes(feature)) {
      newFeatures = selectedLocationFeatures.filter(f => f !== feature);
    } else {
      newFeatures = [...selectedLocationFeatures, feature];
    }
    setSelectedLocationFeatures(newFeatures);
    onFilterChange({ locationFeatures: newFeatures });
  };
  
  const handlePropertyTypeChange = (type: string) => {
    setSelectedPropertyType(type);
    const propertyTypes = type === 'Alle woningtypes' ? [] : [type];
    onFilterChange({ propertyTypes });
  };
  
  const handlePriceChange = (value: string, type: 'min' | 'max') => {
    if (type === 'min') {
      setMinPrice(value);
      const numValue = value ? parseInt(value) : 0;
      onFilterChange({ priceRange: [numValue, maxPrice ? parseInt(maxPrice) : 3000] });
    } else {
      setMaxPrice(value);
      const numValue = value ? parseInt(value) : 3000;
      onFilterChange({ priceRange: [minPrice ? parseInt(minPrice) : 0, numValue] });
    }
  };
  
  const handleSizeChange = (value: string, type: 'min' | 'max') => {
    if (type === 'min') {
      setMinSize(value);
      const numValue = value ? parseInt(value) : 0;
      onFilterChange({ sizeRange: [numValue, maxSize ? parseInt(maxSize) : 200] });
    } else {
      setMaxSize(value);
      const numValue = value ? parseInt(value) : 200;
      onFilterChange({ sizeRange: [minSize ? parseInt(minSize) : 0, numValue] });
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const propertyTypes = [
    'Alle woningtypes',
    'Appartement',
    'Eengezinswoning', 
    'Tussenwoning',
    'Hoekwoning',
    'Vrijstaande woning',
    'Penthouse',
    'Studio',
    'Kamer'
  ];

  const outdoorFeatures = [
    { id: 'balcony', name: 'Balkon' },
    { id: 'garden', name: 'Tuin' },
    { id: 'terrace', name: 'Dakterras' },
    { id: 'patio', name: 'Patio' },
    { id: 'no_outdoor', name: 'Geen buitenruimte' }
  ];

  const amenities = [
    { id: 'elevator', name: 'Lift' },
    { id: 'storage', name: 'Berging' },
    { id: 'parking', name: 'Eigen parkeerplaats' },
    { id: 'wheelchair_accessible', name: 'Rolstoelvriendelijk' },
    { id: 'heat_pump', name: 'Warmtepomp' },
    { id: 'solar_panels', name: 'Zonnepanelen' },
    { id: 'bike_storage', name: 'Fietsenstalling' },
    { id: 'attic', name: 'Zolder' }
  ];

  const neighborhoodFeatures = [
    { id: 'city_center', name: 'Centrum' },
    { id: 'quiet', name: 'Rustig' },
    { id: 'family_friendly', name: 'Gezinsvriendelijk' },
    { id: 'safe', name: 'Veilige buurt' },
    { id: 'child_friendly', name: 'Kindvriendelijk' },
    { id: 'suburban', name: 'Buitenwijk' },
    { id: 'vibrant', name: 'Bruisend' }
  ];

  const locationFeatures = [
    { id: 'near_shops', name: 'Nabij winkels' },
    { id: 'near_schools', name: 'Nabij scholen' },
    { id: 'near_daycare', name: 'Kinderopvang' },
    { id: 'public_transport', name: 'OV-verbinding' },
    { id: 'near_park', name: 'Park/groen' },
    { id: 'near_highway', name: 'Snelweg' },
    { id: 'parking_available', name: 'Parkeergelegenheid' },
    { id: 'near_playground', name: 'Speelplaatsen' }
  ];

  const roomOptions = ['1', '2', '3', '4', '5', '6+'];

  return (
    <div className="bg-white">
      <div className="divide-y divide-gray-100">
        {/* Property Type Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('propertyType')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Woningtype</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.propertyType ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.propertyType && (
            <div className="mt-3">
              <select
                value={selectedPropertyType}
                onChange={(e) => handlePropertyTypeChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 font-medium"
                style={{ color: 'rgb(17 24 39 / var(--tw-text-opacity))' }}
              >
                {propertyTypes.map((type) => (
                  <option 
                    key={type} 
                    value={type}
                    style={type === 'Alle woningtypes' ? { color: 'rgb(17 24 39 / var(--tw-text-opacity))' } : {}}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Huurprijs per maand (€)</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.price && (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 opacity-60 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(e.target.value, 'min')}
                    placeholder="Bijv. 800"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 font-medium placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 opacity-60 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(e.target.value, 'max')}
                    placeholder="Bijv. 1500"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 font-medium placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Surface Area Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('surface')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Oppervlakte (m²)</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.surface ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.surface && (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 opacity-60 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={minSize}
                    onChange={(e) => handleSizeChange(e.target.value, 'min')}
                    placeholder="Bijv. 50"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 font-medium placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 opacity-60 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={maxSize}
                    onChange={(e) => handleSizeChange(e.target.value, 'max')}
                    placeholder="Bijv. 120"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 font-medium placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rooms Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('rooms')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Aantal kamers</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.rooms ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.rooms && (
            <div className="mt-3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 opacity-60 mb-2">Totaal aantal kamers</label>
                <div className="flex w-full gap-2">
                  {['1', '2', '3', '4', '5', '6+'].map(option => (
                    <button
                      key={option}
                      onClick={() => setTotalRooms(totalRooms === option ? '' : option)}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex-1 ${totalRooms === option 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 opacity-60 mb-2">Aantal slaapkamers</label>
                <div className="flex w-full gap-2">
                  {['1', '2', '3', '4', '5', '6+'].map(option => (
                    <button
                      key={option}
                      onClick={() => setBedrooms(bedrooms === option ? '' : option)}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex-1 ${bedrooms === option 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Outdoor Space Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('outdoor')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Buitenruimte</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.outdoor ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.outdoor && (
            <div className="mt-3 space-y-3">
              {outdoorFeatures.map((feature) => (
                <label key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: '#000000' }}
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                  />
                  <span className="ml-3 text-sm text-gray-700">{feature.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Amenities Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('amenities')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Voorzieningen</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.amenities ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.amenities && (
            <div className="mt-3 space-y-3">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: '#000000' }}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                  />
                  <span className="ml-3 text-sm text-gray-700">{amenity.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Neighborhood Features Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('neighborhood')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Buurtkenmerken</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.neighborhood ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.neighborhood && (
            <div className="mt-3 space-y-3">
              {neighborhoodFeatures.map((feature) => (
                <label key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: '#000000' }}
                    checked={selectedNeighborhoodFeatures.includes(feature.id)}
                    onChange={() => handleNeighborhoodToggle(feature.id)}
                  />
                  <span className="ml-3 text-sm text-gray-700">{feature.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location/Accessibility Section */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('location')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-base font-medium text-black">Ligging / bereikbaarheid</h4>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform ${expandedSections.location ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.location && (
            <div className="mt-3 space-y-3">
              {locationFeatures.map((feature) => (
                <label key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: '#000000' }}
                    checked={selectedLocationFeatures.includes(feature.id)}
                    onChange={() => handleLocationToggle(feature.id)}
                  />
                  <span className="ml-3 text-sm text-gray-700">{feature.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar; 