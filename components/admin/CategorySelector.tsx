'use client';

import type { Category } from '@/types';

export default function CategorySelector({
  categories,
  activeId,
  onChange,
}: {
  categories: Category[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery category">
      {categories.map((c) => (
        <button
          key={c.id}
          role="tab"
          aria-selected={c.id === activeId}
          onClick={() => onChange(c.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            c.id === activeId
              ? 'bg-primary text-white'
              : 'bg-white text-ink/60 border border-black/10 hover:border-primary/40'
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
