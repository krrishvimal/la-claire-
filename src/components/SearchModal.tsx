'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProductForModal } = useCart();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.flavours && p.flavours.some((f) => f.toLowerCase().includes(q)))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-brand-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-200 overflow-hidden"
      >
        {/* Search Header */}
        <div className="p-5 border-b border-brand-100 flex items-center gap-3 bg-cream-50">
          <Search className="w-5 h-5 text-brand-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, Swiss rolls, hampers, flavours..."
            autoFocus
            className="w-full text-base font-sans bg-transparent text-brand-900 placeholder:text-brand-300 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-brand-100 text-brand-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-brand-400">
              <p>Try searching for <span className="font-semibold text-brand-600">"Citrus Swiss Roll"</span>, <span className="font-semibold text-brand-600">"Floral Cake"</span>, <span className="font-semibold text-brand-600">"Financiers"</span>, or <span className="font-semibold text-brand-600">"Hampers"</span>.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-brand-400">
              No creations found matching "{query}".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  setSelectedProductForModal(p);
                }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-cream-100 cursor-pointer border border-transparent hover:border-brand-200 transition-all"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-base text-brand-900">{p.name}</h4>
                  <p className="text-xs text-brand-500 font-sans">{p.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-brand-900 block">
                    {formatPrice(p.price)}
                  </span>
                  <span className="text-[10px] text-brand-400 flex items-center justify-end gap-1">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
