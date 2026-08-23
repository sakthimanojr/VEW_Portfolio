import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: categoryCount }, { count: imageCount }, { data: recentImages }] =
    await Promise.all([
      supabase.from('gallery_categories').select('id', { count: 'exact', head: true }),
      supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      supabase
        .from('gallery_images')
        .select('id, image_url, created_at, category_id, gallery_categories(name)')
        .order('created_at', { ascending: false })
        .limit(6),
    ]);

  const stats = [
    { label: 'Total Categories', value: categoryCount ?? 0 },
    { label: 'Total Uploaded Images', value: imageCount ?? 0 },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-ink/50">Overview of your gallery content.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-black/8 bg-white p-6">
            <p className="font-display text-4xl font-black text-primary">{s.value}</p>
            <p className="mt-1.5 text-sm font-medium text-ink/60">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink/60">
            Recent Uploads
          </h2>
          <Link href="/admin/gallery" className="text-sm font-semibold text-primary hover:underline">
            Manage Gallery →
          </Link>
        </div>

        {recentImages && recentImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recentImages.map((img: any) => (
              <div key={img.id} className="aspect-square overflow-hidden rounded-lg border border-black/8 bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-black/15 bg-white py-12 text-center">
            <p className="text-sm text-ink/50">No images uploaded yet.</p>
          </div>
        )}
      </div>

      <Link
        href="/admin/gallery"
        className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Manage Gallery
      </Link>
    </div>
  );
}
