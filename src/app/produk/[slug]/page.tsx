import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery";

export const revalidate = 60;

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_images(image_url, is_primary)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase Error fetching product:", error);
  }

  if (!product) {
    console.log("Product not found for slug:", slug);
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-8 pb-4 bg-neutral-50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[0.9rem] text-neutral-500">
            <Link href="/" className="text-neutral-500 hover:text-brand-primary no-underline">Beranda</Link>
            <span>›</span>
            <Link href="/katalog" className="text-neutral-500 hover:text-brand-primary no-underline">Katalog</Link>
            <span>›</span>
            <span className="text-brand-primary">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 mb-16">
            {/* Product Images */}
            <ProductGallery images={product.product_images || []} title={product.title} />

            {/* Product Info */}
            <div>
              {product.sku && (
                <div className="text-[0.85rem] text-neutral-400 mb-3 uppercase tracking-[0.05em]">
                  SKU: {product.sku}
                </div>
              )}
              
              <h1 className="font-display text-4xl lg:text-[2.5rem] leading-[1.3] mb-4 text-brand-primary">
                {product.title}
              </h1>
              
              {/* Stock Badge */}
              {product.stock !== null && product.stock !== undefined && (
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <span className="badge bg-brand-primary text-white border-brand-primary">
                      Tersedia - Stok: {product.stock} unit
                    </span>
                  ) : (
                    <span className="badge bg-neutral-400 text-white border-neutral-400">
                      Stok Habis
                    </span>
                  )}
                </div>
              )}
              
              {/* Price */}
              <div className="py-6 border-y border-neutral-200 mb-8">
                {product.price ? (
                  <>
                    <div className="text-[0.9rem] text-neutral-500 mb-2">Harga</div>
                    <div className="text-4xl font-bold text-brand-primary">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: product.currency || 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-semibold text-neutral-600">
                    Harga Hubungi Kami
                  </div>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <div className="mb-8">
                  <p className="text-[1.05rem] leading-[1.8] text-neutral-600">
                    {product.short_description}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a 
                  href={`https://wa.me/6282132477156?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn flex-1 min-w-[200px] py-4 flex items-center justify-center gap-3 no-underline"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
                <Link 
                  href="/konsultasi" 
                  className="btn-secondary flex-1 min-w-[200px] py-4 text-center no-underline"
                >
                  Konsultasi
                </Link>
              </div>

              {/* Product Specifications */}
              <div className="bg-brand-light p-6 rounded">
                <h3 className="text-[1.1rem] font-semibold mb-4 text-brand-primary">
                  Spesifikasi Produk
                </h3>
                
                {product.materials && (
                  <div className="grid grid-cols-[120px_1fr] gap-3 mb-4 pb-4 border-b border-brand-primary/10">
                    <div className="font-medium text-neutral-600">Bahan</div>
                    <div className="text-neutral-700">{product.materials}</div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="grid grid-cols-[120px_1fr] gap-3 mb-4 pb-4 border-b border-brand-primary/10">
                    <div className="font-medium text-neutral-600">Dimensi</div>
                    <div className="text-neutral-700">{product.dimensions}</div>
                  </div>
                )}
                
                {product.motif_meaning && (
                  <div className="grid grid-cols-[120px_1fr] gap-3 mb-4 pb-4 border-b border-brand-primary/10">
                    <div className="font-medium text-neutral-600">Makna Motif</div>
                    <div className="text-neutral-700 leading-[1.6]">{product.motif_meaning}</div>
                  </div>
                )}

                {product.care_instructions && (
                  <div className="grid grid-cols-[120px_1fr] gap-3">
                    <div className="font-medium text-neutral-600">Perawatan</div>
                    <div className="text-neutral-700 leading-[1.6]">{product.care_instructions}</div>
                  </div>
                )}
                
                {!product.materials && !product.dimensions && !product.care_instructions && !product.motif_meaning && (
                  <p className="text-neutral-500 text-[0.95rem]">
                    Informasi spesifikasi akan segera tersedia.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Story / Full Description */}
          {product.full_story && (
            <div className="max-w-4xl mx-auto">
              <div className="divider my-8"></div>
              
              <div className="py-12">
                <h2 className="font-display text-3xl md:text-[2rem] mb-6 text-center text-brand-primary">
                  Cerita Batik Ini
                </h2>
                <div className="text-neutral-700 leading-[1.9] text-[1.05rem] text-justify whitespace-pre-wrap">
                  {product.full_story}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products or CTA */}
      <section className="bg-brand-light py-12 md:py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[1.75rem] font-semibold mb-4 text-brand-primary">
              Tertarik dengan Batik Ini?
            </h2>
            <p className="text-neutral-600 mb-8 leading-[1.7]">
              Hubungi kami untuk informasi lebih lanjut atau lihat koleksi batik tulis lainnya.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href={`https://wa.me/6282132477156?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-8 py-3.5"
              >
                Hubungi Sekarang
              </a>
              <Link href="/katalog" className="btn-secondary px-8 py-3.5 no-underline">
                Lihat Koleksi Lain
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
