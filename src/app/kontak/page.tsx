"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
          }
        ]);
        
      if (error) throw error;
      
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Auto reset success message after 10 seconds (matching Laravel behavior)
      setTimeout(() => {
        setStatus("idle");
      }, 10000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-neutral-50 py-16 md:py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-4">Hubungi Kami</span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-primary mb-4">
              Mari Berkomunikasi
            </h1>
            <p className="text-[1.1rem] text-neutral-600 leading-[1.8]">
              Kami siap membantu Anda menemukan batik tulis yang sempurna. 
              Jangan ragu untuk menghubungi kami melalui saluran yang Anda sukai.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 mb-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-[1.75rem] font-semibold mb-6 text-brand-primary">
                Informasi Kontak
              </h2>
              <p className="text-neutral-600 mb-8 leading-[1.7]">
                Kami dengan senang hati menjawab pertanyaan Anda tentang produk batik kami, 
                proses pemesanan, atau layanan konsultasi.
              </p>
              
              <div className="flex flex-col gap-6">
                {/* WhatsApp */}
                <a href="https://wa.me/6282132477156" target="_blank" rel="noopener noreferrer" className="flex gap-4 p-5 bg-white border border-neutral-200 rounded hover:shadow-md transition-shadow group no-underline">
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-primary mb-1">WhatsApp</div>
                    <div className="text-neutral-600">+62 821-3247-7156</div>
                    <div className="text-[0.85rem] text-brand-secondary mt-1 group-hover:translate-x-1 transition-transform">Chat langsung →</div>
                  </div>
                </a>
                
                {/* Email */}
                <a href="mailto:hariyanibatiktulis123@gmail.com" className="flex gap-4 p-5 bg-white border border-neutral-200 rounded hover:shadow-md transition-shadow group no-underline">
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-primary mb-1">Email</div>
                    <div className="text-neutral-600">hariyanibatiktulis123@gmail.com</div>
                    <div className="text-[0.85rem] text-brand-secondary mt-1 group-hover:translate-x-1 transition-transform">Kirim email →</div>
                  </div>
                </a>
                
                {/* Location */}
                <div className="flex gap-4 p-5 bg-white border border-neutral-200 rounded">
                  <div className="w-[50px] h-[50px] bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-primary mb-1">Lokasi</div>
                    <div className="text-neutral-600 leading-[1.6]">
                      RT.01/RW.032, Langon, Ambulu<br />
                      Kec. Ambulu, Kabupaten Jember<br />
                      Jawa Timur 68172
                    </div>
                  </div>
                </div>
                
                {/* Operating Hours */}
                <div className="p-5 bg-brand-light border border-neutral-200 rounded">
                  <div className="font-semibold text-brand-primary mb-3 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Jam Operasional
                  </div>
                  <div className="text-neutral-600 leading-[1.8] text-[0.95rem]">
                    Senin - Jumat: 08.00 - 17.00 WIB<br />
                    Sabtu: 08.00 - 14.00 WIB<br />
                    Minggu & Hari Libur: Tutup
                  </div>
                </div>
              </div>
              
              {/* Google Maps */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(44,24,16,0.08)]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.2!2d113.62009!3d-8.344805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6b09bb9dd6f20%3A0xd47a86e03bc0d2f!2sHariyani%20Batik%20Tulis!5e0!3m2!1sid!2sid!4v1703234567890!5m2!1sid!2sid"
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 md:p-10 border border-neutral-200 rounded-lg">
                <h2 className="text-[1.75rem] font-semibold mb-3 text-brand-primary">
                  Kirim Pesan
                </h2>
                <p className="text-neutral-600 mb-8">
                  Isi formulir di bawah ini dan kami akan merespons secepat mungkin.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-neutral-700 mb-2">Nama Lengkap <span className="text-brand-secondary">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-neutral-700 mb-2">Email <span className="text-brand-secondary">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-neutral-700 mb-2">Nomor Telepon</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="08123456789"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm text-neutral-700 mb-2">Subjek <span className="text-brand-secondary">*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      placeholder="Tentang apa pesan Anda?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-neutral-700 mb-2">Pesan <span className="text-brand-secondary">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={6} 
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="btn w-full py-4 text-[1rem]"
                  >
                    {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </form>

                {status === "success" && (
                  <div className="mt-6 p-4 bg-brand-light/50 border border-brand-accent rounded text-brand-primary flex items-start gap-3 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <strong>Terima kasih!</strong><br />
                      Pesan Anda telah kami terima. Kami akan menghubungi Anda segera melalui email.
                    </div>
                  </div>
                )}
                
                {status === "error" && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-400 rounded text-red-800 transition-all duration-300">
                    <div className="font-semibold mb-1">⚠️ Terjadi Kesalahan</div>
                    <div>Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.</div>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg px-8 py-14 text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl mb-4 text-white">
              Tertarik dengan Batik Tulis Kami?
            </h2>
            <p className="text-[1.1rem] mb-8 text-white/95 max-w-2xl mx-auto leading-[1.6]">
              Jelajahi koleksi lengkap batik tulis eksklusif dari Jember dan temukan yang sempurna untuk Anda.
            </p>
            <Link href="/katalog" className="btn-light px-10 py-4 text-[1rem]">
              Lihat Katalog Lengkap
            </Link>
          </div>
          
        </div>
      </section>
    </>
  );
}
