export const runtime = 'edge';
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function Kegiatan() {
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-neutral-50 py-16 md:py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-4">Dokumentasi</span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-primary mb-4">
              Kegiatan Kami
            </h1>
            <p className="text-[1.1rem] text-neutral-600 leading-[1.8]">
              Jelajahi dokumentasi kegiatan dan acara yang kami selenggarakan. 
              Setiap kegiatan adalah upaya kami dalam melestarikan seni batik tulis.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Bar */}
          <div className="mb-8 p-6 bg-white border border-neutral-200 rounded text-[0.95rem] text-neutral-600">
            <span>{activities?.length || 0}</span> kegiatan tersedia
          </div>
          
          {/* Grid */}
          {(!activities || activities.length === 0) ? (
            <div className="text-center py-16 px-8">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-6 text-neutral-300">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <h3 className="text-[1.25rem] text-neutral-600 mb-2 font-semibold">
                Belum Ada Kegiatan
              </h3>
              <p className="text-neutral-500">
                Dokumentasi kegiatan kami akan segera tersedia.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <Link 
                  key={activity.id} 
                  href={`/kegiatan/${activity.id}`} 
                  className="group bg-white block no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded overflow-hidden border border-neutral-100"
                >
                  <div className="relative">
                    {activity.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={activity.image_url} 
                        alt={activity.title}
                        className="w-full h-[280px] object-cover block"
                      />
                    ) : (
                      <div className="w-full h-[280px] bg-brand-accent"></div>
                    )}
                    
                    {activity.date && (
                      <span className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 text-sm font-medium rounded-sm">
                        {new Date(activity.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {activity.location && (
                      <div className="text-[0.8rem] text-neutral-400 mb-2 uppercase tracking-[0.05em]">
                        {activity.location}
                      </div>
                    )}
                    
                    <h3 className="text-[1.15rem] font-semibold text-brand-primary mb-3 leading-[1.4] group-hover:text-brand-secondary transition-colors">
                      {activity.title}
                    </h3>
                    
                    <p className="text-[0.9rem] text-neutral-500 leading-[1.6] mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="text-[0.85rem] text-brand-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Baca Selengkapnya
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-light py-12 md:py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[1.75rem] font-semibold mb-4 text-brand-primary">
              Tertarik Berkolaborasi?
            </h2>
            <p className="text-neutral-600 mb-8 leading-[1.7]">
              Kami terbuka untuk berbagai bentuk kolaborasi dan kerjasama dalam 
              melestarikan budaya batik tulis tradisional.
            </p>
            <Link href="/kontak" className="btn px-8 py-3">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
