import { createClient } from '@/lib/supabase/server';
import { serviceCategories } from '@/lib/config';
import type { Category, CategoryWithCover, CategoryWithImages, GalleryImage } from '@/types';

// All read functions are safe to call from Server Components. They rely on
// RLS "public read" policies, so no service-role key is needed here.

export async function getCategoriesWithCover(): Promise<CategoryWithCover[]> {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  const base: Category[] =
    categories && categories.length > 0
      ? categories
      : serviceCategories.map((c, i) => ({
          id: c.slug,
          name: c.name,
          slug: c.slug,
          description: c.description,
          cover_image_id: null,
          sort_order: i,
          created_at: new Date().toISOString(),
        }));

  return base.map((cat) => {
    const catImages = (images || []).filter((img: GalleryImage) => img.category_id === cat.id);
    const cover =
      catImages.find((img: GalleryImage) => img.is_cover) || catImages[0] || null;
    return {
      ...cat,
      cover_image: cover,
      image_count: catImages.length,
    };
  });
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithImages | null> {
  const supabase = await createClient();

  const { data: category } = await supabase
    .from('gallery_categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  const fallback = serviceCategories.find((c) => c.slug === slug);
  if (!category && !fallback) return null;

  const baseCategory: Category = category || {
    id: slug,
    name: fallback!.name,
    slug: fallback!.slug,
    description: fallback!.description,
    cover_image_id: null,
    sort_order: 0,
    created_at: new Date().toISOString(),
  };

  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('category_id', baseCategory.id)
    .order('sort_order', { ascending: true });

  return { ...baseCategory, gallery_images: images || [] };
}

export async function getAllCategoriesRaw(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('sort_order', { ascending: true });
  return data || [];
}
