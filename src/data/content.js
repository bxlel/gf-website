import helloKittyImage from "../HelloKitty.png";

import danielImage from "../Daniel.png";
// Code du téléphone à clapet (4 chiffres)
export const CODE = "0412";

// Mot d'amour (machine à écrire "Mot secret")
export const LOVE_LETTER =
  "Ana, Tu illumines tout. Avec toi tout est plus beau, plus drôle, plus doux. J'ai hâte de notre prochain date et de me promener avec toi à nouveau sur Paris. — Bilel 💖";

// Poème (domaine public)
export const POEM =
  "Je fais souvent ce rêve étrange et pénétrant\n" +
  "D'une femme inconnue, et que j'aime, et qui m'aime,\n" +
  "Et qui n'est, chaque fois, ni tout à fait la même\n" +
  "Ni tout à fait une autre, et m'aime et me comprend.\n\n" +
  "— Paul Verlaine, Mon rêve familier (1866)";

export const POEM_SIGNATURE = "🕊️ Paul Verlaine - Mon Rêve Familier";

// Messages du test de compatibilité (s'empilent un par un)
export const COMPAT_MSGS = [
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

// Stickers décoratifs du fond
export const STICKERS = [
  { e: "🐈", x: "7%", y: "70%", r: -6, s: 1.1 },
  { e: "🐈‍⬛", x: "16%", y: "82%", r: 8, s: 0.8 },
  { e: "🐈‍⬛", x: "24%", y: "74%", r: -10, s: 0.75 },
  { e: "🐈‍⬛", x: "12%", y: "90%", r: 4, s: 0.7 },
  { e: "🐱", x: "22%", y: "90%", r: 12, s: 0.78 },
  { e: "🗼", x: "88%", y: "66%", r: 6, s: 1 },
  { e: "🏖️", x: "82%", y: "84%", r: -8, s: 0.95 },
  { e: "💌", x: "92%", y: "44%", r: 14, s: 0.9 },
  { e: "✨", x: "24%", y: "6%", r: 0, s: 1 },
  { e: "💕", x: "6%", y: "40%", r: 0, s: 0.9 },
  { e: "⭐", x: "70%", y: "10%", r: 0, s: 0.8 },
  { e: "💿", x: "3%", y: "55%", r: -16, s: 0.9 },
  { e: "😻", x: "40%", y: "20%", r: -8, s: 0.85 },
  { e: "🐾", x: "55%", y: "50%", r: 0, s: 0.7 },
  { e: "🧸", x: "33%", y: "35%", r: -10, s: 0.8 },
  { e: "🍣", x: "78%", y: "30%", r: 8, s: 0.78 },
  { e: "🍜", x: "70%", y: "78%", r: -8, s: 0.82 },
  { e: "🚗", x: "30%", y: "60%", r: 6, s: 0.8 },
  { img: danielImage, x: "11%", y: "26%", r: 4, s: 1.8 },
{ img: helloKittyImage, x: "1%", y: "25%", r: -6, s: 1.5 },
];

export const INITIAL_MEN = [
  { id: "bilel", name: "Bilel" },
  { id: "brad", name: "Jacob Elordi" },
  { id: "henry", name: "Henry Cavill" },
  { id: "ryan", name: "Ryan Gosling" },
  { id: "timo", name: "Rauw Alejandro" },
  { id: "bunny", name: "Bad Bunny" },
];

// Date de votre premier date
export const FIRST_DATE = new Date(2025, 11, 4, 0, 0, 0);