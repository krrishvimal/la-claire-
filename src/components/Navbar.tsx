'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  Menu as MenuIcon, 
  X, 
  MessageCircle, 
  Sparkles, 
  Instagram
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp';

export function Navbar() {
  const pathname = usePathname();
  const { getCartItemCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const primaryNavLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Build Your Box', href: '/#builder' },
    { name: 'Custom Orders', href: '/custom-orders' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
  ];

  const secondaryNavLinks: { name: string; href: string }[] = [];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#builder') {
      const timer = setTimeout(() => {
        const el = document.getElementById('builder');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#builder')) {
      const targetElement = document.getElementById('builder');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        window.history.pushState(null, '', '/#builder');
      }
    }
  };

  const itemCount = getCartItemCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Luxury Announcement & Quick Info Bar */}
      <div className="bg-brand-900 text-brand-100 text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-8 font-sans border-b border-brand-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left Announcement */}
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <Sparkles className="w-3 h-3 text-brand-300 animate-pulse shrink-0" />
            <span className="tracking-widest uppercase font-medium truncate">
              Delivering Fresh Across Delhi NCR • Handcrafted Small Batch Pastry
            </span>
          </div>

          {/* Right Micro Links */}
          <div className="hidden md:flex items-center gap-6 text-brand-200/90 tracking-wider text-[11px] shrink-0">
            <Link href="/about" prefetch={true} scroll={true} className="hover:text-white transition-colors">Our Story</Link>
            <Link href="/contact" prefetch={true} scroll={true} className="hover:text-white transition-colors">Delhi NCR Delivery</Link>
            <a
              href="https://instagram.com/laclairepatisserie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@laclairepatisserie</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={
          'transition-all duration-300 ' +
          (isScrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-md border-b border-brand-200/70 py-3.5'
            : 'bg-cream-100/90 backdrop-blur-sm border-b border-brand-200/40 py-4')
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-900 hover:text-brand-600 transition-colors lg:hidden rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>

              {/* Brand Logo with Prominent Icon & Refined Typographic Hierarchy */}
              <Link href="/" prefetch={true} scroll={true} className="flex items-center gap-3.5 group">
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md border-2 border-brand-300/80 group-hover:scale-105 group-hover:border-brand-400 transition-all duration-300 shrink-0 bg-brand-500">
                  <Image
                    src="/images/logo.webp"
                    alt="La Claire Patisserie Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-serif text-2xl md:text-3xl tracking-tight text-brand-900 font-normal group-hover:text-brand-700 transition-colors leading-[1.05]">
                    La Claire
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase text-brand-700 font-semibold">
                      PÂTISSERIE
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {primaryNavLinks.map((link) => {
                const isActive = pathname === link.href || (link.href.includes('#') && pathname === link.href.split('#')[0]);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    scroll={true}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={
                      'text-[13px] tracking-widest uppercase font-sans font-medium transition-all relative py-1.5 active:scale-95 ' +
                      (isActive
                        ? 'text-brand-700 font-semibold'
                        : 'text-brand-900/80 hover:text-brand-600')
                    }
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions (Search, WhatsApp Order, Shopping Bag) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-brand-900/80 hover:text-brand-700 hover:bg-brand-100/60 transition-all"
                title="Search Products"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Instagram Icon (Desktop) */}
              <a
                href="https://instagram.com/laclairepatisserie"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex p-2 rounded-full text-brand-900/80 hover:text-brand-700 hover:bg-brand-100/60 transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* Primary Order CTA */}
              <a
                href={createWhatsAppUrl(generateGeneralEnquiryMessage('placing a direct order'))}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-sans font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick Order</span>
              </a>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-brand-900 hover:text-brand-700 hover:bg-brand-100/60 transition-all"
                aria-label="View Selection Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100/98 backdrop-blur-xl border-b border-brand-200 shadow-2xl px-6 py-6 transition-all animate-fadeIn max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            
            {/* Primary Links */}
            {[...primaryNavLinks, ...secondaryNavLinks].map((link) => {
              const isActive = pathname === link.href || (link.href.includes('#') && pathname === link.href.split('#')[0]);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  scroll={true}
                  onClick={(e) => {
                    handleLinkClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={
                    'text-base font-serif tracking-wide py-2.5 border-b border-brand-100 flex items-center justify-between transition-colors ' +
                    (isActive ? 'text-brand-600 font-semibold' : 'text-brand-900')
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-sans text-brand-400">→</span>
                </Link>
              );
            })}

            {/* Mobile CTAs */}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={createWhatsAppUrl(generateGeneralEnquiryMessage('placing a direct order'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-brand-500 text-white py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase shadow-md active:scale-98 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Order</span>
              </a>
              <a
                href="https://instagram.com/laclairepatisserie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-brand-100 text-brand-800 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider active:scale-98 transition-transform"
              >
                <Instagram className="w-4 h-4 text-brand-600" />
                <span>Follow @laclairepatisserie</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
