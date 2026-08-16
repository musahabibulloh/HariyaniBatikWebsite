"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteActivityButton({ activityId, activityTitle }: { activityId: string, activityTitle: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus kegiatan "${activityTitle}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', activityId);
        
      if (error) throw error;
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus kegiatan.");
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
