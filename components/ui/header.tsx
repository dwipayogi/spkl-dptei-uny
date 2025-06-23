"use client";

import { useState, useEffect } from "react";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

interface HeaderProps {
  username?: string;
  userRole?: string;
  avatarUrl?: string;
}

export default function Header({
  username = "Admin User",
  userRole = "Administrator",
  avatarUrl,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [realUserName, setRealUserName] = useState(username);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setRealUserName(data.user.name);
      } catch {
        // handle error if needed
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-sm px-6 py-2 flex items-center justify-end">
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white uppercase">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                username.charAt(0)
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700">
                {realUserName}
              </p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
              {" "}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold">{realUserName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="w-4 h-4 mr-2" /> Profil
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="w-4 h-4 mr-2" /> Pengaturan
              </a>
              <a
                href="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
              >
                <FiLogOut className="w-4 h-4 mr-2" /> Keluar
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
