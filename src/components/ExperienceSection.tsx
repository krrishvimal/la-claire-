'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function ExperienceSection() {
  const pillars = [
    {
      icon: '/images/features/357503718_191449423896556_2924519817396782192_n.jpg',
      title: 'Handcrafted Fresh Daily',
      subtitle: 'Small Batch Pastry',
      description: 'Slow-baked fresh to order in our Delhi NCR studio kitchen with pure European butter and zero artificial preservatives.',
    },
    {
      icon: '/images/features/357395064_242411281914073_5697256933906770837_n.jpg',
      title: 'French Pastry Discipline',
      subtitle: 'Parisian Technique',
      description: 'From caramelized beurre noisette in our financiers to featherweight chiffon in our Swiss rolls, we honor true French craft.',
    },
    {
      icon: '/images/features/357513582_861141185367400_4133984067366317222_n.jpg',
      title: 'Artisanal Purity & Craft',
      subtitle: 'Made With Love',
      description: 'Airy sponges, silky ganaches, and luscious fruit curds perfected with pure gourmet ingredients without compromise.',
    },
    {
      icon: '/images/features/357646192_238574782363124_303901985810526328_n.jpg',
      title: 'Thoughtful Luxury Gifting',
      subtitle: 'Keepsake Packaging',
      description: 'Rigid signature lavender boxes adorned with satin ribbons, wax seals, and personalized handwritten calligraphy notes.',
    },
    {
      icon: '/images/features/446688463_979912853850401_8434064920920865105_n.jpg',
      title: 'Chilled Delhi NCR Delivery',
      subtitle: 'Safe Climate Transit',
      description: 'Temperature-controlled logistics ensuring your delicate cakes, rolls, and hampers arrive in pristine bakery condition.',
    },
    {
      icon: '/images/features/357645071_1265021110856255_5563155173470547506_n.jpg',
      title: 'Bespoke Celebration Styling',
      subtitle: 'Turnkey Events',
      description: 'Custom milestone celebration cakes, dessert tables, baby shower favors, kitty hampers, and one-on-one chef consultations.',
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-cream-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Curved Luxury Container with Visible Video Background */}
        <div className="relative rounded-[2rem] overflow-hidden bg-brand-900 border border-brand-700/80 shadow-2xl py-10 sm:py-12 px-5 sm:px-8 lg:px-10">
          
          {/* Background Video (High Clarity) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
          >
            <source src="/videos/features2.mp4" type="video/mp4" />
          </video>

          {/* Lighter Luxury Vignette Overlay for maximum video visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 via-brand-900/20 to-brand-900/60 pointer-events-none" />

          {/* Section Content */}
          <div className="relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-900/80 backdrop-blur-md border border-white/20 text-brand-200 text-[10px] font-sans tracking-widest uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-brand-300 animate-pulse" />
                <span>The Standard of Craft</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream-50 font-normal tracking-tight drop-shadow-md">
                The La Claire Experience
              </h2>
              <p className="text-xs sm:text-sm text-brand-100/90 font-sans font-light max-w-lg mx-auto leading-relaxed drop-shadow-sm">
                Devotion to Parisian pastry technique, pure natural ingredients, and warm celebration traditions.
              </p>
            </div>

            {/* 6 Frosted Glass Feature Cards: Swipe Carousel on Mobile, 3-Col Grid on Desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory scrollbar-none no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-[82vw] max-w-[310px] md:w-auto snap-center group p-4 sm:p-6 rounded-2xl bg-brand-950/55 hover:bg-brand-900/75 backdrop-blur-md border border-white/20 hover:border-brand-300/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      {/* Authentic Lavender Illustration Icon */}
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md border border-white/30 group-hover:border-brand-200 group-hover:scale-105 transition-all duration-300 bg-brand-200 shrink-0">
                        <Image
                          src={pillar.icon}
                          alt={pillar.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <span className="text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.2em] text-brand-300 font-semibold block">
                          {pillar.subtitle}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg md:text-xl text-cream-50 font-normal leading-snug group-hover:text-brand-200 transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-brand-100/85 font-sans font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Mobile Pillar Number Indicator */}
                  <div className="md:hidden pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-brand-300/70 font-sans uppercase tracking-widest">
                    <span>Pillar 0{idx + 1} of 06</span>
                    <span className="text-brand-200">Swipe →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Guidance Dots */}
            <div className="md:hidden flex items-center justify-center gap-1.5 pt-3">
              {pillars.map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  className="w-1.5 h-1.5 rounded-full bg-cream-100/40"
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
