'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, generateCustomOrderMessage } from '@/lib/whatsapp';

export function CustomOrderSection() {
  const steps = [
    { number: '01', title: 'Share Your Occasion & Vision', desc: 'Tell us your date, guest count, and design inspiration.' },
    { number: '02', title: 'Flavour & Aesthetics Curation', desc: 'Choose from our artisan flavour pairings and custom color palettes.' },
    { number: '03', title: 'Handcrafted With Love', desc: 'Freshly baked and hand-piped in our Delhi NCR studio kitchen.' },
    { number: '04', title: 'Chilled Safe Delivery', desc: 'Delivered in climate-controlled packaging across Delhi NCR.' },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream-100 to-brand-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-300/60 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Bespoke Pastry Service</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal leading-[1.2]">
              Made For Your Moment. <br />
              <span className="italic text-brand-700">Custom Cakes & Gifting.</span>
            </h2>

            <p className="text-sm sm:text-base text-brand-900/80 font-sans font-light leading-relaxed">
              Have a specific floral theme, vintage piping request, or dessert table requirement? We collaborate closely with you to design a showstopper centerpiece that tastes as exceptional as it looks.
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {steps.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-brand-200/80 space-y-1">
                  <span className="font-serif text-lg font-bold text-brand-500">{s.number}</span>
                  <h4 className="font-serif text-sm font-medium text-brand-900">{s.title}</h4>
                  <p className="text-xs text-brand-900/70 font-sans leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/custom-orders"
                className="px-8 py-3.5 rounded-full bg-brand-900 hover:bg-brand-800 text-cream-50 text-xs font-sans font-semibold uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Create Something Custom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href={createWhatsAppUrl(
                  generateCustomOrderMessage({
                    name: 'Client',
                    phone: '',
                    occasion: 'Custom Cake / Event Enquiry',
                    date: 'Upcoming Celebration',
                    guests: '10-20',
                    productType: 'Custom Cake',
                    flavour: 'Recommended by Chef',
                    budget: 'Custom Quotation',
                    deliveryLocation: 'Delhi NCR',
                    specialRequests: 'I would like to discuss a customized cake design for my upcoming celebration.',
                  })
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Design Your Cake</span>
              </a>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/cake 2.jpg"
                alt="Vintage Piped Custom Cake"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
