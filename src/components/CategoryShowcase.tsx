'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-600 font-sans font-semibold">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Explore our thoughtfully curated dessert categories, handcrafted for intimate cravings and grand festivities.
          </p>
        </div>

        {/* Category Cards Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={'/' + category.slug}
              className="group relative h-56 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-brand-200/60 flex flex-col justify-end p-3.5 sm:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/40 to-transparent" />

              <div className="relative z-10 space-y-1 sm:space-y-2 text-white">
                <span className="text-[8px] sm:text-[10px] uppercase font-sans tracking-[0.2em] text-brand-200 font-bold block line-clamp-1">
                  {category.highlightText}
                </span>

                <h3 className="font-serif text-base sm:text-2xl md:text-3xl text-white font-normal group-hover:text-brand-200 transition-colors leading-tight">
                  {category.name}
                </h3>

                <p className="text-[10px] sm:text-xs text-white/80 line-clamp-1 sm:line-clamp-2 font-sans font-light leading-snug hidden xs:block sm:block">
                  {category.tagline}
                </p>

                <div className="pt-1 sm:pt-2 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-sans tracking-wider uppercase font-semibold text-brand-300 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
