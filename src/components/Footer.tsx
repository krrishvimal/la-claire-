import React from 'react';
import Link from 'next/link';
import { Instagram, MessageCircle, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-brand-900 text-cream-100 pt-12 sm:pt-16 pb-24 sm:pb-12 border-t border-brand-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-800/60">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="font-serif text-3xl md:text-4xl text-cream-50 font-normal tracking-tight">
                La Claire
              </h2>
              <p className="text-[10px] uppercase tracking-[0.35em] text-brand-300 font-semibold mt-0.5">
                Patisserie • Delhi NCR
              </p>
            </Link>
            
            <p className="text-sm text-brand-200/80 leading-relaxed max-w-md font-light">
              Thoughtfully crafted desserts, made with love. Transforming sweetest milestones into bespoke edible memories with Parisian craftsmanship and refined modern aesthetics. Founded by Anushka Sethi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/laclairepatisserie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-800/60 hover:bg-brand-700 flex items-center justify-center text-brand-200 hover:text-white transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={createWhatsAppUrl(generateGeneralEnquiryMessage('placing an order with La Claire'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center text-white transition-all"
                title="Direct Order Line"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-cream-50 font-medium">Collections</h3>
            <ul className="space-y-2 text-xs md:text-sm text-brand-200/80">
              <li><Link href="/cakes" className="hover:text-white transition-colors">Celebration Cakes</Link></li>
              <li><Link href="/desserts" className="hover:text-white transition-colors">Artisanal Swiss Rolls</Link></li>
              <li><Link href="/desserts" className="hover:text-white transition-colors">Hazelnut Financiers</Link></li>
              <li><Link href="/desserts" className="hover:text-white transition-colors">Chocolate Dipped Berries</Link></li>
              <li><Link href="/hampers" className="hover:text-white transition-colors">Luxury Gift Hampers</Link></li>
              <li><Link href="/hampers" className="hover:text-white transition-colors">Kitty Party Favours</Link></li>
            </ul>
          </div>

          {/* Col 4: Experiences & Services */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-cream-50 font-medium">Experience</h3>
            <ul className="space-y-2 text-xs md:text-sm text-brand-200/80">
              <li><Link href="/custom-orders" className="hover:text-white transition-colors">Bespoke Custom Cakes</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Dessert Tables & Events</Link></li>
              <li><Link href="/hampers#builder" className="hover:text-white transition-colors">Build Your Own Hamper</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Craft & Philosophy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Delivery Coverage & FAQs</Link></li>
            </ul>
          </div>

          {/* Col 5: Delivery & Direct Contact */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-cream-50 font-medium">Delivery & Orders</h3>
            <div className="space-y-2.5 text-xs text-brand-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Delivering chilled across South Delhi, Central Delhi, Gurgaon, Noida & NCR</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Orders: Mon–Sun, 10:00 AM – 9:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Direct Line: +91 96542 38328</span>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-brand-800/80 border border-brand-700/60 rounded px-2.5 py-1 text-[11px] text-brand-200">
                  ✨ Handcrafted Fresh Daily in Small Batches
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-300/60 gap-4">
          <p>© 2025 La Claire Patisserie. All rights reserved. Handcrafted in Delhi NCR.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-cream-100 transition-colors">Craftsmanship</Link>
            <Link href="/custom-orders" className="hover:text-cream-100 transition-colors">Custom Enquiries</Link>
            <Link href="/contact" className="hover:text-cream-100 transition-colors">Delhi NCR Delivery</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
