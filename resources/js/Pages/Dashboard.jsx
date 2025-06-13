import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { DollarSign, User, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/Pages/DashboardLayout';

export default function Dashboard({ totalDosen = 0, totalDibayar = 0, totalGaji = 0, dosenDibayar = [] }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: 'beforeChildren' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 15px 25px rgba(0,0,0,0.15)',
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: {
      scale: 0.95,
      transition: { type: 'spring', stiffness: 400, damping: 15 },
    },
  };

  const filteredDosen = dosenDibayar.filter((item) =>
    item.dosen?.nama?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Dashboard" />
      <DashboardLayout
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-teal-800 mb-10 tracking-tight">Dashboard</h1>

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
                    desc: `Rp ${Number(totalGaji).toLocaleString('id-ID')}`,
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
            </motion.div>
          )}

          {activeTab === 'riwayat' && (
            <motion.div
              key="riwayat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-teal-700 mb-6">Riwayat Pembayaran</h2>

              {filteredDosen.length === 0 ? (
                <p className="text-gray-500">Tidak ada data dosen ditemukan.</p>
              ) : (
                <div className="overflow-auto rounded-lg shadow border max-h-[400px]">
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
                      {filteredDosen.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{item.dosen?.nama ?? '-'}</td>
                          <td className="py-2 px-4">{item.dosen?.nidn ?? '-'}</td>
                          <td className="py-2 px-4">{item.dosen?.email ?? '-'}</td>
                          <td className="py-2 px-4">
                            Rp {Number(item.total_gaji).toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-4">
                            {item.tanggal_bayar
                              ? new Date(item.tanggal_bayar).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
}
