"use client";

import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Save,
  Trash2,
  LogOut,
  Camera
} from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: "Jan Jansen",
    email: "jan.jansen@example.com",
    phone: "+31 6 12345678"
  });

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Instellingen</h1>
          <p className="text-gray-600">Beheer je account en voorkeuren</p>
        </div>

        <div className="space-y-6">
        
          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection('profile')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-black" size={20} />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold">Profiel</h2>
                  <p className="text-sm text-gray-600">Persoonlijke gegevens en foto</p>
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${activeSection === 'profile' ? 'rotate-90' : ''}`} 
              />
            </button>

            {activeSection === 'profile' && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white font-semibold text-xl overflow-hidden">
                      JJ
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-1.5 bg-black rounded-full text-white hover:bg-gray-800 transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium">Profielfoto</h3>
                    <p className="text-sm text-gray-600">JPG, PNG max 5MB</p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volledige naam</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>

                  <button className="w-full sm:w-auto bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Save size={16} />
                    Opslaan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection('security')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="text-green-600" size={20} />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold">Beveiliging</h2>
                  <p className="text-sm text-gray-600">Wachtwoord en tweefactorauthenticatie</p>
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${activeSection === 'security' ? 'rotate-90' : ''}`} 
              />
            </button>

            {activeSection === 'security' && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Huidig wachtwoord</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="Voer huidig wachtwoord in"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nieuw wachtwoord</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Minimaal 8 karakters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bevestig nieuw wachtwoord</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Herhaal nieuw wachtwoord"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">Tweefactorauthenticatie</h3>
                      <p className="text-sm text-blue-700">Extra beveiliging voor je account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <button className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Lock size={16} />
                  Wachtwoord wijzigen
                </button>
              </div>
            )}
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection('notifications')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bell className="text-purple-600" size={20} />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold">Notificaties</h2>
                  <p className="text-sm text-gray-600">Beheer je meldingen</p>
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${activeSection === 'notifications' ? 'rotate-90' : ''}`} 
              />
            </button>

            {activeSection === 'notifications' && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                {[
                  { key: 'email', label: 'Email notificaties', desc: 'Ontvang updates via email', icon: <Mail size={16} /> },
                  { key: 'push', label: 'Push notificaties', desc: 'Meldingen op je apparaat', icon: <Smartphone size={16} /> },
                  { key: 'sms', label: 'SMS berichten', desc: 'Belangrijke updates via SMS', icon: <Smartphone size={16} /> },
                  { key: 'marketing', label: 'Marketing emails', desc: 'Nieuws en aanbiedingen', icon: <Mail size={16} /> }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appearance Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection('appearance')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  {darkMode ? <Moon className="text-yellow-600" size={20} /> : <Sun className="text-yellow-600" size={20} />}
                </div>
                <div className="text-left">
                  <h2 className="font-semibold">Weergave</h2>
                  <p className="text-sm text-gray-600">Thema en taal instellingen</p>
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${activeSection === 'appearance' ? 'rotate-90' : ''}`} 
              />
            </button>

            {activeSection === 'appearance' && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500">
                      {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                    </div>
                    <div>
                      <h3 className="font-medium">Donkere modus</h3>
                      <p className="text-sm text-gray-600">Gebruik donker thema</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taal</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50">
                    <option value="nl">Nederlands</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection('payment')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <CreditCard className="text-indigo-600" size={20} />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold">Betaling & Abonnement</h2>
                  <p className="text-sm text-gray-600">Beheer je betalingsgegevens</p>
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${activeSection === 'payment' ? 'rotate-90' : ''}`} 
              />
            </button>

            {activeSection === 'payment' && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-1">Premium Abonnement</h3>
                  <p className="text-sm text-green-700 mb-2">Actief tot 15 december 2024</p>
                  <p className="text-xs text-green-600">€9,99/maand - Automatische verlenging</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Betalingsmethode wijzigen</h3>
                        <p className="text-sm text-gray-600">**** **** **** 1234</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </button>

                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Factuurgeschiedenis</h3>
                        <p className="text-sm text-gray-600">Bekijk alle facturen</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </button>

                  <button className="w-full p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Abonnement opzeggen</h3>
                        <p className="text-sm text-red-500">Beëindig je abonnement</p>
                      </div>
                      <ChevronRight size={16} className="text-red-400" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200">
            <div className="p-4">
              <h2 className="font-semibold text-red-600 mb-4">Gevaarlijke acties</h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-red-600 flex items-center gap-2">
                  <Trash2 size={16} />
                  Account verwijderen
                </button>
                
                <button className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 flex items-center gap-2">
                  <LogOut size={16} />
                  Uitloggen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 