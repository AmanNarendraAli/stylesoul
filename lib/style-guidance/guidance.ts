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
  swatches: TSwatches;
};

export type ColourGuidance = {
  coloursToWear: ColourCategory<SixToEightSwatches>;
  accentColours: ColourCategory<ThreeToFiveSwatches>;
  coloursToAvoid: ColourCategory<ThreeToFiveSwatches>;
};

export type ShapeCategory = {
  explainer: string;
  examples: readonly string[];
};

export type ShapeGuidance = {
  shapesToWear: ShapeCategory;
  accentShapesAndDetails: ShapeCategory;
  shapesToAvoid: ShapeCategory;
};

const swatch = (name: string, hex: HexColour): GuidanceSwatch => ({ name, hex });

export const colourGuidance = {
  light_spring: {
    coloursToWear: {
      explainer: "Wear these light, warm shades for most of your outfit.",
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
      explainer: "Add one brighter shade, such as a top or scarf, to lift a light outfit.",
      swatches: [
        swatch("Poppy", "#E85D4A"),
        swatch("Turquoise", "#27AFA0"),
        swatch("Daffodil", "#F4D35E"),
      ],
    },
    coloursToAvoid: {
      explainer: "Very dark and dusty shades can look heavy near your face.",
      swatches: [
        swatch("Charcoal", "#343434"),
        swatch("Oxblood", "#4A1F2A"),
        swatch("Dusty Olive", "#6B705C"),
      ],
    },
  },
  warm_spring: {
    coloursToWear: {
      explainer: "Wear warm, clear shades like these as your main colours.",
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
      explainer: "Finish an outfit with one vivid shade, such as a red bag or a bright top.",
      swatches: [
        swatch("Tomato Red", "#E34234"),
        swatch("Peacock", "#008C95"),
        swatch("Crocus", "#9B5DE5"),
        swatch("Nectarine", "#FF9F68"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy blues and greyed neutrals can look flat against warm colouring.",
      swatches: [
        swatch("Icy Blue", "#BFD7EA"),
        swatch("Blue Grey", "#667B8C"),
        swatch("Mauve Grey", "#8E7C86"),
      ],
    },
  },
  bright_spring: {
    coloursToWear: {
      explainer: "Choose clear, saturated colours and pair them with crisp white.",
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
      explainer: "Pair one strong accent with a plain outfit.",
      swatches: [
        swatch("Scarlet", "#F21B3F"),
        swatch("Cobalt", "#2455D6"),
        swatch("Lime", "#A8D500"),
        swatch("Tangerine", "#F47C20"),
      ],
    },
    coloursToAvoid: {
      explainer: "Dusty shades and brown-black can dull your colouring.",
      swatches: [
        swatch("Mushroom", "#9B8F84"),
        swatch("Dusty Rose", "#B7848A"),
        swatch("Brown Black", "#2B2118"),
      ],
    },
  },
  light_summer: {
    coloursToWear: {
      explainer: "Wear soft, cool pastels and light neutrals close to your face.",
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
      explainer: "Use a slightly deeper cool shade to add definition.",
      swatches: [
        swatch("Cornflower", "#719BC3"),
        swatch("Raspberry", "#C74772"),
        swatch("Periwinkle", "#7C83D4"),
      ],
    },
    coloursToAvoid: {
      explainer: "Black, rusty earth tones and neon can overpower light colouring.",
      swatches: [
        swatch("Jet Black", "#111111"),
        swatch("Rust", "#A64020"),
        swatch("Neon Lime", "#BFFF00"),
      ],
    },
  },
  cool_summer: {
    coloursToWear: {
      explainer: "Build outfits from cool, slightly softened blues, roses and greys.",
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
      explainer: "Add a cool berry or blue to give a quiet outfit a focal point.",
      swatches: [
        swatch("Muted Violet", "#6B4FA1"),
        swatch("Cranberry", "#A83F5B"),
        swatch("Teal Blue", "#327C85"),
      ],
    },
    coloursToAvoid: {
      explainer: "Orange and yellowed neutrals clash with cool colouring.",
      swatches: [
        swatch("Pumpkin", "#D35420"),
        swatch("Golden Ochre", "#B8860B"),
        swatch("Warm Camel", "#B58B62"),
      ],
    },
  },
  soft_summer: {
    coloursToWear: {
      explainer: "Wear greyed, medium shades and mix them in tonal outfits.",
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
      explainer: "Add a deeper dusty shade, such as teal or plum, for contrast.",
      swatches: [
        swatch("Dusty Teal", "#4F8585"),
        swatch("Plum", "#705070"),
        swatch("Muted Berry", "#9A4F68"),
      ],
    },
    coloursToAvoid: {
      explainer: "Stark black, bright white and neon look harsh next to soft colouring.",
      swatches: [
        swatch("Optical White", "#FFFFFF"),
        swatch("True Black", "#000000"),
        swatch("Neon Pink", "#FF1493"),
      ],
    },
  },
  soft_autumn: {
    coloursToWear: {
      explainer: "Wear mellow, earthy shades and mix them in tonal outfits.",
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
      explainer: "Add a muted spice or moss shade to give a tonal outfit a focal point.",
      swatches: [
        swatch("Copper Rose", "#B76E52"),
        swatch("Moss", "#718355"),
        swatch("Teal", "#4E878C"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy pastels and strong jewel tones look sharp against soft, warm colouring.",
      swatches: [
        swatch("Icy Pink", "#E7D6E1"),
        swatch("Electric Blue", "#0057FF"),
        swatch("Blue Black", "#111827"),
      ],
    },
  },
  warm_autumn: {
    coloursToWear: {
      explainer: "Build outfits around warm spice and leaf colours like these.",
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
      explainer: "Add one rich spice or forest shade as the focal point.",
      swatches: [
        swatch("Cinnamon", "#B5651D"),
        swatch("Peacock Teal", "#167D80"),
        swatch("Paprika", "#9E2A2B"),
        swatch("Forest", "#2F5D3A"),
      ],
    },
    coloursToAvoid: {
      explainer: "Icy pastels and bright white can look stark, so choose cream for tops.",
      swatches: [
        swatch("Icy Lavender", "#D8D0E8"),
        swatch("Frost Blue", "#C5E0EA"),
        swatch("Optical White", "#FFFFFF"),
      ],
    },
  },
  deep_autumn: {
    coloursToWear: {
      explainer: "Wear deep, warm shades like these as your base.",
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
      explainer: "Lift a dark outfit with one warmer, brighter shade.",
      swatches: [
        swatch("Copper Rose", "#C1664A"),
        swatch("Saffron", "#D89B22"),
        swatch("Pine", "#276749"),
        swatch("Burnt Orange", "#C4512A"),
      ],
    },
    coloursToAvoid: {
      explainer: "Very pale, icy shades can wash you out.",
      swatches: [
        swatch("Chalk Pink", "#F4E1E6"),
        swatch("Ice Blue", "#D7EEF2"),
        swatch("Pale Grey", "#D4D6D8"),
      ],
    },
  },
  deep_winter: {
    coloursToWear: {
      explainer: "Wear dark, cool shades and deep jewel tones as your base.",
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
      explainer: "Add one bright jewel colour to a dark outfit.",
      swatches: [
        swatch("Sapphire", "#2455D6"),
        swatch("Amethyst", "#6C2BD9"),
        swatch("Fuchsia", "#C21875"),
        swatch("Icy Mint", "#A7E8E1"),
      ],
    },
    coloursToAvoid: {
      explainer: "Warm, dusty mid-tones like camel and rust can look muddy on you.",
      swatches: [
        swatch("Camel", "#C19A6B"),
        swatch("Rust", "#A64020"),
        swatch("Warm Beige", "#D8C3A5"),
      ],
    },
  },
  cool_winter: {
    coloursToWear: {
      explainer: "Choose blue-based colours and crisp white for most of your outfit.",
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
      explainer: "Add one bright, cool shade for contrast.",
      swatches: [
        swatch("Electric Blue", "#0057FF"),
        swatch("Magenta", "#D5006D"),
        swatch("Iris", "#5B4BBD"),
      ],
    },
    coloursToAvoid: {
      explainer: "Mustard and earthy oranges can look dull on you.",
      swatches: [
        swatch("Mustard", "#C49A00"),
        swatch("Terracotta", "#C65D32"),
        swatch("Warm Olive", "#7B7D3A"),
      ],
    },
  },
  bright_winter: {
    coloursToWear: {
      explainer: "Wear clear, saturated colours with black or icy white.",
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
      explainer: "Pair one vivid shade with a plain neutral.",
      swatches: [
        swatch("Cyan", "#00B8D9"),
        swatch("Fuchsia", "#D10072"),
        swatch("Lime", "#A8D500"),
        swatch("Royal Blue", "#2448C8"),
      ],
    },
    coloursToAvoid: {
      explainer: "Muted browns and creamy yellows can dull your colouring.",
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
    shapesToWear: {
      explainer: "Choose pieces that follow your waist, such as wrap styles and shaped jackets.",
      examples: ["Wrap and angrakha kurtas", "Fitted-waist anarkalis", "Sarees in fluid fabrics", "Shaped blazers", "Straight or gently flared trousers"],
    },
    accentShapesAndDetails: {
      explainer: "A belt or tie at your natural waist keeps your outline clear.",
      examples: ["Waist ties", "Medium-width belts", "Curved princess seams", "Soft sweetheart or V-necklines"],
    },
    shapesToAvoid: {
      explainer: "Boxy and dropped-waist cuts hide your waist, so belt them or pick shaped versions.",
      examples: ["Boxy straight kurtas", "Kaftans without a waist", "Dropped-waist dresses", "Unshaped tunics"],
    },
  },
  triangle: {
    shapesToWear: {
      explainer: "Add structure on top and let skirts and trousers fall cleanly from the hip.",
      examples: ["A-line and anarkali kurtas", "Boat or square-neck tops", "Structured shoulders", "Straight pants or palazzos", "A-line skirts"],
    },
    accentShapesAndDetails: {
      explainer: "Put detail at the neckline and sleeves to draw the eye up.",
      examples: ["Embroidered yokes and necklines", "Statement collars", "Sleeve detail", "A detailed saree pallu and blouse"],
    },
    shapesToAvoid: {
      explainer: "Volume or bold detail at the hip makes it the focal point.",
      examples: ["Short kurtas over tight churidars", "Heavy hem or hip embroidery", "Large hip pockets", "Stiff flared skirts"],
    },
  },
  full_midsection: {
    shapesToWear: {
      explainer: "Choose open necklines and long, straight layers that skim your middle.",
      examples: ["Long straight or A-line kurtas", "Open V-necks or scoop necks", "Empire-waist styles", "Kaftans", "Georgette or chiffon sarees"],
    },
    accentShapesAndDetails: {
      explainer: "Long necklaces and vertical seams draw the eye up and down.",
      examples: ["Long pendant necklaces", "A dupatta worn long", "Vertical seam lines", "Tonal dressing"],
    },
    shapesToAvoid: {
      explainer: "Tight waistbands and clingy fabric draw attention to your middle.",
      examples: ["Belts at the waist", "Short crop blouses", "Peplums", "Very clingy jersey"],
    },
  },
  rectangle: {
    shapesToWear: {
      explainer: "Use belts, peplums and high waists to create a waistline.",
      examples: ["Belted or peplum kurtas", "Angrakha kurtas with ties", "Anarkalis and shararas", "Crisp organza or cotton sarees", "High-rise wide-leg trousers"],
    },
    accentShapesAndDetails: {
      explainer: "Curved seams and tiered skirts add shape where you want it.",
      examples: ["Tie belts", "Curved seam panels", "Layered or tiered skirts", "Colour-blocked waist details"],
    },
    shapesToAvoid: {
      explainer: "Long unbroken columns and loose, boxy layers can look shapeless.",
      examples: ["Long straight kurtas with no shaping", "Head-to-toe unbroken column", "Dropped-waist shifts", "Oversized matching separates"],
    },
  },
  inverted_triangle: {
    shapesToWear: {
      explainer: "Keep tops simple and add fullness with A-line skirts or wide trousers.",
      examples: ["Simple V or scoop necklines", "Anarkalis and flared kurtas", "Shararas and palazzos", "A-line skirts", "Crisp sarees"],
    },
    accentShapesAndDetails: {
      explainer: "Put pattern and texture below the waist to balance your shoulders.",
      examples: ["Embroidery at the hem", "Patterned skirts and pants", "Pleated trousers", "Textured or tiered hems"],
    },
    shapesToAvoid: {
      explainer: "Shoulder pads and wide necklines add width up top.",
      examples: ["Puff sleeves", "Shoulder pads", "Wide boat necks", "Heavy embroidered yokes"],
    },
  },
} satisfies Record<BodyShape, ShapeGuidance>;
