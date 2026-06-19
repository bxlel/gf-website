import React, { useState } from "react";
import { GlobalStyles } from "./components/helpers.jsx";
import { Sparkles, Stickers, GoldBanner } from "./components/Decor.jsx";
import Login from "./layers/Login.jsx";
import Desktop from "./layers/Desktop.jsx";

export default function App() {
  const [booted, setBooted] = useState(false); // false = écran connexion, true = bureau

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg,#ffd6ee 0%,#ffb3da 50%,#ff8fc7 100%)" }}
    >
      <GlobalStyles />
      {/* Plus d'étoiles blanches qu'avant */}
      <Sparkles count={45} />
      {/* Le décor (stickers + Hello Kitty + Daniel). Les DRAPEAUX sont masqués une fois sur le bureau. */}
      <Stickers showFlags={!booted} />
      <GoldBanner />

      <div className="relative z-20 flex flex-col items-center justify-center gap-4 px-3 py-6 min-h-[calc(100vh-80px)]">
        {!booted ? <Login onUnlock={() => setBooted(true)} /> : <Desktop />}
      </div>
    </div>
  );
}