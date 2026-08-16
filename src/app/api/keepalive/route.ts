import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET() {
  try {
    // Lakukan query super ringan ke Supabase untuk mencatat aktivitas
    const { data, error } = await supabase
      .from('hero_images')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase pinged successfully to prevent pause',
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
