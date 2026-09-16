'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { FilterBar } from '@/components/FilterBar';
import { Sparkles } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'most-loved') {
        list = list.filter((p) => p.bestseller || p.featured);
      } else if (selectedCategory === 'desserts') {
        list = list.filter((p) => p.category === 'desserts');
      } else if (selectedCategory === 'cakes') {
        list = list.filter((p) => p.category === 'cakes');
      } else if (selectedCategory === 'hampers') {
        list = list.filter((p) => p.category === 'hampers' || p.category === 'festive');
      } else if (selectedCategory === 'festive') {
        list = list.filter((p) => p.category === 'festive');
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>The Patisserie Collection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Our Complete Menu
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Every creation is handcrafted with love and delivered fresh across Delhi NCR.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid: 2 columns on mobile, 3 columns on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-brand-200 text-brand-500 font-sans">
            No creations found for the selected category.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} priority={idx < 4} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
