export default function Logo({ className = "h-8 w-auto", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* SVG Icon */}
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#78350F" />
        {/* Monogram HB */}
        <path d="M28 30V70M48 30V70M28 50H48" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 30V70M58 30H72C76 30 78 32 78 36C78 40 76 42 72 42H58M58 46H74C78 46 80 48 80 52C80 56 78 58 74 58H58" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="72" cy="72" r="4" fill="#FDE68A" />
      </svg>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-display font-bold text-lg leading-none tracking-wide text-brand-primary">HARIYANI</span>
          <span className="font-sans text-xs tracking-widest text-brand-secondary">BATIK TULIS</span>
        </div>
      )}
    </div>
  );
}
