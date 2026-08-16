export const runtime = 'edge';
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageModal from "./ImageModal";

export const revalidate = 0;

export default async function ActivityDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: activity, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error) {
    console.error("Supabase Error fetching activity:", error);
  }

  if (!activity) {
    console.log("Activity not found for ID:", resolvedParams.id);
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-8 pb-4 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[0.9rem] text-neutral-500">
            <Link href="/" className="text-neutral-500 hover:text-brand-primary transition-colors">Beranda</Link>
            <span>&rsaquo;</span>
            <Link href="/kegiatan" className="text-neutral-500 hover:text-brand-primary transition-colors">Kegiatan</Link>
            <span>&rsaquo;</span>
            <span className="text-brand-primary">{activity.title}</span>
          </nav>
        </div>
      </section>

      {/* Activity Detail Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 mb-16">
            {/* Activity Image */}
            <div>
              {activity.image_url ? (
                <ImageModal imageUrl={activity.image_url} title={activity.title} />
              ) : (
                <div className="w-full h-[400px] lg:h-[600px] bg-neutral-100 rounded flex items-center justify-center text-neutral-400">
                  <div className="text-center">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>Tidak ada gambar</p>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Info */}
            <div>
              <div className="bg-white p-8 lg:p-10 border border-neutral-200 rounded">
                {activity.location && (
                  <div className="text-[0.85rem] text-neutral-400 mb-3 uppercase tracking-[0.05em]">
                    {activity.location}
                  </div>
                )}
                
                <h1 className="font-display text-4xl lg:text-[2.25rem] leading-[1.3] mb-4 text-brand-primary">
                  {activity.title}
                </h1>
                
                {/* Date Badge */}
                {activity.date && (
                  <div className="mb-6">
                    <span className="badge bg-brand-primary text-white">
                      {new Date(activity.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                )}
                
                {/* Description */}
                <div className="py-6 border-y border-neutral-200 mb-8">
                  <p className="text-[1.05rem] leading-[1.8] text-neutral-700 whitespace-pre-wrap">
                    {activity.description}
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/kegiatan" className="btn flex-1 min-w-[180px]">
                    Kegiatan Lainnya
                  </Link>
                  <Link 
                    href="/kontak" 
                    className="flex-1 min-w-[180px] text-center inline-block px-6 py-3 border-2 border-brand-primary bg-white text-brand-primary rounded-sm font-semibold transition-all duration-300 hover:bg-brand-primary hover:text-white"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {activity.content && (
            <div className="bg-white p-8 lg:p-12 border border-neutral-200 rounded">
              <h2 className="font-display text-[1.75rem] mb-6 text-brand-primary">
                Detail Kegiatan
              </h2>
              <div className="leading-[1.9] text-neutral-700 text-[1rem] whitespace-pre-wrap">
                {activity.content}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-light py-12 md:py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[1.75rem] font-semibold mb-4 text-brand-primary">
              Tertarik dengan Kegiatan Kami?
            </h2>
            <p className="text-neutral-600 mb-8 leading-[1.7]">
              Jangan lewatkan update kegiatan dan acara terbaru dari Hariyani Batik. 
              Hubungi kami untuk informasi lebih lanjut.
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
