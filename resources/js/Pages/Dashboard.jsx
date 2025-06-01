import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { DollarSign, User, Users } from 'lucide-react';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '5rem' : '16rem';

  // Fungsi logout tetap ada kalau mau dipakai di sidebar atau tempat lain
  function handleLogout(e) {
    e.preventDefault();
    router.post('/logout');
  }

  return (
    <>
      <Head title="Dashboard" />
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
              {/* Tombol Logout dihapus */}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-10 pt-24">
            <h1 className="text-3xl font-bold text-teal-800 mb-10 tracking-tight">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <DollarSign className="text-cyan-500" size={28} />,
                  title: 'Total Gaji',
                  desc: 'Rp 10.000.000',
                  border: 'border-cyan-400',
                },
                {
                  icon: <User className="text-teal-500" size={28} />,
                  title: 'Dosen Aktif',
                  desc: '15 Dosen',
                  border: 'border-teal-400',
                },
                {
                  icon: <Users className="text-emerald-500" size={28} />,
                  title: 'Pengguna',
                  desc: 'Admin & Dosen',
                  border: 'border-emerald-400',
                },
              ].map(({ icon, title, desc, border }, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 border-l-4 ${border}
                  transform transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg`}
                >
                  {icon}
                  <div>
                    <h2 className="text-md font-semibold text-teal-700">{title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
