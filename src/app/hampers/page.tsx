import React from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { HamperBuilder } from '@/components/HamperBuilder';
import { Sparkles, Gift } from 'lucide-react';

export default function HampersPage() {
  const hampers = PRODUCTS.filter((p) => p.category === 'hampers' || p.category === 'festive');

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-brand-600" />
            <span>Luxury Gifting</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Hampers & Curated Gifting
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Thoughtful gifting, beautifully put together in our signature keepsake lavender boxes. Designed for festive celebrations, kitty parties, corporate gestures, and return favors across Delhi NCR.
          </p>
        </div>

        {/* Pre-curated Hampers Grid */}
        <div className="mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-900 mb-8 text-center md:text-left">
            Signature Pre-Curated Hampers
          </h2>
          {/* Grid: 2 columns on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {hampers.map((h) => (
              <ProductCard key={h.id} product={h} />
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Builder */}
      <HamperBuilder />
    </div>
  );
}
