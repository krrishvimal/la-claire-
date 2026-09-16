import React from 'react';
import { BespokeOrderForm } from '@/components/BespokeOrderForm';
import { Sparkles, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export default function CustomOrdersPage() {
  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Bespoke Confectionery</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-900 font-normal">
            Custom Orders & Celebrations
          </h1>
          <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
            Whether you envision a vintage piped heart cake, a multi-tier floral wedding centerpiece, or custom branded party favors, our kitchen is at your service.
          </p>
        </div>

        {/* Form Container */}
        <BespokeOrderForm />

      </div>
    </div>
  );
}
