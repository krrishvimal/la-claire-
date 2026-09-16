'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Gift, Plus, Minus, MessageCircle, ShoppingBag, Sparkles, X, Check, Lightbulb, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { HAMPER_BUILDER_ITEMS } from '@/data/products';
import { HamperItem, Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { createWhatsAppUrl, generateHamperOrderMessage } from '@/lib/whatsapp';

type BoxPlan = {
  id: '4' | '6' | '8';
  name: string;
  slots: number;
  price: number;
  serves: string;
};

const BOX_PLANS: BoxPlan[] = [
  { id: '4', name: '4-PACK', slots: 4, price: 1450, serves: '2-4 Guests' },
  { id: '6', name: '6-PACK', slots: 6, price: 2150, serves: '4-6 Guests' },
  { id: '8', name: '8-PACK GRAND', slots: 8, price: 2850, serves: '6-10 Guests' },
];

export function HamperBuilder() {
  const { addToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<BoxPlan>(BOX_PLANS[0]);
  const [hasSelectedPlan, setHasSelectedPlan] = useState<boolean>(false);
  const [slots, setSlots] = useState<(HamperItem | null)[]>([null, null, null, null]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [occasion, setOccasion] = useState<string>('Diwali & Festive Celebrations');
  const [giftNote, setGiftNote] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  
  // Custom toast notification state (Replaces browser popup alert)
  const [notice, setNotice] = useState<{ message: string; type: 'info' | 'warning' | 'success' } | null>(null);

  const showNotice = (message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    setNotice({ message, type });
  };

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => {
        setNotice(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  // Categories filter
  const categories = [
    { id: 'all', name: 'All Treats' },
    { id: 'Dessert Tubs', name: 'Dessert Tubs' },
    { id: 'Dessert Rolls', name: 'Swiss Rolls' },
    { id: 'French Bakes', name: 'French Bakes' },
    { id: 'Berries & Treats', name: 'Berries' },
    { id: 'Cakes', name: 'Bento Cakes' },
    { id: 'Gourmet Jars', name: 'Jars & Candles' },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return HAMPER_BUILDER_ITEMS;
    return HAMPER_BUILDER_ITEMS.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  // Handle changing box size
  const handleSelectPlan = (plan: BoxPlan) => {
    setSelectedPlan(plan);
    setHasSelectedPlan(true);
    setSlots((prev) => {
      const newSlots = new Array(plan.slots).fill(null);
      for (let i = 0; i < Math.min(prev.length, plan.slots); i++) {
        newSlots[i] = prev[i];
      }
      return newSlots;
    });
    showNotice(`Selected ${plan.name} (${plan.slots} slots) ✨`, 'info');
  };

  // Add item to the next available empty slot
  const handleAddItem = (item: HamperItem) => {
    setHasSelectedPlan(true);
    setSlots((prev) => {
      const firstEmptyIndex = prev.findIndex((s) => s === null);
      if (firstEmptyIndex === -1) {
        showNotice(
          `Your ${selectedPlan.name} is full! Click any item inside the box on the left to swap or remove it.`,
          'warning'
        );
        return prev;
      }
      const updated = [...prev];
      updated[firstEmptyIndex] = item;
      return updated;
    });
  };

  // Remove one instance of an item
  const handleRemoveOneItem = (itemId: string) => {
    setSlots((prev) => {
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i]?.id === itemId) {
          updated[i] = null;
          break;
        }
      }
      return updated;
    });
  };

  // Remove from a specific slot index in the visualizer
  const handleRemoveFromSlot = (index: number) => {
    const itemRemoved = slots[index];
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    if (itemRemoved) {
      showNotice(`Removed ${itemRemoved.shortName || itemRemoved.name} from slot ${index + 1}`, 'info');
    }
  };

  // Clear all slots
  const handleClearAll = () => {
    setSlots(new Array(selectedPlan.slots).fill(null));
    showNotice('Box cleared. Pick treats to begin!', 'info');
  };

  // Filled count & in-box counts
  const filledCount = slots.filter((s) => s !== null).length;
  const isFull = filledCount === selectedPlan.slots;

  const getItemCountInBox = (itemId: string) => {
    return slots.filter((s) => s?.id === itemId).length;
  };

  // Format filled items for Checkout & WhatsApp
  const filledItemsList = useMemo(() => {
    const counts: { [key: string]: { item: HamperItem; quantity: number } } = {};
    slots.forEach((s) => {
      if (s) {
        if (!counts[s.id]) {
          counts[s.id] = { item: s, quantity: 0 };
        }
        counts[s.id].quantity += 1;
      }
    });
    return Object.values(counts);
  }, [slots]);

  // Handle Add to Web Bag
  const handleAddToBag = () => {
    if (filledCount === 0) {
      showNotice('Please click on at least one treat to curate your box!', 'warning');
      return;
    }

    const itemsSummary = filledItemsList
      .map((i) => `${i.item.shortName || i.item.name} (x${i.quantity})`)
      .join(', ');

    // Virtual product structure for cart
    const customBoxProduct: Product = {
      id: `custom-box-${selectedPlan.id}-${Date.now()}`,
      name: `La Claire Custom ${selectedPlan.name} (${filledCount}/${selectedPlan.slots} Treats)`,
      slug: 'custom-hamper-box',
      category: 'hampers',
      tagline: itemsSummary,
      description: `Curated assortment: ${itemsSummary}`,
      price: selectedPlan.price,
      images: ['/images/la_claire_story.webp'],
    };

    addToCart(
      customBoxProduct,
      `${selectedPlan.name} (${selectedPlan.serves})`,
      occasion,
      giftNote ? `Gift Note: "${giftNote}"` : itemsSummary,
      1,
      selectedPlan.price
    );

    setAddedAnimation(true);
    showNotice(`✨ Custom ${selectedPlan.name} added to your bag!`, 'success');
    setTimeout(() => setAddedAnimation(false), 800);
  };

  // Handle WhatsApp Checkout
  const handleWhatsAppOrder = () => {
    if (filledCount === 0) {
      showNotice('Please select at least one treat to curate your box!', 'warning');
      return;
    }

    const itemsFormatted = filledItemsList.map((i) => ({
      name: i.item.name,
      quantity: i.quantity,
    }));

    const message = generateHamperOrderMessage({
      hamperName: `La Claire Custom Curated ${selectedPlan.name} (${filledCount}/${selectedPlan.slots} Slots Filled)`,
      items: itemsFormatted,
      packagingType: 'Signature Matte Lavender Keepsake Box with Gold Inscription & Silk Ribbon',
      personalizedNote: giftNote,
      budget: formatPrice(selectedPlan.price),
      occasion: occasion,
    });

    const url = createWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <section id="builder" className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 bg-cream-100 relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Luxury Toast Notification Banner (No Browser Popups) */}
      {notice && (
        <div className="fixed top-20 sm:top-24 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md animate-fadeIn transition-all duration-300">
          <div 
            className={
              'p-3.5 sm:p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center justify-between gap-3 text-xs sm:text-sm font-sans ' +
              (notice.type === 'warning'
                ? 'bg-brand-900 text-cream-50 border-brand-500 shadow-brand-900/30'
                : notice.type === 'success'
                ? 'bg-emerald-900 text-emerald-50 border-emerald-400 shadow-emerald-900/30'
                : 'bg-brand-900 text-brand-100 border-brand-700 shadow-brand-900/30')
            }
          >
            <div className="flex items-center gap-2.5">
              {notice.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-[#D8C7A0] shrink-0" />
              ) : notice.type === 'success' ? (
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-brand-300 shrink-0" />
              )}
              <span className="leading-snug">{notice.message}</span>
            </div>
            <button 
              onClick={() => setNotice(null)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Card with Segmented Box Selector */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-brand-200 shadow-lg mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Title & Tagline */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-brand-600">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Exclusive Experience</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-900 font-normal flex items-center gap-2.5 sm:gap-3">
                <span>Build Your Own Hamper Box</span>
                <span className="text-xl sm:text-2xl">🎁</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-900/75 font-sans font-light max-w-xl">
                Curate a personalized assortment of our finest handcrafted patisserie in our signature Parisian lavender keepsake box.
              </p>
            </div>

            {/* Right Box Size Plan Switcher */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {BOX_PLANS.map((plan) => {
                const isActive = hasSelectedPlan && selectedPlan.id === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={
                      'px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-xs font-sans font-bold tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1.5 sm:gap-2 ' +
                      (isActive
                        ? 'bg-brand-900 text-cream-50 shadow-md ring-2 ring-brand-500 scale-[1.02] sm:scale-105'
                        : 'bg-cream-50 hover:bg-brand-100 text-brand-900 border border-brand-200/80')
                    }
                  >
                    <span>{plan.name}</span>
                    <span className={isActive ? 'text-brand-300 font-normal' : 'text-brand-600 font-medium'}>
                      ({formatPrice(plan.price)})
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* 2-Column Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================================
              DESKTOP LEFT COLUMN: Live Box Visualizer (Sticky on lg+)
             ========================================================================= */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-200/90 shadow-xl space-y-5">
              
              {/* Box Visualizer Header */}
              <div className="text-center space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl text-brand-900 font-medium tracking-tight">
                  La Claire&apos;s Box Visualizer
                </h3>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-700">
                    {filledCount} of {selectedPlan.slots} Slots Filled
                  </span>
                  {filledCount > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-[10px] text-brand-500 hover:text-red-600 underline font-sans flex items-center gap-0.5 ml-2"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Progress Mini Bar */}
                <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-brand-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(filledCount / selectedPlan.slots) * 100}%` }}
                  />
                </div>

                {/* Gentle Full Box Notice Banner if full */}
                {isFull && (
                  <div className="mt-2.5 py-1.5 px-3 rounded-xl bg-brand-50 border border-brand-300 text-[11px] font-sans text-brand-800 flex items-center justify-center gap-1.5 animate-fadeIn">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Your box is complete! Click any item inside to swap.</span>
                  </div>
                )}
              </div>

              {/* 3D-Styled Signature Lavender Gift Box */}
              <div className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#6A4F88] via-[#563C73] to-[#40275C] border-4 border-[#D8C7A0] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />

                <div className="relative z-10 text-center pb-3 mb-3 border-b border-[#D8C7A0]/40">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-sans font-extrabold text-[#F5ECD7] drop-shadow-sm">
                    LA CLAIRE PÂTISSERIE • PARISIAN ATELIER
                  </p>
                  <p className="text-[10px] italic font-serif text-cream-100/90 mt-0.5">
                    A Serious Sweet Affair
                  </p>
                </div>

                {/* Slots Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-3.5">
                  {slots.map((item, idx) => {
                    if (item) {
                      return (
                        <div
                          key={`slot-filled-${idx}-${item.id}`}
                          onClick={() => handleRemoveFromSlot(idx)}
                          className="group relative bg-cream-50 rounded-2xl p-2 border-2 border-[#D8C7A0] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between overflow-hidden"
                          title="Click to remove from box"
                        >
                          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-cream-200">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cream-50 text-[10px] font-sans font-bold uppercase tracking-wider gap-1">
                              <X className="w-3.5 h-3.5 text-red-300" />
                              <span>Remove</span>
                            </div>
                          </div>
                          <div className="mt-2 py-1 px-1.5 bg-brand-900 rounded-lg text-center">
                            <p className="text-[9px] sm:text-[10px] font-sans font-bold text-cream-100 tracking-wider truncate uppercase">
                              {item.shortName || item.name}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={`slot-empty-${idx}`}
                        className="relative aspect-square rounded-2xl border-2 border-dashed border-[#D8C7A0]/60 bg-white/10 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:border-[#D8C7A0] hover:bg-white/15"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/20 border border-[#D8C7A0]/60 flex items-center justify-center text-[#F5ECD7] mb-1.5 shadow-inner">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-sans font-medium text-cream-100/90 leading-tight">
                          Slot {idx + 1} Empty
                        </span>
                        <span className="text-[8px] text-cream-200/70 font-sans tracking-wide mt-0.5">
                          Click any treat
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personalization Options */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-800 block mb-1">
                    Occasion / Theme:
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3 py-2 text-brand-900 focus:outline-none focus:border-brand-500"
                  >
                    <option value="Diwali & Festive Celebrations">Diwali & Festive Celebrations</option>
                    <option value="Milestone Birthday Gifting">Milestone Birthday Gifting</option>
                    <option value="Chic Kitty Party Favours">Chic Kitty Party Favours</option>
                    <option value="Baby Shower Return Gifts">Baby Shower Return Gifts</option>
                    <option value="Corporate & Client Gifting">Corporate & Client Gifting</option>
                    <option value="Anniversary & Romance">Anniversary & Romance</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-800 block mb-1">
                    Personalized Calligraphy Card (Complimentary):
                  </label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g. Dearest Rhea, wishing you pure joy! ✨"
                    className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3 py-2 text-brand-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-4 border-t border-brand-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-wider text-brand-500 font-semibold">
                    Curated Box Total:
                  </span>
                  <span className="font-serif text-2xl font-bold text-brand-900">
                    {formatPrice(selectedPlan.price)}
                  </span>
                </div>

                {/* Primary: Add to Cart */}
                <button
                  onClick={handleAddToBag}
                  className="w-full bg-brand-900 hover:bg-brand-800 text-cream-50 py-3.5 px-6 rounded-2xl text-xs font-sans font-bold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-300" />
                  <span>{addedAnimation ? 'Added to Bag! ✨' : 'ADD CUSTOM BOX TO BAG 🛍️'}</span>
                </button>

                {/* Secondary: Instant WhatsApp */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 px-6 rounded-2xl text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order Directly</span>
                </button>
              </div>

            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Pick Your Treats (Full width on mobile, 7 cols on lg)
             ========================================================================= */}
          <div className="col-span-1 lg:col-span-7 space-y-6 w-full">
            
            {/* Treats Header & Subtitle */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-900 font-normal">
                Pick Your Treats
              </h3>
              <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
                Click on any gourmet cookie, brownie, cake, or pastry below to fill your slots.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={
                    'px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider whitespace-nowrap transition-all ' +
                    (selectedCategory === cat.id
                      ? 'bg-brand-900 text-cream-50 font-semibold shadow-sm'
                      : 'bg-white hover:bg-brand-100 text-brand-800 border border-brand-200/80')
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Treats Cards 2-Column Grid on Mobile and Desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {filteredItems.map((item) => {
                const countInBox = getItemCountInBox(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    className={
                      'group bg-white rounded-2xl p-2.5 sm:p-3.5 border transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col justify-between ' +
                      (countInBox > 0
                        ? 'border-brand-500 ring-2 ring-brand-400 bg-brand-50/40 shadow-sm'
                        : 'border-brand-200/80 hover:border-brand-400')
                    }
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      
                      {/* Image */}
                      <div className="relative w-full aspect-square sm:aspect-auto sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-cream-200 shrink-0 border border-brand-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-brand-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-brand-900/65 font-sans line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1 leading-tight font-light">
                          {item.description}
                        </p>
                      </div>

                    </div>

                    {/* Price & In-Box Badge Row */}
                    <div className="mt-2.5 pt-2 border-t border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="text-[11px] sm:text-xs font-serif font-bold text-brand-900">
                        {formatPrice(item.price)}
                        <span className="text-[9px] sm:text-[10px] font-sans font-normal text-brand-500 ml-0.5">/ pc</span>
                      </span>

                      {/* In-Box Indicator or Add Control */}
                      {countInBox > 0 ? (
                        <div 
                          className="flex items-center justify-between sm:justify-start gap-1.5 bg-brand-100 border border-brand-300 px-2 py-1 rounded-full w-full sm:w-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleRemoveOneItem(item.id)}
                            className="w-4 h-4 rounded-full bg-white text-brand-800 hover:bg-brand-200 flex items-center justify-center text-xs font-bold"
                            title="Remove one"
                          >
                            -
                          </button>
                          <span className="text-[9px] sm:text-[10px] font-sans font-bold text-brand-900 truncate">
                            {countInBox} in Box
                          </span>
                          <button
                            onClick={() => handleAddItem(item)}
                            className="w-4 h-4 rounded-full bg-brand-900 text-white hover:bg-brand-800 flex items-center justify-center text-xs font-bold"
                            title="Add one more"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddItem(item);
                          }}
                          className="text-[10px] sm:text-[11px] font-sans font-semibold text-brand-700 group-hover:text-brand-900 bg-cream-100 group-hover:bg-brand-200 px-2.5 py-1 rounded-full border border-brand-200/80 transition-colors flex items-center justify-center gap-1 w-full sm:w-auto"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Chef Gifting Tip Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/80 border border-brand-200/80 flex items-start gap-3.5 shadow-sm">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Lightbulb className="w-4 h-4 text-brand-700" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xs sm:text-sm font-semibold text-brand-900">
                  Chef Anushka&apos;s Gifting Tip
                </h4>
                <p className="text-[11px] sm:text-xs text-brand-900/75 font-sans font-light leading-relaxed">
                  Pair rich Belgian chocolate Matilda tubs with our zesty Meyer lemon Swiss rolls and roasted hazelnut financiers to create a beautifully balanced custom French tasting box.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          MOBILE FLOATING STICKY MINI-BAR (Visible ONLY when user taps 4, 6, or 8)
         ========================================================================= */}
      {hasSelectedPlan && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2A1820] backdrop-blur-md border-t-2 border-[#D8C7A0] py-2.5 px-4 flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] animate-slideUp">
          <div 
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
          >
            {/* Mini Slot Thumbnails Preview */}
            <div className="flex items-center -space-x-2 shrink-0">
              {slots.slice(0, 4).map((s, idx) => (
                <div 
                  key={idx} 
                  className="w-8 h-8 rounded-full border-2 border-[#D8C7A0] bg-brand-900 overflow-hidden relative shadow-sm flex items-center justify-center text-[10px] text-[#F5ECD7] font-bold"
                >
                  {s ? (
                    <Image src={s.image} alt={s.name} fill className="object-cover" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
              ))}
              {selectedPlan.slots > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-[#D8C7A0] bg-brand-800 flex items-center justify-center text-[9px] text-[#F5ECD7] font-bold">
                  +{selectedPlan.slots - 4}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#F5ECD7] truncate">
                  {filledCount}/{selectedPlan.slots} Treats
                </span>
                {isFull && <Sparkles className="w-3.5 h-3.5 text-[#D8C7A0] shrink-0 animate-pulse" />}
              </div>
              <span className="text-[11px] text-[#D8C7A0] font-serif block truncate font-medium">
                {formatPrice(selectedPlan.price)} • {selectedPlan.name}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className={
              'px-4 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-lg ' +
              (isFull
                ? 'bg-[#D8C7A0] hover:bg-[#cbb98f] text-brand-950 ring-2 ring-white animate-pulse'
                : 'bg-[#D8C7A0] hover:bg-[#cbb98f] text-brand-950')
            }
          >
            <span>{isFull ? 'Review Box ✨' : 'View Box 🎁'}</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          MOBILE SLIDE-UP CUSTOM BOX DRAWER
         ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-fadeIn">
          <div 
            className="fixed inset-0"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-h-[90vh] bg-white rounded-t-[2.5rem] overflow-y-auto p-5 sm:p-6 shadow-2xl animate-slideUp border-t-2 border-[#D8C7A0] space-y-4"
          >
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-brand-600" />
                <h3 className="font-serif text-lg font-bold text-brand-900">
                  Your {selectedPlan.name} ({filledCount}/{selectedPlan.slots} Slots)
                </h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-brand-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D-Styled Signature Lavender Gift Box (Inside Mobile Drawer) */}
            <div className="relative rounded-3xl p-4 bg-gradient-to-b from-[#6A4F88] via-[#563C73] to-[#40275C] border-4 border-[#D8C7A0] shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />

              <div className="relative z-10 text-center pb-2.5 mb-2.5 border-b border-[#D8C7A0]/40">
                <p className="text-[9px] uppercase tracking-[0.3em] font-sans font-extrabold text-[#F5ECD7]">
                  LA CLAIRE PÂTISSERIE • PARISIAN ATELIER
                </p>
                <p className="text-[10px] italic font-serif text-cream-100/90 mt-0.5">
                  Tap any item to remove or swap
                </p>
              </div>

              {/* Slots Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-2.5">
                {slots.map((item, idx) => {
                  if (item) {
                    return (
                      <div
                        key={`modal-slot-filled-${idx}-${item.id}`}
                        onClick={() => handleRemoveFromSlot(idx)}
                        className="group relative bg-cream-50 rounded-2xl p-2 border-2 border-[#D8C7A0] shadow-md cursor-pointer flex flex-col justify-between overflow-hidden"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-cream-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-brand-900/60 flex items-center justify-center text-cream-50 text-[9px] font-sans font-bold uppercase tracking-wider gap-1">
                            <X className="w-3.5 h-3.5 text-red-300" />
                            <span>Remove</span>
                          </div>
                        </div>
                        <div className="mt-1.5 py-0.5 px-1 bg-brand-900 rounded-md text-center">
                          <p className="text-[9px] font-sans font-bold text-cream-100 tracking-wider truncate uppercase">
                            {item.shortName || item.name}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`modal-slot-empty-${idx}`}
                      className="relative aspect-square rounded-2xl border-2 border-dashed border-[#D8C7A0]/60 bg-white/10 flex flex-col items-center justify-center p-2 text-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/20 border border-[#D8C7A0]/60 flex items-center justify-center text-[#F5ECD7] mb-1">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-sans font-medium text-cream-100/90 leading-tight">
                        Slot {idx + 1} Empty
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personalization Options */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-800 block mb-1">
                  Occasion / Theme:
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3 py-2 text-brand-900 focus:outline-none focus:border-brand-500"
                >
                  <option value="Diwali & Festive Celebrations">Diwali & Festive Celebrations</option>
                  <option value="Milestone Birthday Gifting">Milestone Birthday Gifting</option>
                  <option value="Chic Kitty Party Favours">Chic Kitty Party Favours</option>
                  <option value="Baby Shower Return Gifts">Baby Shower Return Gifts</option>
                  <option value="Corporate & Client Gifting">Corporate & Client Gifting</option>
                  <option value="Anniversary & Romance">Anniversary & Romance</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-800 block mb-1">
                  Personalized Calligraphy Card (Complimentary):
                </label>
                <input
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="e.g. Dearest Rhea, wishing you pure joy! ✨"
                  className="w-full text-xs font-sans bg-cream-50 border border-brand-200 rounded-xl px-3 py-2 text-brand-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Total & Action Buttons */}
            <div className="pt-3 border-t border-brand-100 space-y-2.5 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans uppercase tracking-wider text-brand-500 font-semibold">
                  Curated Box Total:
                </span>
                <span className="font-serif text-2xl font-bold text-brand-900">
                  {formatPrice(selectedPlan.price)}
                </span>
              </div>

              {/* Primary: Add to Cart */}
              <button
                onClick={() => {
                  handleAddToBag();
                  if (filledCount > 0) setIsMobileDrawerOpen(false);
                }}
                className="w-full bg-brand-900 hover:bg-brand-800 text-cream-50 py-3.5 px-6 rounded-2xl text-xs font-sans font-bold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-brand-300" />
                <span>ADD CUSTOM BOX TO BAG 🛍️</span>
              </button>

              {/* Secondary: Instant WhatsApp */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 px-6 rounded-2xl text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Place Order Directly</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
