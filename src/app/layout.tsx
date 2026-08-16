import type { Metadata } from "next";
import { Instrument_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hariyani Batik — Batik Tulis Tradisional Jember",
  description: "Koleksi eksklusif batik tulis asli dengan keahlian warisan dan sentuhan elegan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${instrumentSans.variable} ${cormorantGaramond.variable} antialiased font-sans`}
      >
        {/* Header */}
        <Header />

        <main className="min-h-[60vh]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-brand-light mt-24 py-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="mb-4">
                  <img src="/images/Batik_Hariyani_Ambulu_PNG-removebg-preview.png" alt="Hariyani Batik Logo" className="h-[60px] w-auto object-contain" />
                </div>
                <p className="text-neutral-600 leading-relaxed text-[0.95rem]">
                  Batik tulis tradisional dari Jember dengan keahlian warisan dan sentuhan elegan untuk pelanggan yang menghargai kualitas.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-brand-primary mb-4">Navigasi</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-neutral-600 hover:text-brand-primary">Beranda</Link></li>
                  <li><Link href="/katalog" className="text-neutral-600 hover:text-brand-primary">Katalog</Link></li>
                  <li><Link href="/konsultasi" className="text-neutral-600 hover:text-brand-primary">Konsultasi</Link></li>
                  <li><Link href="/kontak" className="text-neutral-600 hover:text-brand-primary">Kontak</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-brand-primary mb-4">Hubungi Kami</h4>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  Jember, Jawa Timur<br />
                  Indonesia<br /><br />
                  Email: <a href="mailto:hariyanibatiktulis123@gmail.com" className="text-brand-primary">hariyanibatiktulis123@gmail.com</a><br />
                  WA: <a href="https://wa.me/6282132477156" className="text-brand-primary">+62 821-3247-7156</a>
                </p>
              </div>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8"></div>
            
            <div className="text-center text-neutral-500 text-sm">
              <p>© {new Date().getFullYear()} Hariyani Batik. Seluruh hak cipta dilindungi.</p>
              <p className="mt-2 text-xs">
                Dibuat dengan penuh dedikasi untuk melestarikan warisan batik tulis Indonesia.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
