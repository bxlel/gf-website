import React, { useRef } from "react";
import { MOODBOARD } from "../data/content.js";

// Moodboard : grande zone rose, plein d'emplacements éparpillés.
// Pas de cadre : les images seront des photos découpées (transparentes).
// Pour mettre tes photos : dans data/content.js, importe-les et mets
// `img: maPhoto` à la place de `img: null`.
export default function Moodboard() {
  const items = useRef(
    MOODBOARD.map((m, i) => ({
      ...m,
      top: m.top ?? 4 + Math.random() * 84,
      left: m.left ?? 3 + Math.random() * 82,
      rot: m.rot ?? -22 + Math.random() * 44,
      w: m.w ?? 90 + Math.random() * 70,
    }))
  ).current;

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden"
      style={{ height: "min(80vh, 700px)", background: "linear-gradient(135deg,#ffd6ee,#ffb3da 60%,#ff9ed6)" }}
    >
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.w}px`,
            transform: `rotate(${m.rot}deg)`,
          }}
        >
          {m.img ? (
            // Photo découpée : pas de cadre, juste une ombre douce
            <img src={m.img} alt="" className="w-full h-auto block drop-shadow-[2px_4px_6px_rgba(120,60,120,0.4)]" />
          ) : (
            // Emplacement (à remplacer par une photo) : petit point repère discret
            <div
              className="w-full grid place-items-center rounded-lg border-2 border-dashed border-white/70 text-white/80 text-xs font-bold"
              style={{ height: `${m.w}px`, background: "rgba(255,255,255,0.18)" }}
            >
              photo {i + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}