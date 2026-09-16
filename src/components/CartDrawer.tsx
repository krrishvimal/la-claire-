'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    checkoutCartViaWhatsApp,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  const total = getCartTotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-brand-200">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-brand-100 flex items-center justify-between bg-cream-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="font-serif text-lg sm:text-xl text-brand-900 font-normal">
                Your Selection Bag
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-brand-500 hover:text-brand-800 rounded-full hover:bg-brand-50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-50 mx-auto flex items-center justify-center text-brand-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-brand-900">Your bag is empty</h3>
                <p className="text-xs text-brand-900/60 max-w-xs mx-auto">
                  Explore our celebration cakes, artisanal Swiss rolls, and curated luxury hampers.
                </p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 sm:gap-4 p-3 sm:p-3.5 bg-cream-50/60 rounded-2xl border border-brand-100 relative group"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-brand-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-brand-600 font-sans mt-0.5 truncate">
                        {item.selectedSize} • {item.selectedFlavour}
                      </p>
                      {item.customization && (
                        <p className="text-[10px] text-brand-400 italic mt-0.5 truncate">
                          &ldquo;{item.customization}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-100/60">
                      <div className="flex items-center border border-brand-200 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-brand-700 hover:bg-brand-50"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold text-brand-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-brand-700 hover:bg-brand-50"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-brand-900">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="absolute top-2 right-2 text-brand-300 hover:text-rose-500 transition-colors p-1"
                    title="Remove Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-100 bg-cream-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-brand-600 font-sans">
                  Estimated Subtotal:
                </span>
                <span className="font-serif text-2xl font-semibold text-brand-900">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="text-[11px] text-brand-900/60 font-sans text-center">
                Instant order confirmation & delivery slot booking.
              </p>

              <button
                onClick={checkoutCartViaWhatsApp}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Your Order</span>
              </button>

              <div className="flex justify-center">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-brand-400 hover:text-brand-700 underline transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
