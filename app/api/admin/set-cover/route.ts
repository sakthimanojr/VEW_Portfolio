import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  try {
    const { image_id, category_id } = await request.json();
    if (!image_id || !category_id) {
      return NextResponse.json(
        { error: 'image_id and category_id are required.' },
        { status: 400 }
      );
    }

    const { error: clearError } = await supabase!
      .from('gallery_images')
      .update({ is_cover: false })
      .eq('category_id', category_id);
    if (clearError) {
      return NextResponse.json({ error: clearError.message }, { status: 500 });
    }

    const { error: setError } = await supabase!
      .from('gallery_images')
      .update({ is_cover: true })
      .eq('id', image_id);
    if (setError) {
      return NextResponse.json({ error: setError.message }, { status: 500 });
    }

    const { error: catError } = await supabase!
      .from('gallery_categories')
      .update({ cover_image_id: image_id })
      .eq('id', category_id);
    if (catError) {
      return NextResponse.json({ error: catError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to set cover image.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
