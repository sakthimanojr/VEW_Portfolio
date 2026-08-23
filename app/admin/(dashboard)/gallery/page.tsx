import { createClient } from '@/lib/supabase/server';
import GalleryManager from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
          Gallery
        </h1>
        <p className="mt-1 text-sm text-ink/50">
          Upload, reorder, and manage photos for each category. Changes appear on the website
          immediately.
        </p>
      </div>

      {categories && categories.length > 0 ? (
        <GalleryManager categories={categories} />
      ) : (
        <div className="rounded-xl border border-dashed border-black/15 bg-white py-12 text-center">
          <p className="text-sm text-ink/50">
            No categories found. Run the database migration to seed the 5 default categories.
          </p>
        </div>
      )}
    </div>
  );
}
