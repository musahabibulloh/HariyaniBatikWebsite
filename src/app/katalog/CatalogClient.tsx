"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CatalogClient({ initialProducts }: { initialProducts: any[] }) {
  // Use empty array initially to avoid flashing old cached products
  const [products, setProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await supabase
        .from('products')
        .select('*, product_images(image_url, is_primary)')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    };
    fetchLatest();
  }, []);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    
    let sorted = [...initialProducts];
    if (val === 'price-low') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (val === 'price-high') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (val === 'name') {
      sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    
    setProducts(sorted);
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="mb-8 p-6 bg-white border border-neutral-200 rounded flex flex-wrap justify-between items-center gap-4 text-[0.95rem]">
          <div className="text-neutral-600">
            <span className="font-medium text-neutral-800">{products.length}</span> produk tersedia
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="sort" className="text-[0.9rem] text-neutral-600 m-0">Urutkan:</label>
            <select 
              id="sort" 
              value={sortBy}
              onChange={handleSort}
              className="px-4 py-2 border border-neutral-300 rounded-sm text-[0.9rem] focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="newest">Terbaru</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-neutral-100 rounded overflow-hidden">
                <div className="w-full h-[280px] bg-neutral-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-neutral-200 rounded w-5/6 animate-pulse"></div>
                  <div className="mt-8 h-8 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-8">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-6 text-neutral-300">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <h3 className="text-[1.25rem] text-neutral-600 mb-2 font-semibold">
                Belum Ada Produk
            </h3>
            <p className="text-neutral-500">
                Koleksi kami akan segera tersedia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {products.map((p) => {
              const imageUrl = (p.product_images && p.product_images.length > 0) 
                ? (p.product_images.find((img: any) => img.is_primary)?.image_url || p.product_images[0].image_url) 
                : '/images/placeholder.png';
              
              const priceFormatted = p.price ? new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: p.currency || 'IDR',
                  minimumFractionDigits: 0
              }).format(p.price) : 'Hubungi Kami';

              return (
                <Link 
                  key={p.id} 
                  href={`/produk/${p.slug}`} 
                  className="group bg-white block no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded overflow-hidden border border-neutral-100"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imageUrl} 
                      alt={p.title}
                      className="w-full h-[280px] object-cover block"
                    />
                    {p.stock !== undefined && p.stock !== null && (
                      <span className={`absolute top-4 right-4 text-white px-3 py-1 text-sm font-medium rounded-sm ${p.stock > 0 ? 'bg-brand-primary' : 'bg-neutral-400'}`}>
                        {p.stock > 0 ? `Stok: ${p.stock}` : 'Habis'}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {p.sku && (
                      <div className="text-[0.8rem] text-neutral-400 mb-2 uppercase tracking-[0.05em]">
                        SKU: {p.sku}
                      </div>
                    )}
                    
                    <h3 className="text-[1.15rem] font-semibold text-brand-primary mb-3 leading-[1.4] group-hover:text-brand-secondary transition-colors">
                      {p.title}
                    </h3>
                    
                    {p.short_description && (
                      <p className="text-[0.9rem] text-neutral-500 leading-[1.6] mb-4 line-clamp-2">
                        {p.short_description}
                      </p>
                    )}
                    
                    <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between items-center">
                      <div>
                        <div className="text-[0.8rem] text-neutral-500 mb-1">Harga</div>
                        <div className="text-[1.35rem] font-bold text-brand-primary">
                          {priceFormatted}
                        </div>
                      </div>
                      <span className="text-brand-secondary font-medium text-[0.9rem] flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lihat Detail
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
