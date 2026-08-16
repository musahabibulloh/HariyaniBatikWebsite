"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Konsultasi() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    consultation_type: "",
    occasion: "",
    budget_range: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Combine custom fields into the notes column for Supabase
      const combinedNotes = `
Jenis: ${formData.consultation_type}
Keperluan: ${formData.occasion}
Budget: ${formData.budget_range}

Pesan:
${formData.message}
      `.trim();

      const { error } = await supabase
        .from('consultations')
        .insert([
          {
            customer_name: formData.customer_name,
            customer_phone: formData.customer_phone,
            customer_email: formData.customer_email || null,
            notes: combinedNotes,
          }
        ]);
        
      if (error) throw error;
      setStatus("success");
      setFormData({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        consultation_type: "",
        occasion: "",
        budget_range: "",
        message: "",
      });
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
            <span className="badge mb-4">Layanan Personal</span>
            <h1 className="font-display text-4xl md:text-5xl text-brand-primary mb-4">
              Konsultasi Personal
            </h1>
            <p className="text-[1.1rem] text-neutral-600 leading-[1.8]">
              Bingung memilih batik yang tepat? Tim ahli kami siap membantu Anda menemukan 
              batik tulis yang sesuai dengan kebutuhan, acara, dan preferensi Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
            
            {/* Information Sidebar */}
            <div>
              <div className="bg-brand-light p-8 rounded-lg mb-8">
                <h3 className="text-[1.25rem] font-semibold mb-4 text-brand-primary">
                  Apa yang Kami Bantu?
                </h3>
                <ul className="space-y-4 text-neutral-700">
                  <li className="flex gap-3 leading-[1.6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Memilih motif dan warna yang sesuai</span>
                  </li>
                  <li className="flex gap-3 leading-[1.6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Rekomendasi berdasarkan acara atau kebutuhan</span>
                  </li>
                  <li className="flex gap-3 leading-[1.6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Informasi detail tentang kualitas dan perawatan</span>
                  </li>
                  <li className="flex gap-3 leading-[1.6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Pemesanan custom batik tulis</span>
                  </li>
                  <li className="flex gap-3 leading-[1.6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Konsultasi harga dan paket pembelian</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-neutral-200 p-8 rounded-lg shadow-sm">
                <h3 className="text-[1.25rem] font-semibold mb-4 text-brand-primary">
                  Respons Cepat
                </h3>
                <p className="text-neutral-600 leading-[1.7] mb-4">
                  Kami akan merespons permintaan konsultasi Anda dalam waktu:
                </p>
                <div className="flex items-center gap-3 p-4 bg-brand-light rounded">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <div className="font-semibold text-brand-primary">1-2 Jam Kerja</div>
                    <div className="text-[0.85rem] text-neutral-500">Senin - Sabtu</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-neutral-600 mb-4">Atau hubungi langsung via WhatsApp</p>
                <a href="https://wa.me/6282132477156" target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center gap-2 px-6 py-3.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Consultation Form */}
            <div>
              <div className="bg-white p-8 md:p-10 border border-neutral-200 rounded-lg shadow-sm">
                <h2 className="text-[1.75rem] font-semibold mb-3 text-brand-primary">
                  Form Konsultasi
                </h2>
                <p className="text-neutral-600 mb-8 leading-[1.7]">
                  Isi formulir di bawah ini dengan lengkap agar kami dapat memberikan 
                  rekomendasi terbaik untuk Anda.
                </p>

                {status === "success" && (
                  <div className="mb-6 p-4 bg-brand-light/50 border border-brand-accent rounded text-brand-primary flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>Permintaan konsultasi Anda telah kami terima. Tim kami akan segera menghubungi Anda.</div>
                  </div>
                )}
                
                {status === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-400 rounded text-red-800">
                    <div className="font-semibold mb-2">⚠️ Terjadi Kesalahan</div>
                    <div>Maaf, terjadi kesalahan saat mengirim form. Silakan coba lagi nanti.</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-[1.1rem] font-semibold text-brand-primary pb-2 mb-4 border-b border-neutral-200">
                      Informasi Personal
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="customer_name" className="block text-sm text-neutral-700 mb-2">Nama Lengkap <span className="text-brand-secondary">*</span></label>
                        <input 
                          type="text" 
                          id="customer_name" 
                          name="customer_name" 
                          required 
                          placeholder="Nama Anda"
                          value={formData.customer_name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="customer_email" className="block text-sm text-neutral-700 mb-2">Email <span className="text-brand-secondary">*</span></label>
                          <input 
                            type="email" 
                            id="customer_email" 
                            name="customer_email" 
                            required 
                            placeholder="email@example.com"
                            value={formData.customer_email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="customer_phone" className="block text-sm text-neutral-700 mb-2">No. WhatsApp <span className="text-brand-secondary">*</span></label>
                          <input 
                            type="tel" 
                            id="customer_phone" 
                            name="customer_phone" 
                            required 
                            placeholder="08123456789"
                            value={formData.customer_phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div>
                    <h3 className="text-[1.1rem] font-semibold text-brand-primary pb-2 mb-4 border-b border-neutral-200">
                      Detail Konsultasi
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="consultation_type" className="block text-sm text-neutral-700 mb-2">Jenis Konsultasi <span className="text-brand-secondary">*</span></label>
                        <select 
                          id="consultation_type" 
                          name="consultation_type" 
                          required
                          value={formData.consultation_type}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-neutral-700"
                        >
                          <option value="">Pilih jenis konsultasi</option>
                          <option value="product_selection">Pemilihan Produk</option>
                          <option value="custom_order">Pesanan Custom</option>
                          <option value="care_instructions">Perawatan Batik</option>
                          <option value="pricing">Informasi Harga</option>
                          <option value="bulk_order">Pembelian Grosir</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="occasion" className="block text-sm text-neutral-700 mb-2">Untuk Acara/Keperluan <span className="text-brand-secondary">*</span></label>
                        <select 
                          id="occasion" 
                          name="occasion" 
                          required
                          value={formData.occasion}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-neutral-700"
                        >
                          <option value="">Pilih keperluan</option>
                          <option value="formal_event">Acara Formal/Resmi</option>
                          <option value="wedding">Pernikahan</option>
                          <option value="casual">Casual/Sehari-hari</option>
                          <option value="gift">Hadiah/Kado</option>
                          <option value="collection">Koleksi Pribadi</option>
                          <option value="corporate">Seragam Kantor/Korporat</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budget_range" className="block text-sm text-neutral-700 mb-2">Perkiraan Budget</label>
                        <select 
                          id="budget_range" 
                          name="budget_range"
                          value={formData.budget_range}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all text-neutral-700"
                        >
                          <option value="">Pilih range budget (opsional)</option>
                          <option value="under_500k">Di bawah Rp 500.000</option>
                          <option value="500k_1m">Rp 500.000 - 1.000.000</option>
                          <option value="1m_2m">Rp 1.000.000 - 2.000.000</option>
                          <option value="2m_5m">Rp 2.000.000 - 5.000.000</option>
                          <option value="above_5m">Di atas Rp 5.000.000</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm text-neutral-700 mb-2">Detail Kebutuhan/Pertanyaan <span className="text-brand-secondary">*</span></label>
                        <textarea 
                          id="message" 
                          name="message" 
                          required 
                          rows={6} 
                          placeholder="Ceritakan kebutuhan Anda secara detail: motif yang diinginkan, warna preferensi, ukuran, jumlah, timeline, atau pertanyaan lainnya..."
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                        ></textarea>
                        <div className="text-[0.85rem] text-neutral-500 mt-2">
                          Semakin detail informasi yang Anda berikan, semakin baik kami dapat membantu.
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="btn w-full py-4 text-[1rem]"
                  >
                    {status === "loading" ? "Mengirim..." : "Kirim Permintaan Konsultasi"}
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-brand-light py-12 md:py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[1.75rem] font-semibold mb-8 text-brand-primary">
              Mengapa Konsultasi dengan Kami?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="font-semibold text-brand-primary mb-2 text-[1.1rem]">Rekomendasi Tepat</div>
                <div className="text-[0.9rem] text-neutral-600 leading-[1.6]">Sesuai kebutuhan dan budget Anda</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="font-semibold text-brand-primary mb-2 text-[1.1rem]">Tim Ahli</div>
                <div className="text-[0.9rem] text-neutral-600 leading-[1.6]">Berpengalaman 15+ tahun</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="font-semibold text-brand-primary mb-2 text-[1.1rem]">Layanan Profesional</div>
                <div className="text-[0.9rem] text-neutral-600 leading-[1.6]">Konsultasi berkualitas</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
