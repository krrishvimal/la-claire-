'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { createWhatsAppUrl, generateProductOrderMessage } from '@/lib/whatsapp';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { Sparkles, MessageCircle, ShoppingBag, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0]?.name : 'Standard');
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavours ? product.flavours[0] : 'Chef Selection');
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  const currentSizeObj = product.sizes?.find((s) => s.name === selectedSize);
  const unitPrice = currentSizeObj ? currentSizeObj.price : product.price;
  const totalPrice = unitPrice * quantity;

  // Most Loved recommendations (excluding current product)
  const mostLovedCreations = PRODUCTS.filter(
    (p) => (p.bestseller || p.featured) && p.id !== product.id
  ).slice(0, 3);

  const handleOrderWhatsApp = () => {
    const url = createWhatsAppUrl(
      generateProductOrderMessage({
        productName: product.name,
        size: selectedSize,
        flavour: selectedFlavour,
        customization: customNote,
        quantity,
      })
    );
    window.open(url, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-sans text-brand-600 hover:text-brand-900 transition-colors uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>

        {/* Product Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-brand-200 shadow-xl">
          
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-200 border border-brand-200">
              <Image
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={
                      'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ' +
                      (selectedImg === idx ? 'border-brand-500 scale-105' : 'border-transparent opacity-70')
                    }
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-cream-50 border border-brand-100 text-xs text-brand-900/80 space-y-1.5 font-sans">
              <div className="flex items-center gap-1.5 font-semibold text-brand-700">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>La Claire Freshness & Storage Advice</span>
              </div>
              <p>{product.storageAdvice || 'Keep refrigerated at 4-6°C. Consume within 48 hours.'}</p>
            </div>
          </div>

          {/* Right Product Options */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4 font-sans">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-500 font-bold block mb-1">
                  {product.subCategory || product.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-900 font-normal">
                  {product.name}
                </h1>
                <p className="text-sm text-brand-700 font-medium mt-1">{product.tagline}</p>
              </div>

              <div className="py-2 border-y border-brand-100 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold text-brand-900">
                  {formatPrice(totalPrice)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-brand-400 font-sans">
                    ({formatPrice(unitPrice)} each)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-brand-900/80 leading-relaxed font-light">
                {product.longDescription || product.description}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
                    Size / Serving
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSize(s.name)}
                        className={
                          'p-3 rounded-xl text-left border text-xs font-sans transition-all ' +
                          (selectedSize === s.name
                            ? 'border-brand-500 bg-brand-50 text-brand-900 font-semibold ring-1 ring-brand-400'
                            : 'border-brand-200 bg-white text-brand-800')
                        }
                      >
                        <div className="flex justify-between">
                          <span>{s.name}</span>
                          <span className="font-semibold text-brand-600">{formatPrice(s.price)}</span>
                        </div>
                        {s.serves && <span className="text-[10px] text-brand-400 block mt-0.5">{s.serves}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavours */}
              {product.flavours && product.flavours.length > 0 && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-2">
                    Flavour
                  </label>
                  <select
                    value={selectedFlavour}
                    onChange={(e) => setSelectedFlavour(e.target.value)}
                    className="w-full text-xs bg-cream-50 border border-brand-200 rounded-xl px-3.5 py-2.5 text-brand-900 focus:outline-none focus:border-brand-500"
                  >
                    {product.flavours.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 block mb-1.5">
                  Gift Note / Lettering (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Happy Birthday Tanya! ✨"
                  className="w-full text-xs bg-cream-50 border border-brand-200 rounded-xl px-3.5 py-2.5 text-brand-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-800">Quantity:</span>
                <div className="flex items-center border border-brand-200 rounded-xl bg-cream-50 overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-brand-800 hover:bg-brand-100">-</button>
                  <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-brand-800 hover:bg-brand-100">+</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-brand-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleOrderWhatsApp}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs font-semibold tracking-wider uppercase py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct Order</span>
              </button>

              <button
                onClick={() => addToCart(product, selectedSize, selectedFlavour, customNote, quantity, unitPrice)}
                className="flex-1 bg-brand-900 hover:bg-brand-800 text-cream-50 font-sans text-xs font-semibold tracking-wider uppercase py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

          </div>

        </div>

        {/* Most Loved Creations Recommendation Section */}
        <div className="pt-8 space-y-8">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-500 font-sans font-semibold">
              Client Favourites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-900 font-normal">
              Most Loved Creations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostLovedCreations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
