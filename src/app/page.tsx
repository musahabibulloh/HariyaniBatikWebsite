import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch featured products from Supabase
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*, product_images(image_url, is_primary)')
    .eq('status', 'published')
    .limit(6);

  // Fetch active hero image
  const { data: heroImage } = await supabase
    .from('hero_images')
    .select('image_url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light to-neutral-50 border-b border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in-up">
              <div className="mb-4">
                <span className="badge">Batik Tulis Asli</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-primary mb-6 leading-tight">
                Warisan Keindahan<br />
                <span className="text-brand-secondary">Batik Tulis Jember</span>
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg">
                Setiap helai batik adalah karya seni yang ditulis dengan penuh dedikasi. 
                Kami menghadirkan koleksi batik tulis eksklusif yang mencerminkan keahlian 
                warisan dan keanggunan tradisi Indonesia.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/katalog" className="btn no-underline">
                  Jelajahi Koleksi
                </Link>
                <Link href="/konsultasi" className="btn-secondary no-underline">
                  Konsultasi Personal
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-brand-primary/10 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-brand-primary mb-1">15+</div>
                  <div className="text-sm text-neutral-500">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-primary mb-1">100%</div>
                  <div className="text-sm text-neutral-500">Batik Tulis Asli</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-primary mb-1">500+</div>
                  <div className="text-sm text-neutral-500">Pelanggan Puas</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-[600px] bg-neutral-200">
                {heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={heroImage.image_url} 
                    alt="Hero Batik Tulis Hariyani" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-white p-8 text-center">
                     <div>
                       <h3 className="text-2xl font-display mb-2">Batik Tulis Hariyani</h3>
                       <p className="opacity-90">Admin belum mengupload foto hero</p>
                     </div>
                  </div>
                )}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-accent opacity-20 rounded-full -z-10 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-secondary opacity-10 rounded-full -z-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Tentang Hariyani Batik</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Hariyani Batik adalah rumah batik tulis yang berdedikasi melestarikan keindahan 
              dan keahlian tradisional batik Indonesia. Setiap produk kami dibuat dengan penuh 
              perhatian oleh pengrajin berpengalaman, menghasilkan karya seni yang unik dan bernilai tinggi.
            </p>
            <Link href="/kontak" className="btn-secondary">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
      </div>

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge mb-4">Koleksi Pilihan</span>
            <h2 className="font-display text-4xl mb-4">Batik Tulis Ready Stock</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Koleksi batik tulis pilihan yang siap untuk Anda miliki. 
              Setiap helai memiliki cerita dan keunikan tersendiri.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(!products || products.length === 0) ? (
              <div className="col-span-full text-center py-12 text-neutral-500 bg-white border border-neutral-200 rounded-lg">
                <p>Koleksi akan segera hadir. Admin belum menambahkan produk.</p>
              </div>
            ) : (
              products.map((product) => (
                <Link key={product.id} href={`/produk/${product.slug}`} className="group bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block">
                  <div className="h-[280px] bg-neutral-100 overflow-hidden relative">
                    {product.product_images && product.product_images.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={product.product_images[0].image_url} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src="/images/placeholder.png"
                        alt="Placeholder"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-[1.15rem] font-semibold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors">
                      {product.title}
                    </h3>
                    {product.short_description && (
                      <p className="text-[0.9rem] text-neutral-500 mb-4 leading-[1.6]">
                        {product.short_description.length > 80 
                          ? `${product.short_description.substring(0, 80)}...` 
                          : product.short_description}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-[1.25rem] font-bold text-brand-primary">
                        {product.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: product.currency || 'IDR', minimumFractionDigits: 0 }).format(product.price) : 'Hubungi Kami'}
                      </div>
                      <span className="text-brand-secondary font-medium text-sm">Lihat Detail &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/katalog" className="btn-secondary">
              Lihat Semua Koleksi &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl mb-4">Mengapa Memilih Kami</h2>
            <p className="text-lg text-neutral-600">Komitmen kami terhadap kualitas dan kepuasan pelanggan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/5 text-brand-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl mb-4">Batik Tulis Asli</h3>
              <p className="text-neutral-600 leading-relaxed">
                Setiap helai dibuat dengan teknik batik tulis tradisional, 
                menjamin keaslian dan nilai seni yang tinggi.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/5 text-brand-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-xl mb-4">Layanan Personal</h3>
              <p className="text-neutral-600 leading-relaxed">
                Konsultasi personal untuk membantu Anda memilih batik 
                yang sesuai dengan kebutuhan dan preferensi.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/5 text-brand-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl mb-4">Kualitas Terjamin</h3>
              <p className="text-neutral-600 leading-relaxed">
                Pengalaman lebih dari 15 tahun dalam menghadirkan 
                batik berkualitas tinggi untuk pelanggan setia kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="font-display text-4xl mb-6 text-white">Butuh Konsultasi Personal?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Tim kami siap membantu Anda menemukan batik tulis yang sempurna 
              sesuai kebutuhan dan preferensi Anda.
            </p>
            <Link href="/konsultasi" className="btn-light">
              Konsultasi Personal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
