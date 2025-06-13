"use client";

import Sidebar from "@/components/ui/sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <div className="p-4 lg:p-6 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
