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

// ============================================================
//  MOODBOARD : chaque 🐱 est un EMPLACEMENT pour une future image.
//  Pour mettre une photo : importe-la en haut du fichier
//     import maPhoto from "../maPhoto.png";
//  puis remplace  { e: "🐱", ... }  par  { img: maPhoto, ... }
//  (les images helloKittyImage et danielImage sont déjà importées
//   en haut, tu peux les réutiliser comme exemple)
// ============================================================
export const STICKERS = [
  { e: "🐱", x: "5%",  y: "14%", r: -8,  s: 2.2 },
  { e: "🐱", x: "84%", y: "12%", r: 7,   s: 2.4 },
  { e: "🐱", x: "3%",  y: "44%", r: -5,  s: 2.6 },
  { e: "🐱", x: "88%", y: "40%", r: 9,   s: 2.2 },
  { e: "🐱", x: "6%",  y: "74%", r: 6,   s: 2.4 },
  { e: "🐱", x: "85%", y: "72%", r: -7,  s: 2.6 },
  { e: "🐱", x: "20%", y: "88%", r: 4,   s: 2.0 },
  { e: "🐱", x: "72%", y: "90%", r: -10, s: 2.2 },
  { e: "🐱", x: "46%", y: "5%",  r: 3,   s: 1.8 },
];

// Classement des "plus beaux hommes" (Bilel doit rester #1)
export const INITIAL_MEN = [
  { id: "bilel", name: "Bilel" },
  { id: "brad", name: "Jacob Elordi" },
  { id: "henry", name: "Henry Cavill" },
  { id: "ryan", name: "Ryan Gosling" },
  { id: "timo", name: "Rauw Alejandro" },
  { id: "bunny", name: "Bad Bunny" },
];

// Date de votre premier date (année, mois, jour) — mois : 0=janvier, donc 11=décembre
export const FIRST_DATE = new Date(2025, 11, 4, 0, 0, 0);

// ============================================================
//  RESTOS : vos restaurants pour la carte.
//  lat / lng = coordonnées GPS (Google Maps → clic droit sur le
//  lieu → les 2 nombres en haut du menu). note = ton commentaire.
// ============================================================
export const RESTOS = [
  { name: "Notre premier resto", date: "4 déc. 2025", lat: 48.8566, lng: 2.3522, emoji: "🍝", note: "Là où tout a commencé 💕" },
  { name: "Le petit japonais", date: "déc. 2025", lat: 48.8606, lng: 2.3376, emoji: "🍣", note: "Trop bons sushis !" },
  { name: "Brunch à Deauville", date: "à venir", lat: 49.3600, lng: 0.0750, emoji: "🥐", note: "Vue sur la mer 🏖️" },
];