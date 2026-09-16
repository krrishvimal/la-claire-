'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MessageCircle, ShoppingBag, Sparkles, Check, Clock, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { createWhatsAppUrl, generateProductOrderMessage } from '@/lib/whatsapp';

export function ProductModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (selectedProductForModal) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setCustomNote('');
      if (selectedProductForModal.sizes && selectedProductForModal.sizes.length > 0) {
        setSelectedSize(selectedProductForModal.sizes[0].name);
      } else {
        setSelectedSize('Standard');
      }
      if (selectedProductForModal.flavours && selectedProductForModal.flavours.length > 0) {
        setSelectedFlavour(selectedProductForModal.flavours[0]);
      } else {
        setSelectedFlavour('Chef Signature Selection');
      }
    }
  }, [selectedProductForModal]);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  // Calculate current price based on size
  const currentSizeObj = product.sizes?.find((s) => s.name === selectedSize);
  const currentUnitPrice = currentSizeObj ? currentSizeObj.price : product.price;
  const totalPrice = currentUnitPrice * quantity;

  const handleOrderWhatsApp = () => {
    const message = generateProductOrderMessage({
      productName: product.name,
      size: selectedSize,
      flavour: selectedFlavour,
      customization: customNote,
      quantity,
    });
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  const handleAddBag = () => {
    addToCart(product, selectedSize, selectedFlavour, customNote, quantity, currentUnitPrice);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProductForModal(null);
    }, 600);
  };

  return (
    <div 
      onClick={() => setSelectedProductForModal(null)}
      className="fixed inset-0 z-50 bg-brand-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-200/80 flex flex-col md:flex-row my-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 hover:bg-cream-200 text-brand-900 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="md:w-1/2 bg-cream-100 p-4 sm:p-6 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm border border-brand-200/40">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={
                    'relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ' +
                    (selectedImageIndex === idx ? 'border-brand-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100')
                  }
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Allergen & Delivery Badge */}
          <div className="mt-4 p-3.5 bg-brand-50/80 rounded-xl border border-brand-200/60 text-xs text-brand-900/80 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-brand-700">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>La Claire Quality Promise</span>
            </div>
            <p className="text-[11px] text-brand-900/70">
              Freshly baked in Delhi NCR with premium European chocolates and natural fruit extracts. No artificial preservatives.
            </p>
          </div>
        </div>

        {/* Right: Customization & Order Form */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-500 font-bold">
                {product.subCategory || product.category}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-900 font-normal mt-1 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-brand-900/70 mt-1.5 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 py-2 border-y border-brand-100">
              <span className="font-serif text-2xl md:text-3xl text-brand-900 font-semibold">
                {formatPrice(totalPrice)}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-brand-400 font-sans">
                  ({formatPrice(currentUnitPrice)} each)
                </span>
              )}
            </div>

            {/* Size Selector if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 font-sans block mb-2">
                  Select Size / Serving:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSize(s.name)}
                      className={
                        'p-2.5 rounded-xl text-left border text-xs font-sans transition-all ' +
                        (selectedSize === s.name
                          ? 'border-brand-500 bg-brand-50/80 text-brand-900 font-semibold shadow-sm ring-1 ring-brand-400'
                          : 'border-brand-200 hover:border-brand-300 text-brand-800 bg-white')
                      }
                    >
                      <div className="flex justify-between items-center">
                        <span>{s.name}</span>
                        <span className="font-medium text-brand-600">{formatPrice(s.price)}</span>
                      </div>
                      {s.serves && (
                        <span className="text-[10px] text-brand-400 block mt-0.5">{s.serves}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavour Selector if available */}
            {product.flavours && product.flavours.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 font-sans block mb-2">
                  Flavour Preference:
                </label>
                <select
                  value={selectedFlavour}
                  onChange={(e) => setSelectedFlavour(e.target.value)}
                  className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3.5 py-2.5 text-brand-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                >
                  {product.flavours.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Custom Gift Note / Message */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 font-sans block mb-1.5">
                Piped Message / Gift Note (Optional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Rhea! ?"
                className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3.5 py-2.5 text-brand-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-800 font-sans">
                Quantity:
              </label>
              <div className="flex items-center border border-brand-200 rounded-xl bg-cream-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-brand-800 hover:bg-brand-100 transition-colors font-sans"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-brand-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-brand-800 hover:bg-brand-100 transition-colors font-sans"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-brand-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleOrderWhatsApp}
              className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-sans text-xs font-semibold tracking-wider uppercase py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct Order</span>
            </button>

            <button
              onClick={handleAddBag}
              className="flex-1 bg-brand-900 hover:bg-brand-800 text-cream-50 font-sans text-xs font-semibold tracking-wider uppercase py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedAnimation ? 'Added!' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
