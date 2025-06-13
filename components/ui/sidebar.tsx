"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import {
  FiHome,
  FiTool,
  FiSettings,
  FiBarChart2,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useSidebar } from "@/contexts/sidebar-context";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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

export default function Sidebar() {
  const pathname = usePathname();
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobile,
    closeMobile,
  } = useSidebar();

  // Close mobile sidebar when route changes
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-lg rounded-lg"
      >
        {isMobileOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-64"} 
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          bg-white shadow-lg h-screen fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div
          className={`p-6 border-b border-gray-200 ${
            isCollapsed ? "px-4" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-uny.png"
                alt="Logo UNY"
                width={40}
                height={40}
                priority
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                    SPKL DPTEI
                  </h2>
                  <p className="text-xs text-gray-600 whitespace-nowrap">
                    ISO/IEC 17025:2017
                  </p>
                </div>
              )}
            </div>

            {/* Collapse Button - Only show on desktop */}
            <button
              onClick={toggleCollapse}
              className="hidden lg:block p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isCollapsed ? (
                <FiChevronRight className="w-4 h-4" />
              ) : (
                <FiChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <ul className={`space-y-2 ${isCollapsed ? "px-2" : "px-4"}`}>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isCollapsed ? "justify-center px-2" : ""}
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="overflow-hidden whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={`p-4 border-t border-gray-200 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <Link
            href="/"
            className={`
              flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200
              ${isCollapsed ? "justify-center px-2" : ""}
            `}
            title={isCollapsed ? "Keluar" : undefined}
          >
            <FiLogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="overflow-hidden whitespace-nowrap">Keluar</span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
