"use client";

import { useState, useEffect } from "react";

export default function ImageModal({ imageUrl, title }: { imageUrl: string, title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className="mb-6 relative rounded overflow-hidden bg-neutral-100 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-[0.85rem] flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          Klik untuk memperbesar
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-center p-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90%] max-h-[90%] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 bg-white border-none w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-2xl text-neutral-800 transition-transform hover:scale-110"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
