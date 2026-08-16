"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AuthGuard from "./AuthGuard";
import Logo from "@/components/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
        
        {/* Mobile Header */}
        {!isLoginPage && (
          <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-40">
            <Link href="/admin" className="block">
              <Logo className="h-6 w-auto text-white" showText={true} />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        )}

        {/* Sidebar */}
        {!isLoginPage && (
          <aside className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-gray-900 text-white flex-col shrink-0 md:sticky md:top-0 md:h-screen z-30 overflow-y-auto`}>
            <div className="hidden md:block p-6 border-b border-gray-800">
              <Link href="/admin" className="block hover:opacity-90 transition-opacity">
                <Logo className="h-8 w-auto text-white" showText={true} />
              </Link>
              <div className="text-xs text-gray-400 mt-2">Panel Manajemen</div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/products" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Produk
              </Link>
              <Link href="/admin/consultations" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Konsultasi
              </Link>
              <Link href="/admin/orders" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Pesanan
              </Link>
              <Link href="/admin/activities" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Kegiatan
              </Link>
              <Link href="/admin/hero" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Banner Hero
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-800 space-y-2 mt-auto">
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 md:py-2 rounded text-red-400 hover:bg-gray-800 transition-colors">
                Logout
              </button>
              <Link href="/" onClick={closeMobileMenu} className="block px-4 py-3 md:py-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                &larr; Kembali ke Web
              </Link>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
