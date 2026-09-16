'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export function WhatsAppFloatingButton() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button (Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Quick Popover */}
        {popoverOpen && (
          <div className="mb-3 p-4 bg-white rounded-2xl shadow-2xl border border-brand-200/80 max-w-xs animate-fadeIn text-brand-900 text-xs space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-brand-100">
              <div className="flex items-center gap-1.5 font-serif text-sm text-brand-900 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>La Claire Studio</span>
              </div>
              <button onClick={() => setPopoverOpen(false)} className="text-brand-400 hover:text-brand-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-brand-900/70 leading-relaxed font-sans">
              Planning a celebration or looking for bespoke gifting across Delhi NCR? Chat directly with our pastry team.
            </p>
            <a
              href={createWhatsAppUrl(generateGeneralEnquiryMessage('celebration orders and bespoke gifting'))}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 rounded-xl transition-all shadow-sm"
            >
              Chat with Our Team
            </a>
          </div>
        )}

        <button
          onClick={() => setPopoverOpen(!popoverOpen)}
          className="bg-brand-500 hover:bg-brand-600 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105 group border-2 border-white/80"
          aria-label="Direct Support"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            Direct Support
          </span>
        </button>
      </div>
    </>
  );
}
