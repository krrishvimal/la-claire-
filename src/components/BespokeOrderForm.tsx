'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, generateCustomOrderMessage } from '@/lib/whatsapp';

export function BespokeOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Birthday',
    date: '',
    guests: '10-15 Servings (1.5kg)',
    productType: 'Tiered Floral Celebration Cake',
    flavour: 'Belgian Chocolate Truffle & Salted Caramel',
    budget: '₹3,000 – ₹5,000',
    deliveryLocation: 'South Delhi / Gurgaon',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppUrl(generateCustomOrderMessage(formData));
    window.open(url, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-brand-200 shadow-2xl space-y-6 sm:space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-brand-500 font-sans font-semibold block mb-1">
          Custom Consultation
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-brand-900 font-normal">
          Tell Us About Your Celebration
        </h3>
        <p className="text-xs sm:text-sm text-brand-900/70 font-sans mt-1">
          Fill out your requirements below to discuss and finalize your custom cake directly with Chef Anushka Sethi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-sans">
        
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Radhika Singhania"
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +91 98100 XXXXX"
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Occasion *
          </label>
          <select
            value={formData.occasion}
            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          >
            <option value="Birthday Celebration">Birthday Celebration</option>
            <option value="Anniversary & Romance">Anniversary & Romance</option>
            <option value="Baby Shower / Welcome Baby">Baby Shower / Welcome Baby</option>
            <option value="Bridal Shower / Bachelorette">Bridal Shower / Bachelorette</option>
            <option value="Wedding / Engagement Milestone">Wedding / Engagement Milestone</option>
            <option value="Kitty Party / High Tea Gathering">Kitty Party / High Tea Gathering</option>
            <option value="Festive / Corporate Gifting">Festive / Corporate Gifting</option>
            <option value="Other Bespoke Celebration">Other Bespoke Celebration</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Date of Celebration *
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Number of Guests / Size *
          </label>
          <input
            type="text"
            required
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            placeholder="e.g. 15-20 guests (2.0kg cake)"
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Creation Type *
          </label>
          <select
            value={formData.productType}
            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          >
            <option value="Tiered Floral Celebration Cake">Tiered Floral Celebration Cake</option>
            <option value="Vintage Lambeth Piped Cake">Vintage Lambeth Piped Cake</option>
            <option value="Minimalist Bento Cake Surprise">Minimalist Bento Cake Surprise</option>
            <option value="Dessert Table Styling & Multiple Items">Dessert Table Styling & Multiple Items</option>
            <option value="Bulk Return Favours / Gifting Hampers">Bulk Return Favours / Gifting Hampers</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Preferred Flavours
          </label>
          <input
            type="text"
            value={formData.flavour}
            onChange={(e) => setFormData({ ...formData, flavour: e.target.value })}
            placeholder="e.g. Belgian Truffle, Meyer Lemon, Pistachio Rose"
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
            Delivery Area (Delhi NCR) *
          </label>
          <input
            type="text"
            required
            value={formData.deliveryLocation}
            onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
            placeholder="e.g. Vasant Vihar / Golf Course Road Gurgaon"
            className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
          />
        </div>

      </div>

      <div className="font-sans">
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
          Design Vision, Color Theme or Special Message
        </label>
        <textarea
          rows={3}
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          placeholder="Share your color palette preference (e.g. soft lavender and ivory), reference themes, or specific lettering required on the cake..."
          className="w-full text-sm bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-brand-900 focus:outline-none focus:border-brand-500"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 px-6 rounded-2xl text-sm font-semibold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Send Custom Order Details</span>
        </button>
      </div>
    </form>
  );
}
