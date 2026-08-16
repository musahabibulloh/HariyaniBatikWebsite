"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewActivity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let publicUrl = null;

      // Upload image if selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `activities/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("images").getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      // Insert record
      const { error } = await supabase.from("activities").insert([
        {
          title: formData.title,
          description: formData.description || null,
          image_url: publicUrl,
          date: formData.date ? new Date(formData.date).toISOString() : null,
        },
      ]);

      if (error) throw error;
      router.push("/admin/activities");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan kegiatan. Pastikan Anda telah membuat bucket storage 'images' di Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Kegiatan Baru</h1>
        <p className="text-gray-500 mt-1">Buat artikel atau liputan kegiatan baru.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow border border-gray-200 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan *</label>
          <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pelaksanaan</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Gambar Kegiatan (Opsional)</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Isi Artikel</label>
          <textarea id="description" name="description" rows={6} value={formData.description} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" onClick={() => router.push("/admin/activities")} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan Kegiatan"}
          </button>
        </div>
      </form>
    </div>
  );
}
