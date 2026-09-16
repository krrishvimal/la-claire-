'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { createWhatsAppUrl, generateProductOrderMessage } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { setSelectedProductForModal } = useCart();

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const url = createWhatsAppUrl(
      generateProductOrderMessage({
        productName: product.name,
        size: product.sizes ? product.sizes[0].name : 'Standard',
        flavour: product.flavours ? product.flavours[0] : 'Chef Selection',
      })
    );
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={() => setSelectedProductForModal(product)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-brand-200/60 hover:border-brand-400/80 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-cream-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
          {product.bestseller && (
            <span className="bg-brand-900/90 backdrop-blur-md text-brand-100 text-[8px] sm:text-[10px] font-sans uppercase tracking-widest font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick View Floating Pill on Hover */}
        <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <span className="w-full bg-cream-100/95 backdrop-blur-md text-brand-900 text-[10px] sm:text-xs font-sans font-medium py-1.5 sm:py-2 rounded-xl text-center shadow-lg border border-brand-200/80 flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-white transition-colors">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category / Subcategory */}
          <p className="text-[8px] sm:text-[10px] uppercase font-sans tracking-[0.2em] text-brand-500 font-semibold mb-0.5 sm:mb-1 truncate">
            {product.subCategory || product.category}
          </p>

          {/* Product Title */}
          <h3 className="font-serif text-sm sm:text-lg md:text-xl text-brand-900 font-normal leading-snug group-hover:text-brand-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Brief */}
          <p className="mt-0.5 sm:mt-1.5 text-[11px] sm:text-xs text-brand-900/70 font-sans line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-brand-100 flex items-center justify-between">
          <div>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-brand-400 font-sans block">
              {product.startingPrice ? 'From' : 'Price'}
            </span>
            <span className="font-serif text-xs sm:text-base md:text-lg font-semibold text-brand-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleWhatsAppQuickOrder}
            className="p-1.5 sm:p-2.5 rounded-full bg-brand-50 hover:bg-brand-500 text-brand-700 hover:text-white transition-all shadow-xs sm:shadow-sm flex items-center gap-1 group/btn"
            title="Direct Order"
            aria-label="Direct Order"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
