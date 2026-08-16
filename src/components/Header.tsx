"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-brand-light to-neutral-50 border-b border-brand-primary/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-5">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 no-underline" onClick={closeMenu}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Batik_Hariyani_Ambulu_PNG-removebg-preview.png" alt="Hariyani Batik Logo" className="h-[45px] md:h-[55px] w-auto object-contain" />
              <span className="hidden sm:inline-block text-[0.7rem] md:text-[0.8rem] text-neutral-500 tracking-[0.05em] uppercase border-l-2 border-neutral-300 pl-3">
                Batik Tulis<br className="hidden sm:block md:hidden"/> Jember
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link href="/" className={`nav-link ${isActive("/") ? "text-brand-primary font-semibold" : ""}`}>Beranda</Link>
            <Link href="/katalog" className={`nav-link ${isActive("/katalog") ? "text-brand-primary font-semibold" : ""}`}>Katalog</Link>
            <Link href="/kegiatan" className={`nav-link ${isActive("/kegiatan") ? "text-brand-primary font-semibold" : ""}`}>Kegiatan</Link>
            <Link href="/konsultasi" className={`nav-link ${isActive("/konsultasi") ? "text-brand-primary font-semibold" : ""}`}>Konsultasi</Link>
            <Link href="/kontak" className={`nav-link ${isActive("/kontak") ? "text-brand-primary font-semibold" : ""}`}>Kontak</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-brand-primary p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-light border-b border-brand-primary/10 shadow-lg absolute w-full left-0 top-full animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            <Link 
              href="/" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium ${isActive("/") ? "bg-brand-primary/10 text-brand-primary" : "text-neutral-700 hover:bg-brand-primary/5 hover:text-brand-primary"}`}
            >
              Beranda
            </Link>
            <Link 
              href="/katalog" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium ${isActive("/katalog") ? "bg-brand-primary/10 text-brand-primary" : "text-neutral-700 hover:bg-brand-primary/5 hover:text-brand-primary"}`}
            >
              Katalog
            </Link>
            <Link 
              href="/kegiatan" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium ${isActive("/kegiatan") ? "bg-brand-primary/10 text-brand-primary" : "text-neutral-700 hover:bg-brand-primary/5 hover:text-brand-primary"}`}
            >
              Kegiatan
            </Link>
            <Link 
              href="/konsultasi" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium ${isActive("/konsultasi") ? "bg-brand-primary/10 text-brand-primary" : "text-neutral-700 hover:bg-brand-primary/5 hover:text-brand-primary"}`}
            >
              Konsultasi
            </Link>
            <Link 
              href="/kontak" 
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium ${isActive("/kontak") ? "bg-brand-primary/10 text-brand-primary" : "text-neutral-700 hover:bg-brand-primary/5 hover:text-brand-primary"}`}
            >
              Kontak
            </Link>
            
            <div className="mt-4 px-4 pt-4 border-t border-brand-primary/10">
              <Link 
                href="/katalog" 
                onClick={closeMenu}
                className="w-full btn flex justify-center text-center"
              >
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
