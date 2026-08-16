"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    sku: "",
    price: "",
    currency: "IDR",
    is_unique: false,
    consultation_required: false,
    made_to_order: false,
    stock: "0",
    short_description: "",
    full_story: "",
    motif_meaning: "",
    process_description: "",
    materials: "",
    dimensions: "",
    care_instructions: "",
    status: "published",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" ? { slug: generateSlug(value) } : {}),
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
      const { data: productData, error: productError } = await supabase.from("products").insert([
        {
          title: formData.title,
          slug: formData.slug,
          sku: formData.sku || null,
          price: formData.price ? parseInt(formData.price) : null,
          currency: formData.currency,
          is_unique: formData.is_unique,
          consultation_required: formData.consultation_required,
          made_to_order: formData.made_to_order,
          stock: parseInt(formData.stock) || 0,
          short_description: formData.short_description || null,
          full_story: formData.full_story || null,
          motif_meaning: formData.motif_meaning || null,
          process_description: formData.process_description || null,
          materials: formData.materials || null,
          dimensions: formData.dimensions || null,
          care_instructions: formData.care_instructions || null,
          status: formData.status,
        },
      ]).select().single();

      if (productError) throw productError;

      if (file && productData) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        const { error: imageError } = await supabase.from("product_images").insert([
          {
            product_id: productData.id,
            image_url: publicUrl,
            is_primary: true,
          }
        ]);

        if (imageError) throw imageError;
      }

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk. Periksa console untuk detail. Pastikan bucket 'images' telah dibuat di Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
        <p className="text-gray-500 mt-1">Isi informasi lengkap produk batik tulis.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow border border-gray-200 space-y-6">
        {/* Informasi Dasar */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
              <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                <option value="published">Publik</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Harga & Stok */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Harga &amp; Stok</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
              <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div className="flex flex-col justify-end space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="is_unique" checked={formData.is_unique} onChange={handleChange} className="rounded" /> Produk Unik
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="consultation_required" checked={formData.consultation_required} onChange={handleChange} className="rounded" /> Konsultasi
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="made_to_order" checked={formData.made_to_order} onChange={handleChange} className="rounded" /> Made to Order
              </label>
            </div>
          </div>
        </div>

        {/* Gambar */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Gambar Produk</h2>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar Utama</label>
            <input type="file" id="image" accept="image/*" onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            <p className="text-xs text-gray-500 mt-1">Hanya 1 gambar utama untuk saat ini.</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Deskripsi &amp; Detail</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
              <input type="text" id="short_description" name="short_description" value={formData.short_description} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="full_story" className="block text-sm font-medium text-gray-700 mb-1">Cerita Lengkap</label>
              <textarea id="full_story" name="full_story" rows={4} value={formData.full_story} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div>
              <label htmlFor="motif_meaning" className="block text-sm font-medium text-gray-700 mb-1">Makna Motif</label>
              <textarea id="motif_meaning" name="motif_meaning" rows={3} value={formData.motif_meaning} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-1">Bahan</label>
                <input type="text" id="materials" name="materials" value={formData.materials} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
              </div>
              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">Ukuran</label>
                <input type="text" id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="care_instructions" className="block text-sm font-medium text-gray-700 mb-1">Instruksi Perawatan</label>
              <textarea id="care_instructions" name="care_instructions" rows={2} value={formData.care_instructions} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" onClick={() => router.push("/admin/products")} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
