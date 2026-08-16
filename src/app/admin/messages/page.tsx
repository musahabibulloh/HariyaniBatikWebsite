import { supabase } from "@/lib/supabase";

export default async function AdminMessages() {
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesan Masuk</h1>
          <p className="text-gray-500 mt-1">Daftar pesan dari form kontak.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal & Pengirim
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subjek & Pesan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(!messages || messages.length === 0) ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : (
              messages.map((m) => (
                <tr key={m.id} className={`hover:bg-gray-50 ${!m.is_read ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(m.created_at).toLocaleDateString('id-ID')}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{m.subject || 'Tanpa Subjek'}</div>
                    <div className="text-sm text-gray-500 mt-1">{m.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {m.is_read ? (
                      <span className="text-gray-500">Sudah Dibaca</span>
                    ) : (
                      <span className="text-blue-600 font-medium">Belum Dibaca</span>
                    )}
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
