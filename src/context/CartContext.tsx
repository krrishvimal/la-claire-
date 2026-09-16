'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product, HamperItem } from '@/types';
import { createWhatsAppUrl } from '@/lib/whatsapp';

export interface CartItem {
  id: string;
  product: Product;
  selectedSize?: string;
  selectedFlavour?: string;
  customization?: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomHamperCart {
  items: { item: HamperItem; quantity: number }[];
  packaging: string;
  personalizedNote: string;
  occasion: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string, flavour?: string, customization?: string, quantity?: number, unitPrice?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  customHamper: CustomHamperCart;
  addHamperItem: (item: HamperItem) => void;
  removeHamperItem: (itemId: string) => void;
  updateHamperItemQty: (itemId: string, qty: number) => void;
  setHamperPackaging: (pkg: string) => void;
  setHamperNote: (note: string) => void;
  setHamperOccasion: (occ: string) => void;
  getCartTotal: () => number;
  getHamperTotal: () => number;
  getCartItemCount: () => number;
  checkoutCartViaWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [customHamper, setCustomHamper] = useState<CustomHamperCart>({
    items: [],
    packaging: 'Rigid Signature Lavender Keepsake Box with Satin Ribbon (?450)',
    personalizedNote: '',
    occasion: 'Celebration Gifting',
  });

  const addToCart = (
    product: Product,
    size?: string,
    flavour?: string,
    customization?: string,
    quantity: number = 1,
    unitPrice?: number
  ) => {
    const price = unitPrice || (product.sizes && size ? (product.sizes.find(s => s.name === size)?.price || product.price) : product.price);
    const newItem: CartItem = {
      id: product.id + '-' + (size || 'std') + '-' + (flavour || 'std') + '-' + Date.now(),
      product,
      selectedSize: size || (product.sizes ? product.sizes[0]?.name : 'Standard'),
      selectedFlavour: flavour || (product.flavours ? product.flavours[0] : 'Standard'),
      customization,
      quantity,
      unitPrice: price,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addHamperItem = (item: HamperItem) => {
    setCustomHamper((prev) => {
      const existing = prev.items.find((i) => i.item.id === item.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...prev,
        items: [...prev.items, { item, quantity: 1 }],
      };
    });
  };

  const removeHamperItem = (itemId: string) => {
    setCustomHamper((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.item.id !== itemId),
    }));
  };

  const updateHamperItemQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeHamperItem(itemId);
      return;
    }
    setCustomHamper((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.item.id === itemId ? { ...i, quantity: qty } : i
      ),
    }));
  };

  const setHamperPackaging = (packaging: string) => {
    setCustomHamper((prev) => ({ ...prev, packaging }));
  };

  const setHamperNote = (personalizedNote: string) => {
    setCustomHamper((prev) => ({ ...prev, personalizedNote }));
  };

  const setHamperOccasion = (occasion: string) => {
    setCustomHamper((prev) => ({ ...prev, occasion }));
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  const getHamperTotal = () => {
    const itemsTotal = customHamper.items.reduce(
      (acc, i) => acc + i.item.price * i.quantity,
      0
    );
    const boxCost = 450;
    return itemsTotal + (customHamper.items.length > 0 ? boxCost : 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const checkoutCartViaWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (x${item.quantity})\n` +
          `   • Size: ${item.selectedSize}\n` +
          `   • Flavour: ${item.selectedFlavour}` +
          (item.customization ? `\n   • Note / Message: "${item.customization}"` : '') +
          `\n   • Price: ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}`
      )
      .join('\n\n');

    const total = getCartTotal();

    const msg =
      `✨ *Order Enquiry – La Claire Patisserie* ✨\n\n` +
      `Hello! I would like to order the following from your website:\n\n` +
      `${itemsText}\n\n` +
      `💎 *Estimated Subtotal:* ₹${total.toLocaleString('en-IN')}\n` +
      `📍 *Delivery Location:* Delhi NCR\n\n` +
      `Could you please confirm slot availability and delivery details for this order? Thank you!`;

    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isSearchOpen,
        setIsSearchOpen,
        customHamper,
        addHamperItem,
        removeHamperItem,
        updateHamperItemQty,
        setHamperPackaging,
        setHamperNote,
        setHamperOccasion,
        getCartTotal,
        getHamperTotal,
        getCartItemCount,
        checkoutCartViaWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
