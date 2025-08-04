'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Upload, Camera, Check, MapPin, Info, ChevronRight, Search, Plus, X, Heart, CheckCircle, Facebook, Mail } from 'react-feather';

// Step interface for the onboarding process
interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Property type interface
interface PropertyType {
  id: string;
  name: string;
  description: string;
}

// Location interface
interface Location {
  id: string;
  name: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [postalCode, setPostalCode] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [formComplete, setFormComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Preference states
  const [noPreferences, setNoPreferences] = useState<boolean>(false);
  const [minSize, setMinSize] = useState<string>('');
  const [maxRent, setMaxRent] = useState<string>('');
  const [minBedrooms, setMinBedrooms] = useState<string>('');
  const [desiredPropertyTypes, setDesiredPropertyTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState<string>('');

  // Contact information states
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [joinFacebookGroup, setJoinFacebookGroup] = useState<boolean>(true);
  const [joinFacebookGroup2, setJoinFacebookGroup2] = useState<boolean>(true);
  const [joinEmailList, setJoinEmailList] = useState<boolean>(true);

  // Comprehensive property types
  const propertyTypes: PropertyType[] = [
    { id: 'apartment', name: 'Appartement', description: 'Een appartement in een groter complex' },
    { id: 'house', name: 'Eengezinswoning', description: 'Een vrijstaand of geschakeld huis' },
    { id: 'detached', name: 'Vrijstaande woning', description: 'Een vrijstaand huis' },
    { id: 'semi_detached', name: 'Twee-onder-een-kap', description: 'Een huis dat aan één zijde is verbonden met een ander huis' },
    { id: 'terraced', name: 'Tussenwoning', description: 'Een huis in een rij huizen' },
    { id: 'corner', name: 'Hoekwoning', description: 'Een huis op de hoek van een rij huizen' },
    { id: 'studio', name: 'Studio', description: 'Een compacte woonruimte met alles in één kamer' },
    { id: 'maisonette', name: 'Maisonnette', description: 'Een appartement met meerdere verdiepingen' },
    { id: 'penthouse', name: 'Penthouse', description: 'Een luxe appartement op de bovenste verdieping' },
    { id: 'bungalow', name: 'Bungalow', description: 'Een huis met alle vertrekken op de begane grond' },
    { id: 'villa', name: 'Villa', description: 'Een vrijstaand luxe huis' },
    { id: 'farmhouse', name: 'Boerderij', description: 'Een woning op het platteland, mogelijk met land' },
    { id: 'other', name: 'Anders', description: 'Een ander type woning' },
  ];

  // Floor options for apartments
  const floorOptions = [
    { value: 'ground', label: 'Begane grond' },
    { value: '1', label: '1e verdieping' },
    { value: '2', label: '2e verdieping' },
    { value: '3', label: '3e verdieping' },
    { value: '4', label: '4e verdieping' },
    { value: '5', label: '5e verdieping' },
    { value: '6+', label: '6e verdieping of hoger' },
  ];

  // Popular locations
  const popularLocations: Location[] = [
    { id: 'amsterdam', name: 'Amsterdam' },
    { id: 'rotterdam', name: 'Rotterdam' },
    { id: 'utrecht', name: 'Utrecht' },
    { id: 'den-haag', name: 'Den Haag' },
    { id: 'eindhoven', name: 'Eindhoven' },
    { id: 'groningen', name: 'Groningen' },
    { id: 'tilburg', name: 'Tilburg' },
    { id: 'almere', name: 'Almere' },
    { id: 'breda', name: 'Breda' },
    { id: 'nijmegen', name: 'Nijmegen' },
  ];

  // Steps for the onboarding process
  const steps: OnboardingStep[] = [
    {
      id: 'address',
      title: 'Adres',
      description: 'Voer je postcode en huisnummer in',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      id: 'type',
      title: 'Woninggegevens',
      description: 'Informatie over jouw woning',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 'preferences',
      title: 'Wensen',
      description: 'Waar zoek je naar',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Je contactgegevens',
      icon: <Info className="w-6 h-6" />
    },
    {
      id: 'success',
      title: 'Gelukt',
      description: 'Je woning is geplaatst',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  // Add a location
  const addLocation = () => {
    if (newLocation.trim() !== '' && !locations.some(loc => loc.name.toLowerCase() === newLocation.toLowerCase())) {
      const id = newLocation.toLowerCase().replace(/\s+/g, '-');
      setLocations([...locations, { id, name: newLocation }]);
      setNewLocation('');
    }
  };

  // Remove a location
  const removeLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  // Check if any preferences have been set
  const hasAnyPreferences = () => {
    return (
      minSize !== '' || 
      maxRent !== '' || 
      minBedrooms !== '' || 
      desiredPropertyTypes.length > 0 || 
      locations.length > 0
    );
  };

  // Toggle property type selection
  const togglePropertyType = (id: string) => {
    if (desiredPropertyTypes.includes(id)) {
      setDesiredPropertyTypes(desiredPropertyTypes.filter(type => type !== id));
    } else {
      setDesiredPropertyTypes([...desiredPropertyTypes, id]);
    }
  };

  // Handle checkbox change for no preferences
  const handleNoPreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setNoPreferences(isChecked);
    
    // If checked, clear all preference fields
    if (isChecked) {
      // Clear all preferences at once
      setMinSize('');
      setMaxRent('');
      setMinBedrooms('');
      setDesiredPropertyTypes([]);
      setLocations([]);
      setNewLocation('');
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      // If moving to the success step, show confetti
      if (currentStep === steps.length - 1) {
        setShowConfetti(true);
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to dashboard
      router.push('/dashboard');
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return postalCode !== '' && houseNumber !== '';
      case 2:
        // Check if all required fields are filled
        if (propertyType === '') return false;
        // If apartment is selected, floor is required
        if (propertyType === 'apartment' && floor === '') return false;
        // Check other required fields
        return size !== '' && bedrooms !== '' && price !== '';
      case 3:
        // If no preferences is checked, this step is valid
        if (noPreferences) return true;
        // Otherwise, consider it valid if at least one preference has been set
        return hasAnyPreferences();
      case 4:
        // Validate contact information
        const emailRegex = /^[^-\s@]+@[^-\s@]+\.[^-\s@]+$/;
        return (
          firstName !== '' && 
          lastName !== '' && 
          emailRegex.test(email) && 
          termsAccepted && 
          privacyAccepted
        );
      case 5:
        return true; // Success page is always valid
      default:
        return false;
    }
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    // In a real application, this would upload photos to a server
    // For demo purposes, we'll just simulate adding a photo
    setPhotos([...photos, `/placeholder-${photos.length + 1}.jpg`]);
  };

  // Handle address lookup
  const handleAddressLookup = useCallback(async () => {
    if (postalCode && houseNumber) {
      try {
        // Format the postal code (remove spaces)
        const formattedPostalCode = postalCode.replace(/\s+/g, '');
        
        // Make API request to OSM Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${formattedPostalCode}&country=Netherlands&addressdetails=1&format=json`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Get the first result
          const result = data[0];
          const addressData = result.address;
          
          // Extract street and city information
          const street = addressData.road || addressData.street || 'Onbekende straat';
          const city = addressData.city || addressData.town || addressData.village || 'Onbekende plaats';
          
          // Update the form fields
          setAddress(`${street} ${houseNumber}`);
          setCity(city);
        } else {
          // No results found - fallback
          setAddress(`Onbekende straat ${houseNumber}`);
          setCity('Onbekende plaats');
        }
      } catch (error) {
        console.error('Error looking up address:', error);
        // Fallback in case of API error
        setAddress(`Straatnaam ${houseNumber}`);
        setCity('Amsterdam');
      }
    }
  }, [postalCode, houseNumber]);

  // Auto-lookup address when both postcode and house number are entered
  useEffect(() => {
    if (postalCode && postalCode.length >= 6 && houseNumber && houseNumber.length > 0) {
      handleAddressLookup();
    }
  }, [postalCode, houseNumber, handleAddressLookup]);

  // Handle submit form at the final step
  const handleSubmitForm = () => {
    // Here you would typically submit the data to your backend
    // For this demo, we just show the success page
    setShowConfetti(true);
    setCurrentStep(5); // Go directly to success page
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Wat is je adres?</h2>
            <p className="text-base text-gray-700 mb-6">
              Voer je postcode en huisnummer in, dan vullen we de rest automatisch voor je in
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50"
                    placeholder="1234 AB"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    autoComplete="postal-code"
                  />
                </div>
                <div>
                  <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Huisnummer
                  </label>
                  <input
                    type="text"
                    id="houseNumber"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50"
                    placeholder="123"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    autoComplete="address-line2"
                  />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">We hebben deze gegevens gevonden:</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="foundAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Straatnaam
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="foundAddress"
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-gray-50"
                        placeholder="Vul eerst postcode en huisnummer in"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="foundCity" className="block text-sm font-medium text-gray-700 mb-1">
                      Plaats
                    </label>
                    <input
                      type="text"
                      id="foundCity"
                      className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-gray-50"
                      placeholder="Vul eerst postcode en huisnummer in"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!isStepValid()}
              className={`w-full py-4 rounded-lg font-medium text-center text-lg ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors`}
            >
              Volgende stap
              <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Woninggegevens</h2>
            <p className="text-base text-gray-700 mb-6">
              Vul de belangrijkste gegevens over jouw woning in
            </p>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type woning
                </label>
                <select
                  id="propertyType"
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Selecteer type woning</option>
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  {propertyType ? propertyTypes.find(type => type.id === propertyType)?.description : ''}
                </p>
              </div>
              
              {/* Floor selection for apartments */}
              {propertyType === 'apartment' && (
                <div>
                  <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                    Etage
                  </label>
                  <select
                    id="floor"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  >
                    <option value="">Selecteer etage</option>
                    {floorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Woonoppervlakte (m²)
                  </label>
                  <input
                    type="number"
                    id="size"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Bijv. 75"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Aantal slaapkamers
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Bijv. 2"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Huurprijs per maand (€)
                </label>
                <input
                  type="number"
                  id="price"
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Bijv. 950"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                />
              </div>
              </div>
              
            <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Button container */}
                  <button
                onClick={handlePreviousStep}
                className="w-full sm:w-auto flex-grow py-4 px-6 bg-white text-gray-700 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Terug
                  </button>
            <button
              onClick={handleNextStep}
              disabled={!isStepValid()}
                className={`w-full sm:w-auto flex-grow py-4 px-6 rounded-lg font-medium text-center text-lg ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              Volgende stap
              <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Jouw wensen</h2>
            <p className="text-base text-gray-700 mb-6">
              Wat zoek je in een nieuwe woning? Dit helpt ons de beste matches voor jou te vinden.
            </p>
            
            <div className="mb-6">
              <div className="checkbox-item flex items-center mb-5 hover:bg-gray-200 transition-colors">
                <input
                  id="noPreferences"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={noPreferences}
                  onChange={handleNoPreferencesChange}
                />
                <label htmlFor="noPreferences" className="ml-3 block text-base font-medium text-gray-700">
                  Ik heb geen specifieke voorkeuren voor mijn nieuwe woning
                </label>
              </div>
              
              {noPreferences && (
                <div className="mb-5 p-3 border-l-4 border-yellow-400 bg-yellow-50 text-sm text-yellow-800">
                  <p>
                    <strong>Tip:</strong> Het specificeren van wensen vergroot je kans op een geschikte match aanzienlijk. 
                    Als je specifieke wensen hebt, vink dan het vakje uit en geef aan waar je naar op zoek bent.
                  </p>
                </div>
              )}

              <div className={noPreferences ? 'opacity-50 pointer-events-none' : ''}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Kenmerken woning
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="minSize" className="block text-sm font-medium text-gray-700 mb-1">
                          Minimale woonoppervlakte (m²)
                        </label>
                        <input
                          type="number"
                          id="minSize"
                          className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Bijv. 50"
                          value={minSize}
                          onChange={(e) => setMinSize(e.target.value)}
                          min="0"
                          disabled={noPreferences}
                        />
                      </div>
                      <div>
                        <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700 mb-1">
                          Maximale huurprijs (€/maand)
                        </label>
                        <input
                          type="number"
                          id="maxRent"
                          className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Bijv. 1200"
                          value={maxRent}
                          onChange={(e) => setMaxRent(e.target.value)}
                          min="0"
                          disabled={noPreferences}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="minBedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                        Minimaal aantal slaapkamers
                      </label>
                      <input
                        type="number"
                        id="minBedrooms"
                        className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="Bijv. 2"
                        value={minBedrooms}
                        onChange={(e) => setMinBedrooms(e.target.value)}
                        min="0"
                        disabled={noPreferences}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Type woning
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Selecteer één of meerdere woningtypen waar je interesse in hebt
                    </p>
                    <div className="mb-3">
                      <label htmlFor="desiredPropertyTypes" className="block text-sm font-medium text-gray-700 mb-1">
                        Gewenste type woningen
                      </label>
                      <select
                        id="desiredPropertyTypes"
                        className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        value=""
                        onChange={(e) => {
                          if (e.target.value && !desiredPropertyTypes.includes(e.target.value)) {
                            setDesiredPropertyTypes([...desiredPropertyTypes, e.target.value]);
                          }
                        }}
                        disabled={noPreferences}
                      >
                        <option value="">Selecteer type woning</option>
                        {propertyTypes
                          .filter(type => !desiredPropertyTypes.includes(type.id))
                          .map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    
                    {desiredPropertyTypes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {desiredPropertyTypes.map(typeId => (
                          <div key={typeId} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1.5 text-sm flex items-center">
                            {propertyTypes.find(t => t.id === typeId)?.name || typeId}
                            <button 
                              onClick={() => setDesiredPropertyTypes(desiredPropertyTypes.filter(id => id !== typeId))}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              disabled={noPreferences}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Locaties
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Waar wil je graag wonen? Voeg meerdere locaties toe om je kansen te vergroten
                    </p>
                    
                    {/* Selected locations */}
                    {locations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {locations.map((location) => (
                          <div key={location.id} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1.5 text-sm flex items-center">
                            {location.name}
                            <button 
                              onClick={() => removeLocation(location.id)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              disabled={noPreferences}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Location input */}
                    <div className="flex mb-3">
                      <input
                        type="text"
                        placeholder="Voeg locatie toe (stad of wijk)"
                        className="px-4 py-3 border border-gray-300 rounded-l-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        disabled={noPreferences}
                        onKeyDown={(e) => e.key === 'Enter' && addLocation()}
                      />
                      <button
                        onClick={addLocation}
                        className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 flex items-center"
                        disabled={newLocation.trim() === '' || noPreferences}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Button container */}
              <button
                onClick={handlePreviousStep}
                className="w-full sm:w-auto flex-grow py-4 px-6 bg-white text-gray-700 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Terug
              </button>
            <button
              onClick={handleNextStep}
              disabled={!isStepValid()}
                className={`w-full sm:w-auto flex-grow py-4 px-6 rounded-lg font-medium text-center text-lg ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              Volgende stap
              <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contactgegevens</h2>
            <p className="text-base text-gray-700 mb-6">
              Vul je contactgegevens in zodat we je kunnen bereiken
            </p>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Voornaam
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Voornaam"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Achternaam
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="Achternaam"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-3 pt-3">
                <div className="checkbox-item flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAccepted"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                      Ik ga akkoord met de <Link href="#" className="text-blue-600 hover:underline">algemene voorwaarden</Link>
                    </label>
                  </div>
                </div>
                
                <div className="checkbox-item flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacyAccepted"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacyAccepted" className="font-medium text-gray-700">
                      Ik ga akkoord met het <Link href="#" className="text-blue-600 hover:underline">privacybeleid</Link>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Button container */}
              <button
                onClick={handlePreviousStep}
                className="w-full sm:w-auto flex-grow py-4 px-6 bg-white text-gray-700 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Terug
              </button>
            <button
              onClick={handleSubmitForm}
              disabled={!isStepValid()}
                className={`w-full sm:w-auto flex-grow py-4 px-6 rounded-lg font-medium text-center text-lg ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              Publiceren
              <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-left py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              <CheckCircle size={28} className="inline-block mr-2 align-bottom" /> Je woning is succesvol geplaatst!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Yes! Je advertentie staat nu live op MijnWoningruil.nl. Andere woningzoekers kunnen jouw woning nu vinden en contact met je opnemen voor een ruil.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Maar... je bent er nog niet helemaal.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md shadow-sm mb-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                <span className="text-2xl mr-2">🚀</span> Vergroot je kans – bereik 100.000 mensen
              </h3>
              <p className="text-gray-700 mb-4">
                Je advertentie is op dit moment nog niet zichtbaar in onze grote campagne (Facebookgroep, nieuwsbrief en socials).
                Waarom niet? Je profiel is nog niet volledig.
              </p>
              <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4">
                <p className="font-semibold"><span className="text-xl mr-1">🔒</span> Status: campagne gedeactiveerd</p>
                <p className="text-sm">👉 Profiel niet 100% ingevuld</p>
              </div>
              <p className="text-gray-700">
                Zodra je profiel compleet is, activeren wij automatisch je campagne. Je woning komt dan in beeld bij meer dan 100.000 woningzoekers – en dat betekent: meer kans op een succesvolle ruil.
              </p>
            </div>
            
            {/* Facebook Group Section 1 */}
            <div className="bg-white border border-gray-300 text-gray-800 rounded-lg p-3 mt-8 mb-[10px] opacity-70">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Facebook size={28} className="text-blue-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-shrink mr-2">
                    <h3 className="font-semibold text-base text-gray-800">Facebookgroep (hoofd)</h3>
                    <p className="text-xs text-gray-600">Val op bij <span className="font-bold text-gray-800">45.9k</span> woningruilers via onze grootste groep.</p>
                  </div>
                </div>
                <button
                  onClick={() => setJoinFacebookGroup(!joinFacebookGroup)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 bg-gray-400 cursor-not-allowed`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform shadow-md ${
                      joinFacebookGroup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Facebook Group Section 2 */}
            <div className="bg-white border border-gray-300 text-gray-800 rounded-lg p-3 mb-[10px] opacity-70">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Facebook size={28} className="text-blue-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-shrink mr-2">
                    <h3 className="font-semibold text-base text-gray-800">Facebookgroep (backup)</h3>
                    <p className="text-xs text-gray-600">Bereik <span className="font-bold text-gray-800">23.9k</span> extra woningzoekers in onze tweede groep.</p>
                  </div>
                </div>
                <button
                  onClick={() => setJoinFacebookGroup2(!joinFacebookGroup2)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 bg-gray-400 cursor-not-allowed`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform shadow-md ${
                      joinFacebookGroup2 ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {/* Email List Section */}
            <div className="bg-white border border-gray-300 text-gray-800 rounded-lg p-3 mb-8 opacity-70">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Mail size={28} className="text-purple-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-shrink mr-2">
                    <h3 className="font-semibold text-base text-gray-800">E-maillijst</h3>
                    <p className="text-xs text-gray-600">Word uitgelicht bij <span className="font-bold text-gray-800">40k</span> woningruilers via onze nieuwsbrief.</p>
                  </div>
                </div>
            <button
                  onClick={() => setJoinEmailList(!joinEmailList)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 bg-gray-400 cursor-not-allowed`}
            >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform shadow-md ${
                      joinEmailList ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
            </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Container for two CTAs */}
              <button
                onClick={() => router.push('/listing')} 
                className="w-full sm:w-auto flex-grow py-3 px-6 bg-white text-slate-700 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Naar aanbod
              </button>
              <button
                onClick={() => router.push('/account/ads')} 
                className="w-full sm:w-auto flex-grow py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Naar mijn advertentie
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // CSS fixes for text visibility in form fields
  const formStyles = `
    input, select, textarea {
      color: #111827;
      font-weight: 500;
      background-color: #f9fafb;
      border-color: #d1d5db;
    }
    
    input::placeholder, select::placeholder, textarea::placeholder {
      color: #6b7280;
      opacity: 0.9;
    }
    
    input:focus, select:focus, textarea:focus {
      border-color: #3B82F6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
      background-color: #ffffff;
    }
    
    select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    
    .form-field {
      border: 1px solid #d1d5db;
      background-color: #f9fafb;
      border-radius: 0.5rem;
    }
    
    .form-field:focus-within {
      border-color: #3B82F6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
    
    .checkbox-item {
      background-color: #f3f4f6;
      padding: 0.5rem;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
    }
  `;

  // Confetti component for success page
  const Confetti = () => {
    useEffect(() => {
      if (showConfetti) {
        // Clean up confetti after 5 seconds
        const timer = setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }, []);

    if (!showConfetti) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 150 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const color = [
            '#FDBB2D',
            '#22C55E',
            '#3B82F6',
            '#EC4899',
            '#A855F7',
            '#F97316'
          ][Math.floor(Math.random() * 6)];
          const left = `${Math.random() * 100}vw`;
          const animationDuration = `${Math.random() * 3 + 2}s`;
          const animationDelay = `${Math.random() * 0.5}s`;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left,
                top: '-20px',
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: '50%',
                animation: `confettiFall ${animationDuration} ease-in forwards ${animationDelay}`,
              }}
            />
          );
        })}
        <style jsx>{`
          @keyframes confettiFall {
            0% {
              transform: translateY(0) rotate(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {showConfetti && <Confetti />}
      
      <style jsx global>
        {formStyles}
      </style>
      
      {/* Header */}
      {currentStep < 5 && (
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2"></h1>
        <p className="text-gray-600"></p>
      </div>
      )}

      {/* Progress Steps - Show only if not on success page */}
      {currentStep < steps.length && (
        <div className="mb-8">
          <div className="flex relative">
            {/* Connecting lines first as background layer */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between z-0">
              <div className="w-full h-0.5 bg-gray-200 mx-auto">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ 
                    width: `${(Math.min(currentStep - 1, steps.length - 2) / (steps.length - 2)) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            
            {/* Step dots and labels in foreground */}
            <div className="grid grid-cols-4 w-full z-10">
              {steps.slice(0, steps.length - 1).map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      index + 1 <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } transition-colors duration-300`}
                  >
                    {index + 1 < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step Content - Added better defined border and background */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        {renderStepContent()}
      </div>
    </div>
  );
} 