import React from 'react';

// Téléphone à clapet Y2K. Le SVG sert de "dessin", et des zones cliquables
// transparentes sont posées par-dessus chaque touche (props onKey).
export default function FlipPhoneSVG({
  currentEntry = "••••",
  statusText = "INSERT CODE",
  onKey = () => {},
}) {
  // Helper: une touche cliquable invisible, calée sur la touche dessinée
  const HitKey = ({ x, y, w, h, value }) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="8"
      fill="transparent"
      style={{ cursor: "pointer" }}
      onClick={() => onKey(value)}
    />
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 700"
      className="w-full h-auto max-w-[510px] drop-shadow-[0_15px_25px_rgba(219,112,147,0.35)] select-none animate-[floaty_4s_ease-in-out_infinite]"
    >
      <defs>
        <linearGradient id="phoneShell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb3de" />
          <stop offset="40%" stopColor="#f48bc7" />
          <stop offset="70%" stopColor="#d176f0" />
          <stop offset="100%" stopColor="#a159ff" />
        </linearGradient>

        <linearGradient id="chromeRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="25%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="retroScreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d7ffe8" />
          <stop offset="100%" stopColor="#96f0c2" />
        </linearGradient>

        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>

        <linearGradient id="okKeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7eb9" />
          <stop offset="100%" stopColor="#ff2e93" />
        </linearGradient>
      </defs>

      {/* ================= CLAPET SUPÉRIEUR ================= */}
      <g id="top-clapet" transform="translate(0, 0)">
        <rect x="75" y="40" width="16" height="50" rx="4" fill="url(#chromeRim)" />
        <circle cx="83" cy="35" r="10" fill="#ff7eb9" />

        <rect x="110" y="325" width="180" height="24" rx="8" fill="url(#chromeRim)" stroke="#94a3b8" strokeWidth="1" />

        <rect x="100" y="70" width="200" height="260" rx="35" fill="url(#phoneShell)" stroke="#ffffff" strokeWidth="3" />
        <rect x="105" y="75" width="190" height="250" rx="30" fill="none" stroke="#f48bc7" strokeWidth="1.5" opacity="0.6" />

        <rect x="125" y="105" width="150" height="135" rx="16" fill="url(#chromeRim)" />
        <rect x="133" y="113" width="134" height="119" rx="10" fill="url(#retroScreen)" stroke="#52a478" strokeWidth="2" />

        <rect x="180" y="88" width="40" height="6" rx="3" fill="#64748b" />

        <text x="200" y="135" textAnchor="middle" fontFamily="Courier, monospace" fontSize="11" fontWeight="bold" fill="#064e3b" opacity="0.7">📶  A+B's phone</text>

        <text x="200" y="185" textAnchor="middle" fontFamily="Courier, monospace" fontSize="32" fontWeight="black" letterSpacing="4" fill="#022c22">
          {currentEntry}
        </text>

        <text x="200" y="215" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#047857">
          {statusText}
        </text>
      </g>

      {/* ================= BASE INFÉRIEURE ================= */}
      <g id="bottom-base">
        <rect x="95" y="340" width="210" height="320" rx="40" fill="url(#phoneShell)" stroke="#ffffff" strokeWidth="3" />
        <rect x="110" y="360" width="180" height="275" rx="25" fill="#eef2f6" stroke="#cbd5e1" strokeWidth="2" />

        {/* Menu / C */}
        <rect x="125" y="375" width="40" height="22" rx="6" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="145" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#4a044e">Menu</text>

        <rect x="235" y="375" width="40" height="22" rx="6" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="255" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#b91c1c">C</text>

        <circle cx="200" cy="398" r="24" fill="url(#chromeRim)" stroke="#94a3b8" />
        <circle cx="200" cy="398" r="14" fill="#ffffff" stroke="#cbd5e1" />
        <path d="M200 379 L196 385 L204 385 Z" fill="#64748b" />
        <path d="M200 417 L196 411 L204 411 Z" fill="#64748b" />

        {/* Ligne 1 */}
        <rect x="125" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="146" y="442" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">1</text>
        <rect x="179" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="200" y="442" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">2</text>
        <rect x="233" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="254" y="442" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">3</text>

        {/* Ligne 2 */}
        <rect x="125" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="146" y="487" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">4</text>
        <rect x="179" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="200" y="487" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">5</text>
        <rect x="233" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="254" y="487" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">6</text>

        {/* Ligne 3 */}
        <rect x="125" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="146" y="532" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">7</text>
        <rect x="179" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="200" y="532" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">8</text>
        <rect x="233" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="254" y="532" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">9</text>

        {/* Ligne 4 */}
        <rect x="125" y="555" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="146" y="579" textAnchor="middle" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#2e1065">*</text>
        <rect x="179" y="555" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#cbd5e1" />
        <text x="200" y="577" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#2e1065">0</text>
        <rect x="233" y="555" width="42" height="34" rx="8" fill="url(#okKeyGrad)" stroke="#f48bc7" strokeWidth="1.5" />
        <text x="254" y="576" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="black" fill="#ffffff">OK</text>

        <circle cx="200" cy="612" r="2.5" fill="#475569" />
      </g>

      {/* Décorations étoiles */}
      <g id="decorations" fill="#ffffff" opacity="0.9">
        <path d="M115 90 L118 95 L123 95 L119 98 L121 103 L115 100 L109 103 L111 98 L107 95 L112 95 Z" />
        <path d="M285 300 L287 303 L291 303 L288 305 L289 309 L285 307 L281 309 L282 305 L279 303 L283 303 Z" />
      </g>

      {/* ============ ZONES CLIQUABLES TRANSPARENTES (par-dessus) ============ */}
      <g id="hit-zones">
        {/* C (effacer) */}
        <HitKey x="235" y="375" w="40" h="22" value="C" />
        {/* Pavé numérique */}
        <HitKey x="125" y="420" w="42" h="34" value="1" />
        <HitKey x="179" y="420" w="42" h="34" value="2" />
        <HitKey x="233" y="420" w="42" h="34" value="3" />
        <HitKey x="125" y="465" w="42" h="34" value="4" />
        <HitKey x="179" y="465" w="42" h="34" value="5" />
        <HitKey x="233" y="465" w="42" h="34" value="6" />
        <HitKey x="125" y="510" w="42" h="34" value="7" />
        <HitKey x="179" y="510" w="42" h="34" value="8" />
        <HitKey x="233" y="510" w="42" h="34" value="9" />
        <HitKey x="179" y="555" w="42" h="34" value="0" />
        {/* OK (sans effet ici, juste pour le réalisme) */}
        <HitKey x="233" y="555" w="42" h="34" value="OK" />
      </g>
    </svg>
  );
}