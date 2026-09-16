import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchModal } from '@/components/SearchModal';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'La Claire Patisserie | Thoughtfully Crafted Desserts & Hampers Delhi NCR',
  description: 'Luxury Parisian patisserie based in Delhi NCR. Discover artisanal Swiss rolls, celebration cakes, brown butter financiers, chocolate strawberries, and bespoke gifting hampers by Chef Anushka Sethi.',
  keywords: 'La Claire Patisserie, Cakes Delhi NCR, Swiss Roll Delhi, Dessert Hampers Delhi, Custom Birthday Cakes Delhi, Luxury Cakes Gurgaon, Gifting Hampers Delhi',
  openGraph: {
    title: 'La Claire Patisserie | Thoughtfully Crafted Desserts',
    description: 'Thoughtfully crafted desserts, made with love. Delivering luxury cakes and hampers across Delhi NCR.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className="bg-cream-100 text-brand-900 antialiased selection:bg-brand-200 selection:text-brand-900 min-h-screen flex flex-col justify-between"
      >
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ProductModal />
          <CartDrawer />
          <SearchModal />
          <WhatsAppFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
