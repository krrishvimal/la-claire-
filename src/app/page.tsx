import React from 'react';
import { Hero } from '@/components/Hero';
import { BrandIntroduction } from '@/components/BrandIntroduction';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { ExperienceSection } from '@/components/ExperienceSection';
import { HamperBuilder } from '@/components/HamperBuilder';
import { AtelierVideoBanner } from '@/components/AtelierVideoBanner';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { InstagramGallery } from '@/components/InstagramGallery';
import Link from 'next/link';
import { MessageCircle, Sparkles } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Brand Introduction & Philosophy */}
      <BrandIntroduction />

      {/* 3. Shop by Category */}
      <CategoryShowcase />

      {/* 4. The La Claire Experience */}
      <ExperienceSection />

      {/* 5. Interactive Hamper Builder */}
      <HamperBuilder />

      {/* 6. Atelier Video Manifesto Banner */}
      <AtelierVideoBanner />

      {/* 7. Verified Client Testimonials */}
      <TestimonialsSection />

      {/* 9. Curated Instagram Feed */}
      <InstagramGallery />

      {/* 10. Grand Closing CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-cream-50 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-700/60 text-brand-200 text-xs font-sans font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Celebrate With Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-50 font-normal leading-tight">
            Have Something Special In Mind?
          </h2>

          <p className="text-sm sm:text-base text-brand-200/80 font-sans font-light max-w-xl mx-auto leading-relaxed">
            Tell us what you are celebrating. Whether it is an intimate surprise or a grand festive gathering across Delhi NCR, we will help you make it sweeter.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(generateGeneralEnquiryMessage('bespoke cakes and luxury dessert catering'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Place Your Order</span>
            </a>

            <Link
              href="/custom-orders"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cream-100 hover:bg-white text-brand-900 text-xs font-sans font-semibold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Design Your Cake</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
