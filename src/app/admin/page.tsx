import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminDashboard() {
  // Fetch some quick stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: consultationCount } = await supabase.from('consultations').select('*', { count: 'exact', head: true });
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Ringkasan data Hariyani Batik</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Produk</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{productCount || 0}</p>
          <Link href="/admin/products" className="text-brand-primary text-sm mt-4 inline-block hover:underline">Kelola Produk &rarr;</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Konsultasi</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{consultationCount || 0}</p>
          <Link href="/admin/consultations" className="text-brand-primary text-sm mt-4 inline-block hover:underline">Lihat Konsultasi &rarr;</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Pesanan</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{orderCount || 0}</p>
          <Link href="/admin/orders" className="text-brand-primary text-sm mt-4 inline-block hover:underline">Lihat Pesanan &rarr;</Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Menu Admin</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <Link href="/admin/products" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-900">Produk</h3>
                <p className="text-sm text-gray-500">Tambah, ubah, dan hapus katalog batik.</p>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </div>
          </Link>
          <Link href="/admin/hero" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-900">Banner Hero</h3>
                <p className="text-sm text-gray-500">Ubah gambar dan teks banner halaman utama.</p>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </div>
          </Link>
          <Link href="/admin/activities" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-900">Kegiatan</h3>
                <p className="text-sm text-gray-500">Kelola artikel/kegiatan seputar pembuatan batik.</p>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </div>
          </Link>
          <Link href="/admin/messages" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-900">Pesan Masuk</h3>
                <p className="text-sm text-gray-500">Lihat pesan kontak dari pengunjung.</p>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
