export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image_id: string | null;
  sort_order: number;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  category_id: string;
  cloudinary_public_id: string;
  image_url: string;
  width: number | null;
  height: number | null;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
};

export type CategoryWithImages = Category & {
  gallery_images: GalleryImage[];
};

export type CategoryWithCover = Category & {
  cover_image: GalleryImage | null;
  image_count: number;
};

export type AdminUser = {
  id: string;
  email: string;
};
