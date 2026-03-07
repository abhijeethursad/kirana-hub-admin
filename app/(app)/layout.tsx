"use client"; 

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar"; 
import Header from "@/components/layout/header/Header"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out lg:ml-72">
        
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}