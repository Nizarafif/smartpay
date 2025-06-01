import React from 'react';
import { Head } from '@inertiajs/react';

export default function DataDosen({ dosen }) {
  if (!dosen) {
    return <div>Loading...</div>; // Atau fallback lain kalau data belum adaa
  }

  return (
    <>
      <Head title="Data Dosen" />
      <h1>Data Dosen</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">NIDN</th>
            <th className="border border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {dosen.map((d) => (
            <tr key={d.id}>
              <td className="border border-gray-300 p-2">{d.nama}</td>
              <td className="border border-gray-300 p-2">{d.nidn}</td>
              <td className="border border-gray-300 p-2">{d.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
