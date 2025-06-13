import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '5rem' : '16rem';

  return (
    <div className="flex min-h-screen transition-colors duration-300 bg-gradient-to-tr from-cyan-100 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

      {/* Main Area */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out bg-white dark:bg-gray-900"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Navbar */}
        <Navbar sidebarWidth={sidebarWidth} />

        {/* Page Content */}
        <main className="flex-1 p-10 pt-24 bg-white dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
