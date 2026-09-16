import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export default function EventsPage() {
  const eventTypes = [
    { title: 'Intimate Weddings & Engagements', desc: 'Multi-tiered centerpiece cakes and individualized guest dessert boxes.', image: '/images/cake4.webp' },
    { title: 'Baby Showers & Welcomes', desc: 'Soft pastel themed dessert tables, mini cakes, and custom return gifts.', image: '/images/cake1.webp' },
    { title: 'Kitty Parties & High Teas', desc: 'Assorted Swiss roll bites, financiers, and host gift boxes.', image: '/images/anushka_profile.webp' },
    { title: 'Corporate Soirées & Client Gifting', desc: 'Branded luxury gift boxes with courier dispatch across Delhi NCR.', image: '/images/chocolate_strawberry.webp' },
  ];

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Celebration Catering</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Events & Dessert Tables
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Elevating gatherings across Delhi NCR with turnkey dessert tables, customized cake styling, and luxury edible favours.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventTypes.map((e, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-brand-200 shadow-md group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
                <Image src={e.image} alt={e.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 space-y-3">
                <h3 className="font-serif text-2xl text-brand-900">{e.title}</h3>
                <p className="text-xs sm:text-sm text-brand-900/70 font-sans leading-relaxed">{e.desc}</p>
                <div className="pt-2">
                  <a
                    href={createWhatsAppUrl(generateGeneralEnquiryMessage(`Event Enquiry: ${e.title}`))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-900 transition-colors"
                  >
                    <span>Enquire for this event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-900 text-cream-50 p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal">
            Planning an upcoming milestone or private gathering?
          </h3>
          <p className="text-xs sm:text-sm text-brand-200/80 font-sans max-w-xl mx-auto font-light">
            Our event styling team collaborates with you on quantities, color palettes, display stands, and delivery schedules.
          </p>
          <div className="pt-2">
            <a
              href={createWhatsAppUrl(generateGeneralEnquiryMessage('Events & Dessert Tables Consultation'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold uppercase tracking-widest transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire for Events</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
