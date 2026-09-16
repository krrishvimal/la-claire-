import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function OccasionsGrid() {
  const occasions = [
    { title: 'Milestone Birthdays', desc: 'Vintage Lambeth, bento surprises & multi-tier floral cakes', link: '/cakes' },
    { title: 'Anniversaries & Romance', desc: 'Heart cakes, Belgian chocolate berries & champagne notes', link: '/cakes' },
    { title: 'Baby Showers & Welcomes', desc: 'Pastel dessert tables & personalized return favours', link: '/events' },
    { title: 'Kitty Parties & High Teas', desc: 'Melt-in-mouth Swiss rolls, financiers & chic gift bundles', link: '/hampers' },
    { title: 'Festive & Diwali Gifting', desc: 'Luxury keepsake boxes with Indian spice infusions', link: '/hampers' },
    { title: 'Corporate & Client Gifting', desc: 'Custom branded ribbon sleeves & bulk courier dispatch', link: '/hampers' },
    { title: 'Weddings & Engagements', desc: 'Architectural botanical tiered centerpieces', link: '/events' },
    { title: 'Everyday Indulgence', desc: 'Because little moments deserve something beautiful', link: '/desserts' },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-600 font-sans font-semibold">
            Celebration Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal">
            Crafted For Every Occasion
          </h2>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Whatever you are celebrating, La Claire elevates the experience with thoughtful pastry design.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <Link
              key={idx}
              href={occ.link}
              className="p-6 rounded-2xl bg-cream-100 hover:bg-brand-50 border border-brand-200/60 hover:border-brand-400/80 transition-all duration-300 hover:shadow-md group flex flex-col justify-between h-48"
            >
              <div>
                <h3 className="font-serif text-lg text-brand-900 font-medium group-hover:text-brand-700 transition-colors">
                  {occ.title}
                </h3>
                <p className="text-xs text-brand-900/70 font-sans mt-2 leading-relaxed">
                  {occ.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-600 group-hover:text-brand-900 transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
