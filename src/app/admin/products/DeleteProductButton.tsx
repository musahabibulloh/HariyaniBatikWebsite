"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteProductButton({ productId, productName }: { productId: string, productName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      // Supabase has ON DELETE CASCADE for product_images, so deleting product deletes the image records.
      // Note: This does not delete the actual file from storage bucket. To do that, you'd need to fetch the image URL and delete it from storage first.
      // For simplicity, we just delete the database record here.
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) throw error;
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus produk.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  );
}
