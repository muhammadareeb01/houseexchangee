"use client";

import { useRouter } from 'next/navigation';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Hoe het werkt', href: '/how-it-works' },
      { name: 'Veelgestelde vragen', href: '/faq' },
      { name: 'Over woningruil', href: '/about' },
      { name: 'Nieuws en tips', href: '/news' },
    ],
    support: [
      { name: 'Help & Support', href: '/help' },
      { name: 'Contact', href: 'mailto:info@mijnwoningruil.nl' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    company: [
      { name: 'Over ons', href: '/about' },
      { name: 'Vacatures', href: '/careers' },
      { name: 'Partners', href: '/partners' },
      { name: 'Blog', href: '/blog' },
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com/mijnwoningruil', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/mijnwoningruil', label: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com/mijnwoningruil', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/images/logos/logo.svg" 
                alt="Mijnwoningruil.nl" 
                className="h-8 mb-4 filter invert brightness-0"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              De grootste woningruil community van Nederland. 
              Vind je perfecte woningruil snel, veilig en gratis.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => router.push(link.href)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@mijnwoningruil.nl</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+31 (0)20 123 4567</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © {currentYear} Mijnwoningruil.nl. Alle rechten voorbehouden.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
