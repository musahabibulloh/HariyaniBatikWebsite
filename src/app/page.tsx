import { supabase } from "@/lib/supabase";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Base static cache for fast initial load

export default async function Home() {
  // Fetch initial featured products from Supabase
  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(image_url, is_primary)')
    .eq('status', 'published')
    .limit(6);

  // Fetch initial active hero image
  const { data: heroImage } = await supabase
    .from('hero_images')
    .select('image_url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return (
    <HomeClient 
      initialHero={heroImage || null} 
      initialProducts={products || []} 
    />
  );
}
