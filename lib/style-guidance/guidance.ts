import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";

/** A named colour sample used in the profile panel. */
export type HexColour = `#${string}`;

export type GuidanceSwatch = {
  name: string;
  hex: HexColour;
};

type SixToEightSwatches =
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch]
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch]
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch];

type ThreeToFiveSwatches =
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch]
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch]
  | readonly [GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch, GuidanceSwatch];

type ColourCategory<TSwatches extends readonly GuidanceSwatch[]> = {
  explainer: string;
  rationale: string;
  swatches: TSwatches;
};

export type ColourGuidance = {
  meaning: string;
  coloursToWear: ColourCategory<SixToEightSwatches>;
  accentColours: ColourCategory<ThreeToFiveSwatches>;
  coloursToAvoid: ColourCategory<ThreeToFiveSwatches>;
};

export type ShapeCategory = {
  explainer: string;
  rationale: string;
  examples: readonly string[];
};

export type ShapeGuidance = {
  meaning: string;
  shapesToWear: ShapeCategory;
  accentShapesAndDetails: ShapeCategory;
  shapesToAvoid: ShapeCategory;
};

const swatch = (name: string, hex: HexColour): GuidanceSwatch => ({ name, hex });

export const colourGuidance = {
  light_spring: {
    meaning: "A light, warm and fresh spring styling palette with a gentle level of contrast.",
    coloursToWear: {
      explainer: "Light, warm colours keep the overall outfit airy and softly luminous.",
      rationale: "The light-spring archetype is supported by warm tints and clear-but-gentle colour rather than heavy depth.",
      swatches: [
        swatch("Buttercream", "#FFF4C2"),
        swatch("Apricot Wash", "#FAD7A0"),
        swatch("Mint", "#B8E3C2"),
        swatch("Aqua Mist", "#9FD9E5"),
        swatch("Coral Blush", "#F5A9A5"),
        swatch("Lilac", "#B7A7E8"),
      ],
    },
    accentColours: {
      explainer: "Use a little extra colour to give a light outfit a lively focal point.",
      rationale: "Spring-bright accents add energy while staying lighter than a deep jewel tone.",
      swatches: [
        swatch("Poppy", "#E85D4A"),
        swatch("Turquoise", "#27AFA0"),
        swatch("Daffodil", "#F4D35E"),
      ],
    },
    coloursToAvoid: {
      explainer: "Very dark or dusty shades can make the palette feel weightier than intended.",
      rationale: "For the light-spring archetype, reserve these low-light and greyed colours for small details if desired.",
      swatches: [
        swatch("Charcoal", "#343434"),
        swatch("Oxblood", "#4A1F2A"),
        swatch("Dusty Olive", "#6B705C"),
      ],
    },
  },
  warm_spring: {
    meaning: "A warm, clear and cheerful spring styling palette with noticeable colour energy.",
    coloursToWear: {
      explainer: "Warm, sunlit hues create a clear and welcoming foundation for outfits.",
      rationale: "The warm-spring archetype is best represented by golden yellows, fresh greens and lively warm reds.",
      swatches: [
        swatch("Marigold", "#F6C343"),
        swatch("Coral Orange", "#F08A3C"),
        swatch("Poppy", "#E85D4A"),
        swatch("Leaf Green", "#7CBF4A"),
        swatch("Turquoise", "#27AFA0"),
        swatch("Sunlit Yellow", "#F4D35E"),
      ],
    },
    accentColours: {
      explainer: "A vivid, clear accent can carry the outfit's focal point without adding visual heaviness.",
      rationale: "The warm-spring archetype welcomes clear, lively punctuation that complements its golden temperature.",
      swatches: [
        swatch("Tomato Red", "#E34234"),
        swatch("Peacock", "#008C95"),
        swatch("Crocus", "#9B5DE5"),
        swatch("Nectarine", "#FF9F68"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy blue-based shades and very muted neutrals may look disconnected from a warm, clear palette.",
      rationale: "For the warm-spring archetype, choose warmer or clearer alternatives when these colours dominate an outfit.",
      swatches: [
        swatch("Icy Blue", "#BFD7EA"),
        swatch("Blue Grey", "#667B8C"),
        swatch("Mauve Grey", "#8E7C86"),
      ],
    },
  },
  bright_spring: {
    meaning: "A bright, warm-leaning spring styling palette built around clarity and lively contrast.",
    coloursToWear: {
      explainer: "Clear, saturated colours give the outfit a crisp and animated centre.",
      rationale: "The bright-spring archetype has room for high-chroma colour and clean contrast rather than hazy blends.",
      swatches: [
        swatch("Vivid Coral", "#FF5A5F"),
        swatch("Saffron", "#FFB000"),
        swatch("Emerald", "#00A878"),
        swatch("Bright Aqua", "#00B8D9"),
        swatch("Violet", "#6C2BD9"),
        swatch("White", "#FFFFFF"),
      ],
    },
    accentColours: {
      explainer: "Pair one high-energy accent with a clean base for deliberate, graphic contrast.",
      rationale: "The bright-spring archetype is supported by saturated warm and warm-leaning complements.",
      swatches: [
        swatch("Scarlet", "#F21B3F"),
        swatch("Cobalt", "#2455D6"),
        swatch("Lime", "#A8D500"),
        swatch("Tangerine", "#F47C20"),
      ],
    },
    coloursToAvoid: {
      explainer: "Hazy, greyed colours and very brown-based darks can soften the crisp effect too far.",
      rationale: "For the bright-spring archetype, use clear alternatives when a muted shade would be the main colour.",
      swatches: [
        swatch("Mushroom", "#9B8F84"),
        swatch("Dusty Rose", "#B7848A"),
        swatch("Brown Black", "#2B2118"),
      ],
    },
  },
  light_summer: {
    meaning: "A light, cool and softly coloured summer styling palette with low contrast.",
    coloursToWear: {
      explainer: "Cool, light tints keep the outfit calm, open and gently blended.",
      rationale: "The light-summer archetype is suited to softened pastels and cool neutrals rather than strong darkness.",
      swatches: [
        swatch("Rosewater", "#F7D7DD"),
        swatch("Powder Blue", "#B8D8E8"),
        swatch("Wisteria", "#C6B6E6"),
        swatch("Seafoam", "#A8D5BA"),
        swatch("Shell Pink", "#EBCFD8"),
        swatch("Soft White", "#F2F3F7"),
      ],
    },
    accentColours: {
      explainer: "A slightly deeper cool accent gives definition while keeping the palette light.",
      rationale: "The light-summer archetype benefits from cool colour that is clear enough to read but not severe.",
      swatches: [
        swatch("Cornflower", "#719BC3"),
        swatch("Raspberry", "#C74772"),
        swatch("Periwinkle", "#7C83D4"),
      ],
    },
    coloursToAvoid: {
      explainer: "Dense black, orange-based earth tones and neon brightness can overwhelm this gentle palette.",
      rationale: "For the light-summer archetype, soften or lighten these colours when they take up most of an outfit.",
      swatches: [
        swatch("Jet Black", "#111111"),
        swatch("Rust", "#A64020"),
        swatch("Neon Lime", "#BFFF00"),
      ],
    },
  },
  cool_summer: {
    meaning: "A cool, balanced and refined summer styling palette with softly controlled contrast.",
    coloursToWear: {
      explainer: "Cool, slightly softened hues create a polished and harmonious base.",
      rationale: "The cool-summer archetype is supported by blue-based colour and rose notes without excessive warmth.",
      swatches: [
        swatch("Cornflower", "#91B7D1"),
        swatch("Dusty Lavender", "#A9A0C7"),
        swatch("Rose Mauve", "#D8A7B1"),
        swatch("Slate Blue", "#6F8FAF"),
        swatch("Eucalyptus", "#7C9A92"),
        swatch("Oyster", "#E3E0E6"),
      ],
    },
    accentColours: {
      explainer: "Use a cool berry or blue accent to sharpen a restrained summer combination.",
      rationale: "The cool-summer archetype suits moderate saturation that adds focus without becoming stark.",
      swatches: [
        swatch("Muted Violet", "#6B4FA1"),
        swatch("Cranberry", "#A83F5B"),
        swatch("Teal Blue", "#327C85"),
      ],
    },
    coloursToAvoid: {
      explainer: "Strong orange warmth and very yellowed neutrals may pull against a cool, quiet harmony.",
      rationale: "For the cool-summer archetype, use these as small contrasts or swap to a blue-based neighbour.",
      swatches: [
        swatch("Pumpkin", "#D35420"),
        swatch("Golden Ochre", "#B8860B"),
        swatch("Warm Camel", "#B58B62"),
      ],
    },
  },
  soft_summer: {
    meaning: "A soft, cool-leaning summer styling palette where blended contrast takes priority.",
    coloursToWear: {
      explainer: "Greyed, medium-depth colours make tonal combinations feel easy and cohesive.",
      rationale: "The soft-summer archetype is supported by restrained chroma and gentle transitions between shades.",
      swatches: [
        swatch("Blue Grey", "#A8B9C5"),
        swatch("Heather", "#B8A9C9"),
        swatch("Muted Rose", "#C79EA6"),
        swatch("Sage Grey", "#8FA39A"),
        swatch("Mushroom", "#B8A88F"),
        swatch("Stone", "#D8D2C4"),
      ],
    },
    accentColours: {
      explainer: "A quiet, deeper accent adds shape to a tonal outfit without breaking its softness.",
      rationale: "The soft-summer archetype works with dusty berry, teal and aubergine rather than hard primaries.",
      swatches: [
        swatch("Dusty Teal", "#4F8585"),
        swatch("Plum", "#705070"),
        swatch("Muted Berry", "#9A4F68"),
      ],
    },
    coloursToAvoid: {
      explainer: "Neon brights and sharp black-and-white contrast can eclipse the palette's blended quality.",
      rationale: "For the soft-summer archetype, use a softened version when these colours would dominate.",
      swatches: [
        swatch("Optical White", "#FFFFFF"),
        swatch("True Black", "#000000"),
        swatch("Neon Pink", "#FF1493"),
      ],
    },
  },
  soft_autumn: {
    meaning: "A soft, warm-leaning autumn styling palette built on mellow, earthy colour relationships.",
    coloursToWear: {
      explainer: "Mellow earth tones create a grounded base with a softly blended finish.",
      rationale: "The soft-autumn archetype is supported by warm, greyed colour rather than very bright or icy extremes.",
      swatches: [
        swatch("Terracotta Rose", "#B88973"),
        swatch("Olive Sage", "#A9A66F"),
        swatch("Camel", "#C5A46D"),
        swatch("Muted Teal", "#7D9A8B"),
        swatch("Russet", "#B37A54"),
        swatch("Oat", "#D8C5A5"),
      ],
    },
    accentColours: {
      explainer: "Choose a warm, softened accent to add interest while retaining a tonal feel.",
      rationale: "The soft-autumn archetype is enlivened by muted spice and moss shades, not high-contrast brights.",
      swatches: [
        swatch("Copper Rose", "#B76E52"),
        swatch("Moss", "#718355"),
        swatch("Teal", "#4E878C"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy pastels and intense jewel tones can feel too crisp beside this mellow, warm palette.",
      rationale: "For the soft-autumn archetype, turn down contrast or add warmth when these colours are prominent.",
      swatches: [
        swatch("Icy Pink", "#E7D6E1"),
        swatch("Electric Blue", "#0057FF"),
        swatch("Blue Black", "#111827"),
      ],
    },
  },
  warm_autumn: {
    meaning: "A warm, rich and earthy autumn styling palette with clear golden depth.",
    coloursToWear: {
      explainer: "Warm spice, foliage and sun-baked colours give outfits a cohesive autumn foundation.",
      rationale: "The warm-autumn archetype is supported by golden temperature and medium-to-deep earthy colour.",
      swatches: [
        swatch("Burnt Sienna", "#C65D32"),
        swatch("Ochre", "#D28B27"),
        swatch("Moss", "#7A9B45"),
        swatch("Teal", "#2F7F77"),
        swatch("Brick", "#A63D2F"),
        swatch("Mustard", "#E1B866"),
      ],
    },
    accentColours: {
      explainer: "A saturated spice or foliage accent adds a confident focal point.",
      rationale: "The warm-autumn archetype can carry strong warm accents when they retain earthy undertones.",
      swatches: [
        swatch("Cinnamon", "#B5651D"),
        swatch("Peacock Teal", "#167D80"),
        swatch("Paprika", "#9E2A2B"),
        swatch("Forest", "#2F5D3A"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy, blue-based pastels and stark optical white can look separate from the warm depth here.",
      rationale: "For the warm-autumn archetype, choose cream or warmed versions when these colours dominate.",
      swatches: [
        swatch("Icy Lavender", "#D8D0E8"),
        swatch("Frost Blue", "#C5E0EA"),
        swatch("Optical White", "#FFFFFF"),
      ],
    },
  },
  deep_autumn: {
    meaning: "A deep, warm and richly shaded autumn styling palette with grounded contrast.",
    coloursToWear: {
      explainer: "Deep foliage, spice and dark neutrals create a substantial but warm visual base.",
      rationale: "The deep-autumn archetype is supported by depth and warmth, with colour that remains earthy rather than icy.",
      swatches: [
        swatch("Oxblood", "#6F2B24"),
        swatch("Copper", "#8E4A2A"),
        swatch("Forest", "#394B2F"),
        swatch("Deep Teal", "#1F5F5B"),
        swatch("Bronze", "#A56B2B"),
        swatch("Espresso", "#3E2A25"),
      ],
    },
    accentColours: {
      explainer: "A warm metallic or saturated foliage accent brings lift to a deep base.",
      rationale: "The deep-autumn archetype benefits from accents that are vivid enough to read but still warm and shaded.",
      swatches: [
        swatch("Copper Rose", "#C1664A"),
        swatch("Saffron", "#D89B22"),
        swatch("Pine", "#276749"),
        swatch("Burnt Orange", "#C4512A"),
      ],
    },
    coloursToAvoid: {
      explainer: "Very pale, icy shades and washed-out greys may lose the intended depth and warmth.",
      rationale: "For the deep-autumn archetype, use these sparingly or pair them with a warm dark anchor.",
      swatches: [
        swatch("Chalk Pink", "#F4E1E6"),
        swatch("Ice Blue", "#D7EEF2"),
        swatch("Pale Grey", "#D4D6D8"),
      ],
    },
  },
  deep_winter: {
    meaning: "A deep, cool and high-contrast winter styling palette with polished tonal authority.",
    coloursToWear: {
      explainer: "Dark cool neutrals and saturated jewel tones establish a clear, dramatic base.",
      rationale: "The deep-winter archetype is supported by depth and cool contrast rather than warm earthiness.",
      swatches: [
        swatch("Ink Navy", "#1C2942"),
        swatch("Plum", "#4A1D34"),
        swatch("Cranberry", "#7B1E3C"),
        swatch("Deep Teal", "#0F5C5E"),
        swatch("Pine", "#356B4F"),
        swatch("Gunmetal", "#4B5563"),
      ],
    },
    accentColours: {
      explainer: "A cool jewel accent makes a deep base feel intentional and distinctive.",
      rationale: "The deep-winter archetype can use saturated colour as a focused point of contrast.",
      swatches: [
        swatch("Sapphire", "#2455D6"),
        swatch("Amethyst", "#6C2BD9"),
        swatch("Fuchsia", "#C21875"),
        swatch("Icy Mint", "#A7E8E1"),
      ],
    },
    coloursToAvoid: {
      explainer: "Warm, dusty mid-tones may look less coherent beside the palette's cool depth.",
      rationale: "For the deep-winter archetype, choose cooler or cleaner alternatives when these shades dominate.",
      swatches: [
        swatch("Camel", "#C19A6B"),
        swatch("Rust", "#A64020"),
        swatch("Warm Beige", "#D8C3A5"),
      ],
    },
  },
  cool_winter: {
    meaning: "A cool, clear and balanced winter styling palette with crisp jewel contrast.",
    coloursToWear: {
      explainer: "Blue-based colour, cool neutrals and clean contrast give this palette a refined clarity.",
      rationale: "The cool-winter archetype is supported by cool temperature and medium-to-deep colour without yellow warmth.",
      swatches: [
        swatch("Cobalt Navy", "#1B3A6F"),
        swatch("Sapphire", "#2C5AA0"),
        swatch("Berry", "#8B2E5D"),
        swatch("Purple", "#7B3F98"),
        swatch("Jade", "#0F766E"),
        swatch("Frost White", "#F4F7FF"),
      ],
    },
    accentColours: {
      explainer: "A clean jewel accent adds focus while preserving cool, polished contrast.",
      rationale: "The cool-winter archetype welcomes saturated blue, pink and violet accents with blue undertones.",
      swatches: [
        swatch("Electric Blue", "#0057FF"),
        swatch("Magenta", "#D5006D"),
        swatch("Iris", "#5B4BBD"),
      ],
    },
    coloursToAvoid: {
      explainer: "Yellowed earth tones and dusty orange shades can interrupt this cool, clear harmony.",
      rationale: "For the cool-winter archetype, switch to a blue-based or cleaner counterpart when practical.",
      swatches: [
        swatch("Mustard", "#C49A00"),
        swatch("Terracotta", "#C65D32"),
        swatch("Warm Olive", "#7B7D3A"),
      ],
    },
  },
  bright_winter: {
    meaning: "A bright, neutral-temperature winter styling palette built around high clarity and graphic contrast.",
    coloursToWear: {
      explainer: "Clean saturated colour and sharp neutrals create a vivid, modern foundation.",
      rationale: "The bright-winter archetype is supported by high chroma and decisive contrast rather than softened transitions.",
      swatches: [
        swatch("Scarlet", "#FF1744"),
        swatch("Magenta", "#FF3D81"),
        swatch("Electric Blue", "#0057FF"),
        swatch("Turquoise", "#00C2A8"),
        swatch("Violet", "#7D00FF"),
        swatch("Icy White", "#F7F7FF"),
        swatch("Black", "#101010"),
      ],
    },
    accentColours: {
      explainer: "One vivid accent creates an intentional focal point against a clean neutral.",
      rationale: "The bright-winter archetype can carry strong cool colour and high-contrast pairings.",
      swatches: [
        swatch("Cyan", "#00B8D9"),
        swatch("Fuchsia", "#D10072"),
        swatch("Lime", "#A8D500"),
        swatch("Royal Blue", "#2448C8"),
      ],
    },
    coloursToAvoid: {
      explainer: "Low-chroma browns, yellowed creams and hazy blends can mute the palette's crisp effect.",
      rationale: "For the bright-winter archetype, choose a cleaner or cooler alternative when softness would dominate.",
      swatches: [
        swatch("Taupe", "#8B8178"),
        swatch("Yellow Cream", "#F3E5AB"),
        swatch("Dusty Mauve", "#A88C9E"),
      ],
    },
  },
} satisfies Record<ColourSeason, ColourGuidance>;

export const shapeGuidance = {
  hourglass: {
    meaning: "Your bust and hips measure closely balanced, with a clearly defined waist in the proportion check used here.",
    shapesToWear: {
      explainer: "Follow the measured balance with garments that skim naturally and show considered shaping.",
      rationale: "Wrap lines, shaped tailoring and fluid fit can echo the close bust-to-hip relationship without restricting movement.",
      examples: ["Wrap tops and dresses", "Shaped blazers", "Straight or gently flared trousers", "Bias-cut skirts"],
    },
    accentShapesAndDetails: {
      explainer: "Small details at the natural waist or along curved seams add definition with ease.",
      rationale: "A waist tie, curved seam or moderate belt works with the measured waist-to-hip difference as an optional styling focal point.",
      examples: ["Waist ties", "Medium-width belts", "Curved princess seams", "Soft sweetheart or V-necklines"],
    },
    shapesToAvoid: {
      explainer: "When conventional balance is the goal, very boxy or dropped-waist shapes may obscure the measured proportions.",
      rationale: "These cuts place emphasis away from the waist or add unstructured width; they remain valid choices when a relaxed, straight effect is preferred.",
      examples: ["Oversized boxy jackets", "Dropped-waist dresses", "Very low-rise bottoms", "Unshaped tunics"],
    },
  },
  triangle: {
    meaning: "Your hip measurement is fuller than your bust measurement, creating more volume through the lower half of your silhouette.",
    shapesToWear: {
      explainer: "Place structure or visual interest above the waist and let the lower line fall cleanly.",
      rationale: "Shoulder-led structure and fluid lower silhouettes can create a balanced outfit while respecting the measured bust-to-hip difference.",
      examples: ["Boat or square-neck tops", "Structured shoulders", "A-line skirts", "Straight or wide-leg trousers"],
    },
    accentShapesAndDetails: {
      explainer: "Use neckline, sleeve and upper-layer details as optional points of focus.",
      rationale: "Pattern, texture or light at the upper body can balance an outfit composition without prescribing a body ideal.",
      examples: ["Statement collars", "Sleeve volume", "Cropped structured jackets", "Necklace or scarf interest"],
    },
    shapesToAvoid: {
      explainer: "When conventional balance is the goal, concentrated volume or contrast at the hip can increase lower-body emphasis.",
      rationale: "These choices draw the eye to the area already larger by measurement; choose them freely when that is the desired styling effect.",
      examples: ["Large hip pockets", "Gathered hip peplums", "Strong horizontal hip stripes", "Very stiff hip volume"],
    },
  },
  full_midsection: {
    meaning: "Your waist measurement is greater than your hip measurement in the proportion check used here.",
    shapesToWear: {
      explainer: "Use open lines, easy drape and clean vertical movement through the centre of an outfit.",
      rationale: "Open necklines, long layers and softly straight silhouettes create comfort and continuity around the measured waist area.",
      examples: ["Open V-necks or scoop necks", "Longline cardigans", "Straight-leg trousers", "Softly structured shift dresses"],
    },
    accentShapesAndDetails: {
      explainer: "Vertical, tonal and face-framing details add interest without requiring waist definition.",
      rationale: "Seams, accessories and colour continuity guide the eye through the outfit while keeping the midsection comfortable.",
      examples: ["Long pendant necklaces", "Vertical seam lines", "Tonal dressing", "Open-front layers"],
    },
    shapesToAvoid: {
      explainer: "When conventional balance is the goal, abrupt waist contrast or rigid cling can interrupt a smooth line.",
      rationale: "These cuts concentrate attention at the waist or limit ease; wear them when a defined or close-fitting effect is wanted.",
      examples: ["Rigid waist-cinched tailoring", "High-contrast waistbands", "Very clingy jersey", "Bulky layers ending at the waist"],
    },
  },
  rectangle: {
    meaning: "Your bust and hips measure closely balanced without the waist difference used here for the hourglass result.",
    shapesToWear: {
      explainer: "Introduce optional shape through tailoring, layering and varied volume while keeping movement easy.",
      rationale: "Waist-shaped seams, gentle volume and proportioned separates can create an outfit rhythm without implying that one silhouette is required.",
      examples: ["Belted shirt dresses", "Peplum or curved-hem tops", "High-rise wide-leg trousers", "Tailored waistcoats"],
    },
    accentShapesAndDetails: {
      explainer: "Curved seams, tiers and strategic colour breaks provide flexible focal points.",
      rationale: "Details that vary line and volume give the measured proportions more visual structure when that is desired.",
      examples: ["Tie belts", "Curved seam panels", "Layered or tiered skirts", "Colour-blocked waist details"],
    },
    shapesToAvoid: {
      explainer: "When conventional balance is the goal, an entirely unbroken column or excessive shapeless volume may reduce visible definition.",
      rationale: "These choices minimise changes in line; they are still useful for a deliberately minimalist or relaxed outfit.",
      examples: ["Head-to-toe unbroken column", "Dropped-waist shifts", "Oversized matching separates", "Very long unstructured layers"],
    },
  },
  inverted_triangle: {
    meaning: "Your bust measurement is fuller than your hip measurement, creating more volume through the upper half of your silhouette.",
    shapesToWear: {
      explainer: "Keep the upper line clean and let lower silhouettes add optional width and movement.",
      rationale: "Simple necklines with fuller skirts or trousers can balance an outfit composition around the measured bust-to-hip difference.",
      examples: ["Open V-necks", "Simple knit tops", "A-line skirts", "Wide-leg or bootcut trousers"],
    },
    accentShapesAndDetails: {
      explainer: "Use lower-body pattern, texture and shape as an easy place for visual interest.",
      rationale: "Details below the waist distribute attention through the outfit without making assumptions about comfort or preference.",
      examples: ["Pleated trousers", "Patterned skirts", "Hip-level pockets", "Textured or tiered hems"],
    },
    shapesToAvoid: {
      explainer: "When conventional balance is the goal, added shoulder volume or strong upper-body contrast can increase top-line emphasis.",
      rationale: "These details draw attention to the area already larger by measurement; choose them when an upper-focused effect is intended.",
      examples: ["Shoulder pads", "Very wide boat necks", "Large upper-body ruffles", "Bright high-contrast shoulder details"],
    },
  },
} satisfies Record<BodyShape, ShapeGuidance>;

export const styleGuidance = {
  colour: colourGuidance,
  shape: shapeGuidance,
} as const;
