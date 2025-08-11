"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Settings, 
  BarChart2, 
  Power, 
  Trash2, 
  ChevronRight,
  Edit,
  MapPin,
  Home,
  Camera,
  X,
  ArrowLeft,
  ArrowRight,
  Upload,
  Star,
  Check,
  Square,
  Heart,
  Bed,
  Bath,
  Calendar,
  Eye,
  Rocket,
  Sparkles,
  Users,
  MessageCircle
} from 'lucide-react';
import PropertyListingCard from '@/components/property/PropertyListingCard';
import AdvertisementCompleteness from '@/components/property/AdvertisementCompleteness';

// Sample property data (would normally be fetched from API)
const myProperty = {
  id: "5",
  address: "Musholm 262",
  location: "Hoofddorp, Haarlemmermeer",
  price: 656,
  rooms: 2,
  size: 45,
  imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  type: "Appartement",
  status: "Actief",
  completeness: 75,
  publishDate: "15 april 2023",
  inExchangeProcess: false
};

export default function MyListingsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div></div>}>
      <MyListingsContent />
    </Suspense>
  );
}

function MyListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = useState(myProperty);
  const [showEditOptionsModal, setShowEditOptionsModal] = useState(false);
  const [currentEditStep, setCurrentEditStep] = useState<string | null>(null);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  
  // Track completed sections
  const [completedSections, setCompletedSections] = useState({
    adres: false,
    basisgegevens: false,
    woningdetails: false,
    fotos: false,
    ruilvoorkeuren: false,
    statistieken: false
  });

  // Check if all sections are completed
  const allSectionsCompleted = Object.values(completedSections).every(completed => completed);

  // Check for URL parameter to auto-open sidebar
  useEffect(() => {
    const editParam = searchParams?.get('edit');
    if (editParam === 'true') {
      setShowEditOptionsModal(true);
      // Clean up URL by removing the parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    postcode: '',
    huisnummer: '',
    straatnaam: '',
    plaats: '',
    typeWoning: '',
    etage: '',
    woonoppervlakte: '',
    aantalKamers: '',
    aantalSlaapkamers: '',
    huurprijs: '',
    beschrijving: '',
    // Individual checkbox states for backward compatibility
    balkon: false,
    tuin: false,
    dakterras: false,
    patio: false,
    balkonEnTuin: false,
    geenBuitenruimte: false,
    airconditioning: false,
    lift: false,
    bergingOpslag: false,
    zonnepanelen: false,
    eigenParkeerplaats: false,
    gemeenschappelijkeFietsenstalling: false,
    rolstoelvriendelijk: false,
    stadsverwarming: false,
    warmtepomp: false,
    zolder: false,
    centrum: false,
    buitenwijk: false,
    rustig: false,
    bruisend: false,
    gezinsvriendelijk: false,
    kindvriendelijk: false,
    veiligeBuurt: false,
    nabijWinkels: false,
    goedeOvVerbinding: false,
    nabijScholen: false,
    speelplaatsenInDeBuurt: false,
    kinderopvangInDeBuurt: false,
    nabijParkGroen: false,
    goedeVerbindingSnelweg: false,
    voldoendeParkeerGelegenheid: false,
    woningcorporatie: '',
    extraInformatie: '',
    // Array-based checkbox states
    buitenruimte: [] as string[],
    voorzieningen: [] as string[],
    buurt: [] as string[],
    locatie: [] as string[],
    ruilvoorkeurenData: {
      selectedLocations: [] as string[],
      minimumOppervlakte: '',
      maximumHuurprijs: '',
      minimumKamers: '',
      minimumSlaapkamers: '',
      woningtypen: [] as string[],
      extraWensen: ''
    }
  });
  
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState<number>(0);

  // Ruilvoorkeuren state
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Amsterdam', 'Rotterdam', 'Utrecht (stad)']);
  const [ruilvoorkeurenData, setRuilvoorkeurenData] = useState({
    provincie: '',
    minimaleWoonoppervlakte: '',
    maximaleHuurprijs: '',
    minimaalAantalKamers: '2 kamer(s) of meer',
    minimaalAantalSlaapkamers: 'Geen voorkeur',
    woningtypen: {
      appartement: true,
      eengezinswoning: false,
      vrijstaandeWoning: false,
      tweeOnderEenKap: false,
      tussenwoning: false,
      hoekwoning: false,
      studio: false,
      maisonnette: true,
      penthouse: false,
      bungalow: false,
      villa: false,
      boerderij: false,
      anders: false
    },
    overigeWensen: ''
  });
  
  // Toggle exchange process status
  const toggleExchangeProcess = () => {
    setProperty(prev => ({
      ...prev,
      inExchangeProcess: !prev.inExchangeProcess
    }));
  };
  
  // Handle improve advertisement click
  const handleImproveClick = (id: string) => {
    alert('Advertentie verbeteren functionaliteit komt binnenkort!');
  };

  // Handle edit button click from PropertyListingCard
  const handleEditClick = () => {
    setShowEditOptionsModal(true);
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, value: string | boolean) => {
    if (typeof value === 'string') {
      // Handle array-based checkboxes
      setFormData(prev => {
        const currentArray = prev[field as keyof typeof prev] as string[] || [];
        const isChecked = currentArray.includes(value);
        
        return {
          ...prev,
          [field]: isChecked 
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value]
        };
      });
    } else {
      // Handle individual boolean checkboxes
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPhotos = [...uploadedPhotos, ...newFiles];
      setUploadedPhotos(newPhotos);
      
      // Create preview URLs
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPhotoPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  // Handle photo deletion
  const handleDeletePhoto = (index: number) => {
    const newPhotos = uploadedPhotos.filter((_, i) => i !== index);
    const newUrls = photoPreviewUrls.filter((_, i) => i !== index);
    
    setUploadedPhotos(newPhotos);
    setPhotoPreviewUrls(newUrls);
    
    // Adjust main photo index if needed
    if (mainPhotoIndex >= index && mainPhotoIndex > 0) {
      setMainPhotoIndex(mainPhotoIndex - 1);
    }
  };

  // Handle main photo selection
  const handleSetMainPhoto = (index: number) => {
    setMainPhotoIndex(index);
  };

  // Handle ruilvoorkeuren input changes
  const handleRuilvoorkeurenInputChange = (field: string, value: string) => {
    setRuilvoorkeurenData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle woningtype checkbox changes
  const handleWoningtypeChange = (type: string, checked: boolean) => {
    setFormData(prev => {
      const currentTypes = prev.ruilvoorkeurenData.woningtypen || [];
      const isChecked = currentTypes.includes(type);
      
      return {
        ...prev,
        ruilvoorkeurenData: {
          ...prev.ruilvoorkeurenData,
          woningtypen: checked && !isChecked
            ? [...currentTypes, type]
            : !checked && isChecked
            ? currentTypes.filter(t => t !== type)
            : currentTypes
        }
      };
    });
  };

  // Handle location removal
  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(prev => prev.filter(loc => loc !== location));
  };

  // Handle location addition (placeholder function)
  const handleAddLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations(prev => [...prev, location]);
    }
  };

  // Handle edit option selection
  const handleEditOptionClick = (option: string) => {
    if (option === 'Adres') {
      setCurrentEditStep('Adres');
    } else if (option === 'Basisgegevens') {
      setCurrentEditStep('Basisgegevens');
    } else if (option === 'Woningdetails') {
      setCurrentEditStep('Woningdetails');
    } else if (option === "Foto's") {
      setCurrentEditStep("Foto's");
    } else if (option === 'Ruilvoorkeuren') {
      setCurrentEditStep('Ruilvoorkeuren');
    } else if (option === 'Statistieken') {
      setCurrentEditStep('Statistieken');
    } else {
      setShowEditOptionsModal(false);
      alert(`${option} bewerken functionaliteit komt binnenkort!`);
    }
  };

  // Handle back to options
  const handleBackToOptions = () => {
    setCurrentEditStep(null);
  };

  // Handle next step
  const handleNextStep = () => {
    // Save form data and go to next step
    alert('Volgende stap functionaliteit komt binnenkort!');
  };

  // Handle save section
  const handleSaveSection = (section: string) => {
    const sectionKey = section.toLowerCase().replace("'s", "s") as keyof typeof completedSections;
    const newCompletedSections = {
      ...completedSections,
      [sectionKey]: true
    };
    
    setCompletedSections(newCompletedSections);
    
    // Show success message
    alert(`${section} succesvol opgeslagen!`);
    
    // Go back to options
    setCurrentEditStep(null);
    
    // Check if all main sections are now completed (excluding Statistics)
    const mainSections = ['adres', 'basisgegevens', 'woningdetails', 'fotos', 'ruilvoorkeuren'];
    const allMainSectionsCompleted = mainSections.every(section => newCompletedSections[section as keyof typeof completedSections]);
    
    if (allMainSectionsCompleted) {
      // Close edit modal first
      setShowEditOptionsModal(false);
      // Show launch modal after a short delay
      setTimeout(() => {
        setShowLaunchModal(true);
      }, 500);
    }
  };

  // Close modal completely
  const closeModal = () => {
    setShowEditOptionsModal(false);
    setCurrentEditStep(null);
  };

  const editOptions = [
    { title: 'Adres', icon: <MapPin size={20} />, description: 'Wijzig adres en locatie gegevens' },
    { title: 'Basisgegevens', icon: <Home size={20} />, description: 'Huurprijs, kamers, oppervlakte en type' },
    { title: 'Woningdetails', icon: <Settings size={20} />, description: 'Beschrijving, voorzieningen en details' },
    { title: "Foto's", icon: <Camera size={20} />, description: 'Upload en beheer woningfoto\'s' },
    { title: 'Ruilvoorkeuren', icon: <Home size={20} />, description: 'Wijzig ruilvoorkeuren' },
    { title: 'Statistieken', icon: <BarChart2 size={20} />, description: 'Bekijk prestaties en statistieken' }
  ];

  const steps = [
    { number: 1, title: 'Adres', active: currentEditStep === 'Adres' },
    { number: 2, title: 'Basisgegevens', active: false },
    { number: 3, title: 'Woningdetails', active: false },
    { number: 4, title: "Foto's", active: false },
    { number: 5, title: 'Ruilvoorkeuren', active: false },
    { number: 6, title: 'Lancering', active: false }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Mijn Advertentie</h1>
        <p className="text-gray-600">Beheer hier je geplaatste advertentie.</p>
      </div>
      
      {/* Completeness Card */}
      <div className="mb-8">
        <AdvertisementCompleteness 
          completeness={property.completeness}
          propertyId={property.id}
          onImproveClick={handleImproveClick}
        />
      </div>
      
      {/* Property Card */}
      <div className="mb-8">
        <PropertyListingCard 
          property={property}
          showActionButtons={true}
          onToggleExchangeProcess={toggleExchangeProcess}
          onEditClick={handleEditClick}
          isOwnListing={true}
        />
      </div>
      
      {/* Management Options */}
      <div className="space-y-3">
        {/* Edit Advertisement */}
        <button 
          onClick={() => router.push('/profile/edit')} 
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            <Edit size={20} className="text-gray-500 mr-3" />
            <span className="font-medium">Mijn advertentie bewerken</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>

        {/* Edit Exchange Preferences */}
        <button 
          onClick={() => router.push('/profile/edit/ruilvoorkeuren')} 
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            <Heart size={20} className="text-gray-500 mr-3" />
            <span className="font-medium">Ruilvoorkeuren bewerken</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>

        
        {/* Deactivate */}
        <button 
          onClick={() => alert('Advertentie deactiveren')} 
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            <Power size={20} className="text-gray-500 mr-3" />
            <span className="font-medium">Advertentie deactiveren</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        {/* Delete */}
        <button 
          onClick={() => alert('Advertentie verwijderen')} 
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            <Trash2 size={20} className="text-red-500 mr-3" />
            <span className="font-medium text-red-500">Verwijder advertentie</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Edit Options Slider */}
      {showEditOptionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          {/* Background overlay */}
          <div 
            className="flex-1" 
            onClick={closeModal}
          ></div>
          
          {/* Slider panel */}
          <div 
            className="bg-white w-full max-w-lg h-full flex flex-col transform transition-transform duration-300 ease-in-out"
            style={{
              transform: showEditOptionsModal ? 'translateX(0)' : 'translateX(100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
              {currentEditStep ? (
                <button 
                  onClick={handleBackToOptions}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={20} className="mr-1" />
                  <span className="text-sm">Terug naar Mijn Advertenties</span>
                </button>
              ) : (
                <h3 className="text-lg font-semibold">Advertentie bewerken</h3>
              )}
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {!currentEditStep ? (
              /* Options List */
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  <button 
                    onClick={() => handleEditOptionClick('Adres')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {completedSections.adres ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-medium text-gray-900 block">Adres</span>
                      <span className="text-sm text-gray-500">Postcode, huisnummer, straat en plaats</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleEditOptionClick('Basisgegevens')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {completedSections.basisgegevens ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-medium text-gray-900 block">Basisgegevens</span>
                      <span className="text-sm text-gray-500">Type woning, kamers, oppervlakte en huur</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleEditOptionClick('Woningdetails')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {completedSections.woningdetails ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-medium text-gray-900 block">Woningdetails</span>
                      <span className="text-sm text-gray-500">Voorzieningen, buitenruimte en locatie</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleEditOptionClick("Foto's")}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {completedSections.fotos ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-medium text-gray-900 block">Foto&apos;s</span>
                      <span className="text-sm text-gray-500">Upload en beheer woningfoto&apos;s</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleEditOptionClick('Ruilvoorkeuren')}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {completedSections.ruilvoorkeuren ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-medium text-gray-900 block">Ruilvoorkeuren</span>
                      <span className="text-sm text-gray-500">Gewenste locaties en woningtypen</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              /* Step Form */
              <>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Statistieken Form */}
                  {currentEditStep === 'Statistieken' && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Advertentie Statistieken</h2>
                        <p className="text-sm text-gray-600">Bekijk hoe je advertentie presteert</p>
                      </div>

                      {/* Overview Cards */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600 font-medium">Totaal bekeken</p>
                              <p className="text-2xl font-bold text-blue-900">1,247</p>
                            </div>
                            <Eye size={24} className="text-blue-600" />
                          </div>
                          <p className="text-xs text-blue-600 mt-1">+12% deze week</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-600 font-medium">Favorieten</p>
                              <p className="text-2xl font-bold text-green-900">89</p>
                            </div>
                            <Heart size={24} className="text-green-600" />
                          </div>
                          <p className="text-xs text-green-600 mt-1">+5% deze week</p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-600 font-medium">Berichten</p>
                              <p className="text-2xl font-bold text-purple-900">23</p>
                            </div>
                            <MessageCircle size={24} className="text-purple-600" />
                          </div>
                          <p className="text-xs text-purple-600 mt-1">+3 nieuwe</p>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-orange-600 font-medium">Matches</p>
                              <p className="text-2xl font-bold text-orange-900">12</p>
                            </div>
                            <Users size={24} className="text-orange-600" />
                          </div>
                          <p className="text-xs text-orange-600 mt-1">Potentiële ruilen</p>
                        </div>
                      </div>

                      {/* Weekly Views Chart */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weergaven afgelopen 7 dagen</h3>
                        <div className="flex items-end justify-between h-32 space-x-2">
                          {[45, 62, 38, 71, 89, 56, 94].map((height, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div 
                                className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                                style={{ height: `${height}%` }}
                              ></div>
                              <span className="text-xs text-gray-500 mt-2">
                                {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'][index]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Demographics */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wie bekijkt je advertentie?</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Leeftijd 25-35</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Leeftijd 35-45</span>
                              <span className="font-medium">32%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Leeftijd 45+</span>
                              <span className="font-medium">23%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Top Locations */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interesse per locatie</h3>
                        
                        <div className="space-y-3">
                          {[
                            { city: 'Amsterdam', views: 342, percentage: 85 },
                            { city: 'Rotterdam', views: 198, percentage: 65 },
                            { city: 'Utrecht', views: 156, percentage: 45 },
                            { city: 'Den Haag', views: 89, percentage: 30 },
                            { city: 'Eindhoven', views: 67, percentage: 25 }
                          ].map((location, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                <MapPin size={16} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">{location.city}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${location.percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">{location.views}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Tips */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Tips om je advertentie te verbeteren</h3>
                        <ul className="space-y-2 text-sm text-yellow-700">
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>Voeg meer foto&apos;s toe om 23% meer weergaven te krijgen</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>Update je beschrijving met meer details over de buurt</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>Reageer sneller op berichten voor betere matches</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Address Form */}
                  {currentEditStep === 'Adres' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Adres van uw woning</h2>
                      <p className="text-gray-600 mb-6">Vul het adres van uw huidige woning in.</p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postcode <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.postcode}
                              onChange={(e) => handleInputChange('postcode', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              placeholder="1011AB"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Huisnummer <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.huisnummer}
                              onChange={(e) => handleInputChange('huisnummer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Straatnaam <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.straatnaam}
                            onChange={(e) => handleInputChange('straatnaam', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            placeholder="Voorbeeldstraat"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plaats <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.plaats}
                            onChange={(e) => handleInputChange('plaats', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            placeholder="Amsterdam"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Basisgegevens Form */}
                  {currentEditStep === 'Basisgegevens' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Basisgegevens van uw woning</h2>
                      <p className="text-gray-600 mb-6">Vul de belangrijkste informatie over uw huidige woning in.</p>

                      <div className="space-y-6">
                        {/* Type woning */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type woning <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.typeWoning}
                            onChange={(e) => handleInputChange('typeWoning', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                          >
                            <option value="Appartement">Appartement</option>
                            <option value="Eengezinswoning">Eengezinswoning</option>
                            <option value="Studio">Studio</option>
                            <option value="Penthouse">Penthouse</option>
                          </select>
                          <p className="text-sm text-gray-500 mt-1">Een appartement in een groter complex</p>
                        </div>

                        {/* Etage */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Etage
                          </label>
                          <select
                            value={formData.etage}
                            onChange={(e) => handleInputChange('etage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                          >
                            <option value="">Selecteer etage</option>
                            <option value="Begane grond">Begane grond</option>
                            <option value="1e verdieping">1e verdieping</option>
                            <option value="2e verdieping">2e verdieping</option>
                            <option value="3e verdieping">3e verdieping</option>
                            <option value="4e verdieping">4e verdieping</option>
                            <option value="5e verdieping of hoger">5e verdieping of hoger</option>
                          </select>
                        </div>

                        {/* Woonoppervlakte en Kamers */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Woonoppervlakte (m²) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={formData.woonoppervlakte}
                              onChange={(e) => handleInputChange('woonoppervlakte', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              placeholder="85"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Totaal aantal kamers <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={formData.aantalKamers}
                              onChange={(e) => handleInputChange('aantalKamers', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6+">6+</option>
                            </select>
                          </div>
                        </div>

                        {/* Slaapkamers en Huurprijs */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Aantal slaapkamers <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={formData.aantalSlaapkamers}
                              onChange={(e) => handleInputChange('aantalSlaapkamers', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            >
                              <option value="1 slaapkamer(s)">1 slaapkamer(s)</option>
                              <option value="2 slaapkamer(s)">2 slaapkamer(s)</option>
                              <option value="3 slaapkamer(s)">3 slaapkamer(s)</option>
                              <option value="4 slaapkamer(s)">4 slaapkamer(s)</option>
                              <option value="5+ slaapkamer(s)">5+ slaapkamer(s)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Huurprijs per maand (€) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              value={formData.huurprijs}
                              onChange={(e) => handleInputChange('huurprijs', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              placeholder="1500"
                            />
                          </div>
                        </div>

                        {/* Omschrijving */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Omschrijving van je woning <span className="text-red-500">*</span>
                            </label>
                            <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center">
                              <span className="mr-1">🤖</span>
                              AI Beschrijving maken
                            </button>
                          </div>
                          <textarea
                            value={formData.beschrijving}
                            onChange={(e) => handleInputChange('beschrijving', e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
                            placeholder="Een prachtig en ruim appartement in het hart van de stad..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Tip: Beschrijf de sfeer, indeling, bijzondere kenmerken en staat van de woning
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Woningdetails Form */}
                  {currentEditStep === 'Woningdetails' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Details van uw woning</h2>
                      <p className="text-gray-600 mb-6">Vertel meer over de specificaties van uw woning.</p>

                      <div className="space-y-8">
                        {/* Buitenruimte */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Buitenruimte <span className="text-sm text-gray-500 font-normal">(meerdere opties mogelijk)</span>
                          </h3>
                          <div className="flex flex-col space-y-2">
                            {[
                              'Balkon',
                              'Tuin',
                              'Dakterras',
                              'Terras',
                              'Loggia',
                              'Geen buitenruimte'
                            ].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  checked={formData.buitenruimte.includes(option)}
                                  onChange={(e) => handleCheckboxChange('buitenruimte', option)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Voorzieningen */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Voorzieningen <span className="text-sm text-gray-500 font-normal">(meerdere opties mogelijk)</span>
                          </h3>
                          <div className="flex flex-col space-y-2">
                            {[
                              'Airconditioning',
                              'Parkeerplaats',
                              'Lift',
                              'Berging',
                              'Kelder',
                              'Zolder',
                              'Garage',
                              'Zwembad',
                              'Sauna',
                              'Jacuzzi'
                            ].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  checked={formData.voorzieningen.includes(option)}
                                  onChange={(e) => handleCheckboxChange('voorzieningen', option)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Buurt */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Buurt <span className="text-sm text-gray-500 font-normal">(meerdere opties mogelijk)</span>
                          </h3>
                          <div className="flex flex-col space-y-2">
                            {[
                              'Centrum',
                              'Rustig',
                              'Gezinsvriendelijk',
                              'Studentenwijk',
                              'Multicultureel',
                              'Groen',
                              'Levendig'
                            ].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  checked={formData.buurt.includes(option)}
                                  onChange={(e) => handleCheckboxChange('buurt', option)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Ligging */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Ligging <span className="text-sm text-gray-500 font-normal">(meerdere opties mogelijk)</span>
                          </h3>
                          <div className="flex flex-col space-y-2">
                            {[
                              'Nabij winkels',
                              'Nabij scholen',
                              'Nabij openbaar vervoer',
                              'Nabij snelweg',
                              'Nabij park',
                              'Nabij water',
                              'Nabij uitgaansleven',
                              'Nabij ziekenhuis'
                            ].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  checked={formData.locatie.includes(option)}
                                  onChange={(e) => handleCheckboxChange('locatie', option)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Woningcorporatie */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Woningcorporatie <span className="text-sm text-gray-500 font-normal">(optioneel)</span>
                          </label>
                          <select
                            value={formData.woningcorporatie}
                            onChange={(e) => handleInputChange('woningcorporatie', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                          >
                            <option value="">Selecteer woningcorporatie (indien van toepassing)</option>
                            <option value="Ymere">Ymere</option>
                            <option value="Rochdale">Rochdale</option>
                            <option value="de Alliantie">de Alliantie</option>
                            <option value="Eigen Haard">Eigen Haard</option>
                            <option value="Stadgenoot">Stadgenoot</option>
                            <option value="Woonzorg Nederland">Woonzorg Nederland</option>
                            <option value="Anders">Anders</option>
                          </select>
                          <p className="text-sm text-gray-500 mt-1">
                            Selecteer de woningcorporatie indien het een sociale huurwoning betreft
                          </p>
                        </div>

                        {/* Aanvullende informatie */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Aanvullende informatie <span className="text-sm text-gray-500 font-normal">(optioneel)</span>
                          </label>
                          <textarea
                            value={formData.extraInformatie}
                            onChange={(e) => handleInputChange('extraInformatie', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
                            placeholder="Overige relevante informatie over uw woning..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Vermeld hier eventuele bijzonderheden of aanvullende informatie over uw woning
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Foto's Form */}
                  {currentEditStep === "Foto's" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Foto&apos;s van uw woning</h2>
                      <p className="text-gray-600 mb-6">Upload hier duidelijke foto&apos;s van de binnen- en buitenkant.</p>

                      <div className="space-y-6">
                        {/* Upload Area */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Upload foto&apos;s
                          </label>
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-600 mb-2">
                                Klik om te uploaden of sleep een afbeelding hierheen
                              </p>
                              <p className="text-sm text-gray-500">
                                PNG, JPG of WEBP (MAX. 5MB)
                              </p>
                            </label>
                          </div>
                        </div>

                        {/* Photo Preview Grid */}
                        {photoPreviewUrls.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                              Geüploade foto&apos;s ({photoPreviewUrls.length})
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Klik op een foto om deze als hoofdfoto in te stellen. Sleep foto&apos;s om de volgorde te wijzigen.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {photoPreviewUrls.map((url, index) => (
                                <div
                                  key={index}
                                  className={`relative group rounded-lg overflow-hidden border-2 ${
                                    mainPhotoIndex === index 
                                      ? 'border-blue-500 ring-2 ring-blue-200' 
                                      : 'border-gray-200 hover:border-gray-300'
                                  } transition-all cursor-pointer`}
                                  onClick={() => handleSetMainPhoto(index)}
                                >
                                  {/* Main Photo Badge */}
                                  {mainPhotoIndex === index && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center z-10">
                                      <Star size={12} className="mr-1 fill-current" />
                                      Hoofdfoto
                                    </div>
                                  )}
                                  
                                  {/* Delete Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeletePhoto(index);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                                  >
                                    <X size={16} />
                                  </button>
                                  
                                  {/* Photo */}
                                  <div className="aspect-[4/3] bg-gray-100">
                                    <Image
                                      src={url}
                                      alt={`Foto ${index + 1}`}
                                      width={400}
                                      height={300}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  
                                  {/* Photo Info */}
                                  <div className="p-2 bg-white">
                                    <p className="text-sm text-gray-600">
                                      Foto {index + 1}
                                      {mainPhotoIndex === index && (
                                        <span className="text-blue-600 font-medium ml-1">
                                          (Hoofdfoto)
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Tips */}
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips voor goede foto&apos;s:</h4>
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Maak foto&apos;s bij daglicht voor de beste kwaliteit</li>
                                <li>• Toon alle kamers en de buitenkant van de woning</li>
                                <li>• Zorg voor een opgeruimde en schone woning</li>
                                <li>• Upload minimaal 5-10 foto&apos;s voor een complete indruk</li>
                              </ul>
                            </div>
                          </div>
                        )}
                        
                        {/* No Photos State */}
                        {photoPreviewUrls.length === 0 && (
                          <div className="text-center py-8">
                            <Camera size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">
                              Nog geen foto&apos;s geüpload. Upload je eerste foto&apos;s om te beginnen.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ruilvoorkeuren Form */}
                  {currentEditStep === 'Ruilvoorkeuren' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Ruilvoorkeuren Aanpassen</h2>
                      <p className="text-gray-600 mb-6">Geef aan waar u naar op zoek bent voor een geschikte woningruil.</p>

                      <div className="space-y-8">
                        {/* Gewenste Locaties */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Gewenste Locaties</h3>
                          
                          {/* Stap 1: Kies een Provincie */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Stap 1: Kies een Provincie
                            </label>
                            <select
                              value={ruilvoorkeurenData.provincie}
                              onChange={(e) => handleRuilvoorkeurenInputChange('provincie', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            >
                              <option value="">Selecteer een provincie</option>
                              <option value="Noord-Holland">Noord-Holland</option>
                              <option value="Zuid-Holland">Zuid-Holland</option>
                              <option value="Utrecht">Utrecht</option>
                              <option value="Noord-Brabant">Noord-Brabant</option>
                              <option value="Gelderland">Gelderland</option>
                              <option value="Overijssel">Overijssel</option>
                              <option value="Limburg">Limburg</option>
                              <option value="Zeeland">Zeeland</option>
                              <option value="Friesland">Friesland</option>
                              <option value="Groningen">Groningen</option>
                              <option value="Drenthe">Drenthe</option>
                              <option value="Flevoland">Flevoland</option>
                            </select>
                          </div>

                          {/* Geselecteerde locaties */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Geselecteerde locaties:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {selectedLocations.map((location, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                >
                                  {location}
                                  <button
                                    onClick={() => handleRemoveLocation(location)}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                  >
                                    <X size={14} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Minimum Vereisten */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Minimum Vereisten</h3>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimale woonoppervlakte (m²)
                              </label>
                              <input
                                type="text"
                                value={ruilvoorkeurenData.minimaleWoonoppervlakte}
                                onChange={(e) => handleRuilvoorkeurenInputChange('minimaleWoonoppervlakte', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder="Bijv. 50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Maximale huurprijs (€)
                              </label>
                              <input
                                type="text"
                                value={ruilvoorkeurenData.maximaleHuurprijs}
                                onChange={(e) => handleRuilvoorkeurenInputChange('maximaleHuurprijs', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                placeholder="Bijv. 1200"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimaal aantal kamers
                              </label>
                              <select
                                value={ruilvoorkeurenData.minimaalAantalKamers}
                                onChange={(e) => handleRuilvoorkeurenInputChange('minimaalAantalKamers', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              >
                                <option value="2 kamer(s) of meer">2 kamer(s) of meer</option>
                                <option value="3 kamer(s) of meer">3 kamer(s) of meer</option>
                                <option value="4 kamer(s) of meer">4 kamer(s) of meer</option>
                                <option value="5+ kamer(s)">5+ kamer(s)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimaal aantal slaapkamers
                              </label>
                              <select
                                value={ruilvoorkeurenData.minimaalAantalSlaapkamers}
                                onChange={(e) => handleRuilvoorkeurenInputChange('minimaalAantalSlaapkamers', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                              >
                                <option value="Geen voorkeur">Geen voorkeur</option>
                                <option value="1 slaapkamer(s)">1 slaapkamer(s)</option>
                                <option value="2 slaapkamer(s)">2 slaapkamer(s)</option>
                                <option value="3 slaapkamer(s)">3 slaapkamer(s)</option>
                                <option value="4+ slaapkamer(s)">4+ slaapkamer(s)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Gewenste Woningtypen */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Gewenste Woningtypen</h3>
                          <div className="space-y-6">
                            <div className="flex flex-col space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Appartement')}
                                  onChange={(e) => handleWoningtypeChange('Appartement', e.target.checked)}
                                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#ffe361]"
                                />
                                <span className="ml-2 text-sm text-gray-700">Appartement</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Eengezinswoning')}
                                  onChange={(e) => handleWoningtypeChange('Eengezinswoning', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Eengezinswoning</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Vrijstaande woning')}
                                  onChange={(e) => handleWoningtypeChange('Vrijstaande woning', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Vrijstaande woning</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Twee-onder-een-kap')}
                                  onChange={(e) => handleWoningtypeChange('Twee-onder-een-kap', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Twee-onder-een-kap</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Tussenwoning')}
                                  onChange={(e) => handleWoningtypeChange('Tussenwoning', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Tussenwoning</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Hoekwoning')}
                                  onChange={(e) => handleWoningtypeChange('Hoekwoning', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Hoekwoning</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Studio')}
                                  onChange={(e) => handleWoningtypeChange('Studio', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Studio</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Maisonnette')}
                                  onChange={(e) => handleWoningtypeChange('Maisonnette', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Maisonnette</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Penthouse')}
                                  onChange={(e) => handleWoningtypeChange('Penthouse', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Penthouse</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Bungalow')}
                                  onChange={(e) => handleWoningtypeChange('Bungalow', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Bungalow</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Villa')}
                                  onChange={(e) => handleWoningtypeChange('Villa', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Villa</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.ruilvoorkeurenData.woningtypen.includes('Boerderij')}
                                  onChange={(e) => handleWoningtypeChange('Boerderij', e.target.checked)}
                                  className="w-4 h-4 border-gray-300 rounded"
                                  style={{ accentColor: '#000000' }}
                                />
                                <span className="ml-2 text-sm text-gray-700">Boerderij</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Overige Wensen */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Overige Wensen
                          </label>
                          <textarea
                            value={ruilvoorkeurenData.overigeWensen}
                            onChange={(e) => handleRuilvoorkeurenInputChange('overigeWensen', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
                            placeholder="Beschrijf eventuele andere wensen voor uw ideale ruilwoning..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                  {currentEditStep === 'Statistieken' ? (
                    <button
                      onClick={closeModal}
                      className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      Sluiten
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveSection(currentEditStep || '')}
                      className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Opslaan
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Launch Modal */}
      {showLaunchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative overflow-hidden">
            {/* Background sparkles animation */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 animate-pulse">
                <Sparkles size={16} className="text-yellow-400" />
              </div>
              <div className="absolute top-8 right-6 animate-pulse delay-300">
                <Sparkles size={12} className="text-blue-400" />
              </div>
              <div className="absolute bottom-12 left-8 animate-pulse delay-500">
                <Sparkles size={14} className="text-green-400" />
              </div>
              <div className="absolute bottom-6 right-4 animate-pulse delay-700">
                <Sparkles size={18} className="text-purple-400" />
              </div>
              <div className="absolute top-1/2 left-6 animate-pulse delay-1000">
                <Sparkles size={10} className="text-pink-400" />
              </div>
              <div className="absolute top-1/3 right-8 animate-pulse delay-1200">
                <Sparkles size={16} className="text-orange-400" />
              </div>
            </div>

            {/* Rocket animation */}
            <div className="mb-6 relative text-center">
              <div className="inline-block animate-bounce">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Rocket size={32} className="text-white transform rotate-45" />
                </div>
              </div>
              
              {/* Rocket trail effect */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full animate-pulse opacity-70"></div>
              </div>
            </div>

            {/* Success message */}
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">
              🎉 Bedankt voor het invullen van je profiel!
            </h2>
            
            <p className="text-gray-700 mb-6 text-left">
              Je woning is succesvol aangemeld – we doen nu nog een snelle controle om alles netjes en compleet te houden.
            </p>

            <div className="text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Wat gebeurt er nu?</h3>
              <p className="text-gray-700 mb-6">
                Na goedkeuring wordt je woning automatisch gedeeld in onze Facebookgroep met 70.000+ actieve leden. Zo krijgt jouw woning direct de aandacht die het verdient!
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Wat kun je nu doen?</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Controleer of je foto&apos;s en omschrijving helemaal kloppen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Deel je woninglink alvast met je eigen netwerk</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Word lid van de Facebookgroep om reacties snel te zien</span>
                </li>
              </ul>

              <p className="text-gray-700 text-sm">
                Je ontvangt een bericht zodra je woning live staat. Bedankt dat je deel uitmaakt van onze woningruilcommunity!
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setShowLaunchModal(false);
                  alert('Je advertentie wordt geboost! 🚀');
                }}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>⚡</span>
                <span>Boost mijn advertentie</span>
              </button>

              <button
                onClick={() => setShowLaunchModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Nee, ik wil dit nu niet
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowLaunchModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 