import React, { useState } from "react";
import { GlobalStyles } from "./components/helpers.jsx";
import { Sparkles, Stickers, GoldBanner } from "./components/Decor.jsx";
import Layer1 from "./layers/Layer1.jsx";
import Layer2 from "./layers/Layer2.jsx";
import Layer3 from "./layers/Layer3.jsx";
import Layer4 from "./layers/Layer4.jsx";
import Layer5 from "./layers/Layer5.jsx";

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