const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_images(image_url, is_primary)")
    .eq("slug", "wasdasdas")
    .single();
    
  console.log('Error:', error);
  console.log('Product:', product);
}

main();
