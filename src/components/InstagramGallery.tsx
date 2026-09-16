import React from 'react';
import Image from 'next/image';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { INSTAGRAM_POSTS } from '@/data/instagram';

export function InstagramGallery() {
  return (
    <section className="py-20 md:py-28 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-200 text-brand-800 text-xs font-sans font-semibold uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5 text-brand-600" />
              <span>@laclairepatisserie</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-900 font-normal">
              Follow Our Sweet Journey
            </h2>
            <p className="text-xs sm:text-sm text-brand-900/70 font-sans font-light">
              Behind the scenes, fresh daily bakes, customer highlights, and festival collections.
            </p>
          </div>

          <a
            href="https://instagram.com/laclairepatisserie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-800 text-cream-50 text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram (2.2k+)</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-200 shadow-sm border border-brand-200/60 transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={post.mediaUrl}
                alt="La Claire Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-brand-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 text-brand-300 mb-2" />
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-white" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 fill-white" /> {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
