import { useRef, useCallback } from "react";

// Petit moteur sonore (bips rétro générés, aucun fichier audio requis)
export default function useSound() {
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