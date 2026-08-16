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
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
        {/* Sidebar */}
        {!isLoginPage && (
          <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col shrink-0">
            <div className="p-6 border-b border-gray-800">
              <Link href="/admin" className="block hover:opacity-90 transition-opacity">
                <Logo className="h-8 w-auto text-white" showText={true} />
              </Link>
              <div className="text-xs text-gray-400 mt-2">Panel Manajemen</div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/products" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Produk
              </Link>
              <Link href="/admin/consultations" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Konsultasi
              </Link>
              <Link href="/admin/orders" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Pesanan
              </Link>
              <Link href="/admin/activities" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Kegiatan
              </Link>
              <Link href="/admin/hero" className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Banner Hero
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-800 space-y-2">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded text-red-400 hover:bg-gray-800 transition-colors">
                Logout
              </button>
              <Link href="/" className="block px-4 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
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
