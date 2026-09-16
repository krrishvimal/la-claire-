'use client';

import React from 'react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const categories = [
    { id: 'all', name: 'All Creations' },
    { id: 'most-loved', name: '⭐ Most Loved' },
    { id: 'cakes', name: 'Celebration Cakes' },
    { id: 'desserts', name: 'Swiss Rolls & Desserts' },
    { id: 'hampers', name: 'Gift Hampers' },
    { id: 'festive', name: 'Festive Collections' },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-brand-200/80 shadow-sm space-y-4 font-sans mb-8">
      {/* Categories Row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={
                'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ' +
                (selectedCategory === c.id
                  ? 'bg-brand-900 text-cream-50 shadow-sm'
                  : 'bg-cream-100 text-brand-900 hover:bg-brand-100')
              }
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-brand-500 text-xs">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs bg-cream-50 border border-brand-200 rounded-xl px-3 py-1.5 text-brand-900 focus:outline-none focus:border-brand-500"
          >
            <option value="featured">Featured & Bestsellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
