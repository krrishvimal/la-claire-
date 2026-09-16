import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Instagram, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>The Story of La Claire</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal leading-[1.2]">
              Behind Every <br />
              <span className="italic text-brand-700">Sweet Moment.</span>
            </h1>

            <p className="text-sm sm:text-base text-brand-900/80 font-sans font-light leading-relaxed">
              Founded by pastry chef Anushka Sethi (@anushkasethi13), La Claire Patisserie began with a singular devotion: to craft delicate French-inspired patisserie with an intentional, heartfelt approach to gifting and celebration.
            </p>

            <p className="text-sm sm:text-base text-brand-900/80 font-sans font-light leading-relaxed">
              Based in Delhi NCR, our kitchen operates on the pillars of pure ingredients, fresh daily baking, and restrained aesthetic beauty. We believe desserts should neither be cloyingly sweet nor mass-produced. Every sponge is rolled by hand, every strawberry hand-dipped, and every cake frosted to order.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/cake3.webp"
                alt="La Claire Patisserie Kitchen Craft"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 rounded-3xl bg-white border border-brand-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-brand-900">French Technique</h3>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans leading-relaxed">
              From beurre noisette in our financiers to featherweight chiffon in our Swiss rolls, we honor classic French pastry disciplines.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-brand-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-brand-900">Artisanal Purity</h3>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans leading-relaxed">
              Meticulously perfected recipes that achieve airy sponges, silky ganaches, and luscious curds with pure gourmet ingredients.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-brand-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-brand-900">Thoughtful Gifting</h3>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans leading-relaxed">
              Signature matte lavender boxes, satin ribbons, and custom cards that make receiving La Claire an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Founder note */}
        <div className="bg-brand-900 text-cream-50 p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">Connect With The Founder</h3>
            <p className="text-xs sm:text-sm text-brand-200/80 font-sans font-light leading-relaxed">
              Follow behind the scenes recipe experiments and daily kitchen stories on Instagram.
            </p>
          </div>
          <a
            href="https://instagram.com/anushkasethi13"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>@anushkasethi13</span>
          </a>
        </div>

      </div>
    </div>
  );
}
