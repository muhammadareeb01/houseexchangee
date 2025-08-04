'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function PublicNavbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logos/logo.svg"
                alt="MijnWoningRuil"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/help"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Help
            </Link>
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Inloggen
            </Link>
            <Button
              as={Link}
              href="/register"
              variant="primary"
              className="ml-4"
            >
              Gratis aanmelden
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 