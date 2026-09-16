import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Instagram, Sparkles, Truck, Check } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export default function ContactPage() {
  const deliveryAreas = [
    'South Delhi (Vasant Vihar, GK, Defence Colony, Hauz Khas, Saket)',
    'Central & New Delhi (Chanakyapuri, Golf Links, Jor Bagh, Connaught Place)',
    'Gurgaon (Golf Course Road, Cyber City, DLF Phases 1-5, Sohna Road)',
    'Noida & Greater Noida (Sectors 15 to 137)',
    'West & North Delhi (Punjabi Bagh, Rajouri Garden, Model Town, Civil Lines)',
  ];

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Get in Touch</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Contact & Delivery Details
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            We are always happy to answer questions regarding flavours, custom cake designs, and delivery time slots.
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Direct WhatsApp Concierge Card */}
          <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-3xl border border-brand-200 shadow-md space-y-6">
            <h3 className="font-serif text-2xl text-brand-900">Direct Order Hotline</h3>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light leading-relaxed">
              Connect with us for quick inquiries, cake weights, custom requests, real-time availability, and delivery schedules directly with our team.
            </p>

            <div className="space-y-4 pt-2 font-sans text-xs sm:text-sm text-brand-800">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span>+91 96542 38328</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Everyday: 10:00 AM – 9:00 PM IST</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-brand-500 shrink-0" />
                <span>@laclairepatisserie</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={createWhatsAppUrl(generateGeneralEnquiryMessage('placing an order or custom consultation'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Our Team (+91 96542 38328)</span>
              </a>
            </div>
          </div>

          {/* Delivery Coverage Card */}
          <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-3xl border border-brand-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 text-brand-700">
              <Truck className="w-5 h-5 text-brand-500" />
              <h3 className="font-serif text-2xl text-brand-900">Delhi NCR Delivery Radius</h3>
            </div>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light leading-relaxed">
              All delicate patisserie items, cakes, and gift hampers are transported in temperature-monitored vehicles to preserve texture and presentation.
            </p>

            <div className="space-y-2.5 font-sans text-xs text-brand-800">
              {deliveryAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-cream-50 border border-brand-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
