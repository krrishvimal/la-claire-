import React from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Sparkles, MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export default function CakesPage() {
  const cakes = PRODUCTS.filter((p) => p.category === 'cakes');

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Centerpiece Delights</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Celebration Cakes
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Bespoke tiered cakes, vintage piped Lambeth cakes, bento surprises, and fresh floral artistry handcrafted fresh to order.
          </p>
        </div>

        {/* Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16">
          {cakes.map((cake) => (
            <ProductCard key={cake.id} product={cake} />
          ))}
        </div>

        {/* Custom Cake Banner */}
        <div className="bg-brand-900 text-cream-50 p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal">
            Need a Custom Theme or Multi-Tier Cake?
          </h3>
          <p className="text-xs sm:text-sm text-brand-200/80 font-sans max-w-xl mx-auto font-light">
            Share your mood board, color palette, or celebration theme directly with our head chef for a personalized quote.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-orders"
              className="px-6 py-3 rounded-full bg-cream-100 text-brand-900 text-xs font-sans font-semibold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Custom Order Form
            </Link>
            <a
              href={createWhatsAppUrl(generateGeneralEnquiryMessage('Custom Cake Consultation'))}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Design Your Cake</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
