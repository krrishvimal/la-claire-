'use client';

import React, { useEffect, useRef } from 'react';
import { User, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const THREE_TESTIMONIALS = TESTIMONIALS.slice(0, 3);

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleNodeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !circleNodeRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-testimonial-card', containerRef.current);
      if (cards.length < 2) return;

      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      // Calculate total vertical travel between first and last card notches (36px offset)
      const startY = firstCard.offsetTop + 36;
      const endY = lastCard.offsetTop + 36;
      const totalTravel = endY - startY;

      // 1. Initial State
      gsap.set(circleNodeRef.current, {
        xPercent: -50,
        y: startY,
      });

      // 2. Continuous Gliding Circle Animation with GSAP ScrollTrigger (Velvety Scrub Inertia)
      gsap.to(circleNodeRef.current, {
        y: endY,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 0.8, // Smooth inertia
          invalidateOnRefresh: true,
        },
      });

      // 3. Focal Card Highlighting & Dimming
      cards.forEach((card, idx) => {
        // Timeline for each card: illuminates as scroll reaches it, dims when leaving
        const cardNotchY = card.offsetTop + 36;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 68%',
          end: 'bottom 35%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              boxShadow: '0 20px 45px -10px rgba(61, 38, 49, 0.14)',
              duration: 0.35,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            gsap.to(card, {
              opacity: 0.22,
              scale: 0.98,
              boxShadow: 'none',
              duration: 0.35,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              boxShadow: '0 20px 45px -10px rgba(61, 38, 49, 0.14)',
              duration: 0.35,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            if (idx !== 0) {
              gsap.to(card, {
                opacity: 0.22,
                scale: 0.98,
                boxShadow: 'none',
                duration: 0.35,
                ease: 'power2.out',
              });
            }
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-14 sm:pt-18 md:pt-22 pb-16 sm:pb-24 md:pb-28 bg-[#EFE4DC] relative overflow-hidden">
      
      {/* Background Subtle Parisian Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E5D2C5]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#DFC7B8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#D9C4B7] text-[#865965] text-xs font-sans font-semibold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B67E88]" />
            <span>Kind Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3D2631] font-normal tracking-tight">
            From Delhi NCR&apos;s Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-[#6E505B] font-sans font-light max-w-md mx-auto leading-relaxed">
            Real experiences from celebration hosts, milestone moments, and afternoon tea lovers.
          </p>
        </div>

        {/* Single Continuous Timeline & Traveling Circle Container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          
          {/* 1. Single Continuous Line running from top card notch to bottom card notch */}
          <div 
            ref={lineRef}
            className="absolute left-4 sm:left-10 md:left-12 top-[36px] bottom-[36px] w-[1.5px] bg-white/80 z-0" 
          />

          {/* 2. Traveling Circular Medallion with Authentic Parisian Palmier / Heart Emblem */}
          <div
            ref={circleNodeRef}
            className="absolute left-4 sm:left-10 md:left-12 top-0 z-20 pointer-events-none will-change-transform"
          >
            <div className="w-9 h-9 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-[#B88794] border-2 border-white shadow-xl flex items-center justify-center p-1.5 sm:p-2.5 transition-shadow duration-300">
              {/* Crisp White Botanical Pastry Heart / Palmier Icon */}
              <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-7 sm:h-7"
              >
                <path 
                  d="M50 82C32 64 18 50 18 34C18 20 28 12 40 12C46 12 50 15 50 19C50 15 54 12 60 12C72 12 82 20 82 34C82 50 68 64 50 82Z" 
                  fill="#B88794" 
                  stroke="white" 
                  strokeWidth="4" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M38 22C32 22 26 27 26 35C26 46 38 56 50 68C62 56 74 46 74 35C74 27 68 22 62 22C56 22 52 26 50 30C48 26 44 22 38 22Z" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* 3. Three Review Cards connected along the line */}
          <div className="space-y-6 sm:space-y-12 md:space-y-14 pl-11 sm:pl-24 md:pl-28">
            {THREE_TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className="timeline-testimonial-card relative w-full bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-stone-100/80 space-y-3.5 will-change-[opacity,transform]"
                style={{ opacity: idx === 0 ? 1 : 0.22 }}
              >
                {/* Speech Bubble Triangular Notch at top-8 aligning with the circular medallion */}
                <div className="absolute top-7 -left-3 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />

                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1.5 text-[#C08A88] text-sm tracking-widest">
                  {'★'.repeat(5)}
                </div>

                {/* Testimonial Quote */}
                <p className="font-serif italic text-sm sm:text-base md:text-[16.5px] text-[#3D2631] leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author & Order Subtext Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F4EDE7] flex items-center justify-center text-[#865965] shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-[#2A1820] leading-snug">
                      {t.author}
                    </h4>
                    <p className="text-xs text-[#7A616B] font-sans">
                      Ordered at {t.location.split(',')[0]}, {t.productOrdered}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
