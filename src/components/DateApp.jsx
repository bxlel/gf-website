import React, { useState, useRef, useCallback } from "react";
import useSound from "./useSound.js";
import { Confetti } from "./Ui.jsx";
import { nextSaturdayISO, buildICS } from "./helpers.jsx";
import { INITIAL_MEN } from "../data/content.js";

// ============================================================
//  mon_date.exe — la séquence de date, en 4 étapes enchaînées
//  étapes : 0 = la demande, 1 = expo, 2 = classement, 3 = victoire
//  L'écran final (victoire) RESTE affiché (bug de disparition corrigé).
// ============================================================
export default function DateApp() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);
  const restart = () => setStep(0);

  return (
    <div className="flex flex-col items-center gap-3">
      {step === 0 && <AskStep onNext={next} />}
      {step === 1 && <ExpoStep onNext={next} />}
      {step === 2 && <RankStep onNext={next} />}
      {step === 3 && <VictoryStep onRestart={restart} />}

      {/* petite barre de progression */}
      <div className="flex gap-2 mt-1">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className={`h-2 w-2 rounded-full ${n <= step ? "bg-fuchsia-500" : "bg-pink-200"}`} />
        ))}
      </div>
    </div>
  );
}

// ---------- Étape 0 : la demande (Non qui fuit) ----------
function AskStep({ onNext }) {
  const snd = useSound();
  const areaRef = useRef(null);
  const [yes, setYes] = useState(false);
  const [pos, setPos] = useState({ x: 130, y: 120 });
  const BTN_W = 92, BTN_H = 46;

  const flee = useCallback((clientX, clientY) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const maxX = rect.width - BTN_W;
    const maxY = rect.height - BTN_H;
    let tx = 0, ty = 0, ok = false, tries = 0;
    while (!ok && tries < 30) {
      tries++;
      tx = Math.max(0, Math.min(maxX, Math.random() * maxX));
      ty = Math.max(0, Math.min(maxY, Math.random() * maxY));
      const cx = clientX - rect.left, cy = clientY - rect.top;
      if (Math.hypot(tx + BTN_W / 2 - cx, ty + BTN_H / 2 - cy) > 80) ok = true;
    }
    setPos({ x: tx, y: ty });
    snd.pop();
  }, [snd]);

  return (
    <div className="w-full">
      <p className="mb-1 text-center text-xl font-black text-fuchsia-700" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        Veux-tu sortir avec moi ce samedi ? 💖
      </p>
      <p className="mb-4 text-center text-xs font-bold text-purple-500">(T'as pas intérêt à dire non)</p>

      <div ref={areaRef} className="relative mx-auto h-56 w-full overflow-hidden rounded-lg border-2 border-pink-200 bg-white/50">
        <button onClick={() => { snd.victory(); setYes(true); }} className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 text-lg font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] hover:scale-105 active:translate-y-[2px] transition-transform">
          Oui ! 💕
        </button>
        <button
          onMouseEnter={(e) => flee(e.clientX, e.clientY)}
          onMouseMove={(e) => flee(e.clientX, e.clientY)}
          onTouchStart={(e) => { e.preventDefault(); const t = e.touches[0]; flee(t.clientX, t.clientY); }}
          style={{ left: pos.x, top: pos.y, width: BTN_W, height: BTN_H }}
          className="absolute rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-200 to-gray-400 text-sm font-bold text-gray-700 transition-all duration-150"
        >Non</button>
      </div>

      <div className="mt-4 flex justify-center">
        <button disabled={!yes} onClick={onNext} className={`rounded-full border-2 px-6 py-2 text-sm font-black transition-all ${yes ? "border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]" : "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400"}`}>
          Suivant ▶
        </button>
      </div>
    </div>
  );
}

// ---------- Étape 1 : invitation expo (Non → Oui forcé) ----------
function ExpoStep({ onNext }) {
  const snd = useSound();
  const [angry, setAngry] = useState(false);
  const [forced, setForced] = useState(false);

  const sayNo = () => {
    snd.error();
    setAngry(true);
    setTimeout(() => { snd.pop(); setForced(true); setAngry(false); }, 1600);
  };
  const sayYes = () => { snd.victory(); setForced(true); };

  return (
    <div className="w-full">
      <div className="flex items-start gap-3">
        <span className="text-3xl">🖼️</span>
        <p className="text-base font-bold text-purple-800">
          J'ai trouvé une expo incroyable à faire sur Paris, qui nous parlera à tous les 2 tu m'accompagnes ?
        </p>
      </div>

      <div className="mt-5 flex justify-center gap-4">
        <button onClick={sayYes} className={`rounded border-2 px-6 py-2 text-sm font-black transition-all ${forced ? "border-emerald-600 bg-gradient-to-b from-emerald-300 to-emerald-500 text-white ring-4 ring-emerald-300" : "border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800"}`}>
          {forced ? "☑ Oui" : "Oui"}
        </button>
        <button onClick={sayNo} className="rounded border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-6 py-2 text-sm font-black text-gray-800">Non</button>
      </div>

      {forced && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <p className="text-center text-sm font-bold text-emerald-700">Excellent choix 😇 C'est un rendez-vous !</p>
          <button onClick={onNext} className="rounded-full border-2 border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">Suivant ▶</button>
        </div>
      )}

      {angry && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 px-4">
          <div className="animate-[pop_0.3s_ease] rounded-md border-2 border-red-300 bg-white p-5 text-center shadow-xl">
            <div className="text-5xl">😡</div>
            <p className="mt-2 max-w-[260px] text-sm font-black text-red-600">Tu es sûre de toi ? Je pense que tu t'es trompée...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Étape 2 : classement (Bilel #1) ----------
function RankStep({ onNext }) {
  const snd = useSound();
  const [list, setList] = useState(INITIAL_MEN);
  const [msg, setMsg] = useState("");
  const [bounceId, setBounceId] = useState(null);
  const [celebrate, setCelebrate] = useState(false);
  const dragIndex = useRef(null);

  const enforce = (arr) => {
    const idx = arr.findIndex((m) => m.id === "bilel");
    if (idx !== 0) {
      const copy = [...arr];
      const [b] = copy.splice(idx, 1);
      copy.unshift(b);
      setMsg("Erreur système : Choix factuellement incorrect. Réessaie.");
      snd.error();
      setBounceId("bilel");
      setTimeout(() => setBounceId(null), 500);
      return copy;
    }
    setMsg("");
    return arr;
  };

  const move = (from, to) => {
    if (to < 0 || to >= list.length) return;
    const copy = [...list];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    setList(enforce(copy));
  };

  const onDragStart = (i) => (dragIndex.current = i);
  const onDrop = (i) => {
    if (dragIndex.current === null) return;
    const copy = [...list];
    const [item] = copy.splice(dragIndex.current, 1);
    copy.splice(i, 0, item);
    dragIndex.current = null;
    setList(enforce(copy));
  };

  const validate = () => {
    if (list[0].id === "bilel") {
      setCelebrate(true);
      snd.victory();
      setTimeout(onNext, 1600);
    } else {
      enforce(list);
    }
  };

  return (
    <div className="w-full">
      <Confetti run={celebrate} count={26} fixed={false} />
      <p className="mb-3 text-center text-sm font-bold text-purple-800">
        Classe les plus beaux hommes de la planète en glissant les noms (Top 1 → Top {list.length}) 👑
      </p>

      <ul className="flex flex-col gap-2">
        {list.map((m, i) => (
          <li key={m.id} draggable onDragStart={() => onDragStart(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(i)}
            className={`flex items-center justify-between rounded-lg border-2 px-3 py-2 cursor-grab active:cursor-grabbing ${bounceId === m.id ? "animate-[spring_0.5s_ease]" : ""}`}
            style={{ borderColor: m.id === "bilel" ? "#facc15" : "#e9d5ff", background: m.id === "bilel" ? "linear-gradient(90deg,#fff7d6,#ffe9a8)" : "linear-gradient(90deg,#ffffff,#f8eaff)" }}>
            <span className="flex items-center gap-2 font-bold text-purple-900">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-fuchsia-500 text-xs font-black text-white">{i + 1}</span>
              {m.name}
            </span>
            <span className="flex flex-col">
              <button onClick={() => move(i, i - 1)} className="text-xs leading-none text-purple-500 hover:text-purple-800">▲</button>
              <button onClick={() => move(i, i + 1)} className="text-xs leading-none text-purple-500 hover:text-purple-800">▼</button>
            </span>
          </li>
        ))}
      </ul>

      {msg && <p className="mt-3 rounded border-2 border-red-300 bg-red-50 px-2 py-1 text-center text-xs font-black text-red-600">⚠ {msg}</p>}

      <div className="mt-4 flex justify-center">
        <button onClick={validate} className="rounded-full border-2 border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
          Valider le classement
        </button>
      </div>
    </div>
  );
}

// ---------- Étape 3 : victoire (RESTE affichée) ----------
function VictoryStep({ onRestart }) {
  const snd = useSound();
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    snd.victory();
    const ics = buildICS();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Date-avec-l-homme-de-ma-vie.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setConfirmed(true);
  };

  const sat = nextSaturdayISO();
  const dateLabel = sat.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="w-full relative">
      <Confetti run count={50} fixed={false} />
      <h2 className="text-center text-xl sm:text-2xl font-black text-fuchsia-600 drop-shadow mb-3" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        🏆 Tu as gagné un date avec l'homme de ta vie ! ❤️
      </h2>

      <p className="mb-3 text-center text-sm font-bold text-purple-700">
        Date prévu : <span className="text-fuchsia-600">{dateLabel}</span> · 08h00 → 19h00
      </p>
      <label className="block text-xs font-bold text-purple-600 mb-1">Ton adresse mail iCloud</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@icloud.com" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
      <button onClick={confirm} className="mt-4 w-full rounded-full border-2 border-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-base font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
        📅 Confirmer le Date
      </button>

      {confirmed && (
        <p className="mt-3 rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">
          C'est officiel 💖 Le fichier .ics a été téléchargé — ouvre-le pour l'ajouter à ton calendrier !
        </p>
      )}

      <div className="mt-4 flex justify-center">
        <button onClick={onRestart} className="text-xs font-bold text-purple-500 underline">↺ recommencer la séquence</button>
      </div>
    </div>
  );
}