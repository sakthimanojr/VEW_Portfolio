import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: NextRequest) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  try {
    const { images } = (await request.json()) as {
      images: { id: string; sort_order: number }[];
    };

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'images array is required.' }, { status: 400 });
    }

    const results = await Promise.all(
      images.map(({ id, sort_order }) =>
        supabase!.from('gallery_images').update({ sort_order }).eq('id', id)
      )
    );

    const failed = results.find((r) => r.error);
    if (failed?.error) {
      return NextResponse.json({ error: failed.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Reorder failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
