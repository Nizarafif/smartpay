import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { DollarSign, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ totalDosen, totalDibayar, totalGaji, dosenDibayar = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '5rem' : '16rem';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 25px rgba(0,0,0,0.15)",
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: {
      scale: 0.95,
      transition: { type: 'spring', stiffness: 400, damping: 15 },
    },
  };

  return (
    <>
      <Head title="Dashboard" />
      <motion.div
        className="flex min-h-screen bg-gradient-to-tr from-cyan-100 via-white to-teal-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out"
          style={{ marginLeft: sidebarWidth }}
        >
          <motion.div
            className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-16 flex items-center justify-between px-6 transition-all duration-500 ease-in-out"
            style={{ marginLeft: sidebarWidth }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
          </motion.div>

          <main className="flex-1 p-10 pt-24">
            <motion.h1
              className="text-3xl font-bold text-teal-800 mb-10 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Dashboard
            </motion.h1>

            {/* Statistik */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
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
                <motion.div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 border-l-4 ${border} cursor-pointer`}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {icon}
                  <div>
                    <h2 className="text-md font-semibold text-teal-700">{title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabel Dosen Dibayar */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Dosen yang Sudah Dibayar</h2>
              {dosenDibayar.length === 0 ? (
                <p className="text-gray-500">Belum ada dosen yang dibayar.</p>
              ) : (
                <div className="overflow-auto rounded-lg shadow border">
                  <table className="min-w-full bg-white">
                    <thead className="bg-teal-100 text-teal-800">
                      <tr>
                        <th className="py-2 px-4 text-left">Nama</th>
                        <th className="py-2 px-4 text-left">NIDN</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Total Gaji</th>
                        <th className="py-2 px-4 text-left">Tanggal Bayar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dosenDibayar.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{item.dosen?.nama ?? '-'}</td>
                          <td className="py-2 px-4">{item.dosen?.nidn ?? '-'}</td>
                          <td className="py-2 px-4">{item.dosen?.email ?? '-'}</td>
                          <td className="py-2 px-4">Rp {Number(item.total_gaji).toLocaleString('id-ID')}</td>
                          <td className="py-2 px-4">
                            {new Date(item.tanggal_bayar).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </motion.div>
    </>
  );
}
