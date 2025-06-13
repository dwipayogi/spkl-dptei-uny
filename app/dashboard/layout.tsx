"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Track if the sidebar is collapsed for responsive layout
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check window width to determine initial sidebar state
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    checkWidth();

    // Add event listener for resizes
    window.addEventListener("resize", checkWidth);

    // Cleanup
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCollapseChange={setIsSidebarCollapsed} />
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <Header username="Admin SPKL" userRole="Administrator Sistem" />

        {/* Page Content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
