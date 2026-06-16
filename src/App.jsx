import React, { useState, useEffect, useRef, useCallback } from "react";
import FlipPhoneSVG from "./FlipPhoneSVG.jsx";

// ============================================================
//  Ana + Bilel = <3   —  Y2K Interactive Date Site
// ============================================================

// >>> Mot d'amour de la machine à écrire n°2 (modifie librement) <<<
const LOVE_LETTER =
  "Ana, Tu illumines tout. Avec toi tout est plus beau, plus drôle, plus doux. J'ai hâte de notre prochain date et de me promener avec toi à nouveau sur Paris. — Bilel 💖";

// >>> Poème (domaine public) : Victor Hugo - Demain, dès l'aube <<<
const HUGO_POEM =
  "Je fais souvent ce rêve étrange et pénétrant\n" +
  "D'une femme inconnue, et que j'aime, et qui m'aime,\n" +
  "Et qui n'est, chaque fois, ni tout à fait la même\n" +
  "Ni tout à fait une autre, et m'aime et me comprend.\n\n" +
  "— Paul Verlaine";

// ---------- Vrais drapeaux SVG ----------
function FlagPT({ size = 36 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 60 40" className="drop-shadow-[2px_2px_0_rgba(255,255,255,0.6)]">
      <rect width="24" height="40" fill="#006600" />
      <rect x="24" width="36" height="40" fill="#FF0000" />
      <circle cx="24" cy="20" r="8" fill="#FFD700" stroke="#fff" strokeWidth="1" />
      <circle cx="24" cy="20" r="4" fill="#fff" />
    </svg>
  );
}

function FlagTN({ size = 36 }) {
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

// ---------- Tiny WebAudio sound engine ----------
function useSound() {
  const ctxRef = useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const blip = useCallback((freq = 600, dur = 0.05, type = "square", gain = 0.06) => {
    try {
      const ctx = getCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch (e) {}
  }, []);

  const key = useCallback(() => blip(420 + Math.random() * 60, 0.04, "square", 0.05), [blip]);
  const error = useCallback(() => {
    blip(180, 0.12, "sawtooth", 0.08);
    setTimeout(() => blip(120, 0.16, "sawtooth", 0.08), 90);
  }, [blip]);
  const victory = useCallback(() => {
    [523, 659, 784, 1046].forEach((f, i) =>
      setTimeout(() => blip(f, 0.18, "triangle", 0.07), i * 110)
    );
  }, [blip]);
  const pop = useCallback(() => blip(900, 0.06, "sine", 0.05), [blip]);
  const type = useCallback(() => blip(520 + Math.random() * 40, 0.03, "square", 0.04), [blip]);

  return { key, error, victory, pop, type };
}

// ---------- Decorative scattered stickers ----------
const STICKERS = [
  { e: "🐈", x: "7%", y: "70%", r: -6, s: 1.1 },
  { e: "🐈‍⬛", x: "16%", y: "82%", r: 8, s: 0.8 },
  { e: "🐈‍⬛", x: "24%", y: "74%", r: -10, s: 0.75 },
  { e: "🐈‍⬛", x: "12%", y: "90%", r: 4, s: 0.7 },
  { e: "🐱", x: "22%", y: "90%", r: 12, s: 0.78 },
  { e: "🗼", x: "88%", y: "66%", r: 6, s: 1 },
  { e: "🏖️", x: "82%", y: "84%", r: -8, s: 0.95 },
  { e: "💌", x: "92%", y: "44%", r: 14, s: 0.9 },
  { e: "✨", x: "48%", y: "6%", r: 0, s: 1 },
  { e: "💕", x: "6%", y: "40%", r: 0, s: 0.9 },
  { e: "⭐", x: "70%", y: "10%", r: 0, s: 0.8 },
  { e: "💿", x: "3%", y: "55%", r: -16, s: 0.9 },
  { e: "😻", x: "40%", y: "20%", r: -8, s: 0.85 },
  { e: "🐾", x: "55%", y: "50%", r: 0, s: 0.7 },
  { e: "🧸", x: "33%", y: "35%", r: -10, s: 0.8 },
  { e: "🍣", x: "78%", y: "30%", r: 8, s: 0.78 },
  { e: "🍜", x: "70%", y: "78%", r: -8, s: 0.82 },
  { e: "🚗", x: "30%", y: "60%", r: 6, s: 0.8 },
];

function Stickers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute select-none" style={{ left: "4%", top: "12%", transform: "rotate(-12deg)", animation: "floaty 5s ease-in-out infinite" }}>
        <FlagPT />
      </span>
      <span className="absolute select-none" style={{ left: "89%", top: "16%", transform: "rotate(10deg)", animation: "floaty 6s ease-in-out 0.3s infinite" }}>
        <FlagTN />
      </span>
      {STICKERS.map((s, i) => (
        <span
          key={i}
          className="absolute select-none drop-shadow-[2px_2px_0_rgba(255,255,255,0.6)]"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${2 * s.s}rem`,
            transform: `rotate(${s.r}deg)`,
            animation: `floaty ${4 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
          }}
        >
          {s.e}
        </span>
      ))}
    </div>
  );
}

// ---------- Sparkle field ----------
function Sparkles({ count = 22 }) {
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

// ---------- Permanent golden banner ----------
function GoldBanner() {
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

// ---------- Reusable retro window chrome ----------
function RetroWindow({ title, children, className = "", onClose }) {
  return (
    <div
      className={`rounded-md border-2 shadow-[4px_4px_0_rgba(120,90,160,0.4)] ${className}`}
      style={{ borderColor: "#c9c9d6", background: "linear-gradient(180deg,#ffffff 0%,#fdf0ff 55%,#f6e2ff 100%)" }}
    >
      <div className="flex items-center justify-between rounded-t-sm px-2 py-1" style={{ background: "linear-gradient(90deg,#7b2ff7,#d14fff,#ff6ad5)" }}>
        <span className="text-[11px] sm:text-sm font-bold text-white drop-shadow select-none truncate">{title}</span>
        <div className="flex gap-1">
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">_</span>
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">▢</span>
          <span onClick={onClose} className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#ffb3c8] text-[9px] font-bold text-gray-800 cursor-pointer">✕</span>
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

// ---------- Confetti ----------
function Confetti({ run, count = 60, fixed = true }) {
  const pieces = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      dur: 2.2 + Math.random() * 2.2,
      e: ["❤️", "💖", "💕", "💗", "✨", "💝"][i % 6],
      size: 12 + Math.random() * 16,
    }))
  ).current;
  if (!run) return null;
  return (
    <div className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 z-30 overflow-hidden`}>
      {pieces.map((p, i) => (
        <span key={i} className="absolute -top-10" style={{ left: `${p.left}%`, fontSize: `${p.size}px`, animation: `fall ${p.dur}s linear ${p.delay}s infinite` }}>
          {p.e}
        </span>
      ))}
    </div>
  );
}

// =====================================================================
//  Test de compatibilité — accepte SEULEMENT "Bilel"
// =====================================================================
const COMPAT_MSGS = [
  "💅 Charisme : niveau dangereux",
  "🔥 Beauté : bogosse hors normes tous les 2",
  "😂 Humour : 2 comiques détectés",
  "🧠 Intelligence : très élevée (Ana pas trop)",
  "🍝 Amour de la bouffe : 200% confirmé",
  "💓 Cœurs parfaitement synchronisés",
  "🥹 Recherche de défauts chez Ana : 0 trouvé",
  "🐱 Jiji",
  "✨ Verdict : c'était écrit dans les étoiles",
];

function CompatTest({ onClose }) {
  const snd = useSound();
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("Ana");
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState([]);
  const [done, setDone] = useState(false);
  const [rejected, setRejected] = useState(false);

  const launch = () => {
    // Sécurité : le prénom 1 DOIT être Bilel
    if (n1.trim().toLowerCase() !== "bilel") {
      setRejected(true);
      snd.error();
      setTimeout(() => setRejected(false), 2200);
      return;
    }
    if (!n2.trim()) return;

    setRunning(true);
    setDone(false);
    setScore(0);
    setShown([]);
    snd.pop();

    let s = 0;
    const barTimer = setInterval(() => {
      s += 2;
      if (s >= 100) {
        s = 100;
        clearInterval(barTimer);
        setScore(100);
        setDone(true);
        snd.victory();
      } else {
        setScore(s);
      }
    }, 130);

    let i = 0;
    const msgTimer = setInterval(() => {
      setShown((prev) => [...prev, COMPAT_MSGS[i]]);
      snd.key();
      i++;
      if (i >= COMPAT_MSGS.length) clearInterval(msgTimer);
    }, 700);
  };

  return (
    <RetroWindow title="amour_calculator.exe" className="w-full max-w-md" onClose={onClose}>
      <div className="flex items-center gap-2">
        <input value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Prénom 1" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
        <span className="text-xl">💕</span>
        <input value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Prénom 2" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
      </div>

      {/* Message de rejet avec emoji fâché */}
      {rejected && (
        <div className="mt-3 animate-[pop_0.3s_ease] rounded border-2 border-red-300 bg-red-50 px-3 py-2 text-center">
          <div className="text-3xl">😡</div>
          <p className="text-xs font-black text-red-600 mt-1">Erreur : le seul résultat valable est "Bilel". Réessaie 💅</p>
        </div>
      )}

      <div className="mt-4 h-6 w-full overflow-hidden rounded-full border-2 border-fuchsia-300 bg-white">
        <div className="h-full transition-all duration-100" style={{ width: `${score}%`, background: "linear-gradient(90deg,#ff7eb9,#d14fff,#7b2ff7)" }} />
      </div>
      <p className="mt-1 text-center text-2xl font-black text-fuchsia-600">{score}%</p>

      {shown.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1">
          {shown.map((m, i) => (
            <li key={i} className="animate-[pop_0.3s_ease] rounded border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-xs font-bold text-purple-700">
              {m}
            </li>
          ))}
        </ul>
      )}

      {done && (
        <div className="mt-3 rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center">
          <p className="text-sm font-black text-emerald-700">{n1} + {n2} = 100% 💖</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">C'était écrit !</p>
        </div>
      )}

      {!running && !done && (
        <div className="mt-4 flex justify-center">
          <button onClick={launch} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
            Lancer le test 💞
          </button>
        </div>
      )}
    </RetroWindow>
  );
}

// =====================================================================
//  Machine à écrire (réutilisable : poème ou mot d'amour)
// =====================================================================
function Typewriter({ onClose, title, content, ctaLabel = "Lire ✍️", endLabel = "💌 Écrit avec amour" }) {
  const snd = useSound();
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const start = () => {
    setStarted(true);
    setText("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setText(content.slice(0, i));
      if (i % 2 === 0) snd.type();
      if (i >= content.length) {
        clearInterval(timer);
        setDone(true);
        snd.victory();
      }
    }, 45);
  };

  return (
    <RetroWindow title={title} className="w-full max-w-md" onClose={onClose}>
      <div
        className="min-h-[150px] max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-lg border-2 px-4 py-3 text-sm leading-relaxed text-purple-900"
        style={{ borderColor: "#e9d5ff", background: "linear-gradient(180deg,#fffdf7,#fff4fb)", fontFamily: "'Courier New', monospace" }}
      >
        {text}
        {started && !done && <span className="inline-block w-[2px] animate-[twinkle_0.8s_steps(1)_infinite]">▌</span>}
      </div>

      {!started ? (
        <div className="mt-4 flex justify-center">
          <button onClick={start} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
            {ctaLabel}
          </button>
        </div>
      ) : done ? (
        <p className="mt-3 text-center text-xs font-bold text-fuchsia-600">{endLabel}</p>
      ) : null}
    </RetroWindow>
  );
}

// =====================================================================
//  LAYER 1 — Accueil : téléphone centré + 3 boutons bonus en bas
// =====================================================================
function Layer1({ onComplete }) {
  const snd = useSound();
  const CODE = "0812";
  const [entry, setEntry] = useState("");
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState("TAPE LE CODE 📟");
  const [unlocked, setUnlocked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [quizMsg, setQuizMsg] = useState("");
  const [popup, setPopup] = useState(null); // "compat" | "poem" | "love" | null

  const handleKey = (k) => {
    snd.key();
    if (unlocked) return;
    if (k === "C") { setEntry(""); setStatus("TAPE LE CODE 📟"); return; }
    if (k === "OK") return;
    if (entry.length >= 4) return;
    const next = entry + k;
    setEntry(next);
    if (next.length === 4) {
      if (next === CODE) {
        setStatus("DÉVERROUILLÉ 💖");
        setUnlocked(true);
        snd.victory();
        setTimeout(onComplete, 1400);
      } else {
        setStatus("MAUVAIS CODE 🙈");
        snd.error();
        setShake(true);
        setTimeout(() => { setShake(false); setEntry(""); setStatus("TAPE LE CODE 📟"); }, 800);
      }
    }
  };

  const pickQuiz = (correct) => {
    snd.pop();
    if (correct) {
      setHint2(true);
      setQuizMsg("Évidemment 😏 Indice : Regarde notre premier date !");
    } else {
      setQuizMsg("Mauvaise réponse, recommence 💅");
      snd.error();
    }
  };

  return (
    <div className="relative z-20 flex flex-col items-center gap-4 px-3 w-full">
      <p className="text-center text-sm sm:text-base font-bold text-purple-700 bg-white/70 rounded-full px-4 py-1 shadow">
        Indice 1 : Le jour où tout a commencé... 🗓️
      </p>

      {/* Téléphone bien centré */}
      <div className={`flex justify-center ${shake ? "animate-[shaker_0.4s_ease]" : ""}`}>
        <FlipPhoneSVG currentEntry={entry.padEnd(4, "•")} statusText={status} onKey={handleKey} />
      </div>

      {/* Boutons bonus en bas, centrés */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {!hintOpen && (
          <button
            onClick={() => { snd.pop(); setHintOpen(true); }}
            className="rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]"
          >
            Besoin d'un second indice ? 💡
          </button>
        )}
        <button
          onClick={() => { snd.pop(); setPopup("poem"); }}
          className="rounded-full border-2 border-white bg-gradient-to-r from-violet-400 to-purple-500 px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]"
        >
          📜 Un poème
        </button>
        <button
          onClick={() => { snd.pop(); setPopup("love"); }}
          className="rounded-full border-2 border-white bg-gradient-to-r from-fuchsia-400 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]"
        >
          💌 Mot secret
        </button>
        <button
          onClick={() => { snd.pop(); setPopup("compat"); }}
          className="rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-rose-500 px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]"
        >
          💘 Test de compatibilité
        </button>
      </div>

      {hintOpen && (
        <RetroWindow title="quiz_secret.exe" className="w-full max-w-xs" onClose={() => setHintOpen(false)}>
          {!hint2 ? (
            <>
              <p className="mb-2 text-sm font-bold text-purple-800">Quelle est la plus belle fille sur Terre ?</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => pickQuiz(true)} className="rounded border-2 border-pink-300 bg-pink-50 px-3 py-2 text-left text-sm font-semibold hover:bg-pink-100">1) Ana Oliveira Pereira</button>
                <button onClick={() => pickQuiz(false)} className="rounded border-2 border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm font-semibold hover:bg-gray-100">2) Keira Knightley</button>
                <button onClick={() => pickQuiz(false)} className="rounded border-2 border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm font-semibold hover:bg-gray-100">3) Anne Hathaway</button>
              </div>
            </>
          ) : (
            <p className="text-center text-sm font-bold text-fuchsia-700">Regarde notre premier date ! 💞</p>
          )}
          {quizMsg && <p className="mt-2 text-center text-xs font-bold text-purple-600">{quizMsg}</p>}
        </RetroWindow>
      )}

      {/* Pop-ups bonus */}
      {popup && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 px-4 py-6 overflow-auto" onClick={() => setPopup(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            {popup === "compat" && <CompatTest onClose={() => setPopup(null)} />}
            {popup === "poem" && (
              <Typewriter
                onClose={() => setPopup(null)}
                title="poeme.txt"
                content={HUGO_POEM}
                ctaLabel="Lire le poème 📜"
                endLabel="🕊️ Paul Verlaine"
              />
            )}
            {popup === "love" && (
              <Typewriter
                onClose={() => setPopup(null)}
                title="lettre_damour.txt"
                content={LOVE_LETTER}
                ctaLabel="Lire le mot ✍️"
                endLabel="💌 Écrit avec amour"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
//  LAYER 2 — Runaway buttons
// =====================================================================
function Layer2({ onComplete }) {
  const snd = useSound();
  const areaRef = useRef(null);
  const [yes, setYes] = useState(false);
  const [pos, setPos] = useState({ no: { x: 40, y: 60 }, jsp: { x: 220, y: 60 } });

  const BTN_W = 92;
  const BTN_H = 46;
  const MIN_DIST = 110;

  const flee = useCallback((which, clientX, clientY) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const maxX = rect.width - BTN_W;
    const maxY = rect.height - BTN_H;

    setPos((prev) => {
      const other = which === "no" ? prev.jsp : prev.no;
      let tx = 0, ty = 0, ok = false, tries = 0;
      while (!ok && tries < 30) {
        tries++;
        tx = Math.max(0, Math.min(maxX, Math.random() * maxX));
        ty = Math.max(0, Math.min(maxY, Math.random() * maxY));
        const cx = clientX - rect.left;
        const cy = clientY - rect.top;
        const dCursor = Math.hypot(tx + BTN_W / 2 - cx, ty + BTN_H / 2 - cy);
        const dOther = Math.hypot(tx - other.x, ty - other.y);
        if (dCursor > 70 && dOther > MIN_DIST) ok = true;
      }
      return { ...prev, [which]: { x: tx, y: ty } };
    });
    snd.pop();
  }, [snd]);

  return (
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <RetroWindow title="grosse_question.exe" className="w-full">
        <p className="mb-1 text-center text-xl sm:text-2xl font-black text-fuchsia-700" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          Veux-tu sortir avec moi ce samedi ? 💖
        </p>
        <p className="mb-4 text-center text-xs font-bold text-purple-500">(T'as pas intérêt à dire non)</p>

        <div ref={areaRef} className="relative mx-auto h-56 w-full overflow-hidden rounded-lg border-2 border-pink-200 bg-white/50">
          <button
            onClick={() => { snd.victory(); setYes(true); }}
            className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 text-lg font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] hover:scale-105 active:translate-y-[2px] transition-transform"
          >
            Oui ! 💕
          </button>

          <button
            onMouseEnter={(e) => flee("no", e.clientX, e.clientY)}
            onMouseMove={(e) => flee("no", e.clientX, e.clientY)}
            onTouchStart={(e) => { e.preventDefault(); const t = e.touches[0]; flee("no", t.clientX, t.clientY); }}
            style={{ left: pos.no.x, top: pos.no.y, width: BTN_W, height: BTN_H }}
            className="absolute rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-200 to-gray-400 text-sm font-bold text-gray-700 transition-all duration-150"
          >
            Non
          </button>

          <button
            onMouseEnter={(e) => flee("jsp", e.clientX, e.clientY)}
            onMouseMove={(e) => flee("jsp", e.clientX, e.clientY)}
            onTouchStart={(e) => { e.preventDefault(); const t = e.touches[0]; flee("jsp", t.clientX, t.clientY); }}
            style={{ left: pos.jsp.x, top: pos.jsp.y, width: BTN_W, height: BTN_H }}
            className="absolute rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-200 to-gray-400 text-sm font-bold text-gray-700 transition-all duration-150"
          >
            JSP
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            disabled={!yes}
            onClick={onComplete}
            className={`rounded-full border-2 px-6 py-2 text-sm font-black transition-all ${
              yes ? "border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]" : "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400"
            }`}
          >
            Suivant ▶
          </button>
        </div>
      </RetroWindow>
    </div>
  );
}

// =====================================================================
//  LAYER 3 — Fake Windows trap
// =====================================================================
function Layer3({ onComplete }) {
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
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <RetroWindow title="C:\\Windows\\expo_insolite.exe" className="w-full">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🖼️</span>
          <p className="text-base sm:text-lg font-bold text-purple-800">
            J'ai trouvé une expo incroyable à faire sur Paris, qui nous parlera à tous les 2 tu m'accompagnes ?
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button
            onClick={sayYes}
            className={`rounded border-2 px-6 py-2 text-sm font-black transition-all ${
              forced ? "border-emerald-600 bg-gradient-to-b from-emerald-300 to-emerald-500 text-white ring-4 ring-emerald-300" : "border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800"
            }`}
          >
            {forced ? "☑ Oui" : "Oui"}
          </button>
          <button onClick={sayNo} className="rounded border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-6 py-2 text-sm font-black text-gray-800">Non</button>
        </div>

        {forced && (
          <div className="mt-5 flex flex-col items-center gap-2">
            <p className="text-center text-sm font-bold text-emerald-700">Excellent choix 😇 C'est un rendez-vous !</p>
            <button onClick={onComplete} className="rounded-full border-2 border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">Suivant ▶</button>
          </div>
        )}
      </RetroWindow>

      {angry && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 px-4">
          <div className="animate-[pop_0.3s_ease] rounded-md border-2 border-red-300 bg-white p-5 text-center shadow-xl">
            <div className="text-5xl">😡</div>
            <p className="mt-2 max-w-[260px] text-sm font-black text-red-600">Tu es sûre de toi ? Je pense que tu t'es trompée...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
//  LAYER 4 — Anti-cheat ranking (+ mini confettis à la validation)
// =====================================================================
const INITIAL_MEN = [
  { id: "bilel", name: "Bilel 👑" },
  { id: "brad", name: "Brad Pitt" },
  { id: "henry", name: "Henry Cavill" },
  { id: "ryan", name: "Ryan Gosling" },
  { id: "timo", name: "Timothée Chalamet" },
];

function Layer4({ onComplete }) {
  const snd = useSound();
  const [list, setList] = useState(INITIAL_MEN);
  const [msg, setMsg] = useState("");
  const [bounceId, setBounceId] = useState(null);
  const [won, setWon] = useState(false);
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
      setWon(true);
      setCelebrate(true);
      snd.victory();
      setTimeout(onComplete, 1600);
    } else {
      enforce(list);
    }
  };

  return (
    <div className="relative z-20 flex w-full max-w-md flex-col items-center gap-3 px-3">
      <Confetti run={celebrate} count={26} fixed={false} />

      <RetroWindow title="classement_officiel.exe" className="w-full">
        <p className="mb-3 text-center text-sm font-bold text-purple-800">
          Classe les 5 plus beaux hommes de la planète en glissant les noms de chacun (Top 1 → Top 5) 👑
        </p>

        <ul className="flex flex-col gap-2">
          {list.map((m, i) => (
            <li
              key={m.id}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className={`flex items-center justify-between rounded-lg border-2 px-3 py-2 cursor-grab active:cursor-grabbing ${bounceId === m.id ? "animate-[spring_0.5s_ease]" : ""}`}
              style={{
                borderColor: m.id === "bilel" ? "#facc15" : "#e9d5ff",
                background: m.id === "bilel" ? "linear-gradient(90deg,#fff7d6,#ffe9a8)" : "linear-gradient(90deg,#ffffff,#f8eaff)",
              }}
            >
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
            {won ? "Parfait ✅" : "Valider le classement"}
          </button>
        </div>
      </RetroWindow>
    </div>
  );
}

// =====================================================================
//  LAYER 5 — Victory + .ics calendar download (écran final)
// =====================================================================
function nextSaturdayISO() {
  const now = new Date();
  const day = now.getDay();
  let add = (6 - day + 7) % 7;
  if (add === 0) add = 7;
  const sat = new Date(now);
  sat.setDate(now.getDate() + add);
  return sat;
}

function pad(n) { return String(n).padStart(2, "0"); }

function buildICS() {
  const sat = nextSaturdayISO();
  const y = sat.getFullYear();
  const m = pad(sat.getMonth() + 1);
  const d = pad(sat.getDate());
  const dtStart = `${y}${m}${d}T080000`;
  const dtEnd = `${y}${m}${d}T190000`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `bilel-${Date.now()}@anabilel.love`;

  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ana+Bilel//Date//FR", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:${uid}`, `DTSTAMP:${stamp}`, `DTSTART:${dtStart}`, `DTEND:${dtEnd}`,
    "SUMMARY:Date avec l'homme de ma vie", "DESCRIPTION:Expo à Paris Ana + Bilel = <3", "LOCATION:Paris", "STATUS:CONFIRMED",
    "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:Prépare-toi pour le date 💖", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

function Layer5() {
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
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <Confetti run count={60} />
      <h2 className="text-center text-2xl sm:text-3xl font-black text-fuchsia-600 drop-shadow" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        🏆 Félicitations, tu as gagné un date avec l'homme de ta vie ! ❤️
      </h2>

      <RetroWindow title="confirmation_date.exe" className="w-full">
        <p className="mb-3 text-center text-sm font-bold text-purple-700">
          Date prévu : <span className="text-fuchsia-600">{dateLabel}</span> · 08h00 → 19h00
        </p>
        <label className="block text-xs font-bold text-purple-600 mb-1">Ton adresse mail iCloud</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ana@icloud.com"
          className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
        />
        <button onClick={confirm} className="mt-4 w-full rounded-full border-2 border-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-base font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
          📅 Confirmer le Date
        </button>

        {confirmed && (
          <p className="mt-3 rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">
            C'est officiel 💖 Le fichier .ics a été téléchargé — ouvre-le pour l'ajouter à ton calendrier !
          </p>
        )}
      </RetroWindow>
    </div>
  );
}

// ---------- Keyframes ----------
function GlobalStyles() {
  return (
    <style>{`
      @keyframes shine { to { background-position: 200% center; } }
      @keyframes twinkle { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1.2)} }
      @keyframes floaty { 0%,100%{transform:translateY(0) rotate(var(--r,0))} 50%{transform:translateY(-10px)} }
      @keyframes shaker { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
      @keyframes pop { 0%{transform:scale(.6);opacity:0} 100%{transform:scale(1);opacity:1} }
      @keyframes spring { 0%{transform:translateY(0)} 30%{transform:translateY(-14px)} 55%{transform:translateY(6px)} 75%{transform:translateY(-4px)} 100%{transform:translateY(0)} }
      @keyframes fall { 0%{transform:translateY(-10vh) rotate(0)} 100%{transform:translateY(110vh) rotate(360deg)} }
      @media (prefers-reduced-motion: reduce){ *{animation-duration:.001ms!important;animation-iteration-count:1!important} }
    `}</style>
  );
}

// ---------- Root Component ----------
export default function App() {
  const [layer, setLayer] = useState(1);
  const next = () => setLayer((l) => l + 1);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "linear-gradient(135deg,#ffd6f5 0%,#e3d0ff 35%,#d6ecff 70%,#fff0fb 100%)" }}>
      <GlobalStyles />
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.6) 45%,rgba(180,230,255,.5) 55%,transparent 70%)", backgroundSize: "200% 200%", animation: "shine 6s linear infinite" }} />
      <Sparkles />
      <Stickers />
      <GoldBanner />

      <div className="relative z-20 flex flex-col items-center justify-center gap-4 px-3 py-6 min-h-[calc(100vh-80px)]">
        {layer === 1 && <Layer1 onComplete={next} />}
        {layer === 2 && <Layer2 onComplete={next} />}
        {layer === 3 && <Layer3 onComplete={next} />}
        {layer === 4 && <Layer4 onComplete={next} />}
        {layer === 5 && <Layer5 />}

        <div className="mt-2 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`h-2 w-2 rounded-full ${n <= layer ? "bg-fuchsia-500" : "bg-white/70"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}