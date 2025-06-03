import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '5rem' : '16rem';

  function handleLogout(e) {
    e.preventDefault();
    router.post('/logout');
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-cyan-100 via-white to-teal-50">
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Navbar */}
        <div
          className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-16 flex items-center justify-between px-6 transition-all duration-500 ease-in-out"
          style={{ marginLeft: sidebarWidth }}
        >
          {/* Search left */}
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {/* Notification & Settings */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-teal-600 transition-colors">🔔</button>
            <button className="text-gray-600 hover:text-teal-600 transition-colors">⚙️</button>
            {/* Tombol Logout bisa diaktifkan kalau mau */}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-10 pt-24">{children}</main>
      </div>
    </div>
  );
}
