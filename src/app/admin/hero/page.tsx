"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminHero() {
  const [heroImage, setHeroImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (data) {
      setHeroImage(data);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Pilih gambar terlebih dahulu.");
      return;
    }
    
    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1. Upload new image
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      // 2. Set all other hero images to inactive
      await supabase
        .from("hero_images")
        .update({ is_active: false })
        .neq("id", "00000000-0000-0000-0000-000000000000"); // dummy condition to update all

      // 3. Insert new active hero image
      const { data: newHero, error: insertError } = await supabase
        .from("hero_images")
        .insert([
          {
            image_url: publicUrl,
            is_active: true,
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      setHeroImage(newHero);
      setSuccessMsg("Foto Hero berhasil diperbarui!");
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gagal mengupload foto hero.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Foto Hero Beranda</h1>
        <p className="text-gray-500 mt-1">Upload foto untuk ditampilkan di hero section beranda.</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-500 text-white p-4 rounded-lg mb-6 shadow-sm">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 shadow-sm">
          <strong>Terdapat kesalahan:</strong>
          <p className="mt-1">{errorMsg}</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Memuat foto saat ini...</div>
        ) : (
          <>
            {heroImage ? (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Foto Hero Saat Ini</h3>
                <div className="rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={heroImage.image_url} 
                    alt="Hero Image"
                    className="w-full h-[400px] object-cover block"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-10 p-10 bg-gray-50 rounded-lg text-center border border-gray-200 border-dashed">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="mx-auto mb-4">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p className="text-gray-500 m-0">Belum ada foto hero. Upload foto pertama Anda di bawah.</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label htmlFor="image" className="block font-semibold text-gray-900 mb-2">
                  Upload Foto Hero Baru <span className="text-red-500">*</span>
                </label>
                <input 
                  type="file" 
                  id="image" 
                  name="image" 
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Format: JPG, PNG (max 5MB). Rekomendasi ukuran: 1200x800px
                </p>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={uploading || !file}
                  className="bg-brand-primary text-white px-6 py-3 rounded-md shadow-sm font-medium hover:bg-brand-secondary transition-colors disabled:opacity-50"
                >
                  {uploading ? "Mengupload..." : "Upload & Update Foto Hero"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
        <p className="text-blue-800 text-sm m-0">
          <strong>Tips:</strong> Gunakan foto berkualitas tinggi dengan aspek rasio portrait (4:5) atau bebas untuk hasil terbaik di beranda.
        </p>
      </div>
    </div>
  );
}
