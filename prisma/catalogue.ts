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

// Live retailer products checked on 2026-07-14. Each row is a distinct base SKU.
// Eligibility is materialised per item from its named cut and displayed colour.
export { bodyShapes as canonicalShapes, colourSeasons as canonicalSeasons };

export const curatedProducts: readonly CuratedProduct[] = [
  {
    "brand": "M&S",
    "title": "Pure Cotton Lace Insert Beach Dresses",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T52_2831_KT_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-lace-insert-beach-dresses/p/clp61226051",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
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
    "title": "Satin Cowl Neck Lace Insert Midi Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_5117S_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-cowl-neck-lace-insert-midi-slip-dress/p/clp61225719",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Linen Rich Printed V-Neck Hanky Hem Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T52_8870_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-printed-v-neck-hanky-hem-dress/p/clp61226053",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Lyocell Rich Polka Dot Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_7232W_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-polka-dot-midi-waisted-dress/p/clp61268538",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Polka Dot Ruffle Midi Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_9017W_Z4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-polka-dot-ruffle-midi-skater-dress/p/clp61225523",
    "isAffiliate": false,
    "priceCents": 4200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "bright_winter"
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
    "title": "Denim V-Neck Button Through Mini Swing Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_4483D_HP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-v-neck-button-through-mini-swing-dress/p/clp61225822",
    "isAffiliate": false,
    "priceCents": 4200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
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
    "title": "Textured Round Neck Midi Bodycon Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_9737J_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-round-neck-midi-skater-dress/p/clp61225770",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
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
    "brand": "M&S",
    "title": "Pure Cotton Tie Detail Mini Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_9872W_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-tie-detail-mini-waisted-dress/p/clp60786449?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Floral Relaxed Maxi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_2737W_XZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/floral-relaxed-maxi-waisted-dress/p/clp61227095",
    "isAffiliate": false,
    "priceCents": 3500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
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
    "title": "Pure Cotton Square Neck Strappy Midaxi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_8482W_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-square-neck-strappy-midaxi-waisted-dress/p/clp60786765",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
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
    "title": "Jersey Ruched Midaxi Drop Waist Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_8842J_QC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-ruched-midaxi-drop-waist-dress/p/clp61225760?color=CHILLI",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Shirred Midaxi Smock Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_5342W_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-shirred-midi-smock-dress/p/clp61225478",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Pure Cotton Paisley Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5385W_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-paisley-midi-waisted-dress/p/clp61227165",
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
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Satin Scoop Neck Midi Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5819_I7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-scoop-neck-midi-slip-dress/p/clp61233946",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
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
    "brand": "M&S",
    "title": "Polka Dot Lace Detail Mini Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5716W_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/polka-dot-lace-detail-mini-slip-dress/p/clp61268259",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
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
    "brand": "M&S",
    "title": "Pure Cotton Printed Scoop Neck Maxi Beach Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T52_0017_J6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-printed-scoop-neck-maxi-beach-dress/p/clp60774470",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
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
    "title": "Paisley Angel Sleeve Mini Tiered Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_4566W_KA_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/paisley-angel-sleeve-mini-tiered-dress/p/clp60916491",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn"
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
    "title": "Broderie Cutwork Detail Mini Shift Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5327_C0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/broderie-cutwork-detail-mini-shift-dress/p/clp60786686?color=WINE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "weekend",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Jersey Tie Waist Midi Waisted Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_6574J_LH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-tie-waist-midi-waisted-dress/p/clp61268288",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Satin Lace Insert Mini Skater Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5326_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-lace-insert-mini-skater-dress/p/clp60896864?color=BLACK",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
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
    "brand": "M&S",
    "title": "Denim Zip Up Drop Waist Midi Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_2765D_XB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-zip-up-drop-waist-midi-dress/p/clp60784650",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
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
    "title": "Jersey V-Neck Midi Drop Waist Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_9852Z_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-v-neck-midi-drop-waist-dress/p/clp60779624?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Printed V-Neck Midi Tea Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5291_B4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/printed-v-neck-midi-tea-dress/p/clp60786414?color=REDMIX",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Lace Insert Mini Slip Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_3173U_WZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-insert-mini-slip-dress/p/clp60787770",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
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
    "brand": "M&S",
    "title": "Cross Strap Midaxi Column Dress",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5848_N0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cross-strap-midaxi-column-dress/p/clp60917531",
    "isAffiliate": false,
    "priceCents": 3500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
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
    "title": "Pure Cotton Polka Dot Sailor Collar Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T43_4026S_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-polka-dot-sailor-collar-shirt/p/clp61270269",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Textured V-Neck Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T53_2729U_D6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-v-neck-blouse/p/clp61229513",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T52_8745_EK_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-shirt/p/clp60777917?color=CALICO",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T43_5003S_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-collared-fitted-shirt/p/clp60777061?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Rich V-Neck Tie Detail Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T52_8867_IY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-v-neck-tie-detail-top/p/clp61225689",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Lyocell-Rich V-Neck Ruffle Detail Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T43_2836W_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-v-neck-ruffle-detail-blouse/p/clp61229706",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Slash Neck Slim Fit Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T41_0015_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-slash-neck-slim-fit-vest/p/clp60774465?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
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
    "title": "Pure Cotton Appliqu\u00e9 T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4268C_QR_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-appliqu-t-shirt/p/clp60787343?color=PALEYELLOW",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
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
    "title": "Pure Cotton Striped Oversized Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T43_2010S_E4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-oversized-shirt/p/clp61218302",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
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
    "title": "Sleeveless Knot Detail Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4007J_QE_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/sleeveless-knot-detail-top/p/clp61225403?color=PALEBLUE",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Striped Oxford Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T43_7087W_E4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-oxford-shirt/p/clp61226209?color=BLUEMIX",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
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
    "title": "Linen Rich Lace Insert Button Detail Blouse",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T52_8786_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-lace-insert-button-detail-blouse/p/clp60777518?color=WHITE",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Broderie Cutwork Cami Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_2014J_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/broderie-cutwork-cami-top/p/clp60787428?color=IVORY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Textured Square Neck Cami Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4244C_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-textured-square-neck-cami-top/p/clp60787223?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Mesh Jersey Polka Dot Slash Neck Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_2053C_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mesh-jersey-polka-dot-slash-neck-top/p/clp61226171?color=BLACKMIX",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Striped T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_2150C_E8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-t-shirt/p/clp61231065?color=BRIGHTBLUEMIX",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
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
    "title": "Ribbed Lace Trim Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_2074C_K0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-lace-trim-vest/p/clp61268053?color=CREAM",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Pure Cotton Frill Collar Detail Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T43_2040S_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-frill-collar-detail-shirt/p/clp61235091",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Ribbed Slim Fit Vest Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_7248_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-ribbed-slim-fit-vest-top/p/clp60710501?color=BLACK",
    "isAffiliate": false,
    "priceCents": 800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Linen Relaxed Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T52_6944_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-relaxed-shirt/p/clp61228844",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "bright_spring",
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
    "title": "Pure Cotton Everyday Fit T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_7341_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-crew-neck-t-shirt/p/clp60582580?color=WHITE",
    "isAffiliate": false,
    "priceCents": 900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
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
    "brand": "M&S",
    "title": "Crochet-Style Cropped Knitted Waistcoat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6787_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crochet-style-cropped-knitted-waistcoat/p/clp60787402",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Pure Cotton Striped Slash Neck Slim Fit Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4188_Z4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-striped-slash-neck-slim-fit-top/p/clp60633226?color=WHITEMIX",
    "isAffiliate": false,
    "priceCents": 1200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
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
    "title": "Pure Cotton Slim Fit Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4588_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-slim-fit-top/p/clp60654840?color=WHITE",
    "isAffiliate": false,
    "priceCents": 1000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
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
    "brand": "M&S",
    "title": "Pure Cotton Cap Sleeve T-Shirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_0018_GZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-cap-sleeve-t-shirt/p/clp60774473?color=THUNDER",
    "isAffiliate": false,
    "priceCents": 1300,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
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
    "brand": "M&S",
    "title": "Linen Rich Drawstring Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8994_Z0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-drawstring-wide-leg-trousers/p/clp60775834?color=WHITE",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
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
    "brand": "M&S",
    "title": "Jersey Twill Straight Leg Ankle Grazer Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_2135T_VP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-twill-straight-leg-trousers/p/clp60613519?color=CHARCOAL",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "deep_winter"
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
    "title": "Jersey Slim Fit Ankle Grazer Trousers\u00a0",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_4267_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-slim-fit-ankle-grazer-trousers/p/clp60506651?color=BLACK",
    "isAffiliate": false,
    "priceCents": 1950,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Pure Linen Wide Leg Palazzo Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T57_8035_A0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-wide-leg-trousers/p/clp60713330?color=PINK",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
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
    "title": "Pure Linen Pleat Front Belted Tapered Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8990_F0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-pleat-front-belted-tapered-trousers/p/clp60775832?color=NAVY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
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
    "title": "Satin Drawstring Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8988_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-drawstring-wide-leg-trousers/p/clp61223280?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Textured Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_7930T_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-straight-leg-trousers/p/clp60784775",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "brand": "M&S",
    "title": "Jersey Wide Leg Trousers with Stretch",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_4793_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-wide-leg-trousers-with-stretch/p/clp60506499?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Linen Rich Elasticated Waist Tapered Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_5233_F0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-elasticated-waist-tapered-trousers/p/clp60775590?color=NAVY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
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
    "brand": "M&S",
    "title": "Pure Cotton Poplin Pull On Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_4085_NZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-poplin-pull-on-straight-leg-trousers/p/clp60780218?color=ECRU",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
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
    "title": "Jersey Straight Leg Trousers with Stretch",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_4358_F3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/jersey-straight-leg-trousers-with-stretch/p/clp60506862?color=DARKNAVY",
    "isAffiliate": false,
    "priceCents": 1950,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_6435_FS_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-straight-leg-chinos/p/clp60634040?color=MIDNIGHTNAVY",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Seersucker Pull On Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8761_F4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/seersucker-pull-on-wide-leg-trousers/p/clp60778874?color=NAVYMIX",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
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
    "brand": "M&S",
    "title": "Linen Blend Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8055_RX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-wide-leg-trousers/p/clp60636306?color=RASPBERRYMIX",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
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
    "title": "Pure Linen Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8934_F0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-linen-wide-leg-trousers/p/clp60775826?color=NAVY",
    "isAffiliate": false,
    "priceCents": 3200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
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
    "title": "Drawstring Wide Leg Trousers with Linen",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_8733_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/drawstring-wide-leg-trousers-with-linen/p/clp60775815?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Printed Pull On Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_5206_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/polka-dot-printed-pull-on-wide-leg-trousers/p/clp60785673?color=BLACKMIX",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Single Pleat Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_2171T_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/single-pleat-wide-leg-trousers/p/clp60776612?color=IVORY",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "brand": "M&S",
    "title": "Multi Pleat Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_6324T_GX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/multi-pleat-wide-leg-trousers/p/clp61223612",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
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
    "brand": "M&S",
    "title": "Single Pleat Wide Leg Trousers with Linen",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_8357T_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/single-pleat-wide-leg-trousers-with-linen/p/clp60775773?color=IVORY",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Side Stripe Wide Leg Trousers with Linen",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_5775_NB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/side-stripe-wide-leg-trousers-with-linen/p/clp60786878?color=ECRUMIX",
    "isAffiliate": false,
    "priceCents": 2700,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
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
    "title": "Pure Cotton Poplin Pull On Super Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_4143_MM_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-poplin-pull-on-super-wide-leg-trousers/p/clp60780323?color=PINKSHELL",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
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
    "title": "Lyocell Rich Cargo Wide Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_5147_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-cargo-wide-leg-trousers/p/clp60780238?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Lace Balloon Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_7719U_UX_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lace-parachute-relaxed-trousers/p/clp61222595?color=DARKMOLE",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
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
    "title": "Pure Cotton Belted Straight Leg Trousers",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_4995_KH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-belted-straight-leg-trousers/p/clp60775542?color=KHAKI",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn"
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
    "title": "Cotton Blend Textured Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6607_TQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-textured-cropped-cardigan/p/clp60785339?color=BRANDY",
    "isAffiliate": false,
    "priceCents": 3400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
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
    "title": "Cotton Rich Embroidered Knitted Waiscoat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6957_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-embroidered-knitted-waiscoat/p/clp60787549",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Ribbed Sweetheart Peplum Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6386_QC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-sweetheart-peplum-knitted-vest/p/clp60783577",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
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
    "title": "Striped V-Neck Cropped Knitted Waistcoat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T38_2950S_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/striped-v-neck-cropped-knitted-waistcoat/p/clp60784413",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
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
    "brand": "M&S",
    "title": "Pure Cotton Pointelle Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T38_4771_XH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-pointelle-knitted-vest/p/clp60784400?color=LIGHTNATURAL",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Cotton Blend Textured Scoop Neck Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6365_X7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-textured-scoop-neck-knitted-vest/p/clp60788862?color=DARKCLARET",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Collared Cropped Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T38_6453_QC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/collared-cropped-knitted-top/p/clp61231717?color=CHILLI",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_spring"
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
    "title": "Square Neck Slim Fit Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_2399_Z2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/square-neck-slim-fit-knitted-vest/p/clp60783364?color=CITRUS",
    "isAffiliate": false,
    "priceCents": 1400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
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
    "title": "Cotton Blend Crochet-Style Collared Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T38_4651_NU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-crochet-style-collared-cardigan/p/clp60788669?color=NEUTRAL",
    "isAffiliate": false,
    "priceCents": 3200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Cotton Blend Textured Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_4219_V2_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-textured-knitted-top/p/clp61269043?color=GOLDENBROWN",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
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
    "title": "Button Front Slim Fit Knitted Waistcoat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6196_WZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/button-front-slim-fit-knitted-waistcoat/p/clp60781722?color=BUTTERMILK",
    "isAffiliate": false,
    "priceCents": 3300,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Air-Yarn Button Front Short Sleeve Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_8521_HS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/air-yarn-button-front-short-sleeve-cropped-cardigan/p/clp60759261?color=REDWOOD",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
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
    "title": "Cotton Rich Boucle Slim Fit Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_5721_K0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-boucle-slim-fit-knitted-top/p/clp60783835?color=CREAM",
    "isAffiliate": false,
    "priceCents": 2200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Crochet-Style Cropped Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6429_TQ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crochet-style-cropped-knitted-top/p/clp60787449",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
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
    "title": "Ribbed Frill Detail Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_2263_WZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-frill-detail-knitted-top/p/clp60781220?color=BUTTERMILK",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
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
    "title": "Pure Cotton Puff Sleeve Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6442_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-puff-sleeve-cropped-cardigan/p/clp60786559?color=IVORY",
    "isAffiliate": false,
    "priceCents": 2400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Ribbed Collared Slim Fit Knitted Top",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_2372_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ribbed-collared-slim-fit-knitted-top/p/clp60783393?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Crew Neck Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_2930_RO_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/crew-neck-cropped-cardigan/p/clp60783424?color=GRASS",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
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
    "title": "Pure Cotton Crochet-Style Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6509_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-crochet-style-knitted-vest/p/clp60787459?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
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
    "title": "Pure Cotton Tie Fastening Cropped Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6225_X7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-tie-fastening-cropped-cardigan/p/clp60787188?color=DARKCLARET",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
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
    "title": "Cotton Rich Textured V-Neck Knitted Vest",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_4206_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-textured-v-neck-knitted-vest/p/clp60784035?color=SOFTWHITE",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Cotton Rich Garment Dye Sweatshirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_1940U_TR_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-sweatshirt/p/clp60640427",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
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
    "title": "Cotton Blend V-Neck Slim Fit Jumper",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6495_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-v-neck-slim-fit-jumper/p/clp60787625?color=SOFTWHITE",
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
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Crew Neck Sweatshirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_0051_XC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-crew-neck-sweatshirt/p/clp60775089?color=DARKKHAKI",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
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
    "brand": "Per Una",
    "title": "Cotton Rich Textured Collared Cardigan",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_5757U_NZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-textured-collared-cardigan/p/clp61226434?color=ECRU",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "knitwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Cotton-Blend Textured Mini Knitted Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_0307_P6_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-blend-textured-mini-knitted-skirt/p/clp60788668",
    "isAffiliate": false,
    "priceCents": 2300,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "title": "Cotton Rich Checked Midi A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_5639S_L4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-checked-midi-a-line-skirt/p/clp61268209",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Textured Midaxi Circle Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_0009S_R0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-midaxi-circle-skirt/p/clp60785549",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Polka Dot Knee Length Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_4102R_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/polka-dot-knee-length-slip-skirt/p/clp61225888",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Tie Front Midi A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_4563S_QC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tie-front-midi-a-line-skirt/p/clp61267534",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Floral Maxi A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_5683S_J4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/floral-maxi-a-line-skirt/p/clp61268213",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Mesh Floral Ruched Midi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_4356S_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mesh-floral-ruched-midi-skirt/p/clp61268194",
    "isAffiliate": false,
    "priceCents": 3400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Blend Contrast Piping Mini Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_7828S_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-blend-contrast-piping-mini-skirt/p/clp60784776",
    "isAffiliate": false,
    "priceCents": 3000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
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
    "title": "Jersey Knee Length Pencil Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_1555S_Y0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/jersey-knee-length-pencil-skirt/p/clp60681857?color=BLACK",
    "isAffiliate": false,
    "priceCents": 2000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_8004S_Y0_X_EC_90",
    "productUrl": "https://www.marksandspencer.com/jersey-mini-a-line-skirt/p/clp60690195?color=BLACK",
    "isAffiliate": false,
    "priceCents": 1600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Floral Ruffle Hem Midi Tiered Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_5194_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/floral-ruffle-hem-midi-tiered-skirt/p/clp61227852",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Mesh Checked Midi A-Line Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_8133S_K4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/mesh-checked-midi-a-line-skirt/p/clp61234945",
    "isAffiliate": false,
    "priceCents": 3400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Ruched Waist Midi Tiered Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T53_7624U_AO_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ruched-waist-midi-tiered-skirt/p/clp61220353",
    "isAffiliate": false,
    "priceCents": 4800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
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
    "title": "Satin Ruffle Hem Midi Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T42_3658_SH_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/satin-ruffle-hem-midi-slip-skirt/p/clp61233633",
    "isAffiliate": false,
    "priceCents": 2000,
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
    "garmentCategory": "skirts",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Pleated Maxi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_5915_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-modern-slim-leg-velvet-trousers/p/clp22251607?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Cotton Rich Checked Button Detail Maxi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T57_5213_Y4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-checked-button-detail-maxi-skirt/p/clp61225824",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Linen Rich Maxi Wrap Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T57_4005_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-rich-maxi-wrap-skirt/p/clp60782145?color=BLACK",
    "isAffiliate": false,
    "priceCents": 1800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
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
    "title": "Pure Cotton Cutwork Detail Midaxi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5407_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-cutwork-detail-midaxi-skirt/p/clp60786706",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Checked Wrap Detail Midi Slip Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_5916_V4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/checked-wrap-detail-midi-slip-skirt/p/clp61231757",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "work",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "Per Una",
    "title": "Pure Cotton Embroidered Midaxi Column Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_7177U_K1_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-embroidered-midaxi-column-skirt/p/clp61218103",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Striped Midaxi Circle Skirt With Cotton",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_8904S_V4_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/striped-midaxi-circle-skirt-with-cotton/p/clp60778660",
    "isAffiliate": false,
    "priceCents": 2600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Lyocell\u2122 Rich Checked Midi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_4103T_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-checked-midi-skirt/p/clp61225886",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "JAEGER",
    "title": "Lyocell Rich Striped Midaxi Column Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_09_T97_7501K_Y8_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tencel-rich-striped-midaxi-wrap-skirt/p/clp61224112",
    "isAffiliate": false,
    "priceCents": 9900,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Pointelle Knitted Maxi Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_4055_I7_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-pointelle-knitted-maxi-skirt/p/clp60787605",
    "isAffiliate": false,
    "priceCents": 3800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn"
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
    "title": "Striped Midi Straight Column Skirt",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T42_8002S_XZ_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/striped-midi-straight-column-skirt/p/clp61230305",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Pocket Detail Knitted Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T38_6227_XC_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-pocket-detail-knitted-jacket/p/clp60781031",
    "isAffiliate": false,
    "priceCents": 2800,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
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
    "title": "Lightweight Funnel Neck Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T49_2178_E0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lightweight-funnel-neck-jacket/p/clp61227171",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
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
    "title": "Suedette Button Through Short Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T49_1098_KP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/suedette-button-through-short-jacket/p/clp61227167?color=GREYBLUE",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer"
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
    "title": "Suedette Funnel Neck Short Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T49_2144_RB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/suedette-funnel-neck-short-jacket/p/clp61227191?color=NEARLYBLACK",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
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
    "title": "Tie Belted Blazer with Linen",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_8357J_FS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tie-belted-blazer-with-linen/p/clp60775772?color=MIDNIGHTNAVY",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Cotton Rich Funnel Neck Parka Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T49_2184_L0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-funnel-neck-parka-coat/p/clp61227097",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
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
    "title": "Peplum Parka Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T49_2185_FS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/peplum-parka-jacket/p/clp61227090",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
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
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Lyocell Rich Single Breasted Blazer with Linen",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_7653J_SP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/lyocell-rich-single-breasted-blazer-with-linen/p/clp60779104",
    "isAffiliate": false,
    "priceCents": 4200,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Tweed Textured Collared Jacket with Wool",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_8763J_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/tweed-textured-collared-jacket-with-wool/p/clp60778985?color=IVORY",
    "isAffiliate": false,
    "priceCents": 5500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T59_7651C_ZV_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-longline-trench-coat/p/clp60779115?color=LIGHTCARAMEL",
    "isAffiliate": false,
    "priceCents": 9500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_256,q_auto,f_auto/SD_01_T50_4381T_Y0_X_EC_0",
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
      "deep_winter"
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
    "title": "Faux Leather Utility Gilet",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/MS_01_T49_9126_ND_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/faux-leather-utility-gilet/p/clp60784911",
    "isAffiliate": false,
    "priceCents": 4500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn"
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
    "title": "Cotton Rich Tricot Zip Up Track Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T41_4208C_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/cotton-rich-tricot-zip-up-track-jacket/p/clp60786049?color=BLACK",
    "isAffiliate": false,
    "priceCents": 3600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
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
    "title": "Pure Cotton Car Coat",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_2303C_ZV_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-car-coat/p/clp60779114?color=LIGHTCARAMEL",
    "isAffiliate": false,
    "priceCents": 7000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
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
    "title": "Ultimate Tailored Single Breasted Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_6327J_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/ultimate-tailored-single-breasted-blazer/p/clp61223680",
    "isAffiliate": false,
    "priceCents": 6500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
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
    "title": "Textured Short Sleeve Zip Through Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_5672J_KY_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-short-sleeve-zip-through-jacket/p/clp60784765",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Denim Cropped Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T49_2176_QP_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/denim-cropped-jacket/p/clp61227121",
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
    "brand": "Autograph",
    "title": "Flax Linen Frayed Edge Cropped Blazer",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T50_4373T_SS_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-blend-frayed-edge-overshirt/p/clp60784207",
    "isAffiliate": false,
    "priceCents": 10000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Pure Cotton Short Button Through Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_7558C_SU_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/pure-cotton-short-button-through-jacket/p/clp61235148",
    "isAffiliate": false,
    "priceCents": 6000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
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
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_09_T97_5935J_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/waterproof-rain-jacket/p/clp60780374?color=BLACK",
    "isAffiliate": false,
    "priceCents": 17500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium"
  },
  {
    "brand": "M&S",
    "title": "Contrast Piped Funnel Neck Windbreaker Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T49_8926_OO_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/contrast-piped-funnel-neck-windbreaker-jacket/p/clp61227169",
    "isAffiliate": false,
    "priceCents": 5000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
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
    "brand": "Per Una",
    "title": "Scallop Tie Front Quilted Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T53_4184U_NB_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/scallop-tie-front-quilted-jacket/p/clp60789223",
    "isAffiliate": false,
    "priceCents": 7500,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "mid"
  },
  {
    "brand": "M&S",
    "title": "Linen Viscose Blend Collarless Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T59_4131J_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/linen-viscose-blend-collarless-jacket/p/clp60778969",
    "isAffiliate": false,
    "priceCents": 4400,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "evening",
      "occasion"
    ],
    "priceTier": "entry"
  },
  {
    "brand": "M&S",
    "title": "Checked Funnel Neck Windbreaker Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T49_2143_Y0_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/checked-funnel-neck-windbreaker-jacket/p/clp61227173",
    "isAffiliate": false,
    "priceCents": 4600,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter"
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
    "title": "Textured Faux Leather Jacket",
    "description": null,
    "imageUrl": "https://assets.digitalcontent.marksandspencer.app/image/upload/w_2560,q_auto,f_auto/SD_01_T49_8031_T3_X_EC_0",
    "productUrl": "https://www.marksandspencer.com/textured-faux-leather-jacket/p/clp60916849",
    "isAffiliate": false,
    "priceCents": 4000,
    "currency": "GBP",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend",
      "evening"
    ],
    "priceTier": "entry"
  }
];
