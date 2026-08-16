export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Ornamen Motif Kawung Berputar */}
        <svg 
          className="absolute inset-0 w-full h-full text-brand-accent animate-spin" 
          style={{ animationDuration: '6s' }}
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Garis Lingkaran Luar Putus-putus (Ornamen) */}
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          
          {/* Kelopak Kawung */}
          <ellipse cx="50" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.7" />
          <ellipse cx="50" cy="75" rx="15" ry="25" fill="currentColor" opacity="0.7" />
          <ellipse cx="25" cy="50" rx="25" ry="15" fill="currentColor" opacity="0.7" />
          <ellipse cx="75" cy="50" rx="25" ry="15" fill="currentColor" opacity="0.7" />
          
          {/* Aksen Bunga Sudut */}
          <circle cx="25" cy="25" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="75" cy="25" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="25" cy="75" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="75" cy="75" r="4" fill="currentColor" opacity="0.8" />
        </svg>

        {/* Logo Tengah Pulsing */}
        <div className="z-10 bg-white/80 p-2 rounded-full backdrop-blur-sm animate-pulse">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/Batik_Hariyani_Ambulu_PNG-removebg-preview.png" 
            alt="Loading Logo" 
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
      
      {/* Teks Nuansa Batik */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-brand-primary font-display text-xl tracking-[0.2em] uppercase animate-pulse">
          Membatik...
        </p>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
