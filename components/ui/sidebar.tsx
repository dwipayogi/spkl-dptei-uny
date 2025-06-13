"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiSettings,
  FiBarChart2,
  FiUsers,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiTool,
} from "react-icons/fi";
import { IconType } from "react-icons";

interface SidebarItem {
  href: string;
  label: string;
  icon: IconType;
}

const sidebarItems: SidebarItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: FiHome,
  },
  {
    href: "/dashboard/laboratorium",
    label: "Laboratorium",
    icon: FiTool,
  },
  {
    href: "/dashboard/instrumen",
    label: "Instrumen",
    icon: FiSettings,
  },
  {
    href: "/dashboard/statistik",
    label: "Statistik",
    icon: FiBarChart2,
  },
  {
    href: "/dashboard/pengguna",
    label: "Pengguna",
    icon: FiUsers,
  },
];

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Function to check if screen is mobile size
    const checkIfMobile = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen);

      // Auto-collapse on mobile
      if (isMobileScreen) {
        setCollapsed(true);

        // Notify parent component if callback exists
        if (onCollapseChange) {
          onCollapseChange(true);
        }
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [onCollapseChange]);
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);

    // Notify parent component about the change if callback exists
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  return (
    <div
      className={`bg-white shadow-lg h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-14 bg-white p-1 rounded-full shadow-md text-gray-600 hover:text-blue-600 transition-colors"
      >
        {collapsed ? (
          <FiChevronRight className="h-4 w-4" />
        ) : (
          <FiChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Header */}
      <div
        className={`${
          collapsed ? "p-3" : "p-6"
        } border-gray-200 transition-all h-20 flex`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <Image
            src="/logo-uny.png"
            alt="Logo UNY"
            width={40}
            height={40}
            priority
          />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">SPKL DPTEI</h2>
              <p className="text-xs text-gray-600">ISO/IEC 17025:2017</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className={`${collapsed ? "space-y-4 px-2" : "space-y-2 px-4"}`}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href} className={collapsed ? "text-center" : ""}>
                <Link
                  href={item.href}
                  className={`flex ${
                    collapsed
                      ? "flex-col items-center justify-center py-2"
                      : "items-center space-x-3 px-4 py-3"
                  } rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`${collapsed ? "h-5 w-5 mb-1" : "h-5 w-5"}`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          href="/"
          className={`flex ${
            collapsed
              ? "flex-col items-center justify-center py-2"
              : "items-center space-x-3 px-4 py-3"
          } text-gray-700 hover:bg-gray-100 rounded-lg transition-colors`}
        >
          <FiLogOut className={`${collapsed ? "h-5 w-5 mb-1" : "h-5 w-5"}`} />
          {!collapsed && <span>Keluar</span>}
          {collapsed && <span className="text-[10px]">Exit</span>}
        </Link>
      </div>
    </div>
  );
}
