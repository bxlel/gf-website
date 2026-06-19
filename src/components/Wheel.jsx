import React, { useState } from "react";
import useSound from "./useSound.js";

// Mise à jour de la liste avec le Foulard
const SEGMENTS = [
  "Un bisou 💋",
  "Un calin 🤗",
  "Sephora 100€ 💳",
  "Foulard 🧣",
  "1 claque 🛑",
  "Un massage 💆‍♀️",
  "Un resto 🍝",
  "Plein d'essence ⛽"
];

// Ajout des index 3 (Foulard) et 5 (Massage) dans les résultats possibles
const ALLOWED_WIN_INDEXES = [0, 1, 3, 4, 5];

const COLORS = [
  "#ff8fc7", "#c89bff", "#ff6ad5", "#a78bfa",
  "#ffa8d8", "#b78bff", "#f472b6", "#d8b4fe"
];

export default function Wheel() {
  const snd = useSound();
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const seg = 360 / SEGMENTS.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    snd.pop();

    const randomAllowedIndex = ALLOWED_WIN_INDEXES[Math.floor(Math.random() * ALLOWED_WIN_INDEXES.length)];

    const targetDegrees = 360 - (randomAllowedIndex * seg + seg / 2);
    const newAngle = angle + (360 * 5) + (targetDegrees - (angle % 360));
    setAngle(newAngle);

    let ticks = 0;
    const tick = setInterval(() => {
      snd.key();
      ticks++;
      if (ticks > 12) clearInterval(tick);
    }, 260);

    setTimeout(() => {
      clearInterval(tick);
      setSpinning(false);
      setResult(randomAllowedIndex);
      snd.victory();
    }, 3600);
  };

  const cx = 160, cy = 160, r = 140;
  const polar = (deg) => {
    const a = (deg - 90) * (Math.PI / 180);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  return (
    <div className="w-full">
      <p className="mb-3 text-center text-sm font-bold text-purple-800">
        Tourne la roue pour choisir ton cadeau bb 🎡
      </p>

      <div className="relative mx-auto" style={{ width: 320, height: 340 }}>
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: -2 }}>
          <div style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: "22px solid #d4197a" }} />
        </div>

        <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto"
          style={{ transform: `rotate(${angle}deg)`, transition: spinning ? "transform 3.6s cubic-bezier(.17,.67,.2,1)" : "none" }}>
          {SEGMENTS.map((label, i) => {
            const start = i * seg;
            const end = start + seg;
            const [x1, y1] = polar(start);
            const [x2, y2] = polar(end);
            const large = seg > 180 ? 1 : 0;

            const currentMidAngle = start + seg / 2;
            const [tx, ty] = polar(currentMidAngle);

            const midR = 0.58;
            const lx = cx + (tx - cx) * midR;
            const ly = cy + (ty - cy) * midR;

            const shouldFlip = currentMidAngle > 90 && currentMidAngle < 270;
            const textRotation = shouldFlip
              ? `rotate(${currentMidAngle}, ${lx}, ${ly}) rotate(-90, ${lx}, ${ly})`
              : `rotate(${currentMidAngle}, ${lx}, ${ly}) rotate(90, ${lx}, ${ly})`;

            return (
              <g key={i}>
                <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth="2" />
                <text
                  x={lx}
                  y={ly}
                  fontSize="11"
                  fontWeight="900"
                  fill="#4c0519"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={textRotation}
                >
                  {label}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="18" fill="#fff" stroke="#d4197a" strokeWidth="4" />
        </svg>
      </div>

      {result !== null ? (
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="w-full rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center">
            <p className="text-sm font-black text-emerald-700">🎉 {SEGMENTS[result]} 🎉</p>
            <p className="text-xs font-bold text-emerald-600 mt-1">
              {result === 4
                ? "Aïe... la roue a choisi la claque ! Tu ne vas pas y échapper"
                : "La roue a parlé, prépare-toi ! 💖"}
            </p>
          </div>

          <button
            onClick={spin}
            className="rounded-full border-2 border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-1.5 text-xs font-bold text-gray-700 shadow-[1px_1px_0_rgba(0,0,0,0.15)] active:translate-y-[1px]"
          >
            🔄 Réessayer
          </button>
        </div>
      ) : (
        <div className="mt-1 flex justify-center">
          <button onClick={spin} disabled={spinning} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px] disabled:opacity-60">
            {spinning ? "La roue va tourner..." : "Tourner la roue 🎡"}
          </button>
        </div>
      )}
    </div>
  );
}