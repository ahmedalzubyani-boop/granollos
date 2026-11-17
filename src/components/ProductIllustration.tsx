import type { IllustrationVariant } from '../data/products';

interface ProductIllustrationProps {
  variant: IllustrationVariant;
  className?: string;
}

const PALETTES: Record<
  IllustrationVariant,
  { bg: string; pouch: string; label: string; accent: string; secondary: string }
> = {
  classic: {
    bg: '#F4EDE1',
    pouch: '#E9DCC9',
    label: '#FAF6F0',
    accent: '#C48332',
    secondary: '#6B3A1F',
  },
  super: {
    bg: '#EFE7DC',
    pouch: '#6B3A1F',
    label: '#FAF6F0',
    accent: '#D97E96',
    secondary: '#3A1D0D',
  },
  rose: {
    bg: '#F7ECEE',
    pouch: '#F1D4DB',
    label: '#FFFDF9',
    accent: '#C9617B',
    secondary: '#5A6738',
  },
  dates: {
    bg: '#F3EAE0',
    pouch: '#8B5230',
    label: '#FAF6F0',
    accent: '#5A6738',
    secondary: '#4A2511',
  },
  chocolate: {
    bg: '#EFE8E1',
    pouch: '#4E2A17',
    label: '#F8EFE4',
    accent: '#B57B4C',
    secondary: '#2B150A',
  },
  cardamom: {
    bg: '#F1EFE4',
    pouch: '#E4E5D2',
    label: '#FFFDF8',
    accent: '#5A6738',
    secondary: '#6B3A1F',
  },
  bundle: {
    bg: '#F6E8EB',
    pouch: '#6B3A1F',
    label: '#FAF6F0',
    accent: '#D97E96',
    secondary: '#5A6738',
  },
};

export function ProductIllustration({ variant, className = '' }: ProductIllustrationProps) {
  const palette = PALETTES[variant];

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: palette.bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 280 210"
        className="w-full h-full max-w-[260px] max-h-[195px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle grounded shadow */}
        <ellipse cx="140" cy="182" rx="74" ry="10" fill="#4A2511" fillOpacity="0.08" />

        {/* Left olive sprig echoing the brand logo */}
        <path
          d="M58 164 C46 134, 48 102, 62 72"
          stroke="#5A6738"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <ellipse cx="47" cy="126" rx="8" ry="4" transform="rotate(-35 47 126)" fill="#5A6738" fillOpacity="0.85" />
        <ellipse cx="64" cy="112" rx="8" ry="4" transform="rotate(30 64 112)" fill="#5A6738" fillOpacity="0.85" />
        <ellipse cx="52" cy="95" rx="7.5" ry="3.8" transform="rotate(-25 52 95)" fill="#5A6738" fillOpacity="0.85" />
        <circle cx="44" cy="109" r="3" fill="#D49A45" />
        <circle cx="67" cy="88" r="2.8" fill="#D49A45" />

        {variant === 'dates' ? (
          /* Artisanal Gift Box of Stuffed Dates */
          <g>
            <rect
              x="76"
              y="56"
              width="128"
              height="118"
              rx="14"
              fill={palette.pouch}
              stroke="#4A2511"
              strokeWidth="2"
            />
            <rect
              x="86"
              y="66"
              width="108"
              height="98"
              rx="9"
              fill="#FAF6F0"
              stroke="#4A2511"
              strokeOpacity="0.25"
              strokeWidth="1.2"
            />
            {/* 6 illustrated stuffed dates in neat 2x3 rows */}
            {[
              [109, 90],
              [140, 90],
              [171, 90],
              [109, 128],
              [140, 128],
              [171, 128],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <ellipse cx={cx} cy={cy} rx="12" ry="15" fill="#5B2D14" />
                <ellipse cx={cx} cy={cy - 1} rx="5" ry="10" fill="#F2E4CE" />
                <circle cx={cx - 1.5} cy={cy - 3} r="2.2" fill="#6F8240" />
                <circle cx={cx + 2} cy={cy + 2} r="2" fill="#D49A45" />
                <circle cx={cx} cy={cy - 7} r="1.7" fill="#D97E96" />
              </g>
            ))}
            {/* Silk ribbon accent */}
            <path d="M76 154 H204" stroke="#E89AAE" strokeWidth="5" />
          </g>
        ) : variant === 'bundle' ? (
          /* Bundle Composition: 500g Pouch + Dates Box + Gift Bow */
          <g>
            {/* Large Granola Pouch */}
            <path
              d="M74 44 C74 38, 79 34, 85 34 H153 C159 34, 164 38, 164 44 L170 164 C170 171, 164 176, 157 176 H81 C74 176, 68 171, 68 164 Z"
              fill="#E9DCC9"
              stroke="#4A2511"
              strokeWidth="2"
            />
            <line x1="76" y1="49" x2="162" y2="49" stroke="#4A2511" strokeOpacity="0.28" strokeWidth="1.5" />
            <rect x="84" y="68" width="70" height="74" rx="8" fill="#FAF6F0" stroke="#4A2511" strokeOpacity="0.25" />
            <text
              x="119"
              y="95"
              textAnchor="middle"
              fill="#4A2511"
              fontSize="10"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              GRANOLLOS
            </text>
            <circle cx="119" cy="116" r="14" fill="#F6DCE2" stroke="#6B3A1F" strokeWidth="1.4" />
            <text x="119" y="120" textAnchor="middle" fill="#6B3A1F" fontSize="9" fontWeight="700">
              500g
            </text>

            {/* Stuffed Dates Box beside pouch */}
            <rect
              x="138"
              y="108"
              width="76"
              height="68"
              rx="10"
              fill="#6B3A1F"
              stroke="#4A2511"
              strokeWidth="2"
            />
            <rect x="146" y="116" width="60" height="52" rx="6" fill="#FAF6F0" />
            <ellipse cx="163" cy="142" rx="7" ry="10" fill="#5B2D14" />
            <ellipse cx="163" cy="142" rx="3" ry="6" fill="#F2E4CE" />
            <ellipse cx="188" cy="142" rx="7" ry="10" fill="#5B2D14" />
            <ellipse cx="188" cy="142" rx="3" ry="6" fill="#F2E4CE" />

            {/* Gift box ribbon */}
            <rect x="171" y="64" width="38" height="36" rx="7" fill="#E89AAE" stroke="#4A2511" strokeWidth="1.8" />
            <line x1="190" y1="64" x2="190" y2="100" stroke="#FAF6F0" strokeWidth="3" />
            <line x1="171" y1="82" x2="209" y2="82" stroke="#FAF6F0" strokeWidth="3" />
            <circle cx="185" cy="61" r="4.5" stroke="#4A2511" strokeWidth="1.5" fill="#F8D9DE" />
            <circle cx="195" cy="61" r="4.5" stroke="#4A2511" strokeWidth="1.5" fill="#F8D9DE" />
          </g>
        ) : (
          /* Artisanal Kraft / Coloured Stand-up Granola Pouch */
          <g>
            {/* Stand-up pouch silhouette */}
            <path
              d="M90 36 C90 30, 95 26, 101 26 H179 C185 26, 190 30, 190 36 L197 166 C197 173, 191 178, 184 178 H96 C89 178, 83 173, 83 166 Z"
              fill={palette.pouch}
              stroke="#4A2511"
              strokeWidth="2"
            />
            {/* Top zip-seal crease */}
            <line
              x1="92"
              y1="44"
              x2="188"
              y2="44"
              stroke={variant === 'super' || variant === 'chocolate' ? '#FAF6F0' : '#4A2511'}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            {/* Front label card */}
            <rect
              x="101"
              y="58"
              width="78"
              height="96"
              rx="10"
              fill={palette.label}
              stroke="#4A2511"
              strokeOpacity="0.2"
              strokeWidth="1.2"
            />
            {/* Botanical circle emblem on label */}
            <circle
              cx="140"
              cy="94"
              r="21"
              fill={palette.bg}
              stroke="#6B3A1F"
              strokeWidth="1.4"
            />
            <text
              x="140"
              y="134"
              textAnchor="middle"
              fill="#4A2511"
              fontSize="10"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              GRANOLLOS
            </text>
            <line x1="115" y1="141" x2="165" y2="141" stroke={palette.accent} strokeWidth="2.5" strokeLinecap="round" />

            {/* Flavor-specific ingredient accents inside emblem & scattered around base */}
            {variant === 'classic' && (
              <g>
                {/* Honey drop & roasted almond */}
                <path d="M140 81 C146 89, 148 96, 140 102 C132 96, 134 89, 140 81 Z" fill="#D49A45" />
                <ellipse cx="209" cy="158" rx="9" ry="5.5" transform="rotate(-25 209 158)" fill="#B87A3D" stroke="#4A2511" strokeWidth="1.2" />
                <ellipse cx="222" cy="170" rx="8" ry="5" transform="rotate(15 222 170)" fill="#C98D4F" stroke="#4A2511" strokeWidth="1.2" />
              </g>
            )}

            {variant === 'super' && (
              <g>
                {/* Dark chocolate squares & pecan */}
                <rect x="130" y="84" width="11" height="11" rx="2" fill="#4A2511" />
                <rect x="140" y="92" width="11" height="11" rx="2" fill="#6B3A1F" />
                <rect x="206" y="156" width="14" height="12" rx="2.5" transform="rotate(-14 206 156)" fill="#4A2511" />
                <ellipse cx="222" cy="171" rx="8" ry="5" fill="#A66A38" stroke="#4A2511" strokeWidth="1.2" />
              </g>
            )}

            {variant === 'rose' && (
              <g>
                {/* Damask rose bloom & pistachio */}
                <circle cx="140" cy="94" r="9" fill="#E89AAE" />
                <circle cx="136" cy="91" r="5" fill="#D97E96" />
                <circle cx="144" cy="96" r="5" fill="#C9617B" />
                <ellipse cx="212" cy="161" rx="8" ry="5" transform="rotate(-20 212 161)" fill="#6F8240" />
                <path d="M222 170 C227 164, 232 168, 228 175 C224 176, 220 174, 222 170 Z" fill="#D97E96" />
              </g>
            )}

            {variant === 'chocolate' && (
              <g>
                {/* Belgian chocolate chunks */}
                <rect x="129" y="83" width="12" height="12" rx="2" fill="#3A1D0D" />
                <rect x="139" y="91" width="12" height="12" rx="2" fill="#6B3A1F" />
                <circle cx="212" cy="162" r="7" fill="#5B331C" stroke="#3A1D0D" strokeWidth="1.2" />
                <rect x="220" y="164" width="12" height="10" rx="2" transform="rotate(18 220 164)" fill="#3A1D0D" />
              </g>
            )}

            {variant === 'cardamom' && (
              <g>
                {/* Green cardamom pods & white chocolate curl */}
                <ellipse cx="135" cy="94" rx="5" ry="9" transform="rotate(-20 135 94)" fill="#5A6738" />
                <ellipse cx="145" cy="94" rx="5" ry="8.5" transform="rotate(20 145 94)" fill="#7A8A4E" />
                <ellipse cx="211" cy="161" rx="8" ry="4.5" transform="rotate(-25 211 161)" fill="#5A6738" />
                <rect x="220" y="165" width="12" height="10" rx="2" transform="rotate(12 220 165)" fill="#FFFDF8" stroke="#D8CCB8" strokeWidth="1.2" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
