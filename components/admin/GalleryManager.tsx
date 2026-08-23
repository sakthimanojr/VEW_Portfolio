'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useToast } from './Toast';
import CategorySelector from './CategorySelector';
import ImageUploader from './ImageUploader';
import type { Category, GalleryImage } from '@/types';

export default function GalleryManager({ categories }: { categories: Category[] }) {
  const supabase = createClient();
  const { showToast } = useToast();

  const [activeId, setActiveId] = useState(categories[0]?.id || '');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadQueue, setUploadQueue] = useState<{ total: number; done: number } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  const activeCategory = categories.find((c) => c.id === activeId);

  const loadImages = useCallback(async () => {
    if (!activeId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('category_id', activeId)
      .order('sort_order', { ascending: true });
    if (error) {
      showToast('Could not load images. Please retry.', 'error');
    } else {
      setImages(data || []);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUpload = async (files: File[]) => {
    if (!activeId) return;
    setUploadQueue({ total: files.length, done: 0 });
    let successCount = 0;

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category_id', activeId);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        successCount += 1;
      } catch {
        showToast(`Failed to upload "${file.name}". Please retry.`, 'error');
      } finally {
        setUploadQueue((q) => (q ? { ...q, done: q.done + 1 } : q));
      }
    }

    setUploadQueue(null);
    if (successCount > 0) {
      showToast(`${successCount} photo${successCount > 1 ? 's' : ''} uploaded.`, 'success');
      loadImages();
    }
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    const res = await fetch('/api/admin/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showToast('Photo deleted.', 'success');
      loadImages();
    } else {
      showToast('Could not delete photo. Please retry.', 'error');
    }
  };

  const setCover = async (imageId: string) => {
    const res = await fetch('/api/admin/set-cover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: imageId, category_id: activeId }),
    });
    if (res.ok) {
      showToast('Cover image updated.', 'success');
      loadImages();
    } else {
      showToast('Could not update cover image. Please retry.', 'error');
    }
  };

  const persistOrder = async (list: GalleryImage[]) => {
    const payload = list.map((img, i) => ({ id: img.id, sort_order: i }));
    const res = await fetch('/api/admin/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: payload }),
    });
    if (!res.ok) showToast('Could not save the new order. Please retry.', 'error');
  };

  const handleDrop = (dropIndex: number) => {
    if (dragIndex.current === null || dragIndex.current === dropIndex) return;
    const next = [...images];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(dropIndex, 0, moved);
    setImages(next);
    dragIndex.current = null;
    persistOrder(next);
  };

  return (
    <div className="space-y-8">
      <CategorySelector categories={categories} activeId={activeId} onChange={setActiveId} />

      {activeCategory && (
        <p className="text-sm text-ink/50">
          Managing photos for <span className="font-semibold text-ink">{activeCategory.name}</span>
          {images.length > 0 && ` — ${images.length} photo${images.length > 1 ? 's' : ''}`}
        </p>
      )}

      <ImageUploader onFilesSelected={handleUpload} disabled={!activeId || uploadQueue !== null} />

      {uploadQueue && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
          Uploading photo {uploadQueue.done + 1} of {uploadQueue.total}…
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-black/5" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 bg-white py-16 text-center">
          <p className="text-sm font-medium text-ink/50">No photos in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className="group relative aspect-square cursor-grab overflow-hidden rounded-lg border border-black/8 bg-ink active:cursor-grabbing"
            >
              <Image
                src={img.image_url}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
              />
              {img.is_cover && (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/60 group-hover:opacity-100">
                {!img.is_cover && (
                  <button
                    onClick={() => setCover(img.id)}
                    className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/90"
                  >
                    Set as Cover
                  </button>
                )}
                <button
                  onClick={() => setPendingDeleteId(img.id)}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <p className="text-xs text-ink/40">Drag photos to reorder them.</p>
      )}

      {pendingDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink">Delete this photo?</h2>
            <p className="mt-2 text-sm text-ink/60">
              This will permanently remove the photo from the gallery and from storage. This
              can&rsquo;t be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="rounded-lg border border-black/15 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
