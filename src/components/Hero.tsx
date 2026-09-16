'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-14 lg:pb-20 bg-gradient-to-b from-brand-100 via-brand-200/70 to-brand-100 border-b border-brand-200/80 overflow-hidden">
      
      {/* Subtle Ambient Brand Glows */}
      <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-brand-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-400/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxury Hero Inner Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-300/80 shadow-2xl">
          
          {/* Left Column: Brand Story & Editorial CTAs */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-brand-900 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Thoughtfully Crafted Desserts • Delhi NCR</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-900 font-normal tracking-tight leading-[1.15]">
                Thoughtfully Crafted Desserts, <br className="hidden sm:inline" />
                <span className="italic font-light text-brand-700">Made With Love.</span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-brand-900/75 font-sans font-light leading-relaxed">
              Botanical celebration cakes, Meyer lemon Swiss rolls, brown butter financiers, and curated lavender gift hampers — handcrafted fresh daily by pastry chef Anushka Sethi and delivered across Delhi NCR.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-900 hover:bg-brand-800 text-cream-50 text-xs font-sans font-semibold tracking-widest uppercase shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={createWhatsAppUrl(generateGeneralEnquiryMessage('Hero Direct Order'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick Order</span>
              </a>
            </div>

            {/* Value Pillars */}
            <div className="pt-6 border-t border-brand-200/80 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div>
                <p className="font-serif text-lg sm:text-xl font-semibold text-brand-900">100%</p>
                <p className="text-[10px] sm:text-[11px] text-brand-700 font-sans tracking-wide">Handcrafted Fresh</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-semibold text-brand-900">Delhi NCR</p>
                <p className="text-[10px] sm:text-[11px] text-brand-700 font-sans tracking-wide">Chilled Delivery</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-semibold text-brand-900">Bespoke</p>
                <p className="text-[10px] sm:text-[11px] text-brand-700 font-sans tracking-wide">Luxury Hampers</p>
              </div>
            </div>

          </div>

          {/* Right Column: Unified Studio Photoshoot Spread */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9.5] sm:aspect-[16/9.2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/images/la_claire_photoshoot_table.jpg"
                alt="La Claire Patisserie Studio Photoshoot Table Spread"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
