import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { DollarSign, User, Users } from 'lucide-react';

export default function Dashboard({ totalDosen, totalDibayar, totalGaji }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '5rem' : '16rem';

  return (
    <>
      <Head title="Dashboard" />
      <div className="flex min-h-screen bg-gradient-to-tr from-cyan-100 via-white to-teal-50">
        <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out"
          style={{ marginLeft: sidebarWidth }}
        >
          <div
            className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-16 flex items-center justify-between px-6 transition-all duration-500 ease-in-out"
            style={{ marginLeft: sidebarWidth }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-teal-600 transition-colors">🔔</button>
              <button className="text-gray-600 hover:text-teal-600 transition-colors">⚙️</button>
            </div>
          </div>

          <main className="flex-1 p-10 pt-24">
            <h1 className="text-3xl font-bold text-teal-800 mb-10 tracking-tight">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <DollarSign className="text-cyan-500" size={28} />,
                  title: 'Total Gaji Dibayarkan',
                  desc: `Rp ${totalGaji.toLocaleString('id-ID')}`,
                  border: 'border-cyan-400',
                },
                {
                  icon: <User className="text-teal-500" size={28} />,
                  title: 'Total Dosen',
                  desc: `${totalDosen} Dosen`,
                  border: 'border-teal-400',
                },
                {
                  icon: <Users className="text-emerald-500" size={28} />,
                  title: 'Dosen Dibayar',
                  desc: `${totalDibayar} Dosen`,
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
