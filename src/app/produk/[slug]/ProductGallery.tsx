"use client";

import { useState, useEffect } from "react";

export default function ProductGallery({ images, title }: { images: any[], title: string }) {
  const [activeImage, setActiveImage] = useState(images[0]?.image_url || '/images/placeholder.png');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-neutral-100 rounded flex items-center justify-center text-neutral-400">
        <div className="text-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p>Tidak ada gambar</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div 
          className="relative w-full aspect-[4/5] rounded overflow-hidden bg-neutral-100 cursor-pointer group shadow-sm border border-neutral-200"
          onClick={() => setIsModalOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={activeImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png' }}
          />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-[0.85rem] flex items-center gap-2 backdrop-blur-sm transition-opacity opacity-80 group-hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            Klik untuk memperbesar
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {images.map((img: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img.image_url)}
                className={`cursor-pointer rounded overflow-hidden border-2 transition-all duration-300 aspect-square ${activeImage === img.image_url ? 'border-brand-primary' : 'border-neutral-200 hover:border-brand-secondary hover:scale-105'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image_url} 
                  alt={`${title} - view ${idx + 1}`} 
                  className="w-full h-full object-cover block"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-center p-4 md:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-[90%] max-h-[90%] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={activeImage} 
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 bg-white border-none w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-2xl text-neutral-800 hover:scale-110 transition-transform"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
