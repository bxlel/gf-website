import React, { useRef } from "react";
import { STICKERS } from "../data/content.js";

// ---------- Drapeaux SVG (Inchangés) ----------
export function FlagPT({ size = 36 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 60 40" className="drop-shadow-[2px_2px_0_rgba(255,255,255,0.6)]">
      <rect width="24" height="40" fill="#006600" />
      <rect x="24" width="36" height="40" fill="#FF0000" />
      <circle cx="24" cy="20" r="8" fill="#FFD700" stroke="#fff" strokeWidth="1" />
      <circle cx="24" cy="20" r="4" fill="#fff" />
    </svg>
  );
}

export function FlagTN({ size = 36 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 60 40" className="drop-shadow-[2px_2px_0_rgba(255,255,255,0.6)]">
      <rect width="60" height="40" fill="#E70013" />
      <circle cx="30" cy="20" r="11" fill="#fff" />
      <circle cx="32" cy="20" r="8" fill="#E70013" />
      <circle cx="34" cy="20" r="6.5" fill="#fff" />
      <polygon points="35,20 39,18.5 36.5,21.5 36.5,18.5 39,21.5" fill="#E70013" />
    </svg>
  );
}

// ---------- Stickers éparpillés + drapeaux (CORRIGÉ) ----------
export function Stickers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {/* Drapeaux fixes */}
      <span className="absolute select-none" style={{ left: "4%", top: "12%", transform: "rotate(-12deg)", animation: "floaty 5s ease-in-out infinite" }}>
        <FlagPT />
      </span>
      <span className="absolute select-none" style={{ left: "89%", top: "16%", transform: "rotate(10deg)", animation: "floaty 6s ease-in-out 0.3s infinite" }}>
        <FlagTN />
      </span>

      {/* Boucle sur le tableau STICKERS (data/content.js) */}
      {STICKERS.map((s, i) => (
        <span
          key={i}
          // J'ai ajouté 'flex items-center justify-center' pour un centrage parfait de l'image
          className="absolute select-none drop-shadow-[2px_2px_0_rgba(255,255,255,0.6)] flex items-center justify-center"
          style={{
            left: s.x,
            top: s.y,
            // fontSize gère la taille des émojis
            fontSize: `${2 * s.s}rem`,
            transform: `rotate(${s.r}deg)`,
            animation: `floaty ${4 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
          }}
        >
          {/* LA SOLUTION EST ICI : */}
          {s.img ? (
            // Si le sticker a une propriété 'img', on affiche la balise <img>
            <img 
              src={s.img} 
              alt="Sticker décoratif" 
              // La taille de l'image s'adapte aussi au 's' (scale) défini dans content.js
              style={{ width: `${4 * s.s}rem`, height: 'auto' }} 
              className="object-contain"
              draggable="false" 
            />
          ) : (
            // Sinon (s'il a une propriété 'e'), on affiche l'émoji texte
            s.e
          )}
        </span>
      ))}
    </div>
  );
}

// ---------- Étoiles scintillantes (Inchangés) ----------
export function Sparkles({ count = 22 }) {
  const items = useRef(
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: 8 + Math.random() * 14,
    }))
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute text-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: `${s.size}px`, animation: `twinkle 2.6s ease-in-out ${s.delay}s infinite` }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

// ---------- Bandeau doré permanent (Inchangés) ----------
export function GoldBanner() {
  return (
    <div className="relative z-20 w-full text-center pt-3 pb-1">
      <h1
        className="inline-block text-2xl sm:text-4xl md:text-5xl font-black tracking-tight"
        style={{
          fontFamily: "'Comic Sans MS', 'Trebuchet MS', cursive",
          background: "linear-gradient(95deg,#a86b16,#ffd86e,#fff6c2,#ffd86e,#b4791d,#ffe89a)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 1px rgba(180,120,20,0.4)",
          filter: "drop-shadow(1px 2px 0 rgba(120,80,0,0.35))",
          animation: "shine 3s linear infinite",
        }}
      >
        ✨ Ana + Bilel = &lt;3 ✨
      </h1>
    </div>
  );
}