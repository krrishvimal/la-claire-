'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function BestsellersSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'cakes' | 'desserts' | 'hampers'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.bestseller || p.featured;
    if (activeTab === 'cakes') return p.category === 'cakes';
    if (activeTab === 'desserts') return p.category === 'desserts';
    if (activeTab === 'hampers') return p.category === 'hampers' || p.category === 'festive';
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-600 font-sans font-semibold">
              Client Favourites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal">
              Most Loved Creations
            </h2>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light max-w-xl">
              From our melt-in-mouth Citrus Swiss Roll to bespoke celebration cakes and signature lavender gift boxes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {[
              { label: 'All Bestsellers', value: 'all' },
              { label: 'Cakes', value: 'cakes' },
              { label: 'Desserts & Rolls', value: 'desserts' },
              { label: 'Hampers', value: 'hampers' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={
                  'px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all whitespace-nowrap ' +
                  (activeTab === tab.value
                    ? 'bg-brand-900 text-cream-50 shadow-sm'
                    : 'bg-cream-100 text-brand-900 hover:bg-brand-100')
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 3} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cream-200 hover:bg-brand-200 text-brand-900 text-xs font-sans font-semibold tracking-widest uppercase transition-all shadow-sm hover:shadow"
          >
            <span>View Full Patisserie Menu</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </Link>
        </div>

      </div>
    </section>
  );
}
