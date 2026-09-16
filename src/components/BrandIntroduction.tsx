'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function BrandIntroduction() {
  return (
    <section className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Imagery Composition */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/chocolate_strawberry.webp"
                alt="Handcrafted Belgian Chocolate Berries"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Overlay Accent Card */}
            <div className="absolute -bottom-6 -right-6 bg-brand-900 text-cream-50 p-6 rounded-2xl shadow-xl max-w-xs border border-brand-800 hidden sm:block">
              <p className="font-serif italic text-lg leading-snug">
                "Dessert is not just a treat; it is a shared memory."
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-300 mt-2 font-semibold font-sans">
                � Anushka Sethi, Founder
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Text & Philosophy */}
          <div className="lg:col-span-7 space-y-6 lg:pl-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-600 font-sans font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>The Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal leading-[1.2]">
              Little moments deserve <br />
              <span className="italic text-brand-700">something beautiful.</span>
            </h2>

            <p className="text-sm sm:text-base text-brand-900/80 leading-relaxed font-sans font-light">
              La Claire Patisserie was founded on a simple yet profound belief: that desserts should be thoughtful expressions of love, celebration, and culinary elegance. Based in Delhi NCR, we craft each recipe from scratch using pure European chocolates, French pastry techniques, and seasonal natural ingredients.
            </p>

            <p className="text-sm sm:text-base text-brand-900/80 leading-relaxed font-sans font-light">
              Whether it is our melt-in-mouth Citrus Swiss Roll, roasted brown butter financiers, or an intricately piped celebration cake for a milestone birthday, every creation arrives packaged in our signature lavender boxes with the utmost care.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-brand-900 hover:text-brand-600 transition-colors border-b border-brand-900 pb-1"
              >
                <span>Read Our Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/custom-orders"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-brand-600 hover:text-brand-800 transition-colors"
              >
                <span>Plan A Custom Cake</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
