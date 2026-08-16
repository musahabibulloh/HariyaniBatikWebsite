import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Detail Pesanan: {order?.order_number || "Memuat..."}</h1>
        <p className="text-gray-500 mt-1">Halaman ini sedang dalam tahap pengembangan.</p>
      </div>

      <div className="bg-white p-10 text-center rounded-lg shadow border border-gray-200">
        <p className="text-gray-500 mb-6">Informasi lengkap pesanan belum diimplementasikan sepenuhnya. Nanti akan memunculkan data untuk ID: {id}</p>
        <Link href="/admin/orders" className="text-brand-primary hover:underline">
          &larr; Kembali ke Daftar Pesanan
        </Link>
      </div>
    </div>
  );
}
