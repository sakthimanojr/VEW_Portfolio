import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { deleteImageFromCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Image id is required.' }, { status: 400 });
    }

    const { data: image, error: fetchError } = await supabase!
      .from('gallery_images')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !image) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }

    await deleteImageFromCloudinary(image.cloudinary_public_id).catch(() => {
      // If the asset is already gone from Cloudinary, continue removing
      // the database row rather than blocking the admin.
    });

    const { error: deleteError } = await supabase!.from('gallery_images').delete().eq('id', id);
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    if (image.is_cover) {
      const { data: nextImage } = await supabase!
        .from('gallery_images')
        .select('id')
        .eq('category_id', image.category_id)
        .order('sort_order', { ascending: true })
        .limit(1)
        .maybeSingle();

      await supabase!
        .from('gallery_categories')
        .update({ cover_image_id: nextImage?.id || null })
        .eq('id', image.category_id);

      if (nextImage) {
        await supabase!.from('gallery_images').update({ is_cover: true }).eq('id', nextImage.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
