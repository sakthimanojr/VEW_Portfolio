import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const categoryId = formData.get('category_id') as string | null;

    if (!file || !categoryId) {
      return NextResponse.json(
        { error: 'A file and category_id are required.' },
        { status: 400 }
      );
    }

    const uploaded = await uploadImageToCloudinary(file);

    const { count } = await supabase!
      .from('gallery_images')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', categoryId);

    const isFirstImage = (count || 0) === 0;

    const { data: inserted, error: insertError } = await supabase!
      .from('gallery_images')
      .insert({
        category_id: categoryId,
        cloudinary_public_id: uploaded.public_id,
        image_url: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        sort_order: count || 0,
        is_cover: isFirstImage,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    if (isFirstImage) {
      await supabase!
        .from('gallery_categories')
        .update({ cover_image_id: inserted.id })
        .eq('id', categoryId);
    }

    return NextResponse.json({ image: inserted });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
