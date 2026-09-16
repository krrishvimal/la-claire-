'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function AtelierVideoBanner() {
  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[620px] flex items-center overflow-hidden bg-brand-950">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none scale-105 transition-opacity duration-1000"
      >
        <source src="/videos/Video-63604.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Vignette Overlay (Darker on the left for maximum editorial text legibility) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Main Editorial Italic Title (Matching Reference Layout) */}
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-cream-50 font-normal leading-[1.25] tracking-tight drop-shadow-md">
            Atelier La Claire is a daily tribute and a reinvention of Chef Anushka&apos;s style.
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-sm md:text-[15px] text-cream-100/90 font-sans font-light leading-relaxed max-w-xl drop-shadow-sm">
            Join Chef Anushka as she scouts the finest seasonal ingredients, Tahitian vanilla beans, and single-origin Belgian chocolates. Watch her reimagine neo-classical French patisserie with modern artisanal flair and handcrafted Delhi precision!
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-cream-50 hover:bg-white text-brand-950 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl hover:scale-105 inline-flex items-center justify-center"
            >
              Shop Now
            </Link>

            <Link
              href="/custom-orders"
              className="px-7 py-3.5 bg-brand-900/60 hover:bg-brand-900/90 text-cream-50 border border-cream-200/40 backdrop-blur-md font-sans text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 shadow-md inline-flex items-center gap-2"
            >
              <span>Custom Cakes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
