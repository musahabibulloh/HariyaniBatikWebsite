import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminConsultations() {
  const { data: consultations } = await supabase
    .from('consultations')
    .select('*, products(title)')
    .order('created_at', { ascending: false });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Konsultasi Personal</h1>
          <p className="text-gray-500 mt-1">Daftar permintaan konsultasi dari pelanggan.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal & Pelanggan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontak
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pesan / Keperluan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(!consultations || consultations.length === 0) ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Belum ada permintaan konsultasi.
                </td>
              </tr>
            ) : (
              consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(c.created_at).toLocaleDateString('id-ID')}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{c.customer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{c.customer_phone}</div>
                    <div className="text-sm text-gray-500">{c.customer_email || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2 max-w-xs" title={c.notes}>
                      {c.notes || '-'}
                    </div>
                    {c.preferred_date && (
                      <div className="text-xs text-brand-secondary mt-1">
                        Tgl Diinginkan: {new Date(c.preferred_date).toLocaleDateString('id-ID')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      c.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {c.status === 'new' ? 'Baru' : c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`https://wa.me/${c.customer_phone.replace(/\D/g, '').replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-900 mr-4">
                      Chat WA
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
