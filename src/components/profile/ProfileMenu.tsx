"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  LogOut,
  Heart,
  HelpCircle,
  Settings,
  MessageSquare,
  Home,
  FileText,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

type ProfileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  slideContent?: boolean; // New prop to control if content should slide
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isOpen,
  onClose,
  slideContent = false,
}) => {
  // Sync with parent state
  useEffect(() => {
    // Only add body overflow hidden when using overlay mode (not slide mode)
    if (isOpen && !slideContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, slideContent]);

  const menuItems = [
    {
      title: "Mijn advertentie",
      icon: <Home size={20} />,
      href: "/profile/my-listings",
      progress: 67,
    },
    {
      title: "Upgrade naar Premium",
      icon: <Crown size={20} />,
      href: "/premium",
    },
    {
      title: "Help en support",
      icon: <HelpCircle size={20} />,
      href: "/help",
    },
    {
      title: "Nieuws en tips",
      icon: <FileText size={20} />,
      href: "/news",
    },
    {
      title: "Instellingen",
      icon: <Settings size={20} />,
      href: "/settings",
    },
  ];

  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(); // Call Firebase signOut from AuthContext
      router.push("/auth/signin"); // Redirect to sign-in page after logout
      onClose(); // Close the menu
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show an error message to the user
    }
  };

  if (slideContent) {
    // Slide mode - sidebar pushes content
    return (
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-auto border-l border-gray-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500">{item.icon}</div>
                <span>{item.title}</span>
              </div>

              {item.progress !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-primary-600 min-w-[32px]">
                    {item.progress}%
                  </span>
                </div>
              )}
            </Link>
          ))}

          {/* Logout button */}
          <button
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-red-500 w-full mt-2"
            // onClick={onClose}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Uitloggen</span>
          </button>
        </nav>
      </div>
    );
  }

  // Original overlay mode
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 inset-x-0 md:right-0 md:left-auto md:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500">{item.icon}</div>
                <span>{item.title}</span>
              </div>

              {item.progress !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-primary-600 min-w-[32px]">
                    {item.progress}%
                  </span>
                </div>
              )}
            </Link>
          ))}

          {/* Logout button */}
          <button
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-red-500 w-full mt-2"
            // onClick={onClose}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Uitloggen</span>
          </button>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default ProfileMenu;
