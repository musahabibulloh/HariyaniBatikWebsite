"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewHero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    is_active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // 2. Insert Record to Database
      const { error: insertError } = await supabase.from("hero_images").insert([
        {
          title: formData.title,
          subtitle: formData.subtitle,
          image_url: publicUrl,
          is_active: formData.is_active,
        },
      ]);

      if (insertError) throw insertError;
      
      router.push("/admin/hero");
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah banner. Pastikan Anda telah membuat bucket storage bernama 'images' di Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Banner Hero</h1>
        <p className="text-gray-500 mt-1">Unggah gambar baru untuk banner halaman utama.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow border border-gray-200 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Utama</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Sub Judul</label>
          <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Gambar Banner *</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
          <p className="text-xs text-gray-500 mt-1">Rekomendasi ukuran: 1920x1080 pixel.</p>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="rounded" /> 
            Aktifkan Banner Ini
          </label>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" onClick={() => router.push("/admin/hero")} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50">
            {loading ? "Mengunggah..." : "Simpan Banner"}
          </button>
        </div>
      </form>
    </div>
  );
}
