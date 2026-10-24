// The 100 most recognized natural stones in the world, used to populate the
// Products page. Each entry carries its trade name (kept international, as is
// standard in the stone trade), a category, an origin country code, and a
// representative colorway (base + vein) used to render a realistic swatch.

export type StoneCategory = "marble" | "granite" | "travertine" | "quartzite" | "onyx" | "limestone"

export type Stone = {
  name: string
  category: StoneCategory
  origin: string // country code used for localized country names
  base: string // dominant color
  vein: string // veining / secondary mineral color
}

export const stones: Stone[] = [
  // ---------------------------- Marble (35) ----------------------------
  { name: "Calacatta Gold", category: "marble", origin: "IT", base: "#f4f1ea", vein: "#c9a24b" },
  { name: "Carrara White", category: "marble", origin: "IT", base: "#eef0f1", vein: "#9aa3a8" },
  { name: "Statuario", category: "marble", origin: "IT", base: "#f2f3f2", vein: "#8b9296" },
  { name: "Arabescato", category: "marble", origin: "IT", base: "#eceef0", vein: "#7f888e" },
  { name: "Bianco Venatino", category: "marble", origin: "IT", base: "#eaecee", vein: "#a2acb2" },
  { name: "Bardiglio", category: "marble", origin: "IT", base: "#8b9298", vein: "#5a6167" },
  { name: "Botticino", category: "marble", origin: "IT", base: "#e6ddc9", vein: "#c2b083" },
  { name: "Rosso Verona", category: "marble", origin: "IT", base: "#9c463a", vein: "#6e2c25" },
  { name: "Verde Alpi", category: "marble", origin: "IT", base: "#28453a", vein: "#b7c9bd" },
  { name: "Nero Portoro", category: "marble", origin: "IT", base: "#1c1c1e", vein: "#c9a24b" },
  { name: "Palissandro", category: "marble", origin: "IT", base: "#c9c3b6", vein: "#8a8175" },
  { name: "Breccia Oniciata", category: "marble", origin: "IT", base: "#e3d3bd", vein: "#a67c52" },
  { name: "Rosa Levanto", category: "marble", origin: "IT", base: "#8a3f45", vein: "#d8c2b0" },
  { name: "Crema Marfil", category: "marble", origin: "ES", base: "#e7ddc7", vein: "#c8b791" },
  { name: "Emperador Dark", category: "marble", origin: "ES", base: "#4a352a", vein: "#8f6b4f" },
  { name: "Emperador Light", category: "marble", origin: "ES", base: "#8a6f57", vein: "#c4a985" },
  { name: "Nero Marquina", category: "marble", origin: "ES", base: "#17181a", vein: "#e8eaec" },
  { name: "Amarillo Triana", category: "marble", origin: "ES", base: "#d8b25a", vein: "#a67c2e" },
  { name: "Thassos White", category: "marble", origin: "GR", base: "#f6f7f5", vein: "#dde0dc" },
  { name: "Volakas", category: "marble", origin: "GR", base: "#eceae6", vein: "#9a8f86" },
  { name: "Pentelic", category: "marble", origin: "GR", base: "#efe9db", vein: "#cbbf9f" },
  { name: "Sivec", category: "marble", origin: "MK", base: "#f2f2ee", vein: "#d0cdc4" },
  { name: "Estremoz Pink", category: "marble", origin: "PT", base: "#e6c9c6", vein: "#b98a86" },
  { name: "Rosa Portogallo", category: "marble", origin: "PT", base: "#d9a7a0", vein: "#a35f57" },
  { name: "Mugla White", category: "marble", origin: "TR", base: "#f1f0eb", vein: "#c7c2b6" },
  { name: "Marmara White", category: "marble", origin: "TR", base: "#e9eaec", vein: "#9299a0" },
  { name: "Afyon White", category: "marble", origin: "TR", base: "#f0efe9", vein: "#cfc8b8" },
  { name: "Bursa Beige", category: "marble", origin: "TR", base: "#e3d6bd", vein: "#bda787" },
  { name: "Makrana White", category: "marble", origin: "IN", base: "#f1efe7", vein: "#d3cbb8" },
  { name: "Rainforest Green", category: "marble", origin: "IN", base: "#3d4a35", vein: "#b9a06a" },
  { name: "Rainforest Brown", category: "marble", origin: "IN", base: "#5b4632", vein: "#c9a877" },
  { name: "Indian Green", category: "marble", origin: "IN", base: "#2f4436", vein: "#cdd8c2" },
  { name: "Ming Green", category: "marble", origin: "CN", base: "#5c7a63", vein: "#cdd8c2" },
  { name: "Guangxi White", category: "marble", origin: "CN", base: "#eceef0", vein: "#a7afb4" },
  { name: "Sahara Noir", category: "marble", origin: "TN", base: "#211d1a", vein: "#b98a5a" },

  // ---------------------------- Granite (40) ----------------------------
  { name: "Absolute Black", category: "granite", origin: "IN", base: "#161618", vein: "#2c2c30" },
  { name: "Black Galaxy", category: "granite", origin: "IN", base: "#181818", vein: "#c9a24b" },
  { name: "Steel Grey", category: "granite", origin: "IN", base: "#5c6066", vein: "#3a3d42" },
  { name: "Kashmir White", category: "granite", origin: "IN", base: "#ddd7cb", vein: "#8a7d6e" },
  { name: "Kashmir Gold", category: "granite", origin: "IN", base: "#e3d3ad", vein: "#a9803f" },
  { name: "Tan Brown", category: "granite", origin: "IN", base: "#3e2b26", vein: "#8a4b3a" },
  { name: "Colonial White", category: "granite", origin: "IN", base: "#e4e0d6", vein: "#7f8a86" },
  { name: "Viscount White", category: "granite", origin: "IN", base: "#d7d8d5", vein: "#7d858b" },
  { name: "Black Pearl", category: "granite", origin: "IN", base: "#20242a", vein: "#5c6672" },
  { name: "Imperial Red", category: "granite", origin: "IN", base: "#7d2a2a", vein: "#b45a4a" },
  { name: "Multicolor Red", category: "granite", origin: "IN", base: "#6e2f2c", vein: "#c99a5a" },
  { name: "Ruby Red", category: "granite", origin: "IN", base: "#8a2f2c", vein: "#3a1f1c" },
  { name: "Sapphire Blue", category: "granite", origin: "IN", base: "#2b3a55", vein: "#8fa0bd" },
  { name: "Vizag Blue", category: "granite", origin: "IN", base: "#4a5568", vein: "#aab4c4" },
  { name: "Paradiso", category: "granite", origin: "IN", base: "#5a4a5c", vein: "#c2a9b8" },
  { name: "Kuppam Green", category: "granite", origin: "IN", base: "#3a4a3f", vein: "#9fb0a2" },
  { name: "Coffee Brown", category: "granite", origin: "IN", base: "#4a352a", vein: "#a5764f" },
  { name: "River White", category: "granite", origin: "IN", base: "#e2e0da", vein: "#8b7f88" },
  { name: "Alaska White", category: "granite", origin: "BR", base: "#ddd8cf", vein: "#8a6f8a" },
  { name: "Bianco Antico", category: "granite", origin: "BR", base: "#ddd4c9", vein: "#a37f6a" },
  { name: "Giallo Ornamentale", category: "granite", origin: "BR", base: "#e6d6ac", vein: "#a98a4f" },
  { name: "Santa Cecilia", category: "granite", origin: "BR", base: "#d8bd82", vein: "#8a5f33" },
  { name: "Ubatuba", category: "granite", origin: "BR", base: "#2c3630", vein: "#9aa06a" },
  { name: "New Venetian Gold", category: "granite", origin: "BR", base: "#dcc38a", vein: "#9a6f3a" },
  { name: "Blue Bahia", category: "granite", origin: "BR", base: "#2f5a8a", vein: "#9ab6d4" },
  { name: "Typhoon Bordeaux", category: "granite", origin: "BR", base: "#6e3a33", vein: "#c2a07a" },
  { name: "Delicatus White", category: "granite", origin: "BR", base: "#e0ddd4", vein: "#7f7266" },
  { name: "Baltic Brown", category: "granite", origin: "FI", base: "#4a352b", vein: "#8a6f45" },
  { name: "Blue Pearl", category: "granite", origin: "NO", base: "#40474f", vein: "#8fa2b6" },
  { name: "Emerald Pearl", category: "granite", origin: "NO", base: "#2b332f", vein: "#6f9a86" },
  { name: "Labrador Antique", category: "granite", origin: "NO", base: "#20242a", vein: "#5f7280" },
  { name: "Tropic Brown", category: "granite", origin: "SA", base: "#4a352c", vein: "#9a6f45" },
  { name: "Azul Platino", category: "granite", origin: "ES", base: "#7f858a", vein: "#4a4f55" },
  { name: "Rosa Beta", category: "granite", origin: "IT", base: "#c9b7b2", vein: "#8a7a75" },
  { name: "Bianco Sardo", category: "granite", origin: "IT", base: "#c9c9c7", vein: "#7d7f82" },
  { name: "Padang Dark G654", category: "granite", origin: "CN", base: "#4a4d52", vein: "#33363a" },
  { name: "Padang Light G603", category: "granite", origin: "CN", base: "#b8bab8", vein: "#7f8286" },
  { name: "Sunset Gold G682", category: "granite", origin: "CN", base: "#d8a94a", vein: "#a5722e" },
  { name: "Shanxi Black", category: "granite", origin: "CN", base: "#141416", vein: "#2a2a2e" },
  { name: "Maple Red G562", category: "granite", origin: "CN", base: "#7d3330", vein: "#b56a52" },

  // ---------------------------- Travertine (10) ----------------------------
  { name: "Roman Travertine", category: "travertine", origin: "IT", base: "#e0cfae", vein: "#bfa374" },
  { name: "Classic Travertine", category: "travertine", origin: "TR", base: "#e5d7bc", vein: "#c4ac82" },
  { name: "Silver Travertine", category: "travertine", origin: "TR", base: "#b6b2ab", vein: "#7f7c76" },
  { name: "Noce Travertine", category: "travertine", origin: "TR", base: "#7d5c42", vein: "#a5825e" },
  { name: "Ivory Travertine", category: "travertine", origin: "TR", base: "#ece2cd", vein: "#cbbb99" },
  { name: "Scabas Travertine", category: "travertine", origin: "TR", base: "#d8c09a", vein: "#a5824f" },
  { name: "Titanium Travertine", category: "travertine", origin: "TR", base: "#8f8b84", vein: "#5c5954" },
  { name: "Yellow Travertine", category: "travertine", origin: "IR", base: "#dcc17f", vein: "#a5843f" },
  { name: "Persian Travertine", category: "travertine", origin: "IR", base: "#e3d5b6", vein: "#bfa06f" },
  { name: "Walnut Travertine", category: "travertine", origin: "TR", base: "#8a6a4a", vein: "#b58f63" },

  // ---------------------------- Quartzite (8) ----------------------------
  { name: "Taj Mahal", category: "quartzite", origin: "BR", base: "#e6dcc4", vein: "#bfa878" },
  { name: "White Macaubas", category: "quartzite", origin: "BR", base: "#ecebe4", vein: "#a5a39a" },
  { name: "Mont Blanc", category: "quartzite", origin: "BR", base: "#e9eae6", vein: "#9aa0a2" },
  { name: "Sea Pearl", category: "quartzite", origin: "BR", base: "#7f8a82", vein: "#c4cdc6" },
  { name: "Azul Macaubas", category: "quartzite", origin: "BR", base: "#3a5a7d", vein: "#a5bdd4" },
  { name: "Super White", category: "quartzite", origin: "BR", base: "#e6e8e7", vein: "#8f979a" },
  { name: "Cristallo", category: "quartzite", origin: "BR", base: "#efece4", vein: "#c9a97f" },
  { name: "Fantasy Brown", category: "quartzite", origin: "IN", base: "#8a7f70", vein: "#4a4a44" },

  // ---------------------------- Onyx (5) ----------------------------
  { name: "White Onyx", category: "onyx", origin: "IR", base: "#eee7d6", vein: "#c9b58a" },
  { name: "Honey Onyx", category: "onyx", origin: "PK", base: "#d9a95c", vein: "#a5722e" },
  { name: "Green Onyx", category: "onyx", origin: "PK", base: "#4a6b52", vein: "#b6cbb0" },
  { name: "Pink Onyx", category: "onyx", origin: "IR", base: "#d9a7a0", vein: "#b0736a" },
  { name: "Multicolor Onyx", category: "onyx", origin: "PK", base: "#b58a5c", vein: "#5c7a63" },

  // ---------------------------- Limestone (2) ----------------------------
  { name: "Jura Beige", category: "limestone", origin: "DE", base: "#dccdae", vein: "#b09a72" },
  { name: "Jerusalem Gold", category: "limestone", origin: "PS", base: "#e2cfa0", vein: "#bf9a5f" },
]

export const stoneCategories: StoneCategory[] = [
  "marble",
  "granite",
  "travertine",
  "quartzite",
  "onyx",
  "limestone",
]
