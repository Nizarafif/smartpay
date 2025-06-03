import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardLayout from '@/pages/DashboardLayout';

export default function GajiDosen() {
  const { props } = usePage();
  const dosens = props.dosens || [];

  return (
    <>
      <Head title="Gaji Dosen" />

      <DashboardLayout>
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Gaji Dosen</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full table-auto border border-gray-300 text-left">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">NIDN</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {dosens.map((dosen, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{dosen.nama}</td>
                  <td className="px-4 py-2 border">{dosen.nidn}</td>
                  <td className="px-4 py-2 border">{dosen.email}</td>
                  <td className="px-4 py-2 border">
                    {dosen.sudah_dibayar ? (
                      <span className="text-green-600 font-semibold">Sudah Dibayar</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Belum Dibayar</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {dosens.length === 0 && (
            <p className="text-center text-gray-500 mt-4">Tidak ada data dosen.</p>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
