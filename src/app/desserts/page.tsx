import React from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Sparkles } from 'lucide-react';

export default function DessertsPage() {
  const desserts = PRODUCTS.filter((p) => p.category === 'desserts');

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>French Pastry Craft</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Artisanal Desserts & Swiss Rolls
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Indulge in our famous Meyer Lemon Swiss Rolls, brown butter financiers, Belgian chocolate dipped strawberries, and gourmet cupcakes.
          </p>
        </div>

        {/* Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {desserts.map((d) => (
            <ProductCard key={d.id} product={d} />
          ))}
        </div>

      </div>
    </div>
  );
}
