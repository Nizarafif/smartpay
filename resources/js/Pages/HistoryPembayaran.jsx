import React from "react";
import { usePage, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import DashboardLayout from "../pages/dashboardLayout"; // Pastikan path sesuai

export default function HistoryPembayaran() {
  const { dosenDibayar } = usePage().props;

  return (
    <>
      {/* ✅ Menambahkan judul halaman untuk tab browser */}
      <Head title="Riwayat Pembayaran" />

      <motion.div
        className="p-4 md:p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">
          Riwayat Pembayaran
        </h1>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
            <thead className="bg-teal-50 dark:bg-gray-700 text-teal-700 dark:text-teal-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nama Dosen</th>
                <th className="px-4 py-3 text-left font-semibold">Gaji Utama</th>
                <th className="px-4 py-3 text-left font-semibold">Tunjangan</th>
                <th className="px-4 py-3 text-left font-semibold">Total Gaji</th>
                <th className="px-4 py-3 text-left font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-800 dark:text-gray-100">
              {dosenDibayar.length > 0 ? (
                dosenDibayar.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3">{item.dosen?.nama ?? "-"}</td>
                    <td className="px-4 py-3">Rp {item.gaji_utama}</td>
                    <td className="px-4 py-3">Rp {item.tunjangan}</td>
                    <td className="px-4 py-3">Rp {item.total_gaji}</td>
                    <td className="px-4 py-3">{item.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                  >
                    Belum ada data pembayaran.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

HistoryPembayaran.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
