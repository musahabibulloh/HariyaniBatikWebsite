import { supabase } from "@/lib/supabase";
import Link from "next/link";
import CatalogClient from "./CatalogClient";

export const revalidate = 60;

export default async function Katalog() {
  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(image_url, is_primary)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-neutral-50 py-16 md:py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-4">Koleksi Eksklusif</span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-primary mb-4">
              Katalog Batik Tulis
            </h1>
            <p className="text-[1.1rem] text-neutral-600 leading-[1.8]">
              Jelajahi koleksi batik tulis terpilih kami. Setiap helai adalah karya seni 
              yang unik dengan cerita dan makna tersendiri.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid (Client Component for sorting) */}
      <CatalogClient initialProducts={products || []} />

      {/* CTA Section */}
      <section className="bg-brand-light py-12 md:py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[1.75rem] font-semibold mb-4 text-brand-primary">
              Tidak Menemukan yang Anda Cari?
            </h2>
            <p className="text-neutral-600 mb-8 leading-[1.7]">
              Kami menyediakan layanan custom batik tulis sesuai kebutuhan Anda. 
              Konsultasikan keinginan Anda dengan tim kami.
            </p>
            <Link href="/konsultasi" className="btn px-8 py-3">
              Konsultasi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
