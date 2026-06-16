import React from 'react';

// Téléphone à clapet Y2K version Maxi-Girly pour Ana.
// Les zones cliquables transparentes (HitKey) restent calées au pixel près.
export default function FlipPhoneSVG({
  currentEntry = "••••",
  statusText = "INSERT CODE",
  onKey = () => {},
}) {
  // Helper d'origine conservé pour tes liaisons d'événements
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
      // On booste la taille maximale ici (de 510px à 620px) et on s'assure qu'il prend bien sa place
      className="w-full h-auto max-w-[620px] mx-auto drop-shadow-[0_25px_50px_rgba(244,112,187,0.55)] select-none]"
    >
      <defs>
        {/* Dégradé Coque : Shimmer Rose Bonbon & Fuchsia Intense */}
        <linearGradient id="phoneShell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2fa" />
          <stop offset="25%" stopColor="#ffbde2" />
          <stop offset="70%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>

        {/* Plaques et contours : Blanc brillant et reflets rose poudré */}
        <linearGradient id="chromeRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#ffe4f2" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>

        {/* Fond d'Écran Géant : Dégradé Rose Miroir Lumineux */}
        <linearGradient id="retroScreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff5fa" />
          <stop offset="40%" stopColor="#fce7f3" />
          <stop offset="80%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>

        {/* Touches Numériques : Blanc laqué rétro-éclairé */}
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff1f9" />
        </linearGradient>

        {/* Touche OK : Fushia Pop Contrasté */}
        <linearGradient id="okKeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" strokeColor="#f472b6" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>

        {/* Texture exclusive : Petits cœurs en filigrane sur le fond d'écran */}
        <pattern id="screenHearts" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 12 8 C 10 4, 2 4, 4 12 C 6 17, 12 21, 12 21 C 12 21, 18 17, 20 12 C 22 4, 14 4, 12 8 Z" fill="#db2777" opacity="0.08" />
        </pattern>
      </defs>

      {/* ================= CLAPET SUPÉRIEUR ================= */}
      <g id="top-clapet" transform="translate(0, 0)">
        <rect x="110" y="325" width="180" height="24" rx="8" fill="url(#chromeRim)" stroke="#f472b6" strokeWidth="1.5" />
        <rect x="100" y="50" width="200" height="280" rx="35" fill="url(#phoneShell)" stroke="#ffffff" strokeWidth="3" />
        <rect x="105" y="55" width="190" height="270" rx="30" fill="none" stroke="#f48bc7" strokeWidth="1.5" opacity="0.6" />

        <rect x="118" y="75" width="164" height="235" rx="18" fill="url(#chromeRim)" stroke="#f472b6" strokeWidth="1" />
        <rect x="125" y="82" width="150" height="221" rx="14" fill="url(#retroScreen)" stroke="#db2777" strokeWidth="2" />
        <rect x="125" y="82" width="150" height="221" rx="14" fill="url(#screenHearts)" />

        <rect x="180" y="62" width="40" height="5" rx="2.5" fill="#db2777" opacity="0.4" />

        <text x="200" y="112" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="12" fontWeight="black" fill="#9d174d" letterSpacing="1">💖 A+B's Phone 💖</text>
        <line x1="140" y1="126" x2="260" y2="126" stroke="#db2777" strokeWidth="1.5" opacity="0.25" />

        <text x="200" y="185" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="36" fontWeight="900" fill="#4c0519" letterSpacing="5" filter="drop-shadow(0px 2px 2px rgba(255,255,255,0.7))">
          {currentEntry}
        </text>

        <text x="200" y="245" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="black" fill="#be185d" letterSpacing="0.2">
          {statusText}
        </text>
        <text x="200" y="270" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#db2777" opacity="0.6">
          ✨ [ STAGE 1 / 5 ] ✨
        </text>
      </g>

      {/* ================= BASE INFÉRIEURE ================= */}
      <g id="bottom-base">
        <rect x="95" y="340" width="210" height="320" rx="40" fill="url(#phoneShell)" stroke="#ffffff" strokeWidth="3" />
        <rect x="110" y="360" width="180" height="275" rx="25" fill="url(#chromeRim)" stroke="#db2777" strokeWidth="2" />

        {/* Menu / C */}
        <rect x="125" y="375" width="40" height="22" rx="6" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="145" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="black" fill="#db2777">Menu</text>

        <rect x="235" y="375" width="40" height="22" rx="6" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="255" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="black" fill="#be185d">C</text>

        {/* Joystick */}
        <circle cx="200" cy="398" r="24" fill="url(#phoneShell)" stroke="#ffffff" strokeWidth="1" />
        <circle cx="200" cy="398" r="14" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1" />
        <path d="M200 384 L196 390 L204 390 Z" fill="#db2777" />
        <path d="M200 412 L196 406 L204 406 Z" fill="#db2777" />

        {/* Ligne 1 */}
        <rect x="125" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="146" y="443" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">1</text>
        <rect x="179" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="200" y="443" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">2</text>
        <rect x="233" y="420" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="254" y="443" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">3</text>

        {/* Ligne 2 */}
        <rect x="125" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="146" y="488" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">4</text>
        <rect x="179" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="200" y="488" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">5</text>
        <rect x="233" y="465" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="254" y="488" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">6</text>

        {/* Ligne 3 */}
        <rect x="125" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="146" y="533" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">7</text>
        <rect x="179" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="200" y="533" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">8</text>
        <rect x="233" y="510" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="254" y="533" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">9</text>

        {/* Ligne 4 */}
        <rect x="125" y="555" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="146" y="580" textAnchor="middle" fontFamily="sans-serif" fontSize="20" fontWeight="black" fill="#4c0519">*</text>
        <rect x="179" y="555" width="42" height="34" rx="8" fill="url(#keyGrad)" stroke="#f472b6" strokeWidth="1.5" />
        <text x="200" y="578" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="black" fill="#4c0519">0</text>
        <rect x="233" y="555" width="42" height="34" rx="8" fill="url(#okKeyGrad)" stroke="#9d174d" strokeWidth="1.5" />
        <text x="254" y="577" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="black" fill="#ffffff">OK</text>

        <circle cx="200" cy="612" r="2.5" fill="#db2777" />
      </g>

      {/* Étoiles */}
      <g id="sparkles" fill="#ffffff" opacity="0.95">
        <path d="M330 80 L333 85 L339 85 L334 88 L336 94 L330 90 L324 94 L326 88 L321 85 L327 85 Z" />
        <path d="M72 260 L74 264 L79 264 L75 266 L76 271 L72 268 L68 271 L69 266 L65 264 L70 264 Z" fill="#fbcfe8" />
        <path d="M335 480 L337 484 L342 484 L338 486 L339 491 L335 488 L331 491 L332 486 L328 484 L333 484 Z" />
      </g>

      {/* ============ GESTION DES TARGETS TRANSPARENTES CORRIGÉES ============ */}
      <g id="hit-zones">
        <HitKey x={235} y={375} w={40} h={22} value="C" />
        <HitKey x={125} y={420} w={42} h={34} value="1" />
        
        {/* LE CORRECTIF ICI : y passe de 420 à 425 pour éviter de toucher le joystick au-dessus */}
        <HitKey x={179} y={425} w={42} h={29} value="2" />
        
        <HitKey x={233} y={420} w={42} h={34} value="3" />
        <HitKey x={125} y={465} w={42} h={34} value="4" />
        <HitKey x={179} y={465} w={42} h={34} value="5" />
        <HitKey x={233} y={465} w={42} h={34} value="6" />
        <HitKey x={125} y={510} w={42} h={34} value="7" />
        <HitKey x={179} y={510} w={42} h={34} value="8" />
        <HitKey x={233} y={510} w={42} h={34} value="9" />
        <HitKey x={179} y={555} w={42} h={34} value="0" />
        <HitKey x={233} y={555} w={42} h={34} value="OK" />
      </g>
    </svg>
  );
}