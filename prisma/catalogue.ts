import { bodyShapes } from "../lib/body-shape/classify.ts";
import { colourSeasons } from "../lib/colour-season/map.ts";

export type CuratedProduct = {
  brand: string;
  title: string;
  description: string | null;
  imageUrl: string;
  productUrl: string;
  isAffiliate: false;
  priceCents: number;
  currency: "GBP";
  status: "active";
  eligibleShapes: string[];
  eligibleSeasons: string[];
  garmentCategory: string;
  occasionTags: string[];
  priceTier: "entry" | "mid" | "premium";
};

// Live retailer products checked on 2026-10-12. Each row is one colour variant
// (the productUrl selects it and the image shows it), on sale with stock in that colour.
// Eligibility is materialised per item from its named cut and displayed colour.
export { bodyShapes as canonicalShapes, colourSeasons as canonicalSeasons };

export const curatedProducts: readonly CuratedProduct[] = [
  {
    "brand": "M&S",
    "title": "Satin Scoop Neck Midi Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5819_I7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-scoop-neck-midi-slip-dress/p/clp61233946",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Textured V-Neck Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_2729U_D6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-v-neck-blouse/p/clp61229513",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_8745_EK_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-shirt/p/clp60777917?color=CALICO",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Collared Fitted Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_5003S_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-collared-fitted-shirt/p/clp60777061?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Striped Oversized Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_2010S_E4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-oversized-shirt/p/clp61218302",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Striped Oxford Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_7087W_E4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-oxford-shirt/p/clp61226209?color=BLUEMIX",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen Relaxed Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_6944_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-relaxed-shirt/p/clp61228844",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Twill Straight Leg Ankle Grazer Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_2135T_VP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-twill-straight-leg-trousers/p/clp60613519?color=CHARCOAL",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Slim Fit Ankle Grazer Trousers ",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4267_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-slim-fit-ankle-grazer-trousers/p/clp60506651?color=BLACK",
    "isAffiliate": false,
    "priceCents": 1950,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Satin Drawstring Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_8988_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-drawstring-wide-leg-trousers/p/clp61223280?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "rectangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Wide Leg Trousers with Stretch",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4793_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-wide-leg-trousers-with-stretch/p/clp60506499?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Straight Leg Trousers with Stretch",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4358_F3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-straight-leg-trousers-with-stretch/p/clp60506862?color=DARKNAVY",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Stretch straight leg chinos",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_6435_FS_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-straight-leg-chinos/p/clp60634040?color=MIDNIGHTNAVY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Multi Pleat Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_6324T_GX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/multi-pleat-wide-leg-trousers/p/clp61223612",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Lace Balloon Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7719U_UX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-parachute-relaxed-trousers/p/clp61222595?color=DARKMOLE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn Button Front Short Sleeve Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8521_HS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-button-front-short-sleeve-cropped-cardigan/p/clp60759261?color=REDWOOD",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Knee Length Pencil Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_1555S_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-knee-length-pencil-skirt/p/clp60681857?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Mini A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_8004S_Y0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/jersey-mini-a-line-skirt/p/clp60690195?color=BLACK",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Suedette Funnel Neck Short Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_2144_RB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/suedette-funnel-neck-short-jacket/p/clp61227191?color=NEARLYBLACK",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Funnel Neck Parka Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_2184_L0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-funnel-neck-parka-coat/p/clp61227097",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Tweed Textured Collared Jacket with Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_8763J_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tweed-textured-collared-jacket-with-wool/p/clp60778985?color=IVORY",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "The Trench",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_7651C_ZV_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-longline-trench-coat/p/clp60779115?color=LIGHTCARAMEL",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn",
      "warm_spring"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Leather Funnel Neck Bomber Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_4381T_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/leather-funnel-neck-bomber-jacket/p/clp61222517",
    "isAffiliate": false,
    "priceCents": 28000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Car Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_2303C_ZV_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-car-coat/p/clp60779114?color=LIGHTCARAMEL",
    "isAffiliate": false,
    "priceCents": 7000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn",
      "warm_spring"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Denim Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_2176_QP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-cropped-jacket/p/clp61227121",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Short Button Through Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_7558C_SU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-short-button-through-jacket/p/clp61235148",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "light_spring"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Waterproof Rain Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_5935J_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/waterproof-rain-jacket/p/clp60780374?color=BLACK",
    "isAffiliate": false,
    "priceCents": 17500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Per Una",
    "title": "High Waisted Belted Slouchy Wide Leg Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7775U_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-waisted-belted-slouchy-wide-leg-jeans/p/clp61226458?color=GREY",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Satin V Neck Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_2648U_CF_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-plisse-blouse/p/clp61267338?color=SOFTBLUE",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Padded Shoulder Waisted Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_1604_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/waisted-padded-shoulder-shirt/p/clp61266618?color=IVORY",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "French Connection",
    "title": "Pleat Front Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8504Q_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pleat-front-wide-leg-trousers/p/clp23068508?color=RED",
    "isAffiliate": false,
    "priceCents": 8500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Leather Aged Relaxed Shawl Collar Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_9480_N0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-leather-aged-relaxed-jacket/p/clp61266656?color=BROWN",
    "isAffiliate": false,
    "priceCents": 25000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Pintuck Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_8548_UT_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-pintuck-wide-leg-trousers/p/clp61227269?color=GREYMARL",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Twill Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_9217_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/twill-straight-leg-trousers/p/clp61266514?color=RED",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Ultimate Pleat Front Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_6327T_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ultimate-pleat-front-straight-leg-trousers/p/clp61223688?color=IVORY",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Mohair Cable Knit V Neck Keyhole Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6012L_J3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mohair-cable-knit-v-neck-keyhole-jumper/p/clp61248647?color=DARKGREEN",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn",
      "deep_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn Wide Leg Knitted Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8376_QJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-wide-leg-knitted-trousers/p/clp60761192?color=MIDGREYMARL",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Mohair and Wool V-Neck Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6020L_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mohair-and-wool-v-neck-knitted-top/p/clp61226004?color=RED",
    "isAffiliate": false,
    "priceCents": 7900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Lyocell Blend Fluid Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6603K_VA_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tencel-rich-fluid-blazer/p/clp61225320?color=COPPER",
    "isAffiliate": false,
    "priceCents": 13500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Merino Wool Rich V Neck Jumper with Cashmere",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_5567T_SR_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/merino-wool-rich-v-neck-jumper-with-cashmere/p/clp61267285?color=DUSTEDPINK",
    "isAffiliate": false,
    "priceCents": 11000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "HUSH",
    "title": "Pure Cotton Wide Leg Cropped Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9772U_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-wide-leg-cropped-trousers/p/clp23079228?color=WHITE",
    "isAffiliate": false,
    "priceCents": 8700,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "V Neck Ruffle Detail Button Through Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_8138W_NZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/v-neck-ruffle-detail-button-through-blouse/p/clp61226867?color=ECRU",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Merino Wool with Silk V-Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6010K_G2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/merino-wool-with-silk-v-neck-jumper/p/clp61225918?color=SPICE",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Padded Shoulder Waisted Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_1604_QE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/waisted-padded-shoulder-shirt/p/clp61266618?color=PALEBLUE",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "light_summer",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Crepe Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7312K_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-crepe-wide-leg-trousers/p/clp61225830?color=IVORY",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Textured Funnel Neck Relaxed Cardigan With Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_5940_QJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-funnel-neck-relaxed-cardigan-with-wool/p/clp61233358?color=MIDGREYMARL",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Alpaca Blend Textured Relaxed Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_0816_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/alpaca-blend-textured-relaxed-jumper/p/clp60753699?color=GREEN",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Jersey Wide Leg Trousers with Stretch",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4793_XR_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-wide-leg-trousers-with-stretch/p/clp60506499?color=CARAMEL",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Pure Wool Single Breasted Waisted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_4392T_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-single-breasted-waisted-blazer/p/clp61225582?color=GREY",
    "isAffiliate": false,
    "priceCents": 15000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Wool Blend Pleated V Neck Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6301L_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-blend-pleated-v-neck-midi-waisted-dress/p/clp61248213?color=BLACK",
    "isAffiliate": false,
    "priceCents": 17500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Phase Eight",
    "title": "Textured Collarless Zip Up Midi Waisted",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8331V_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-collarless-zip-up-midi-waisted/p/clp23084820?color=RED",
    "isAffiliate": false,
    "priceCents": 11900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen V-Neck Relaxed Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_8890_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-v-neck-relaxed-top/p/clp61226058?color=WHITE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Wrap Tie Side Midi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_4186_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-wrap-tie-side-midi-skirt/p/clp61220714?color=IVORY",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "V-Neck Relaxed Jumper With Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_4784_UT_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/v-neck-relaxed-jumper-with-wool/p/clp61226404?color=GREYMARL",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Pointelle V-Neck Cardigan with Mohair",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_5801U_CZ_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pointelle-v-neck-cardigan-with-mohair/p/clp61226825?color=BURNISHEDCOPPER",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Rich Slash Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_2927_VA_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-slash-neck-top/p/clp61234731?color=COPPER",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Mini Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5690_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-mini-skater-dress/p/clp61230872?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Denim Striped Mini Wrap Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7770U_QQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-striped-mini-wrap-skirt/p/clp61226833?color=MEDIUMINDIGO",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "V Neck Relaxed Jumper with Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8622_B5_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/v-neck-relaxed-jumper-with-wool/p/clp61248105?color=BRIGHTRED",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Lyocell Rich Elasticated Waist Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_6270_Q0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-elasticated-waist-wide-leg-trousers/p/clp61223158?color=RUST",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Distressed Mid Rise Straight Leg Jean",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_1112_QQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mid-rise-straight-leg-jeans/p/clp61268013?color=MEDIUMINDIGO",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Modal Rich Embroidered Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_2921U_CZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/modal-rich-embroidered-shirt/p/clp61226872?color=BURNISHEDCOPPER",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Pleated Midi Circle Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_2834S_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pleated-midi-circle-skirt/p/clp61234017?color=BLACK",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Funnel Neck Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_4374_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-funnel-neck-cardigan/p/clp61270525?color=IVORY",
    "isAffiliate": false,
    "priceCents": 10000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Joules",
    "title": "Pure Cotton Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8068U_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-midi-waisted-dress/p/clp23074462?color=RED",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Pleated Midaxi Full Circle Skirt with Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_8513T_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pleated-midaxi-full-circle-skirt-with-wool/p/clp61224759?color=GREY",
    "isAffiliate": false,
    "priceCents": 9000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Midaxi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_8005_K0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/midaxi-waisted-dress/p/clp60756071?color=CREAM",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "High Waisted Wide Leg Ankle Grazer Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_3884_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-waist-wide-leg-jeans/p/clp60723584?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Tufted Asymmetric Midaxi Tiered Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7631U_UX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tufted-asymmetric-midaxi-tiered-skirt/p/clp61220354?color=DARKMOLE",
    "isAffiliate": false,
    "priceCents": 5800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Funnel Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T41_1024C_XM_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/funnel-neck-top/p/clp61248543?color=BURGUNDY",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn",
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Merino Wool with Silk V-Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6010K_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/merino-wool-with-silk-v-neck-jumper/p/clp61225918?color=RED",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Cotton Modal Barrel Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7316K_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-modal-barrel-leg-trousers/p/clp61225971?color=GREEN",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Satin Maxi Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7973U_GF_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-maxi-slip-skirt/p/clp61224427?color=SMOKE",
    "isAffiliate": false,
    "priceCents": 4200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Blend Square Neck Puff Sleeve Mini Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_2935_VA_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-blend-square-neck-puff-sleeve-mini-dress/p/clp61266460?color=COPPER",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Buckle Detail Midi Wrap Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_5271_BL_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-buckle-detail-midi-wrap-skirt/p/clp61271526?color=WHEAT",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Shower Resistant Lightweight Hooded Longline Utility Parka",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_0015_XP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lightweight-hooded-longline-utility-parka/p/clp60776580?color=POPPY",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Leather Midi A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7509L_KY_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/leather-midi-a-line-skirt/p/clp61225186?color=IVORY",
    "isAffiliate": false,
    "priceCents": 25000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Cord Pull On Barrel Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_2843_WE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cord-pull-on-barrel-leg-trousers/p/clp61232739?color=DARKAUBERGINE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cord Mini Shift Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5344W_FS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cord-mini-shift-dress/p/clp61227451?color=MIDNIGHTNAVY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Sheer Cape Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_3740_EM_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-sheer-cape-top/p/clp61226050?color=DUCKEGG",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Embellished High Waisted Wide Leg Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_2777_QQ_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-embellished-high-waisted-wide-leg-jeans/p/clp61225038?color=MEDIUMINDIGO",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Denim Pintuck Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_4485D_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-pintuck-midi-column-dress/p/clp61225712?color=DENIM",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pinstripe Detachable Wrap Detail Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_3667T_CW_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pinstripe-wrap-detail-wide-leg-trousers/p/clp61267752?color=DARKBURGUNDY",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Embroidered Lace Knee Length Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_8101_DQ_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/embroidered-lace-knee-length-skirt/p/clp61266665?color=MOSS",
    "isAffiliate": false,
    "priceCents": 7500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Denim Tie Neck Mini Swing Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_9047D_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-tie-neck-mini-swing-dress/p/clp61235776?color=DENIM",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Waisted Faux Fur Trim Parka",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_1667_SS_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-waisted-faux-fur-trim-parka/p/clp61267635?color=STONE",
    "isAffiliate": false,
    "priceCents": 8500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Leather Midi Pencil Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_8536T_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/leather-midi-pencil-skirt/p/clp61266482?color=BLACK",
    "isAffiliate": false,
    "priceCents": 22500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Silk Blend Collared Relaxed Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6577J_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/silk-blend-collared-relaxed-shirt/p/clp60789334?color=WHITE",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Lace Split Back Maxi Straight Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_8527T_DQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-split-back-maxi-straight-skirt/p/clp61250037?color=MOSS",
    "isAffiliate": false,
    "priceCents": 9000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Waisted Slim Fit Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6018L_KC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-waisted-jacket/p/clp61225559?color=OATMEAL",
    "isAffiliate": false,
    "priceCents": 13500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Per Una",
    "title": "Pointelle Fitted Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_5806U_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pointelle-fitted-cardigan/p/clp61267163?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "High Waisted Wide Leg Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_7112T_QP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-waisted-wide-leg-jeans/p/clp60717301?color=DARKINDIGO",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Ribbed Slim Fit Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T41_7445_VX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/2-pack-cotton-rich-ribbed-regular-fit-top/p/clp61227337?color=CLARET",
    "isAffiliate": false,
    "priceCents": 1000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Satin High Neck Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_4066T_D6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-high-neck-blouse/p/clp61269466?color=SOFTPINK",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Jersey Ruched Regular Fit Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6813L_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-ruched-regular-fit-top/p/clp61267349?color=RED",
    "isAffiliate": false,
    "priceCents": 4900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Satin Pleat Detail Midaxi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_4780W_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-pleat-detail-midaxi-waisted-dress/p/clp61266297?color=RED",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Cotton Rich Barrel Sleeve Trench Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_5936J_M0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-barrel-sleeve-trench-coat/p/clp60780378?color=CAMEL",
    "isAffiliate": false,
    "priceCents": 17500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Jersey Lace Mini Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_8055J_N7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-lace-mini-skater-dress/p/clp61225747?color=DARKCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cord Mini Shift Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5344W_WE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cord-mini-shift-dress/p/clp61227451?color=DARKAUBERGINE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "soft_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_9414J_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-knitted-midi-column-dress/p/clp61226417?color=GREY",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Denim A Line Mini Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_4177_XA_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/denim-mini-skirt/p/clp61266701?color=LIGHTINDIGO",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Collarless Bubble Hem Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_8928_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/collarless-bubble-hem-jacket/p/clp61227217?color=GREY",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "V-Neck Relaxed Jumper With Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_4784_WX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/v-neck-relaxed-jumper-with-wool/p/clp61226404?color=FADEDBLUE",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "light_summer",
      "cool_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Cotton Rich Pleat Front Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7317L_S0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-pleat-front-cropped-trousers/p/clp61248567?color=GOLD",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Crew Neck Drop Sleeve Relaxed Fit Jumper With Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_5694_QE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crew-neck-drop-sleeve-relaxed-fit-jumper-with-wool/p/clp61248249?color=PALEBLUE",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Relaxed Cocoon Coat with Italian Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_5930L_B4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/relaxed-cocoon-coatigan-with-wool/p/clp61224786?color=REDMIX",
    "isAffiliate": false,
    "priceCents": 35000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cotton Collared Relaxed Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_2427T_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-collared-relaxed-shirt/p/clp60713515?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Cotton Rich Collarless Tailored Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6606K_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-collarless-tailored-jacket/p/clp61225985?color=GREEN",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Denim Split Front Midi Straight Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_1111_XA_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/denim-split-front-midi-straight-skirt/p/clp61266468?color=LIGHTINDIGO",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn Crew Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8820_PU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-crew-neck-jumper/p/clp61233002?color=SOFTTURQUOISE",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Cosy Mini Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_8099J_N7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-cosy-mini-skater-dress/p/clp61267267?color=DARKCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Faux Fur Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_4486U_T0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/faux-fur-cropped-jacket/p/clp61265420?color=GREY",
    "isAffiliate": false,
    "priceCents": 8500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Wool Rich Pleat Front Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7319K_M0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-rich-pleat-front-wide-leg-trousers/p/clp61230709?color=CAMEL",
    "isAffiliate": false,
    "priceCents": 11500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Cotton Rich Premium T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_1335T_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-t-shirt/p/clp60715091?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Alpaca Blend Slash Neck Slim Fit Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_5871_WX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/alpaca-blend-slash-neck-slim-fit-jumper/p/clp61226835?color=FADEDBLUE",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_winter",
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Satin Split Back Midi Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_8529T_WC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-split-back-midi-slip-skirt/p/clp61265346?color=DARKCHARCOAL",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Cotton Rich Pintuck Flared Corduroy Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7677U_F0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-cord-pintuck-flared-jeans/p/clp61227006?color=NAVY",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Lyocell Blend High Waisted Seam Detail Barrel Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_7186T_QP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-blend-high-waisted-seam-detail-barrel-jeans/p/clp61267216?color=DARKINDIGO",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn Crew Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8820_DQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-crew-neck-jumper/p/clp61233002?color=MOSS",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Ribbed Crew Neck Fitted Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_4495_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-crew-neck-fitted-knitted-top/p/clp61226252?color=GREEN",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich V-Neck Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_7684J_F0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-v-neck-midi-column-dress/p/clp61270498?color=NAVY",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Denim Funnel Neck Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_8083D_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-funnel-neck-midi-column-dress/p/clp61268440?color=DENIM",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Satin Pleated Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_3870T_WE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-pleated-wide-leg-trousers/p/clp61227507?color=DARKAUBERGINE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "soft_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cable Knit High Waisted Wide Leg Knitted Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_4792_XH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cable-knit-high-waisted-wide-leg-knitted-trousers/p/clp61233498?color=LIGHTNATURAL",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Wide Leg Chinos",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_6159_SS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-wide-leg-chinos/p/clp60780348?color=STONE",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pleated Barrel Leg Trouser",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_4091_T3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pleated-barrel-leg-trouser/p/clp61266714?color=DARKGREY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Suede Knee Length A Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_9325_N0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/suede-knee-length-a-line-skirt/p/clp61266737?color=BROWN",
    "isAffiliate": false,
    "priceCents": 15000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Cotton Collared Double Cuff Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6597I_Z0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-collared-double-cuff-shirt/p/clp60746637?color=WHITE",
    "isAffiliate": false,
    "priceCents": 6900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Tailored Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6605K_M0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-tailored-jacket/p/clp61224010?color=CAMEL",
    "isAffiliate": false,
    "priceCents": 19900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Per Una",
    "title": "Denim Pintuck Wide Leg Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_7563U_XA_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-pintuck-wide-leg-jeans/p/clp60775741?color=LIGHTINDIGO",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Brushed Pure Cashmere V Neck Slim Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3926_UQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/brushed-pure-cashmere-v-neck-slim-cardigan/p/clp61233220?color=BITTERCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 14000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn V-Neck Oversized Longline Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8187_B8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-v-neck-oversized-longline-jumper/p/clp61233859?color=SAGE",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Slim Fit Asymmetric Tie Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_1463T_G2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/sequin-round-neck-fringe-detail-shell-top/p/clp61265421?color=SPICE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Pure Silk Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_2672T_WC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-silk-stripe-shirt/p/clp61224446?color=DARKCHARCOAL",
    "isAffiliate": false,
    "priceCents": 9000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "soft_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Trench Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4049C_NU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-trench-coat/p/clp60776673?color=NEUTRAL",
    "isAffiliate": false,
    "priceCents": 8000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Crew Neck Button Front Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3916_BJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-crew-neck-button-front-cardigan/p/clp61223596?color=RUBYRED",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Jersey Crew Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_1422T_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-crew-neck-top/p/clp60764807?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Barrel Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T57_5942_SP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-barrel-leg-trousers/p/clp61266693?color=SANDSTONE",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Wool Blend Cable Knit Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_5941_P0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-blend-cable-knit-jumper/p/clp61226912?color=ORANGE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "High Waisted Straight Leg Jeans",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_7111T_E3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-waisted-straight-leg-jeans/p/clp60717302?color=DARKBLUE",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Leather Belted Trench Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_4847U_KM_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/leather-belted-trench-jacket/p/clp61226897?color=DARKOLIVE",
    "isAffiliate": false,
    "priceCents": 35000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Per Una",
    "title": "Cable Knit Crew Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_5228U_RE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cable-knit-crew-neck-jumper/p/clp61281752?color=CHERRYRED",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Relaxed Longline Denim Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_2715U_HP_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/longline-denim-shirt/p/clp61266537?color=DENIM",
    "isAffiliate": false,
    "priceCents": 5800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Wool Blend Crew Neck Button Detail Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6006K_G0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-blend-crew-neck-button-detail-jumper/p/clp61225981?color=LILAC",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Ruched Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6803L_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ruched-top/p/clp61227300?color=GREEN",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Rich Floral Scoop Neck Maxi Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_2931_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-floral-scoop-neck-maxi-dress/p/clp61248317?color=IVORYMIX",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Single Breasted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6604K_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-single-breasted-blazer/p/clp61225286?color=BLACK",
    "isAffiliate": false,
    "priceCents": 15000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Collared Cardigan with Wool and Mohair",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6017L_SH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/collared-cardigan-with-wool-and-mohair/p/clp61231199?color=CHOCOLATE",
    "isAffiliate": false,
    "priceCents": 12500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Lace High Neck Padded Shoulder Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_2687T_G2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-high-neck-padded-shoulder-top/p/clp61265425?color=SPICE",
    "isAffiliate": false,
    "priceCents": 7500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Satin Collared Button Through Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_4050S_AB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-collared-button-through-shirt/p/clp61232380?color=PAPRIKA",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Button Detail Collared Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_6042S_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-button-detail-collared-shirt/p/clp61267853?color=DENIM",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Crew Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3896_BJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-crew-neck-jumper/p/clp61223565?color=RUBYRED",
    "isAffiliate": false,
    "priceCents": 9000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Crew Neck Button Front Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3916_FQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-crew-neck-button-front-cardigan/p/clp61223596?color=BLUSHPINK",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Wool with Cashmere Roll Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6019L_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-with-cashmere-roll-neck-jumper/p/clp61226010?color=GREEN",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Lyocell Rich Shirt with Silk and Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6512K_G0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-shirt-with-silk-and-wool/p/clp61224610?color=LILAC",
    "isAffiliate": false,
    "priceCents": 8900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Per Una",
    "title": "Pure Cotton Lace Detail Button Front Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_2834U_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-lace-detail-button-front-blouse/p/clp61268135?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen Collared V-Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_6935_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-collared-v-neck-top/p/clp61267337?color=WHITE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Jacquard Asymmetric Hem Knee Length Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_1123_P8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jacquard-asymmetric-knee-length-slip-dress/p/clp61233401?color=BURNTORANGE",
    "isAffiliate": false,
    "priceCents": 7500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "Wool Rich Midi Utility Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_7511K_VP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-rich-midi-utility-skirt/p/clp61234185?color=CHARCOAL",
    "isAffiliate": false,
    "priceCents": 11500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Crew Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3896_FQ_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-crew-neck-jumper/p/clp61223565?color=BLUSHPINK",
    "isAffiliate": false,
    "priceCents": 9000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen Scoop Neck Waisted Midaxi Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T52_2926_KT_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-scoop-neck-waisted-midaxi-dress/p/clp61234681?color=PEAT",
    "isAffiliate": false,
    "priceCents": 5600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Crew Neck Waisted Slim Fit Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_2389_XO_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crew-neck-waisted-slim-fit-jumper/p/clp61223857?color=COGNAC",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Embellished Denim Collared Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_1901W_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/embellished-denim-collared-shirt/p/clp61226369?color=DENIM",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Ultimate Denim Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_4007S_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-ultimate-denim-shirt/p/clp61267378?color=DENIM",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Autograph",
    "title": "Pure Wool Tailored Single-Breasted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_4396T_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-tailored-single-breasted-blazer/p/clp61225645?color=BLACK",
    "isAffiliate": false,
    "priceCents": 13000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Per Una",
    "title": "Balloon Sleeve Roll Neck Jumper with Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T53_5823U_CF_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/balloon-sleeve-roll-neck-jumper-with-wool/p/clp61267173?color=SOFTBLUE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Funnel Neck Blouson Mini Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5148_SH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/funnel-neck-blouson-mini-waisted-dress/p/clp61266759?color=CHOCOLATE",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cashmere Roll Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_3886_BJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-roll-neck-jumper/p/clp61233213?color=RUBYRED",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Tailored Cinched Waist Asymmetric Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_8646J_UQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tailored-cinched-waist-asymmetric-blazer/p/clp61233726?color=BITTERCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Faux Fur Trim Flight Bomber Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_4765_KH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/fur-trim-cropped-bomber-jacket/p/clp61265415?color=KHAKI",
    "isAffiliate": false,
    "priceCents": 7000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "JAEGER",
    "title": "High Shine V Neck Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6011L_J3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-high-shine-v-neck-jumper/p/clp61248640?color=DARKGREEN",
    "isAffiliate": false,
    "priceCents": 6900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Pure Cotton Tie Neck Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_2680T_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-tie-neck-shirt/p/clp61224926?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Satin Cowl Neck Mini Tie Detail Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_3466_N7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-cowl-neck-mini-tie-detail-waisted-dress/p/clp61233427?color=DARKCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Tie Neck Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_2179_XX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-tie-neck-cropped-jacket/p/clp61227208?color=SILVER",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Autograph",
    "title": "Revere Collar Longline Tuxedo Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_9088_Y0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/3-4-sleeve-striped-top/p/clp22201049?color=BLACK",
    "isAffiliate": false,
    "priceCents": 12000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Organza Puff Sleeve Mini Shift Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_2434R_B0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/organza-mini-dress/p/clp60763189?color=RED",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Thermowarmth Belted Funnel Neck Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_8985_SH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-thermowarmth-belted-funnel-neck-coat/p/clp61267584?color=CHOCOLATE",
    "isAffiliate": false,
    "priceCents": 7000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Air Yarn Knitted Mini Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T38_8691_QJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-knitted-mini-skirt/p/clp61227124?color=MIDGREYMARL",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Double Breasted Collared Longline Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_4072C_QK_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/double-breasted-collared-longline-coat/p/clp61266458?color=BROWNMARL",
    "isAffiliate": false,
    "priceCents": 10000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Feather & Down Hooded Padded Longline Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T49_8932_N7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/feather-and-down-hooded-padded-longline-coat/p/clp61227065?color=DARKCHOCOLATE",
    "isAffiliate": false,
    "priceCents": 10000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Wool Blend Single Breasted Tailored Coat with Cashmere",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_4390T_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wool-blend-single-breasted-tailored-coat/p/clp61225565?color=BLACK",
    "isAffiliate": false,
    "priceCents": 25000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Waisted Slim Fit Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6018L_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-waisted-jacket/p/clp61225559?color=BLACK",
    "isAffiliate": false,
    "priceCents": 13500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Lace Midaxi Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5133R_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-midaxi-skater-dress/p/clp61226891?color=BLACK",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Pleated Midi Waisted Tea Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_8929W_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-pleated-midi-waisted-tea-dress/p/clp60778517?color=BLACK",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pleated Wrap Kilt Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T59_3243S_Y0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pleated-wrap-kilt-skirt/p/clp61223631?color=BLACK",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Ghost",
    "title": "Satin Cowl Neck Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9681T_E1_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-cowl-neck-midi-column-dress/p/clp23073918?color=LIGHTBLUE",
    "isAffiliate": false,
    "priceCents": 12900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Whistles",
    "title": "Pure Cotton Smocked Ruched Midi Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9683U_QE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-smocked-ruched-midi-dress/p/clp23079032?color=PALEBLUE",
    "isAffiliate": false,
    "priceCents": 7450,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "Monsoon",
    "title": "Lace Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9157T_D6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-midi-waisted-dress/p/clp23002809?color=SOFTPINK",
    "isAffiliate": false,
    "priceCents": 13500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S x Aries",
    "title": "Pure Silk Maxi Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T06_5571_MM_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-silk-maxi-dress/p/clp61231322?color=PINKSHELL",
    "isAffiliate": false,
    "priceCents": 12000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Ghost",
    "title": "Satin V-Neck Button Through Midaxi Tea Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8805V_A1_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-v-neck-button-through-midaxi-tea-dress/p/clp23019721?color=LIGHTPINK",
    "isAffiliate": false,
    "priceCents": 15900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Phase Eight",
    "title": "Round Neck Pleated Maxi Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8546U_QE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/round-neck-pleated-maxi-skater-dress/p/clp23076631?color=PALEBLUE",
    "isAffiliate": false,
    "priceCents": 19900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Sportscraft",
    "title": "Cotton Rich Waisted Short Trench Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9866U_A0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-waisted-short-trench-coat/p/clp23079962?color=PINK",
    "isAffiliate": false,
    "priceCents": 25900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "HOBBS",
    "title": "Collarless Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9035G_E0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/collarless-cropped-jacket/p/clp23037073?color=BLUE",
    "isAffiliate": false,
    "priceCents": 13900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "HOBBS",
    "title": "Lightweight Short Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9021F_A0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/lightweight-short-jacket/p/clp23031085?color=PINK",
    "isAffiliate": false,
    "priceCents": 13900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "SOSANDAR",
    "title": "Belted Double Breasted Longline Trench Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_10_T83_6583D_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/belted-double-breasted-longline-trench-coat/p/clp22591312?color=BLUE",
    "isAffiliate": false,
    "priceCents": 7120,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer",
      "light_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "HUSH",
    "title": "Pure Wool Textured Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9276V_E1_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-textured-cropped-jacket/p/clp23086856?color=LIGHTBLUE",
    "isAffiliate": false,
    "priceCents": 18000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "French Connection",
    "title": "Double Breasted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8390Q_E1_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/double-breasted-blazer/p/clp23068427?color=LIGHTBLUE",
    "isAffiliate": false,
    "priceCents": 14000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Fluid Drape Cowl Neck Tie Detail Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6306L_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/fluid-drape-cowl-neck-tie-detail-midi-waisted-dress/p/clp61248422?color=BLUE",
    "isAffiliate": false,
    "priceCents": 11500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Whistles",
    "title": "Crepe Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9700U_E0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/crepe-midi-waisted-dress/p/clp23079051?color=BLUE",
    "isAffiliate": false,
    "priceCents": 14900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Phase Eight",
    "title": "V-Neck Pleated Midi Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8260X_FU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/v-neck-pleated-midi-skater-dress/p/clp23097156?color=FUCHSIA",
    "isAffiliate": false,
    "priceCents": 13900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Roman",
    "title": "Fit and Flare Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T08_5139S_D0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/fit-and-flare-dress/p/clp23103335?color=PURPLE",
    "isAffiliate": false,
    "priceCents": 8500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "HOBBS",
    "title": "High Neck Belted Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8620V_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-neck-belted-skater-dress/p/clp23083642?color=GREEN",
    "isAffiliate": false,
    "priceCents": 15900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Autograph",
    "title": "Satin Crepe Asymmetric Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T50_3542T_EE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-crepe-asymmetric-midi-waisted-dress/p/clp61225001?color=BOTTLEGREEN",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion",
      "work"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "French Connection",
    "title": "Textured Ring Detail Midi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8498N_A0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-ring-detail-midi-column-dress/p/clp23062945?color=PINK",
    "isAffiliate": false,
    "priceCents": 7500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "HUSH",
    "title": "Pure Wool Double Faced Car Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9312W_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-double-faced-car-coat/p/clp23095256?color=BLUE",
    "isAffiliate": false,
    "priceCents": 25000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Wool Collared Short Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_5903L_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-collared-short-coat/p/clp61266346?color=BLUE",
    "isAffiliate": false,
    "priceCents": 25000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "HOBBS",
    "title": "Pure Wool Single Breasted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8834W_D0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-wool-single-breasted-blazer/p/clp23092797?color=PURPLE",
    "isAffiliate": false,
    "priceCents": 19900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "hourglass"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "HOBBS",
    "title": "Cotton Blend Textured Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8213G_A0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-textured-cropped-jacket/p/clp23031433?color=PINK",
    "isAffiliate": false,
    "priceCents": 13900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Satin Cowl Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T43_4013T_TH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-cowl-neck-top/p/clp61226347?color=DARKPETROL",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "HUSH",
    "title": "Pure Cotton T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9750M_L8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-t-shirt/p/clp23058201?color=PINKMAGENTA",
    "isAffiliate": false,
    "priceCents": 2700,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Whistles",
    "title": "Satin Collared Button Through Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8969U_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-collared-button-through-shirt/p/clp23077337?color=BLUE",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Cowl Neck Long Sleeve Drape Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T41_1059C_EE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cowl-neck-long-sleeve-drape-top/p/clp61266913?color=BOTTLEGREEN",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Wool Touch Layering Slim Henley Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T41_4748_OJ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-henley-top-with-wool/p/clp61231777?color=DARKMULBERRY",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Pure Merino Wool Funnel Neck Batwing Sleeve Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_09_T97_6003L_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-merino-wool-funnel-neck-batwing-sleeve-jumper/p/clp61265456?color=BLUE",
    "isAffiliate": false,
    "priceCents": 12500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Roman",
    "title": "Crew Neck Scallop Edge Button Cuff Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T08_3743S_FU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crew-neck-scallop-edge-button-cuff-jumper/p/clp23097042?color=FUCHSIA",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Jigsaw",
    "title": "Pure Cashmere Round Neck Fluted Cuff Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T08_8114T_E2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cashmere-round-neck-fluted-cuff-jumper/p/clp23050506?color=MEDIUMBLUE",
    "isAffiliate": false,
    "priceCents": 14900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Satin Midi Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/SD_01_T42_5788_VU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-midi-slip-skirt/p/clp61231055?color=PETROL",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Whistles",
    "title": "Pure Cotton Midi Tiered Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8426Q_BD_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-midi-tiered-skirt/p/clp23071403?color=PLUM",
    "isAffiliate": false,
    "priceCents": 4450,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "HOBBS",
    "title": "High Waisted Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8624V_J0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/high-waisted-straight-leg-trousers/p/clp23083646?color=GREEN",
    "isAffiliate": false,
    "priceCents": 11000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "Finery London",
    "title": "Wide Leg Cropped Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_8871N_CB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/wide-leg-cropped-trousers/p/clp23063769?color=COBALT",
    "isAffiliate": false,
    "priceCents": 3500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "inverted_triangle",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Sportscraft",
    "title": "Cotton Rich Slim Fit Cropped Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_800,q_auto,f_auto/MS_10_T83_9853M_D0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-slim-fit-cropped-trousers/p/clp23057761?color=PURPLE",
    "isAffiliate": false,
    "priceCents": 11500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium"
  }
];
