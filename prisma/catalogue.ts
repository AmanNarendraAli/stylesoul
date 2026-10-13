import type { Drape, Metal, Neckline, Pattern } from "../lib/catalogue/schema.ts";
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
  currency: "INR";
  status: "active";
  eligibleShapes: string[];
  eligibleSeasons: string[];
  garmentCategory: string;
  occasionTags: string[];
  priceTier: "entry" | "mid" | "premium";
  neckline: Neckline | null;
  pattern: Pattern | null;
  drape: Drape | null;
  metal: Metal | null;
};

// Live products from Indian retailers' Shopify stores, checked on 2026-10-13;
// prices in paise. Each row is one in-stock product (a `?variant=` pins the
// colour shown). Seasons, shapes and garment details were tagged from each
// product's image and description against lib/style-guidance; price tiers are
// entry up to ₹2,500, mid up to ₹7,500, premium above.
export { bodyShapes as canonicalShapes, colourSeasons as canonicalSeasons };

export const curatedProducts: readonly CuratedProduct[] = [
  {
    "brand": "Okhai",
    "title": "\"Dabu\" Cotton Ajrakh Kurta Pant Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LKS26341540_1_Hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-dabu-cotton-ajrakh-kurta-pant-set",
    "isAffiliate": false,
    "priceCents": 720000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Blue Block Printed Pure Cotton Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/F12465-912081_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/blue-block-printed-pure-cotton-straight-kurta-f12465-912081",
    "isAffiliate": false,
    "priceCents": 262500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Nimrit Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Artboard1_8df694e5-1c85-4f7b-8fe3-3bc3dda41d9e.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/the-powder-blue-grace-kurta",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Aavideep Green Kurta & Pants Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/7033.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/aavi-deep-green-kurta-pants-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Dark Red Tissue Silk A-Line Kurta Pant Set for Brides Maid",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CB-STH-727_2_-LOW-Chinayabanaras-Copy.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/dark-red-tissue-silk-a-line-kurta-pant-set-for-brides-maid",
    "isAffiliate": false,
    "priceCents": 1512400,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "House of Masaba",
    "title": "Bottle Green Buttercup Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masabalookbook44719.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/bottle-green-buttercup-kurta",
    "isAffiliate": false,
    "priceCents": 1900000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Solid Embroidered Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/1C26KRTAR131_20MAGENTA_281_20_281_29_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/solid-embroidered-straight-kurta-1c26krtar131-magenta?variant=67580737650873",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Janasya",
    "title": "Women's Navy Blue Pure Cotton Floral Printed A-line Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAC24KR01986_0a4880de-b60a-40bc-aa69-3dea5d6be03b.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-navy-blue-pure-cotton-floral-printed-a-line-kurta-jac24kr01986?variant=46869936636074",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Aqua Green Embroidered Kurta Palazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/aqua_green_embroidered_kurta_palazzo_set-sg233978_1_77aab47a-bebb-47a8-bd3e-311a99c10971.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/aqua-green-embroidered-kurta-palazzo-set",
    "isAffiliate": false,
    "priceCents": 42900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Vann Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK4430_673a0c39-3a76-444b-8956-58e3ee974cbd.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/vann-kurta",
    "isAffiliate": false,
    "priceCents": 1000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Yellow Phool Collection Kurti With Multi-Colour Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Front_1e15f856_71f0de8c-265a-409d-93ec-6e4db57fa14f.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/mustard-tunic-with-schiffly-embroidery-at-bottom-and-sleeves?variant=47692454559988",
    "isAffiliate": false,
    "priceCents": 169500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Plus Size Bottle Green Ethnic Embroidered Silk Blend Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Plus-Size-Bottle-Green-Ethnic-Embroidered-Silk-Blend-Straight-Kurta-25926_c6f64ce0-3ce3-4939-be17-f19f7f1b61cd.jpg?width=800",
    "productUrl": "https://www.libas.in/products/plus-size-bottle-green-ethnic-embroidered-silk-blend-straight-kurta-25926",
    "isAffiliate": false,
    "priceCents": 87900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Parinita Block Printed Kurta-Pants & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/4662-pink_7.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/parinita-block-printed-kurta-pants-dupatta-set",
    "isAffiliate": false,
    "priceCents": 350000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Raha Slit Back Tunic Set - Pink & White",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/1_2b7c5855-bae1-419f-8881-7526ea07d20d.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-raha-slit-back-tunic-set-pink-white",
    "isAffiliate": false,
    "priceCents": 975000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Yellow Cotton Kaftan Side Tie - Up Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/TJ-MK-261-25_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/yellow-cotton-kaftan-side-tie-up-kurta",
    "isAffiliate": false,
    "priceCents": 164000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
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
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Parrot Green Chanderi Booti Kurta Hot Pink Chanderi Farshi Wit Sanzab",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-202635J_1.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/parrot-green-chanderi-booti-kurta-hot-pink-chanderi-farshi-wit-sanzab",
    "isAffiliate": false,
    "priceCents": 1499500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Dharan \"Tara Kurta Black\"",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/891W03-J368-BW_1.webp?width=800",
    "productUrl": "https://okhai.org/products/dharan-tara-kurta-black",
    "isAffiliate": false,
    "priceCents": 290000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Beige Ajrak Printed Mirror Work Modal Satin Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/F12232-912023_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/beige-ajrak-printed-mirror-work-modal-satin-straight-kurta-f12232-912023",
    "isAffiliate": false,
    "priceCents": 559900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Ivory Desert Kurta Only",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Artboard2_623ceb70-8ec5-4cf8-a2a7-3e7072080a50.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/ivory-desert-kurta-only",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Bunaai",
    "title": "Ektha Yarn Dyed Cotton Kurta & Pants Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/5536.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/ektha-yarn-dyed-cotton-kurta-pants-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Sapphire Tidal Bloom Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/E_848534d6-8d3d-4bbc-bb47-891c94f1fb66.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/sapphire-tidal-bloom-kaftan",
    "isAffiliate": false,
    "priceCents": 3000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Floral Printed Straight Pure Cotton Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/NAV-JK3244_20Dark_20Blue_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/floral-printed-straight-pure-cotton-kurta-nav-jk3244-dark-blue?variant=47280166830265",
    "isAffiliate": false,
    "priceCents": 100100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Teal Blue Pure Cotton Bandhani Printed Flared Tunic",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAC26TU03926.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-teal-blue-pure-cotton-bandhani-printed-flared-tunic-jac26tu03926?variant=48285019340970",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "deep_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Red Dola Silk Jacket Style Kurta Pant Set With Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/red-dola-silk-jacket-style-kurta-pant-set-with-embroidery-sg433779-1_ac2ededc-47ab-41d1-927d-7b730820e6a2.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/red-dola-silk-jacket-style-kurta-pant-set-with-embroidery",
    "isAffiliate": false,
    "priceCents": 47900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Black Lilly Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/blacklilly1.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/black-lilly-kurta",
    "isAffiliate": false,
    "priceCents": 950000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Surma Ivory Embroidered Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Drape_View_426ef7b6.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/surma-ivory-embroidered-straight-kurta?variant=47937409745140",
    "isAffiliate": false,
    "priceCents": 259500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Maroon Floral Embroidered Wool Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Maroon-Floral-Embroidered-Wool-Straight-Kurta-57100W_5a805781-20d5-4fed-9fec-a6d4bca99e51.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-maroon-floral-embroidered-wool-straight-kurta-57100w",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Idika Indigo Block Printed Paneled Kurta-Plazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/4611_3.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/idika-indigo-block-printed-paneled-kurta-plazzo-set?variant=43538883543275",
    "isAffiliate": false,
    "priceCents": 545000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Lazy Sunday Tunic Set - Chocolate Plum",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/BUNDLE306_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-lazy-sunday-tunic-set-chocolate-plum",
    "isAffiliate": false,
    "priceCents": 875000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Golden Beige Textured Tissue Silk Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-362-02_1.png?width=800",
    "productUrl": "https://www.tjori.com/products/golden-beige-textured-tissue-silk-straight-kurta",
    "isAffiliate": false,
    "priceCents": 279900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "WeaverStory",
    "title": "Off White Handloom Monga Silk Kurti With Meenakari Lotus Booti",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-2026996_1_906af1af-3134-4468-90c3-dde97aebad06.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/off-white-handloom-monga-silk-kurti-with-meenakari-lotus-booti",
    "isAffiliate": false,
    "priceCents": 1599500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "\"Inkline\" Handblock Printed Pure Cotton Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LLK26241650_1_hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-inkline-handblock-printed-pure-cotton-kurta",
    "isAffiliate": false,
    "priceCents": 320000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "White Floral Printed Pure Cotton Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WT14518-128182_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/white-floral-printed-pure-cotton-straight-kurta-wt14518-128182",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Classic Black A-line Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/3_fea970da-f352-44b5-92c1-6411f33d3f13.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/classic-black-a-line-cotton-kurta-set",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Tarita Block Printed Kurta-Pants & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/4726.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/tarita-block-printed-kurta-pants-dupatta-set",
    "isAffiliate": false,
    "priceCents": 420000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Suraj Mehfil Kaftan Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba06366copy.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/suraj-mehfil-kaftan-kurta",
    "isAffiliate": false,
    "priceCents": 3000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Floral Printed Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ANK-SP-299_20YELLOW_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/floral-printed-straight-kurta-d-sp-299-yellow?variant=47096609931449",
    "isAffiliate": false,
    "priceCents": 100100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Lime Green Pure Cotton Floral Printed A-Line Tunic",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA26TU04027.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-lime-green-pure-cotton-floral-printed-a-line-tunic-jaa26tu04027?variant=48285012492458",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Purple Dola Silk French Knot Embroidered Jacket Style Kurti Pant Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/purple-dola-silk-french-knot-embroidered-jacket-style-kurti-pant-set-sg433799-1_fb143d11-eedb-499c-87ef-7c7dbf6b8fe7.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/purple-dola-silk-french-knot-embroidered-jacket-style-kurti-pant-set",
    "isAffiliate": false,
    "priceCents": 47900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Ivory Ease Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/9f_3937083e-11b8-4297-89cf-58c45bc16ba6.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/ivory-ease-kurta",
    "isAffiliate": false,
    "priceCents": 420000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Sultana Green Mirror Work Kurta for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/LakshitaJ2454889.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/sultana-green-mirror-work-kurta-set-for-women?variant=45632194150644",
    "isAffiliate": false,
    "priceCents": 147800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Black Floral Embroidered Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Black-Floral-Embroidered-Straight-Kurta-57097W_7748cdde-9e82-426d-a019-90089a395eef.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-black-floral-embroidered-straight-kurta-57097w",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Tarita Block Printed Kurta-Pants & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/4726_3.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/tarita-block-printed-kurta-pants-dupatta-set",
    "isAffiliate": false,
    "priceCents": 370000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Lazy Sunday Tunic Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/BUNDLE413_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-lazy-sunday-tunic-set-1",
    "isAffiliate": false,
    "priceCents": 1875000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "White Moti Handwork Cotton Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-319-01_1_d36be00d-6bcc-4e7d-8832-135602f23062.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/white-moti-handwork-cotton-kurta-mk319?variant=45233729700062",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter",
      "light_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Off White Handloom Muga Silk Tunic Meenakari Motif Bell Sleeves",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-2026994_1_a4efa39e-500c-4fb1-a6b1-f60ba49f2ec7.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/off-white-handloom-monga-silk-kurti-with-meenakari-lotus-booti-copy",
    "isAffiliate": false,
    "priceCents": 1999500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "boat",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Shwet Hand Embroidered Chikankari Cotton Burnt Orange Pintex Kali Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/5_84f306db-1110-48b4-a8a3-4b3f404f03b4.webp?width=800",
    "productUrl": "https://okhai.org/products/shwet-hand-embroidered-chikankari-cotton-burnt-orange-pintex-kali-kurta",
    "isAffiliate": false,
    "priceCents": 389000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Green Floral Printed Straight Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/W13829-126999_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/green-floral-printed-straight-kurta-w13829-126999",
    "isAffiliate": false,
    "priceCents": 112000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "A-line Sky Blue Cotton Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/96.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/a-line-sky-blue-cotton-kurta-set",
    "isAffiliate": false,
    "priceCents": 239900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Deja Black Kurta-Pant Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/4545.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/deja-black-kurta-pant-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Spice Souk Kaftan Kurta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba05841copy.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/spice-souk-kaftan-kurta",
    "isAffiliate": false,
    "priceCents": 2800000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Pink Bandhani Mirror Work Modal Straight Kurta With Straight Pants Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS14244-127378_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/pink-bandhani-mirror-work-modal-straight-kurta-with-straight-pants-set-ws14244-127378",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Bela Black Embroidered Cotton Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_24cc4d6e-c67b-4cf4-9526-e320713aae7b.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/bela-black-embroidered-cotton-suit-set",
    "isAffiliate": false,
    "priceCents": 299900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Ambraee",
    "title": "Mustard Angrakha Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/JBL09033.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/mustard-angrakha-suit-set",
    "isAffiliate": false,
    "priceCents": 469900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "White Green Kaftan Set (set of 2)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/products/4M4A5897.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/white-green-kaftan-summer-night-suits-for-women-online",
    "isAffiliate": false,
    "priceCents": 99900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Light Yellow Floral Printed Chanderi Silk Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/STH-664_jpg.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/light-yellow-floral-printed-chanderi-silk-kurta-set",
    "isAffiliate": false,
    "priceCents": 395000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Blue Ace Of Spades Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba01315.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/blue-ace-of-spades-kurta-set",
    "isAffiliate": false,
    "priceCents": 1700000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "light_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "weekend",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Kurta With Pant & Dupatta Ethnic Kurta Set For Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ES_2522_RUST_282_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/kurta-with-pant-dupatta-ethnic-kurta-set-for-women-anv_es_2522-rust?variant=47339217649849",
    "isAffiliate": false,
    "priceCents": 211400,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Janasya",
    "title": "Women's Dark Green Chanderi Silk Embellished Gold Foil Printed Anarkali Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB25ST02683.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-dark-green-chanderi-silk-embellished-gold-foil-printed-anarkali-kurta-set-jab25st02683?variant=48944473604266",
    "isAffiliate": false,
    "priceCents": 154900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Mauve Dhoti Drape Skirt Brocade Embroidered Kurta With Side Tie Ups",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/mauve_dhoti_drape_skirt_brocade_embroidered-sg278776_3__nasto_2b14e592-7566-405e-97bf-be7a1858fc4a.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/mauve-dhoti-drape-skirt-brocade-embroidered-kurta-with-side-tie-ups",
    "isAffiliate": false,
    "priceCents": 94900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Khara Kapas",
    "title": "Shadow leaf Kurta set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK5540.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/shadow-leaf-kurta-set",
    "isAffiliate": false,
    "priceCents": 1650000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Avni Green Embroidered Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_180a2496-c94e-425c-a97c-2ffc44f50c0b.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/avni-green-embroidered-kurta-set?variant=50517297463540",
    "isAffiliate": false,
    "priceCents": 169800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Beige Floral Embroidered Chanderi Silk Straight Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/1200765_2_799bea6e-8292-4976-94e5-b31381310452.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-beige-floral-embroidered-chanderi-silk-straight-suit-set-1200765",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Raagi Staright Kurta-Pant & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/mulmul_0010_DSC_8084.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-raagi-staright-kurta-pant-dupatta-set?variant=44456432599275",
    "isAffiliate": false,
    "priceCents": 795000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Luminous Slim Fit Single Breasted Blazer With Pants-Mauve",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3COO-05-1316-1.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/luminous-slim-fit-single-breasted-blazer-with-pants-mauve-color",
    "isAffiliate": false,
    "priceCents": 812200,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Baagh Printed Straight Cotton Kurta with Side Tie-Ups - Black & Beige",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-343-37.png?width=800",
    "productUrl": "https://www.tjori.com/products/baagh-printed-straight-cotton-kurta-with-side-tie-ups-tjmk34337?variant=47069425336542",
    "isAffiliate": false,
    "priceCents": 179900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Almond Chanderi Silk Kurta and Red Organza Sharara Set with Hand Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-A2026082_4_e75c3915-75de-4dfd-9e6a-4fd7ffb6d036.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/almond-chanderi-silk-kurta-red-organza-sharara-set-with-hand-embroidery",
    "isAffiliate": false,
    "priceCents": 2499500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Rangsutra Aashvi Orange Flared Mangalgiri Cotton Kurta With Soof Hand Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/RS26MGWIKW01RD2hero.webp?width=800",
    "productUrl": "https://okhai.org/products/rangsutra-aashvi-orange-flared-mangalgiri-cotton-kurta-with-soof-hand-embroidery",
    "isAffiliate": false,
    "priceCents": 320000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "kurtas",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Sea Green Floral Printed Lace Pure Cotton Straight Kurta with Straight Pants and Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS15135-129067_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/sea-green-floral-printed-lace-pure-cotton-straight-kurta-with-straight-pants-and-dupatta-set-ws15135-129067",
    "isAffiliate": false,
    "priceCents": 359900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Arya Red Pink Ombre Leheriya Organza Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_03e1a85a-404a-449a-9f44-c14d86a3def4.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/arya-red-pink-ombre-leheriya-organza-kurta-set",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Blue Printed Chanderi Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/products/Project_20230411_0532.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/blue-printed-chanderi-suit",
    "isAffiliate": false,
    "priceCents": 359900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "boat",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Bunaai",
    "title": "Aanya Floral Printed Kurti & Sharara Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/4053-4.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/aanya-floral-printed-kurti-sharara-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Black Khidki Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MSF26301_2.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/black-khidki-kurta-set",
    "isAffiliate": false,
    "priceCents": 3000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Kurta With Pant & Dupatta Ethnic Kurta Set For Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ES_2520_MAROON_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/kurta-with-pant-dupatta-ethnic-kurta-set-for-women-anv_es_2520-maroon?variant=47339213095097",
    "isAffiliate": false,
    "priceCents": 222500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Janasya",
    "title": "Indigo Pure Cotton Floral Printed Straight Kurta Pant Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA25KB01844.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/indigo-pure-cotton-floral-printed-straight-kurta-pant-set-jaa25kb01844?variant=46603190010026",
    "isAffiliate": false,
    "priceCents": 129900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Graceful Green Anarkali Suit With Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/sg241554_1_0ca4a915-dc0a-4ea3-b6c2-a5280ae37387.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/graceful-green-anarkali-suit-with-dupatta",
    "isAffiliate": false,
    "priceCents": 66400,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Shadow leaf Kurta set (RS)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK5540.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/shadow-leaf-kurta-set-rs",
    "isAffiliate": false,
    "priceCents": 1478700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Inaya Fuchsia Pink Embroidered Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_fa2bb079-4c3b-42cf-86e7-24a7e0827687.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/inaya-fuchsia-pink-embroidered-suit-set?variant=67666472206580",
    "isAffiliate": false,
    "priceCents": 181600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Pink Ethnic Printed Silk Blend Straight Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Pink-Ethnic-Printed-Silk-Blend-Straight-Suit-Set-1200749_a1e9f3ed-9977-40df-afb5-1717b0329beb.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-pink-ethnic-printed-silk-blend-straight-suit-set-1200749",
    "isAffiliate": false,
    "priceCents": 194900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Lris Anarkali Kurta-Pant & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/6055_1.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-lris-anarkali-kurta-pant-dupatta-set?variant=44462431895787",
    "isAffiliate": false,
    "priceCents": 795000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Set of 2 : Off White Hand Block Cotton Flex Kurta and Pallazo",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/TJ-MK-243-16_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/set-of-2-off-white-hand-block-cotton-flex-kurta-and-pallazo",
    "isAffiliate": false,
    "priceCents": 321900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Cotton Candy White Green Chanderi Mulmul Kurta set of 2",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/IMG_1169.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/cotton-candy-white-green-chanderi-mulmul-kurta-set-of-2",
    "isAffiliate": false,
    "priceCents": 599500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Off-White Floral Printed Straight Kurta with Pants and Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS14707-128378_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/off-white-floral-printed-straight-kurta-with-pants-and-dupatta-set-ws14707-128378",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Yug Purple Embroidered Velvet Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_bccc75ec-7438-4807-b0f8-23a1e1d25370.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/yug-purple-embroidered-velvet-suit-set",
    "isAffiliate": false,
    "priceCents": 561900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Ambraee",
    "title": "Pastel Pink Handblock Printed Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/JBL09627_7b30bfd3-547c-49fa-89dc-d6d8bcdd3297.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/pastel-pink-handblock-printed-kurta-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Organza Pittan Work Kurta With Pant",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/545.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/organza-pittan-work-kurta-with-pant",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Heena Green Tissue Silk Salwar Suit with Floral Print Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CDM-663_3_-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/heena-green-tissue-silk-salwar-suit-with-floral-print",
    "isAffiliate": false,
    "priceCents": 2308000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Solid Printed Straight Kurta & Trousers Sets",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ANK-1B24KPNTR007_20BLACK_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/solid-printed-straight-kurta-trousers-sets-d-1b24kpntr007-black?variant=47096669012153",
    "isAffiliate": false,
    "priceCents": 122300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Off White Pure Cotton Floral Printed Straight Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA26ST04308.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-off-white-pure-cotton-floral-printed-straight-kurta-set-jaa26st04308?variant=48285050634410",
    "isAffiliate": false,
    "priceCents": 144900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Black Georgette Mirror Embroidered Anarkali Gown With Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/black-georgette-mirror-embroidered-anarkali-gown-with-dupatta-sg418739-1_1b059457-3211-4ca2-a0cf-84be44c080b3.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/black-georgette-mirror-embroidered-anarkali-gown-with-dupatta",
    "isAffiliate": false,
    "priceCents": 45900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Sand Kurta set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK5119.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/sand-kurta-set",
    "isAffiliate": false,
    "priceCents": 1540000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Aafiya Mint Green Embroidered Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_c81e310b-550a-4978-8165-faeba3230f6d.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/aafiya-mint-green-embroidered-suit-set?variant=49202671059188",
    "isAffiliate": false,
    "priceCents": 529500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Deep Blue Ethnic Printed Silk Blend Straight Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Deep-Blue-Ethnic-Printed-Silk-Blend-Straight-Suit-Set-1200751_8696824b-fdbd-4377-86be-f787f89bc59a.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-deep-blue-ethnic-printed-silk-blend-straight-suit-set-1200751",
    "isAffiliate": false,
    "priceCents": 194900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Noori Embroidered Anarkali Kurta-Pants & Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/DSC_3755.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-noori-embroidered-anarkali-kurta-pants-dupatta-set?variant=44462527807723",
    "isAffiliate": false,
    "priceCents": 795000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Ivory Cotton Slub Short Kurta With Dhoti",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/237081-2019-02-12-20_38_58.344782-big-image.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/ivory-linen-short-kurta-with-dhoti",
    "isAffiliate": false,
    "priceCents": 99900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "White Handloom Mul Chanderi Suit Set With Cotton Tissue Yoke",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-2026864_1_b9caa19d-4f49-4906-a10c-82fa0a525acb.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/white-handloom-mul-chanderi-suit-cotton-tissue-yoke-with-plane-pant",
    "isAffiliate": false,
    "priceCents": 1399500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Purple Thread Embroidered Organza Straight Kurta with Straight Pants and Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS13874-401170_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/purple-thread-embroidered-organza-straight-kurta-with-straight-pants-and-dupatta-set-ws13874-401170",
    "isAffiliate": false,
    "priceCents": 599900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Flora Yellow Printed Cotton Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_7c9f106c-488a-4ba9-bd79-87445ef5d846.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/flora-yellow-printed-cotton-suit-set",
    "isAffiliate": false,
    "priceCents": 157900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Grey Chanderi Embroidered Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Artboard10_1.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/grey-chanderi-embroidered-suit-set",
    "isAffiliate": false,
    "priceCents": 449900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Bunaai",
    "title": "Nayantara Georgette Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/Festive-5875.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/nayantara-georgette-suit-set",
    "isAffiliate": false,
    "priceCents": 500000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Mauve Mulmul Cotton Salwar Suit with Bird & Floral Appliqué Buta Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CDM-633_2_-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/mauve-mulmul-cotton-salwar-suit-with-bird-floral-applique-buta",
    "isAffiliate": false,
    "priceCents": 661500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Raspberry Winddrop Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MAW25303_1.png?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/raspberry-winddrop-kurta-set",
    "isAffiliate": false,
    "priceCents": 2720000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Floral Embroidered A-Line Pure Cotton Kurta & Palazzos Sets",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/1C26KSWD316_20YELLOW_281_29_fd12fc9b-dae1-47c3-834a-4e345e449b0a.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/floral-embroidered-a-line-pure-cotton-kurta-palazzos-sets-d-1c26kswd316-yellow?variant=67580730114233",
    "isAffiliate": false,
    "priceCents": 267000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Beige Chanderi Silk Floral Embroidered Anarkali Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26ST05794.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-beige-chanderi-silk-floral-embroidered-anarkali-kurta-set-jab26st05794?variant=67551824576682",
    "isAffiliate": false,
    "priceCents": 239900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Multicolor Anarkali Suit Set In Banarasi Silk",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/multicolor_anarkali_suit_s-sg166450_7_927e4310-bb59-4b4e-82eb-8ba1e2d11f1a.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/multicolor-anarkali-suit-set-in-banarasi-silk",
    "isAffiliate": false,
    "priceCents": 59800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Morni Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK6540.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/morni-blue-gown-dress",
    "isAffiliate": false,
    "priceCents": 2120000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "sweetheart",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Lakshita",
    "title": "Vanya Black Embroidered Panelled Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_bed3be5b-c4c4-4af3-8b08-c8e01fe2c981.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/vanya-black-embroidered-panelled-kurta-set?variant=49048467210484",
    "isAffiliate": false,
    "priceCents": 519500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "silver"
  },
  {
    "brand": "Libas",
    "title": "Rust Brown Embroidered Silk Blend Straight Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Rust-Brown-Embroidered-Silk-Blend-Straight-Suit-Set-56337_8d3304d1-2d9b-48ea-85af-a8b72a0526df.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-rust-brown-embroidered-silk-blend-straight-suit-set-56337",
    "isAffiliate": false,
    "priceCents": 156900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Nayantara Georgette Suit Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/5_5f15dfdd-6f1c-4676-8006-60f703f4653f.png?width=800",
    "productUrl": "https://www.mulmul.com/products/nayantara-georgette-suit-set",
    "isAffiliate": false,
    "priceCents": 600000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "silver"
  },
  {
    "brand": "Nicobar",
    "title": "The Basic Long Length Kurta Set - Green",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/1_7fb5148f-5ec9-4ecd-b7cb-3295f52e9bc5.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-basic-long-length-kurta-set-green",
    "isAffiliate": false,
    "priceCents": 760000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "The ICH Bengal Vibes. Handwoven Jamdani Soft Mul Cotton Saree - Black And Red",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/SCR01F3.webp?width=800",
    "productUrl": "https://okhai.org/products/the-ich-bengal-vibes-handwoven-jamdani-soft-mul-cotton-saree-black-and-red",
    "isAffiliate": false,
    "priceCents": 382000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Nimbu Masala Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/DSC09868-25.jpg?width=800",
    "productUrl": "https://suta.in/products/nimbu-masala-black-viscose-saree",
    "isAffiliate": false,
    "priceCents": 659000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Multicolour Floral Printed Pre-Draped Georgette Saree with Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS13895-127624_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/multicolour-floral-printed-georgette-saree-ws13895-127624",
    "isAffiliate": false,
    "priceCents": 438000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Elegance Bliss Green Silk Bandhani Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/NRN_5304.jpg_1.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/elegance-bliss-green-silk-bandhani-saree",
    "isAffiliate": false,
    "priceCents": 1889900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Drama Draped to Perfection Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20241229_0003_942c239d-2134-4102-ab7b-219a0b9b86ff.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/drama-draped-to-perfection-saree",
    "isAffiliate": false,
    "priceCents": 1539900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Hot Pink Georgette Draped Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/Indianwearjan24-3856.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/hot-pink-designer-georgette-draped-saree-for-women-online",
    "isAffiliate": false,
    "priceCents": 687000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Yellow Semi Silk Banarasi Saree with Gold Zari Floral Jaal",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CAS-187-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/yellow-semi-silk-banarasi-saree-with-gold-zari-floral-jaal",
    "isAffiliate": false,
    "priceCents": 593000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Ecru Palm Theory Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MasabaNEWEDITED2_0057_Masaba00368.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/ecru-palm-theory-saree",
    "isAffiliate": false,
    "priceCents": 1700000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "iTokri",
    "title": "Red - Natural Dyed Kota Doria Cotton Hand Block Bagh Print Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/natural-dyed-kota-doria-cotton-hand-block-bagh-print-saree-16-red-ai-visual-daca68cc.png?width=800",
    "productUrl": "https://www.itokri.com/products/natural-dyed-kota-doria-cotton-hand-block-bagh-print-saree-16-2025-1578-1-16",
    "isAffiliate": false,
    "priceCents": 505000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Heavy Banarasi Zari Woven Silk Blend Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/MIT-VRA38623D_20MUSTARD_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/heavy-banarasi-zari-woven-silk-blend-saree-d-vra38623d-mustard",
    "isAffiliate": false,
    "priceCents": 122300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Green Jacquard Saree With Cut Dana And Sequin Embellished Pallu",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/green-jacquard-saree-with-cut-dana-and-sequin-embellished-pallu-sg430102-1_31a81194-220b-43c8-a0ef-db6396063dc7.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/green-jacquard-saree-with-cut-dana-and-sequin-embellished-pallu",
    "isAffiliate": false,
    "priceCents": 45200,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Inara Saree Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK1109_e9724798-f9c0-4a69-b1f9-e527b3642aee.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/inara-saree-set",
    "isAffiliate": false,
    "priceCents": 1680000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Sap Green and Blue Woven Design Silk Blend Banarasi Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Sap-Green-and-Blue-Woven-Design-Silk-Blend-Banarasi-Saree-1103873P_825b852d-d9ba-4c36-91b9-10ffb065164c.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-sap-green-and-blue-woven-design-silk-blend-banarasi-saree-1103873p",
    "isAffiliate": false,
    "priceCents": 171900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Trikaa Green-Yellow Leheriya Chiffon Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/SAR-081_4.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/trikaa-green-yellow-leheriya-chiffon-saree",
    "isAffiliate": false,
    "priceCents": 370000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Ella Sari & Blouse- White & Black Printed",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI050424_5.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/ella-sari-white-black-printed",
    "isAffiliate": false,
    "priceCents": 1200000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Off-White Cotton Linen Saree with Red Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-331-10_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/white-color-cotton-linen-saree-with-unstitched-blouse-10-mk331",
    "isAffiliate": false,
    "priceCents": 175900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Pastel Green Handloom Chanderi Saree with Madhubani Bird Painting – Pre Order",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MADHU33S_1.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/pastel-green-handloom-chanderi-madhubani-bird-saree",
    "isAffiliate": false,
    "priceCents": 2799500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "The ICH Bengal Weaves. Handwoven Cotton Saree - Genda Phool",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/TICHDUNS01B4.webp?width=800",
    "productUrl": "https://okhai.org/products/the-ich-bengal-weaves-handwoven-cotton-saree-genda-phool",
    "isAffiliate": false,
    "priceCents": 216000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Coco Genda Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/CocoGenda-3.jpg?width=800",
    "productUrl": "https://suta.in/products/coco-genda",
    "isAffiliate": false,
    "priceCents": 404100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Grey Beadwork Floral Printed Stitched Blouse with Predrape Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS14072-126946_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/grey-beadwork-floral-printed-stitched-blouse-with-predrape-saree-ws14072-126946",
    "isAffiliate": false,
    "priceCents": 599900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Advait Pink Leheriya Organza Pre Draped Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/2_c887df7f-5541-4d4f-bcd1-68b83b1ff393.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/advait-pink-leheriya-organza-pre-draped-saree",
    "isAffiliate": false,
    "priceCents": 677900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "light_summer"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Grey Lotus Chanderi Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/products/Project_20220124_0056.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/grey-lotus-chanderi-saree",
    "isAffiliate": false,
    "priceCents": 499900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Blue Floral Fusion Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/products/indianwearonline-8803.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/royal-blue-floral-fusion-georgette-saree-online",
    "isAffiliate": false,
    "priceCents": 510000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Black Organza Silk Saree with Silver Zari Stripes & Tassel Pallu",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/ORS-124_2_-Low-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/black-organza-silk-saree-with-silver-zari-stripes-tassel-pallu",
    "isAffiliate": false,
    "priceCents": 1435500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "House of Masaba",
    "title": "Rust Snow Light Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba03789_485d4031-1530-4606-9c08-fbeb2abf7890.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/rust-snow-light-saree",
    "isAffiliate": false,
    "priceCents": 2210000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Ajrakh Hand Block Print Natural Dyed Zari Border Chanderi Silk Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/0Q8A0414_467612e6-abc0-4102-84fd-3ebe5c7f1e23.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/ajrakh-hand-block-print-natural-dyed-zari-border-chanderi-silk-saree-16-2026-740-3-16",
    "isAffiliate": false,
    "priceCents": 1055000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "weekend",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Charming Pink Weaving Cotton Blend Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/MIT-CP8207PINK_20PINK_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/charming-pink-weaving-cotton-blend-saree-d-cp8207-pink",
    "isAffiliate": false,
    "priceCents": 255900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Dhoop Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK8160.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/dhoop-saree",
    "isAffiliate": false,
    "priceCents": 2230000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Green Floral Embellished Chiffon Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Green-Floral-Embellished-Chiffon-Saree-1103330P_b9667f2b-1ad2-49d9-b898-0616472baab5.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-green-floral-embellished-chiffon-saree-1103330p",
    "isAffiliate": false,
    "priceCents": 211900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Fusion Coral-Red Block Printed Modal Satin Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/SAR-086_1.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/fusion-coral-red-block-printed-modal-satin-saree",
    "isAffiliate": false,
    "priceCents": 595000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Noor Sari - Blue & Chartreuse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI051444_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/noor-sari-blue-chartreuse",
    "isAffiliate": false,
    "priceCents": 825000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Gold & Grey Pure Tissue Kora Silk Banarasi Tanchoi Saree With Silver Zari Border",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/SRN20101_2.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/gold-grey-pure-tissue-kora-silk-banarasi-tanchoi-saree-with-silver-zari-border",
    "isAffiliate": false,
    "priceCents": 2199500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "IndiDhaage Maku Butty Handloom Lightweight Handwoven Mul Cotton Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/SRI1764-M-1.webp?width=800",
    "productUrl": "https://okhai.org/products/whe-maku-butty-handloom-lightweight-handwoven-mul-cotton-saree",
    "isAffiliate": false,
    "priceCents": 190000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Boogie Boondi Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/BoogieBoondi-2.jpg?width=800",
    "productUrl": "https://suta.in/products/boogie-boondi",
    "isAffiliate": false,
    "priceCents": 280300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Green Floral Printed Pre-Draped Georgette Saree with Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS13897-127595_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/green-floral-printed-pre-draped-georgette-saree-ws13897-127595",
    "isAffiliate": false,
    "priceCents": 522000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Phuhar Blue Bandhej Silk Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_e162bba8-5c61-4e21-8bec-f9cd955f182b.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/phuhar-blue-bandhej-silk-saree",
    "isAffiliate": false,
    "priceCents": 2259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Yellow Lotus Chanderi Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/products/Project_20220124_0052.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/yellow-lotus-chanderi-saree",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "light_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Orange Pink Shaded Organza Silk Saree with Aari & Pichwai Work",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/ORS-117_2_-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/orange-pink-shaded-organza-silk-saree-with-aari-pichwai-work",
    "isAffiliate": false,
    "priceCents": 1294500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Beige Palm Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/1_0b70a5fe-7301-44c8-b226-28799fac38a7_1.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/beige-palm-saree",
    "isAffiliate": false,
    "priceCents": 2210000,
    "currency": "INR",
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
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "iTokri",
    "title": "Pink - Kandangi Chettinad Cotton Saree with Border",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/3T1A6040_fef4e494-08f9-4417-8205-b87188ba553b.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/kandangi-chettinad-cotton-saree-with-border-13-2025-534-2-13",
    "isAffiliate": false,
    "priceCents": 249000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Solid Pure Cotton Saree with Unstiched Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/NAV-JJ_2008_20MULBOR_20PISTA_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/solid-pure-cotton-saree-with-unstiched-blouse-nav-jj-08-mulbor-pista",
    "isAffiliate": false,
    "priceCents": 189100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Elea Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK1089.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/elea-saree",
    "isAffiliate": false,
    "priceCents": 1150000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Turquoise Blue and Pink Banarasi Silk Blend Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Turquoise-Blue-and-Pink-Banarasi-Silk-Blend-Saree-1103607P_968589da-0851-497e-aa38-34049f67f800.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-turquoise-blue-and-pink-banarasi-silk-blend-saree-1103607p",
    "isAffiliate": false,
    "priceCents": 196900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Love-In-A-Mist Chiffon Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/SAR-040_3.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/love-in-a-mist-chiffon-saree",
    "isAffiliate": false,
    "priceCents": 545000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Dancefloor Sari - Metallic Tissue",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI054194_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/dancefloor-sari-metallic-tissue",
    "isAffiliate": false,
    "priceCents": 1700000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "Red Digital Print Modal Silk Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-333-03_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/red-digital-print-modal-silk-saree-mk333",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "WeaverStory",
    "title": "Blue Handloom Cotton Ikat Saree With Multicoloured Striped Pallu",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/A08A7101.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/blue-handloom-cotton-ikat-saree-with-multicoloured-striped-pallu",
    "isAffiliate": false,
    "priceCents": 1099500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "The ICH Sambalpuri Handwoven Ikat Soft Cotton Saree - Lal Mrinal",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/TICHBUNS01C9hero.webp?width=800",
    "productUrl": "https://okhai.org/products/the-ich-sambalpuri-handwoven-ikat-soft-cotton-saree-lal-mrinal",
    "isAffiliate": false,
    "priceCents": 421000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Shonkho Sindoor Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/ShonkhoSindoor-02.jpg?width=800",
    "productUrl": "https://suta.in/products/shonkho-sindoor-cotton-saree",
    "isAffiliate": false,
    "priceCents": 416000,
    "currency": "INR",
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
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Ketaki Yellow Bandhej Silk Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_b1c18497-740d-4290-9c7f-23b1f09b656b.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/ketaki-yellow-bandhej-silk-saree",
    "isAffiliate": false,
    "priceCents": 1999900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Lady in Lagoon Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20241229_0005_6b0ef8f8-66b4-4910-90ae-cd25cc6d92b5.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/lady-in-lagoon-saree",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Bottle Green Banarasi Saree with Rajwada and Nartaki Motifs",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/BSS-159E_2_-LOW-Chinayabanaras_a64c1617-7e86-4266-98b1-96ad2a57eb97.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/bottle-green-banarasi-saree-with-rajwada-and-nartaki-motifs",
    "isAffiliate": false,
    "priceCents": 1863700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Never Not Iconic Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MasabaNEWEDITED2_0034_GenerativeFill6.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/never-not-iconic-saree",
    "isAffiliate": false,
    "priceCents": 2550000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Pink - Organic Kala Cotton Bhujodi Handloom Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/1_0fb3a53a-a795-45b9-9aca-d5b727892364.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/2023-699-3-1-kutch-bhujodi-weaving-handwoven-fine-cotton-saree-with-tassels",
    "isAffiliate": false,
    "priceCents": 1319000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Floral Embroidered Net Party Wear Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/MIT-ARYA8207_20WHITE_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/floral-embroidered-net-party-wear-saree-d-arya8207-white",
    "isAffiliate": false,
    "priceCents": 233600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Red Khaddi Georgette Bandhani Saree With Heavy Zardozi Border",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/red-khaddi-georgette-bandhani-saree-with-heavy-zardozi-border-sg430356-1_90b2acf4-62d5-47d9-a8e1-cd93fb1b22a6.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/red-khaddi-georgette-bandhani-saree-with-heavy-zardozi-border",
    "isAffiliate": false,
    "priceCents": 85700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Feirosa Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/WhatsAppImage2026-08-24at17.04.58_4.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/feirosa-saree",
    "isAffiliate": false,
    "priceCents": 1150000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Art Cream Woven Design Silk Saree with Embellished Border",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Art-Cream-Woven-Design-Silk-Saree-with-Embellished-Border-1103405PA_d065a771-79be-4637-9d86-e1831848121f.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-art-cream-woven-design-silk-saree-with-embellished-border-1103405pa",
    "isAffiliate": false,
    "priceCents": 335900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Preetisha Multicolored Leheriya Chiffon Saree",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/SAR-077_1.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/preetisha-multicolored-leheriya-chiffon-saree",
    "isAffiliate": false,
    "priceCents": 370000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Milan Sari - Embroidered Mukaish Silk Organza",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI054513_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/milan-sari-embroidered-mukaish-silk-organza",
    "isAffiliate": false,
    "priceCents": 2800000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Botanical Green Kota Doriya Saree Without Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-344-05_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/botanical-green-kota-doriya-saree-unstitched-blouse",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "sarees",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "\"Patternplay\" Cotton Ajrakh Sleeveless Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LD26341520_1_Hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-patternplay-cotton-ajrakh-sleeveless-dress",
    "isAffiliate": false,
    "priceCents": 710000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Yellow Embroidered Fit & Flare Georgette Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/S11755-400652_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/yellow-embroidered-fit-flare-georgette-dress-s11755-400652",
    "isAffiliate": false,
    "priceCents": 999900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Morning Dew Blue Muslin Printed Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/Copy_of_4_d16d357c-7f45-4b51-bf4d-140c1e5ddac2.png?width=800",
    "productUrl": "https://www.aachho.com/products/morning-dew-blue-muslin-printed-dress",
    "isAffiliate": false,
    "priceCents": 129900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
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
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Brown Pure Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20250508_0004_938c61ec-e7bf-489a-ae4e-4ca6b89a6e51.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/brown-pure-cotton-dress",
    "isAffiliate": false,
    "priceCents": 239900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Bunai Pink Coast Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/SPRINGSUMMER2024-1404.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/pink-coast-cotton-dress",
    "isAffiliate": false,
    "priceCents": 450000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "sweetheart",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Creamy Yellow Floral Printed Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/STH-368-Chinaya-Banaras_1_-LOW.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/cotton-dress-for-women-online-summer-fashion",
    "isAffiliate": false,
    "priceCents": 284200,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
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
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "The Sunrise Sorbet Kaftan",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba201887.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/the-sunrise-sorbet-kaftan",
    "isAffiliate": false,
    "priceCents": 2000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "iTokri",
    "title": "Akola Hand Block Print Natural Dyed Cotton Kaftan (Medium)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/0Q8A8821_e357cfd8-985b-414a-b3ea-1f17697f4f4f.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/akola-hand-block-print-natural-dyed-cotton-kaftan-medium-175-2026-680-1-175",
    "isAffiliate": false,
    "priceCents": 175000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Floral Printed A-Line Tiered Ethnic Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ANK-SP-404_20PURPLE_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/floral-printed-a-line-tiered-ethnic-dress-d-sp-404-purple?variant=47096686543033",
    "isAffiliate": false,
    "priceCents": 122300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Rust Cotton Solid A-Line Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA25DR01744.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/womens-rust-cotton-solid-a-line-dress-jaa25dr01744?variant=48339273449642",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Blush Peach Embroidered Brocade Corset Gown With Drape And Side Slit",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/sg289659_1.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/blush-peach-embroidered-brocade-corset-gown-with-drape-and-side-slit",
    "isAffiliate": false,
    "priceCents": 49900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Kuro Wrap Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/0-192_f8b674c1-1862-40de-9eb9-0daa57c915e0.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/kuro-wrap-dress",
    "isAffiliate": false,
    "priceCents": 1130000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Bella Ocean Blue Printed Muslin Dress for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/UntitledCapture5036.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/bella-ocean-blue-printed-muslin-dress-for-women?variant=47692252315892",
    "isAffiliate": false,
    "priceCents": 199800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
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
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Multi Color Tropical Printed Fit and Flare Chiffon Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Multi-Color-Tropical-Printed-Fit-and-Flare-Chiffon-Dress-57047_070c25f8-cb9f-405f-8c8c-286b0861ac1e.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-multi-color-tropical-printed-fit-and-flare-chiffon-dress-57047",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Pink Floral Jaal Block Printed Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/03_0000_DSC_2868.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-pink-floral-jaal-block-printed-dress?variant=44262576521451",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Tango Kaftan Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/BUNDLE410_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-tango-kaftan-set",
    "isAffiliate": false,
    "priceCents": 1925000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Salt Attire",
    "title": "Orelia Contrast Detail Fit And Flare Dress-Beige",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3DRE-04-2079-1_6f775153-c790-433a-8245-c97d546ce316.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/orelia-contrast-detail-fit-and-flare-dress-beige-color",
    "isAffiliate": false,
    "priceCents": 189000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "White & Blue Striped Cotton Shirt Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-358-44_1.png?width=800",
    "productUrl": "https://www.tjori.com/products/white-blue-striped-cotton-shirt-dress",
    "isAffiliate": false,
    "priceCents": 159900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Off White Handloom Muga Silk Kaftan With Meenakari Ambi Booti",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-2026995_1_9ebc838a-6e22-4ab5-b614-990231d134fb.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/off-white-handloom-muga-silk-tunic-meenakari-motif-bell-sleeves-copy",
    "isAffiliate": false,
    "priceCents": 1999500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "\"Mosaic\" Cotton Ajrakh Wrap Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LD26341590_1_Hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-mosaic-cotton-ajrakh-wrap-dress",
    "isAffiliate": false,
    "priceCents": 650000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Aqua Green Zari Embroidered Jacquard Anarkali and Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/SP12576-312992_1_e84e52a2-6e5f-40ac-b298-15f9bf2782e8.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/aqua-green-zari-embroidered-jacquard-anarkali-and-dupatta-set-sp12576-312992",
    "isAffiliate": false,
    "priceCents": 1499900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Whimsy White Handpainted Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/9_6111c109-7f72-410a-a188-d7b6f5efbf01.png?width=800",
    "productUrl": "https://www.aachho.com/products/whimsy-white-handpainted-cotton-dress",
    "isAffiliate": false,
    "priceCents": 156900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Teal Green Ikat Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/1_3113178c-798a-467b-82a9-46889bb286b2.webp?width=800",
    "productUrl": "https://www.ambraee.com/products/teal-green-ikat-dress",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Pink Fit & Flare Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/WhatsAppImage2026-06-30at14.21.42.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/pink-fit-flare-cotton-dress",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Sage Green Floral Printed Silk Kaftan Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/STH-356_3_-chinaya-banaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/sage-green-floral-printed-silk-kaftan-set",
    "isAffiliate": false,
    "priceCents": 347500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Black & White Tropical Nandi Kaftan",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MSF26202_2.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/black-white-tropical-nandi-kaftan",
    "isAffiliate": false,
    "priceCents": 1800000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Textured Dyed A-Line Tiered Ethnic Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ANK-SP-340_20PURPLE_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/textured-dyed-a-line-tiered-ethnic-dress-d-sp-340-purple?variant=47096678875321",
    "isAffiliate": false,
    "priceCents": 122300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
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
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Royal Blue Georgette Floral Printed A-line Flared Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA26DR03798.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-royal-blue-georgette-floral-printed-a-line-flared-dress-jaa26dr03798?variant=48117668479146",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Black Rainbow Gown In Sequins With Beads And Cutdana Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/black_rainbow_gown_in_sequins-sg154668_5_ce83b273-f117-478c-9c2e-84973290255b.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/black-rainbow-gown-in-sequins-with-beads-and-cutdana-embroidery",
    "isAffiliate": false,
    "priceCents": 51300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Khara Kapas",
    "title": "Cocoa Cream Spiral Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/9_f6240cf9-17b8-47aa-905f-96d173f27c67.png?width=800",
    "productUrl": "https://www.kharakapas.com/products/dress-38",
    "isAffiliate": false,
    "priceCents": 466400,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
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
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Aarini Blue Ombre Embroidered Kaftan Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_27f20d47-d5f2-472c-8dbe-3828bb2876a8.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/aarini-blue-ombre-embroidered-kaftan-set?variant=49048468717812",
    "isAffiliate": false,
    "priceCents": 399500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Green Floral Printed Fit and Flare Chiffon Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Green-Floral-Printed-Fit-and-Flare-Chiffon-Dress-57048_990f31ca-ccd7-4795-87ec-4452c9af14ed.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-green-floral-printed-fit-and-flare-chiffon-dress-57048",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Ishi Block Printed Flared Mini Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/DSC_8364-1.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-ishi-block-printed-flared-mini-dress?variant=44086504587499",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Antonia Metallic Button Down A-line Dress-Navy",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/Untitled-design-_5.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/antonia-metallic-button-down-a-line-dress-navy-color",
    "isAffiliate": false,
    "priceCents": 345000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "Red Ajrakh Print Sleeveless Asymmetrical Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/TJ-MK-270-53_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/red-ajrakh-print-sleeveless-asymmetrical-dress",
    "isAffiliate": false,
    "priceCents": 174700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Off White Handloom Muga Silk Kaftan With Meenakari Motif",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-2026993-1_f309de45-e622-4e49-953d-c8edbf6a0103.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/off-white-handloom-muga-silk-kaftan-with-meenakari-ambi-booti-copy",
    "isAffiliate": false,
    "priceCents": 1999500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "boat",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "\"Red Heart\" Handblock Printed Pure Cotton Wrap Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LD26241700_2_1653eb40-0d97-4f1a-a340-b60f554c1532.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-red-heart-handblock-printed-pure-cotton-wrap-dress",
    "isAffiliate": false,
    "priceCents": 350000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Polka, Please Work Flared Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/W15073-129141_01.png?width=800",
    "productUrl": "https://wforwoman.com/products/brown-geometric-printed-pure-cotton-flared-dress-w15073-129141",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Meera Neon Green Embroidered Chinon Kaftan",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_a1723b3b-1895-4dae-8e37-eef7af0302a8.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/meera-neon-green-embroidered-chinon-kaftan",
    "isAffiliate": false,
    "priceCents": 124900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "warm_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Gather & Go Sky Linen Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/GeneratedImageFebruary11_2026-4_25PM.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/gather-go-sky-dress",
    "isAffiliate": false,
    "priceCents": 239900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection",
      "inverted_triangle"
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
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Beauty Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/SPRINGSUMMER2024-0649.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/beauty-cotton-dress",
    "isAffiliate": false,
    "priceCents": 410000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "scoop",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Black Mooncrest Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/MSS26505_1.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/black-mooncrest-dress",
    "isAffiliate": false,
    "priceCents": 1400000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "iTokri",
    "title": "Ajrakh Hand Block Print Natural Dyed Cotton Kaftan (Medium)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/0Q8A8476_ee7e61e7-c562-4e20-9c16-86f5922fa83d.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/ajrakh-hand-block-print-natural-dyed-cotton-kaftan-medium-91-2026-680-1-91",
    "isAffiliate": false,
    "priceCents": 219000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
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
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Textured Dyed A-Line Tiered Ethnic Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/ANK-SP-340_20BLACK_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/textured-dyed-a-line-tiered-ethnic-dress-d-sp-340-black?variant=47096678514873",
    "isAffiliate": false,
    "priceCents": 122300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Red Rayon Solid Tiered Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/IMG_4932.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/red-rayon-solid-tiered-dress-jac25dr01625?variant=46496051789994",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Green Chiffon Gown With Multicolor Patchwork And Sequined Motifs",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/green-chiffon-gown-with-multicolor-patchwork-and-sequined-motifs-sg431796-1_4fed3d25-ca8c-4e86-af83-ffd7965dc3c1.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/green-chiffon-gown-with-multicolor-patchwork-and-sequined-motifs",
    "isAffiliate": false,
    "priceCents": 52900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "high",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Whitewood Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/0-62_d3b854b3-5263-462b-857f-862c8cd9f348.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/whitewood-dress",
    "isAffiliate": false,
    "priceCents": 1150000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": "boat",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Saraab Salmon Pink Embroidered Viscose Dress for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/LakshitaFashions-1410-Edit.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/saraab-salmon-pink-embroidered-viscose-dress-for-women?variant=47692187730164",
    "isAffiliate": false,
    "priceCents": 129500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Pink Floral Printed A-Line Silk Blend Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Pink-Floral-Printed-A-Line-Silk-Blend-Dress-43687_453d4b80-cd33-4d1e-a0c2-27950dd6e870.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-pink-floral-printed-a-line-silk-blend-dress-43687",
    "isAffiliate": false,
    "priceCents": 109900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
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
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Celestial Black Embroidered Cotton Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/5_f39b9ebb-7436-4f87-aaa8-eda71eb4b8b7.png?width=800",
    "productUrl": "https://www.mulmul.com/products/celestial-black-cotton-dress",
    "isAffiliate": false,
    "priceCents": 450000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "off_shoulder",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Vaya Kaftan Set - Orange & White",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/1_ca26b46c-e780-49b1-a0f1-69c07545e6a1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-vaya-kaftan-set-orange-white",
    "isAffiliate": false,
    "priceCents": 1125000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Leonora Contrast Detail A-Line Dress-Black",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/PDP_1500x2000_d876f2f1-0b37-4ff9-b504-8884133be0e3.png?width=800",
    "productUrl": "https://www.saltattire.com/products/leonora-contrast-detail-a-line-dress-black-color",
    "isAffiliate": false,
    "priceCents": 267700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Bagru Asymmetric dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-89-01_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/bagru-asymmetric-dress",
    "isAffiliate": false,
    "priceCents": 101900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "cool_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "\"Mehvish\" Chikankari Pure Cotton Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LST24228230_1_Hero.jpg?width=800",
    "productUrl": "https://okhai.org/products/okhai-mehvish-chikankari-pure-cotton-top",
    "isAffiliate": false,
    "priceCents": 260000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Morni Alat Palat Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/MorniAlatPalat-2.jpg?width=800",
    "productUrl": "https://suta.in/products/morni-alat-palat",
    "isAffiliate": false,
    "priceCents": 361000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Grey Floral Rayon Straight Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/F31403-911951_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/grey-floral-rayon-straight-top-f31403-911951",
    "isAffiliate": false,
    "priceCents": 262500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Lama Green Bandhani Cotton Shirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_3387bc46-cd9e-49c5-939a-9696404e0a1e.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/lama-green-bandhani-cotton-shirt",
    "isAffiliate": false,
    "priceCents": 67900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Pink Chevron Accent Shirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/6_cc5d1376-1309-4780-8b7d-e00f99dcec2b.webp?width=800",
    "productUrl": "https://www.ambraee.com/products/pink-chevron-accent-shirt",
    "isAffiliate": false,
    "priceCents": 219900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Black Designer Blouse with Hand Embellished Work",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CBP-096_2_-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/black-designer-blouse-with-hand-embellished-work?variant=46552897093770",
    "isAffiliate": false,
    "priceCents": 517500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Ajrakh Hand Block Print Modal Silk Readymade Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/5_9a723c37-d664-4eee-bb49-9dae4ca02e93.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/ajrakh-hand-block-print-modal-silk-readymade-blouse-23-2026-784-1-221",
    "isAffiliate": false,
    "priceCents": 249000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": "scoop",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Blue Pure Cotton Abstract Printed Gathered Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA26TP03969.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-blue-pure-cotton-abstract-printed-gathered-top-jaa26tp03969?variant=48284994863274",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Champaigne Beige Three-Piece Western Suit In Banarasi Brocade Silk With Cut-Dana Finished Crop Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/champaigne_beige_three-piece_western_suit-sg106585_2_3dd753c7-90d7-46bd-ae24-f690c893030c.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/champaigne-beige-three-piece-western-suit-in-banarasi-brocade-silk-wth-cut-dana-finished-crop-top",
    "isAffiliate": false,
    "priceCents": 41900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "light_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Lakshita",
    "title": "Moira Rust Printed Moss Crepe Shirt for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Ajio-LK0305-18_1_8a1fbcb6-0d7f-49f8-b3dc-321d91e1d73f.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/moira-rust-printed-moss-crepe-shirt-for-women?variant=48717352009972",
    "isAffiliate": false,
    "priceCents": 129700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Anay Top & Skort Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/Whitetop_0000_DSC_8226copy.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/mulmul-anay-top-skort-set?variant=44087853482219",
    "isAffiliate": false,
    "priceCents": 375000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "bright_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Kalo Shirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/BUNDLE334_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-kalo-shirt-set",
    "isAffiliate": false,
    "priceCents": 1075000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Apex Boat Neck Print Top - Black & White",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3TOP-03-2004-1_cc945ee6-7132-41ed-8159-e26215acf5bc.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/apex-boat-neck-print-top-black-white",
    "isAffiliate": false,
    "priceCents": 122500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "boat",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Yellow Color Vneck Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-319-04_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/yellow-color-vneck-top-mk319",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Black Silk Blouse Gold Tissue Choli Cut Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/BRI2405B-1_dbea015b-dcdb-4ba4-8c2c-b7794bfbd247.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/black-silk-blouse-gold-tissue-choli-cut-blouse",
    "isAffiliate": false,
    "priceCents": 1699500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Rangsutra Dhwani Red Mandarin Collar Handloom Cotton Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/RS26DNWWTP05RD5.webp?width=800",
    "productUrl": "https://okhai.org/products/rangsutra-dhwani-red-mandarin-collar-handloom-cotton-top",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "warm_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Aaj Alat Palat Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/AajAlatPalat-05.jpg?width=800",
    "productUrl": "https://suta.in/products/aaj-alat-palat",
    "isAffiliate": false,
    "priceCents": 246100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "scoop",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Rust Block Floral Printed Cotton Blend Pleated Sleeveless Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/F31399-911871_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/rust-block-floral-printed-cotton-blend-pleated-sleeveless-top-f31399-911871",
    "isAffiliate": false,
    "priceCents": 262500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Nayra Maroon Chanderi Gotapatti Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_4d9ea8fb-9248-445b-81a5-a46326cf9c70.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/nayra-maroon-chanderi-gotapatti-blouse",
    "isAffiliate": false,
    "priceCents": 99900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Ambraee",
    "title": "Yellow Floral Organza Shirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20240318_0127.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/yellow-floral-organza-shirt",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Red & White Geometrical Printed Silk Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CBP-045.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/red-white-geometrical-printed-silk-blouse",
    "isAffiliate": false,
    "priceCents": 268200,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "White Georgette Digital Print Flared Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JNE4045-TP_2c73ff58-1a2c-4bab-b0d8-a1982bd1c643.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/white-georgette-digital-print-flared-top-jne4045?variant=46199319593130",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "bright_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Khara Kapas",
    "title": "Holstein Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK16074_96469746-d4ad-413a-8aa8-e67b07f27b0a.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/holstein-top",
    "isAffiliate": false,
    "priceCents": 940000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Aira Light Wash Blue Embroidered Shirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/6_6d48b5ad-52ba-4c5a-ac35-ba96cea6b638.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/aira-light-wash-blue-embroidered-shirt?variant=49252622336244",
    "isAffiliate": false,
    "priceCents": 259500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "soft_summer"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "The Riva Top Set - Ivory",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/1_fbff630d-d1d9-47bd-9bfb-00cec22db3d8.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/the-riva-top-set-ivory",
    "isAffiliate": false,
    "priceCents": 950000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Abton Boat Neck Top-Multi",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3TOP-04-1065-1_9c1f1694-5514-4bcc-8a94-021e8b3d955d.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/abton-boat-neck-top-multi-color",
    "isAffiliate": false,
    "priceCents": 156700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "light_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "boat",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Lilac Button Down Shirt In Cotton Slub",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/256451-2018-08-30-15_09_33.298181-big-image.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/lilac-button-down-shirt-in-cotton-slub",
    "isAffiliate": false,
    "priceCents": 49900,
    "currency": "INR",
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
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Pink Handloom Pure Chanderi Silk V Neck Sleeveless Blouse With Golden Lace Yoke",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MTO-20260903P_2.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/pink-handloom-pure-chanderi-silk-v-neck-sleeveless-blouse-with-golden-lace-yoke",
    "isAffiliate": false,
    "priceCents": 899500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Phae Daffodil Linen Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/Phae161-3hero.webp?width=800",
    "productUrl": "https://okhai.org/products/phae-daffodil-linen-top",
    "isAffiliate": false,
    "priceCents": 288000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Nagarkurnool Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/image00248-2.jpg?width=800",
    "productUrl": "https://suta.in/products/nagarkurnool",
    "isAffiliate": false,
    "priceCents": 329600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Pink Paisley Printed Modal Straight Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/W31456-127299_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/pink-paisley-printed-modal-straight-top-w31456-127299",
    "isAffiliate": false,
    "priceCents": 106000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Zohra Pink Jacquard Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_79c1988f-33ff-4da7-8d86-df254a70ccf8.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/zohra-pink-jacquard-blouse",
    "isAffiliate": false,
    "priceCents": 97900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Red Floral Cotton Peplum Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Untitled-1_bb0723bb-e473-49a9-86fc-5b3f95c2ca69.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/red-floral-cotton-peplum-top",
    "isAffiliate": false,
    "priceCents": 129900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "warm_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Red Banarasi Blouse with Geometrical Handwork",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CBP-066-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/red-banarasi-blouse-with-geometrical-handwork?variant=46538622140554",
    "isAffiliate": false,
    "priceCents": 778200,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Janasya",
    "title": "Women's Indigo Pure Cotton Floral Printed Shirt Style Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAA26TP03445.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-indigo-pure-cotton-floral-printed-shirt-style-top-jaa26tp03445?variant=48284994437290",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "casual",
      "work",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Khara Kapas",
    "title": "Clairen Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK8070.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/clairen-top",
    "isAffiliate": false,
    "priceCents": 830000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Taal Lavender Embroidered Shirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Half_Shot_d5cbf494_a7b7200f-2caa-4157-9f5f-586708dce709.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/taal-lavender-embroidered-shirt?variant=48002259714292",
    "isAffiliate": false,
    "priceCents": 174800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
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
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Rangsutra Aashvi Orange Straight-Fit Mangalgiri Cotton Pant With Kantha Hand Embroidery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/RS26MGMNPT08RD1hero.webp?width=800",
    "productUrl": "https://okhai.org/products/rangsutra-aashvi-orange-straight-fit-mangalgiri-cotton-pant-with-kantha-hand-embroidery",
    "isAffiliate": false,
    "priceCents": 180000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Off White Floral Printed Straight Fit Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WB13727-127121_1_d6918488-ecc1-4f24-8ee7-43fd0161bcd6.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/off-white-floral-printed-straight-fit-pants-wb13727-127121",
    "isAffiliate": false,
    "priceCents": 99900,
    "currency": "INR",
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
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Vesha Brown Cotton Flex Solid Straight Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_60db85fa-e541-4a56-98f6-4a4741fb1a94.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/vesha-brown-cotton-flex-solid-straight-pants",
    "isAffiliate": false,
    "priceCents": 72900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Off-White Crop Top & Palazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/30_e301521d-3b8e-44a0-b51d-c05e1e773ea3.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/off-white-cotton-crop-top-palazzo-set",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "scoop",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Pineapple Printed Cotton Pant Top",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/products/Cottonsalwarsuitonlineindia-3928.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/pineapple-yellow-printed-cotton-suit-set-for-women-online",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Black Vintage Fiona Palazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/IMG_0976-2.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/black-vintage-fiona-palazzo-set",
    "isAffiliate": false,
    "priceCents": 2210000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Solid Loose Fit Afgani Pant for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/1C26AFPTR304_20RUST_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/solid-loose-fit-afgani-pant-for-women-nav-1c26afptr304-rust?variant=67651882385593",
    "isAffiliate": false,
    "priceCents": 105900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Rani Pink Embroidered Printed Palazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/rani_pink_embroidered_printed_palazzo_set-sg188565_10_9f50a7b8-942e-423b-b15e-2341930e3370.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/rani-pink-embroidered-printed-palazzo-set",
    "isAffiliate": false,
    "priceCents": 58900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Earth Brown Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK16474.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/earth-brown-pants",
    "isAffiliate": false,
    "priceCents": 1190000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Haya Salmon Black Cotton Linen Classic Fit Pants for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/products/21SHP0266-S-6-1_9321c71e-84d3-48a9-a726-f89cbd18e76c.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/subtle-black-palazzo-with-bell-hem?variant=42988566872308",
    "isAffiliate": false,
    "priceCents": 199500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Off White Floral Embroidered Cotton Farshi Salwar Suit Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Off-White-Floral-Embroidered-Cotton-Farshi-Salwar-Suit-1200755_6a2fd6c7-c370-4837-be1b-c8eb34cd2d12.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-off-white-floral-embroidered-cotton-farshi-salwar-suit-1200755",
    "isAffiliate": false,
    "priceCents": 217900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Blush Pink Crop Top With Cowl Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/3013_14.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/blush-pink-crop-top-with-cowl-pants?variant=43539016319211",
    "isAffiliate": false,
    "priceCents": 345000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "light_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Flex-Sage Green Pull On Slim Jeggings-Sage Green Trousers",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3PAN-02-3142-1_95eea7f9-f28c-410b-84fb-9fc8cbdd7edb.webp?width=800",
    "productUrl": "https://www.saltattire.com/products/flex-sage-green-pull-on-slim-jeggings-sage-green-color",
    "isAffiliate": false,
    "priceCents": 220000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Light Green Cotton Churidar Trousers",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/products/276076-2019-04-30-15_31_55.709129-big-image.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/207-33",
    "isAffiliate": false,
    "priceCents": 91900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
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
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Maroon Handloom Chanderi Stripe Tissue Suit With Chanderi Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/VEL202518_2_d85448a2-bf16-47e6-b7a2-45098eb1d806.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/maroon-handloom-chanderi-stripe-tissue-suit-with-chanderi-pant",
    "isAffiliate": false,
    "priceCents": 1699500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Black Olive' Pure Linen Pant",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/products/LP22824361_6.jpg?width=800",
    "productUrl": "https://okhai.org/products/okhai-black-olive-pure-linen-pant",
    "isAffiliate": false,
    "priceCents": 350000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "White Pure Cotton Straight Fit Ankle Length Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WB14517-225806_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/white-pure-cotton-straight-fit-ankle-length-pants-wb14517-225806",
    "isAffiliate": false,
    "priceCents": 100000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "light_summer"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Aruvi Olive Flex Solid Straight Pants",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_d4cb65b9-cc64-4bfd-9859-4a4ff40de4f9.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/aruvi-olive-flex-solid-straight-pants",
    "isAffiliate": false,
    "priceCents": 74900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Green Crop Top & Palazzo Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/40_a3a1dd96-1c3e-4edd-bdf2-86e4fa0ef2f8.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/green-cotton-crop-top-palazzo-set",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "square",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Solid Farshi Salwar Trousers",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/1C26FSWRR087_20Black_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/solid-farshi-salwar-1c26fswrr087-black?variant=67593948823737",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
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
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Dark Green Silk Crop Top Palazzo Set With WaistJacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/dark-green-silk-crop-top-palazzo-set-with-waistjacket-sg431592-1_f184a2bd-f284-4d9a-b4ab-ac5e401fc743.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/dark-green-silk-crop-top-palazzo-set-with-waistjacket",
    "isAffiliate": false,
    "priceCents": 47900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Lakshita",
    "title": "Sureena Dark Navy Relaxed Fit Pants for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/products/22WHP0406-S-4B_3.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/dark-navy-blue-regular-pants-with-elastic-waist-band?variant=43694562214132",
    "isAffiliate": false,
    "priceCents": 149500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "trousers",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Off White Floral Embroidered Cotton Farshi Salwar Suit Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Off-White-Floral-Embroidered-Cotton-Farshi-Salwar-Suit-1200753_bed8f603-17a9-447e-b186-df7430c447c2.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-off-white-floral-embroidered-cotton-farshi-salwar-suit-1200753",
    "isAffiliate": false,
    "priceCents": 216900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Blackline Precision Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/Look2_398a3444-fc26-4e1d-b648-9760fe7ade3b.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/blackline-precision",
    "isAffiliate": false,
    "priceCents": 402900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Ajoobaa Crochet \"Sandy Bloom\" Skirt - Multicolor",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/VSKRT15_1.webp?width=800",
    "productUrl": "https://okhai.org/products/ajoobaa-crochet-sandy-bloom-skirt-multicolor",
    "isAffiliate": false,
    "priceCents": 149900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Navy Blue Solid Tassel Pure Cotton Pleated Top with Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/FS31396-921383_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/navy-blue-solid-tassel-tassels-pompoms-cotton-pleated-top-with-skirt-set-fs31396-921383",
    "isAffiliate": false,
    "priceCents": 599900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "The Phoenix Hour Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20241229_0002_aaaad856-c6b1-479b-90ec-4bad8a7819c3.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/the-phoenix-hour-skirt-set",
    "isAffiliate": false,
    "priceCents": 1189900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "sweetheart",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Navy Printed Cotton Top & Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/3016-Navy-1.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/navy-printed-cotton-top-skirt-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Hidden Within Swing Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba04629.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/hidden-within-swing-skirt-set",
    "isAffiliate": false,
    "priceCents": 1680000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "iTokri",
    "title": "Brown - Pochampally Ikat 24 Kali Cotton Long Skirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/0Q8A0804_4e26b462-083a-4704-875e-18d14096edc5.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/pochampally-ikat-24-kali-cotton-long-skirt-01-2026-290-1-1",
    "isAffiliate": false,
    "priceCents": 489000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Kalki Fashion",
    "title": "Turquoise Blue Printed Drape Skirt Set with Embroidered Corset Blouse",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/turquoise-blue-printed-drape-skirt-set-with-embroidered-corset-blouse-sg417070-1_9d651575-3164-4ecd-af23-f8b1187a7421.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/turquoise-blue-printed-drape-skirt-set-with-embroidered-corset-blouse",
    "isAffiliate": false,
    "priceCents": 56900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Inky Allure skirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KKSpring2017_9e5b0642-11ae-47cf-833c-bc12e783013d.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/inky-allure-skirt",
    "isAffiliate": false,
    "priceCents": 800000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Reyat Skirt- Blue & White Stripes",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI051300_10.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/reyat-skirt-blue-striped?variant=43944829714566",
    "isAffiliate": false,
    "priceCents": 625000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Chic Commute Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/Look_ccbc7967-fff3-430d-b0e0-a006f8f787f9.png?width=800",
    "productUrl": "https://www.saltattire.com/products/chic-commute",
    "isAffiliate": false,
    "priceCents": 393000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Purple Pleated Maxi Skirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-360-09_1_923c38d6-5783-47c8-b9c3-cd5dd729b225.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/purple-pleated-maxi-skirt",
    "isAffiliate": false,
    "priceCents": 99900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "casual",
      "weekend",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Pink Block Printed Top with Yellow Block Printed Skirt",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/DSC03146.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/pink-block-printed-top-with-yellow-block-printed-stock",
    "isAffiliate": false,
    "priceCents": 499500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Ajoobaa Crochet \"Candy Pop\" Skirt - Multicolor",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/VSKRT16_2.webp?width=800",
    "productUrl": "https://okhai.org/products/ajoobaa-crochet-candy-pop-skirt-multicolor",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "skirts",
    "occasionTags": [
      "weekend",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "geometric",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Sootisyahi -Garden Medley-Hand-Block-Printed-Co-Ord-Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/SSKR011Z_GardenMedley_HandblockPrintedCottonCo-OrdSet_1_hero.webp?width=800",
    "productUrl": "https://okhai.org/products/sootisyahi-garden-medley-hand-block-printed-co-ord-set",
    "isAffiliate": false,
    "priceCents": 279900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Aamras Jalebi Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/AamrasJalebi-11.jpg?width=800",
    "productUrl": "https://suta.in/products/aamras-jalebi-yellow-viscose-kurta-pant-set",
    "isAffiliate": false,
    "priceCents": 568600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Yellow Floral Printed Straight Kurta with Pants Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS14453-127844_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/yellow-floral-printed-straight-kurta-with-pants-co-ord-set-ws14453-127844",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Ceru Blue Solid Cotton Coord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/IMG_9795_b30e2b35-9f1a-4b10-8754-c2e7a587342f.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/ceru-blue-solid-cotton-coord-set",
    "isAffiliate": false,
    "priceCents": 101900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Desert Reed Midi Dress",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/4070Abeigestripe_base_1777371144450.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/black-with-stripes-emblashed-copy-2",
    "isAffiliate": false,
    "priceCents": 129900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
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
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Bunai Flair Affair co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/IMG_6637.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/bunai-flair-affair-co-ord-set",
    "isAffiliate": false,
    "priceCents": 255000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Marine Embellished Organza Silk Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/co_ord_sets_jpg.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/sky-blue-embellished-organza-silk-co-ord-set?variant=44909194739850",
    "isAffiliate": false,
    "priceCents": 707700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "House of Masaba",
    "title": "Black Midnight Snack Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba201238.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/black-midnight-snack-skirt-set",
    "isAffiliate": false,
    "priceCents": 2400000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "silver"
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Women's Rust Embroidered Co-Ord Set | Premium Cotton Flex Kurta & Pants Ethnic Wear",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/MD110RUST_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/womens-rust-embroidered-co-ord-set-premium-cotton-flex-kurta-pants-ethnic-wear-md110rust?variant=48838539018425",
    "isAffiliate": false,
    "priceCents": 233600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend",
      "work"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Women's Purple Silk Blend Yoke Embroidered Straight Co-Ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26KB05649.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-purple-silk-blend-yoke-embroidered-straight-co-ord-set-jab26kb05649?variant=49295261794474",
    "isAffiliate": false,
    "priceCents": 154900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Hyacinth co-ord set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/DSC_1004banner.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/hyacinth-co-ord-set",
    "isAffiliate": false,
    "priceCents": 1590000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Fuchsia Printed Cotton Blend Relaxed Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/4_5b532d4b-3b12-412a-853b-53084df157a2.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/fuchsia-printed-cotton-blend-relaxed-co-ord-set?variant=48360639267060",
    "isAffiliate": false,
    "priceCents": 399500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Libas",
    "title": "Rust Red Floral Embroidered Silk Blend Co-Ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Rust-Red-Floral-Embroidered-Silk-Blend-Co-Ord-Set-56740_fe1fe7df-c3be-4069-b694-e45bdcd31c60.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-rust-red-floral-embroidered-silk-blend-co-ord-set-56740",
    "isAffiliate": false,
    "priceCents": 182900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Coordinated Chic Kaftan Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/5_bb8ca240-6fb9-49a1-8738-0f3c0fcfa342.png?width=800",
    "productUrl": "https://www.mulmul.com/products/coordinated-chic-floral-pink-kaftan-set-for-women-online",
    "isAffiliate": false,
    "priceCents": 380000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "light_summer"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Demi Neck Chain Satin Co-Ord-Beige",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3COO-05-4224-1.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/demi-neck-chain-satin-co-ord-beige-color",
    "isAffiliate": false,
    "priceCents": 517700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "light_spring"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "Purple Crop Top & Flared Skirt Co-Ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-360-07_1_7a728da0-2b6c-486c-915b-1c04bb8669de.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/purple-crop-top-flared-skirt-co-ord-set",
    "isAffiliate": false,
    "priceCents": 129900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Sootisyahi -Coral Cascade-Hand-Block-Printed-Co-Ord-Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/SSKR008Z_CoralCascade_HandblockPrintedCottonCo-OrdSet_1_hero.webp?width=800",
    "productUrl": "https://okhai.org/products/sootisyahi-coral-cascade-hand-block-printed-co-ord-set",
    "isAffiliate": false,
    "priceCents": 279900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Gulabi Jalebi Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/GulabiJalebi-08.jpg?width=800",
    "productUrl": "https://suta.in/products/gulabi-jalebi-pink-viscose-kurta-pant-set",
    "isAffiliate": false,
    "priceCents": 474600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "geometric",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Off White Floral Printed Straight Kurta with Pants Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WS14715-128384_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/off-white-floral-printed-straight-kurta-with-pants-co-ord-set-ws14715-128384",
    "isAffiliate": false,
    "priceCents": 359900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Pink Frost Hand Embroidered Silk Coord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/2W4A0778.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/pink-frost-hand-embroidered-silk-coord-set",
    "isAffiliate": false,
    "priceCents": 213900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "off_shoulder",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "The Sage Checkmate Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/3982A_1776866871042_1__1777369344071.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/the-shadow-checkmate-kurta-set-copy",
    "isAffiliate": false,
    "priceCents": 349900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Cotton Harmony Coord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/daytoday-3095.jpg?width=800",
    "productUrl": "https://www.bunaai.com/products/cotton-harmony-coord-set-1",
    "isAffiliate": false,
    "priceCents": 249900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Beige Banarasi Silk Three-Piece Co-Ord Set with Organza Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CB-STH-731_3_-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/beige-banarasi-silk-three-piece-co-ord-set-with-organza-jacket?variant=49253967626378",
    "isAffiliate": false,
    "priceCents": 1612800,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Midnight Stag Skirt Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba201006_edited_fe4d06d8-e4e3-44cd-aeea-0d758c3e50a4.png?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/midnight-stag-skirt-set",
    "isAffiliate": false,
    "priceCents": 2000000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Jaipur Kurti",
    "title": "Women's Olive Green Embroidered Kurta Palazzo Set with Dupatta | Festive Ethnic Co-ord Suit",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0753/3228/8697/files/VHK511MHD_281_29.jpg?width=800",
    "productUrl": "https://www.jaipurkurti.com/products/womens-olive-green-embroidered-kurta-palazzo-set-with-dupatta-festive-ethnic-co-ord-suit-vhk511mhd?variant=48838367183033",
    "isAffiliate": false,
    "priceCents": 267000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Janasya",
    "title": "Women's Rust Silk Blend Zari Embroidered Straight Kurta Co-Ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26KB05715.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-rust-silk-blend-zari-embroidered-straight-kurta-co-ord-set-jab26kb05715?variant=67613066068138",
    "isAffiliate": false,
    "priceCents": 139900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Verdure Co ord set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK3990.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/verdure-co-ord-set",
    "isAffiliate": false,
    "priceCents": 1540000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Maroon Embroidered Co-ord Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Look_Shot_0eb857c2.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/maroon-embroidered-co-ord-set?variant=48224572309748",
    "isAffiliate": false,
    "priceCents": 160600,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "silver"
  },
  {
    "brand": "Okhai",
    "title": "Panache' Pure Cotton Ikat Hand Embroidered Bomber Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LJ26140344_1_Hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-panache-pure-cotton-ikat-hand-embroidered-bomber-jacket",
    "isAffiliate": false,
    "priceCents": 480000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Hazari Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/DSC02843.jpg?width=800",
    "productUrl": "https://suta.in/products/hazari",
    "isAffiliate": false,
    "priceCents": 1080000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Blue Floral Printed Pure Cotton Straight Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/24NOW40166-123949_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/blue-floral-printed-pure-cotton-straight-jacket-w40166-123949",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection",
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
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Liloura Purple Velvet Suzani Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_df4974e6-64e7-415d-867e-7e822ba6c8e5.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/liloura-purple-velvet-suzani-jacket",
    "isAffiliate": false,
    "priceCents": 589900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Ambraee",
    "title": "Camel Caravan Off-white Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/Project_20250508_0008_e5bfeb3f-bcd6-4582-a8f4-58360aa243a4.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/camel-caravan-off-white-jacket",
    "isAffiliate": false,
    "priceCents": 199900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
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
    "priceTier": "entry",
    "neckline": "v",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Bunaai",
    "title": "Kiera Black Inner & Jacket Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0105/8881/5418/files/3023.webp?width=800",
    "productUrl": "https://www.bunaai.com/products/kiera-black-inner-jacket-set",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Metallic Brown Tissue Silk Longline Open-Front Jacket with Shawl Collar",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CB-STH-730_2_-LOW-Chinayabanaras_jpg.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/metallic-brown-tissue-silk-longline-open-front-jacket-with-shawl-collar",
    "isAffiliate": false,
    "priceCents": 1763300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "House of Masaba",
    "title": "Beige Trellis Palm Waistcoat Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0525/1842/0657/files/Masaba04490.jpg?width=800",
    "productUrl": "https://www.houseofmasaba.com/products/beige-trellis-palm-waistcoat-set",
    "isAffiliate": false,
    "priceCents": 1540000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Janasya",
    "title": "Dark Green Georgette Embroidered Anarkali Dress With Cape",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB24DR00747-INJ.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/dark-green-georgette-embroidered-anarkali-dress-with-cape-jab24dr00747?variant=46199433167018",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Rust Pink Brocade Bustier And Draped Skirt Set With Waistcoat",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/rust-pink-brocade-bustier-and-draped-skirt-set-with-waistcoat-sg401744-1_a12b90f1-199c-4ba9-a803-7f30c32683af.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/rust-pink-brocade-bustier-and-draped-skirt-set-with-waistcoat",
    "isAffiliate": false,
    "priceCents": 49900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "soft_summer"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "sweetheart",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Sunstone Bomber Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/KK2553.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/sunstone-bomber-jacket",
    "isAffiliate": false,
    "priceCents": 1100000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
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
    "priceTier": "premium",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Lakshita",
    "title": "Bella Maroon Monochrome Suede Long Coat for Women",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/UntitledCapture7573.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/bella-purple-monochrome-suede-long-coat-for-women?variant=48111281602804",
    "isAffiliate": false,
    "priceCents": 529500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Mulmul",
    "title": "Black Top Skirt & Cape",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/files/5_1.png?width=800",
    "productUrl": "https://www.mulmul.com/products/black-top-skirt-cape",
    "isAffiliate": false,
    "priceCents": 450000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "co_ords",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "square",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Ecuador Rolled-Up Sleeves Blazer-Black",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3BLA-05-1282-1.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/ecuador-rolled-up-sleeves-blazer-black-color",
    "isAffiliate": false,
    "priceCents": 490500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "Teal Kashmiri Aari Embroidered Woollen Long Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-MK-351-01_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/teal-kashmiri-aari-embroidered-woollen-long-jacket-mk351-01",
    "isAffiliate": false,
    "priceCents": 479900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "full_midsection"
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
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Red Raw Silk Blouse In Illusion Jacket Style, Hand Embroidered Zardozi Work",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/BAN003B-1_487c7cab-646d-4e40-ae0e-a746361de129.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/red-raw-silk-blouse-in-illusion-jacket-style-hand-embroidered-zardozi-work",
    "isAffiliate": false,
    "priceCents": 2599500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "tops",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "\"Lothal\" Cotton Ajrakh Bomber Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/LJ26441490_1_Hero.webp?width=800",
    "productUrl": "https://okhai.org/products/okhai-lothal-cotton-ajrakh-bomber-jacket",
    "isAffiliate": false,
    "priceCents": 450000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
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
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "The Chhaya Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/ChayaaJacket-1.jpg?width=800",
    "productUrl": "https://suta.in/products/sunehri-chhaya",
    "isAffiliate": false,
    "priceCents": 738000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "W for Woman",
    "title": "Black Embroidered Kota Sleeveless A-line Dress with Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/W13951-225526_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/black-embroidered-kota-sleeveless-a-line-dress-with-jacket-w13951-225526",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Crimselle Red Velvet Suzani Jacket",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_f19208ce-8ab0-472f-900b-9a26d6e4b937.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/crimselle-red-velvet-suzani-jacket",
    "isAffiliate": false,
    "priceCents": 589900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "rectangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "outerwear",
    "occasionTags": [
      "occasion",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "mandarin",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "The ICH Soft Lehariya Kota Doria Cotton Dupatta - Teal Breeze",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/BMKCDC2.webp?width=800",
    "productUrl": "https://okhai.org/products/the-ich-soft-lehariya-kota-doria-cotton-dupatta-teal-breeze",
    "isAffiliate": false,
    "priceCents": 231000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "bright_spring"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Misty Starling Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/MistyStarling-3_9f66e742-8f54-4893-8dad-be03852bf5b8.jpg?width=800",
    "productUrl": "https://suta.in/products/misty-starling-dupatta",
    "isAffiliate": false,
    "priceCents": 100000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_summer",
      "soft_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "W for Woman",
    "title": "Champagne Yarn Dyed Solid Zari Tissue Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0776/0419/2550/files/WD14522-225687_1.jpg?width=800",
    "productUrl": "https://wforwoman.com/products/champagne-yarn-dyed-solid-zari-tissue-dupatta-wd14522-225687",
    "isAffiliate": false,
    "priceCents": 100000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Surkh Purple Solid Velvet Shawl",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_3daaf99d-782f-4dc6-9515-584d81e2bc2c.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/surkh-purple-solid-velvet-shawl",
    "isAffiliate": false,
    "priceCents": 299900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Ambraee",
    "title": "Brocade Kurta & Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/4337ASHOT1.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/brocade-kurta-dupatta",
    "isAffiliate": false,
    "priceCents": 259900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Chinaya Banaras",
    "title": "Premium Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0585/8154/9194/files/CDP-477-LOW-Chinayabanaras.jpg?width=800",
    "productUrl": "https://www.chinayabanaras.com/products/premium",
    "isAffiliate": false,
    "priceCents": 1100000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Brown - Zari Work Banarasi Silk Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/brown-zari-work-banarasi-silk-dupatta-05-dupattas-288.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/zari-work-banarasi-silk-dupatta-05-2025-1453-1-5",
    "isAffiliate": false,
    "priceCents": 89000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Neel Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/products/KKF01771_86853f06-2340-42ea-a90b-c4cb4f8cdc6d.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/neel-dupatta",
    "isAffiliate": false,
    "priceCents": 530000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Olive Green Floral Knitted Acrylic Wrap Shawl",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/Libas-Olive-Green-Floral-Knitted-Acrylic-Wrap-Shawl-ST389_9ca7a8df-fc8f-4587-b665-4c23201b17f3.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-olive-green-floral-knitted-acrylic-wrap-shawl-st389",
    "isAffiliate": false,
    "priceCents": 233900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Mulmul",
    "title": "Sea Pink Tie Dyed & Block Printed Paneled Kurta-Plazzo & Dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0534/3107/4968/products/4664-PINK_1.jpg?width=800",
    "productUrl": "https://www.mulmul.com/products/sea-pink-tie-dyed-block-printed-paneled-kurta-plazzo-dupatta?variant=43538850840811",
    "isAffiliate": false,
    "priceCents": 545000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "round",
    "pattern": "floral",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Salt Attire",
    "title": "Stalwart Shawl Collared Dress - Maroon",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3DRE-03-3220-2_14cec67f-0f33-47a7-aa40-15b716b6e08f.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/stalwart-shawl-collared-dress-maroon",
    "isAffiliate": false,
    "priceCents": 297500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "deep_autumn"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": "collar",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Tanvi hand embriodered kantha silk dupatta",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-VND-41-21_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/tanvi-hand-embriodered-kantha-silk-dupatta-2025",
    "isAffiliate": false,
    "priceCents": 116900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "WeaverStory",
    "title": "Light Brown Zari Handwoven Double Shade Pure Pashmina Stole",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MABSTL1208_1_1a285ab6-c1ce-4697-9ee9-9ac3a7cc910a.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/light-brown-zari-handwoven-double-shade-pure-pashmina-stole",
    "isAffiliate": false,
    "priceCents": 2799500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "soft_autumn"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "work",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "The ICH Soft Lehariya Kota Doria Cotton Dupatta - Scarlet Red",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/BMKCDE3.webp?width=800",
    "productUrl": "https://okhai.org/products/the-ich-soft-lehariya-kota-doria-cotton-dupatta-scarlet-red",
    "isAffiliate": false,
    "priceCents": 231000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "dupattas",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "geometric",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Mridah Yellow And Black 'Taal' Handmade Black Terracotta Choker Necklace Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/92.png?width=800",
    "productUrl": "https://okhai.org/products/mridah-yellow-and-black-taal-handmade-black-terracotta-choker-necklace-set",
    "isAffiliate": false,
    "priceCents": 79900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Amra (Handcrafted Dhokra Brass Neckpiece)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/Amra-2.jpg?width=800",
    "productUrl": "https://suta.in/products/amra-handcrafted-dhokra-brass-neckpiece",
    "isAffiliate": false,
    "priceCents": 782100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Winterberry Handcrafted Necklace",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/products/3_e4335731-0e8d-40f4-80c1-ea8b34544ad4.png?width=800",
    "productUrl": "https://www.aachho.com/products/winterberry-handcrafted-antique-necklace",
    "isAffiliate": false,
    "priceCents": 135900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Ambraee",
    "title": "Candy Cuff Kurta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0797/2284/0358/files/variation_3964a_white__1776511321661___standing_confidently_with_one_hand_on_hi_1777033886400.jpg?width=800",
    "productUrl": "https://www.ambraee.com/products/berry-stripe-kurta-set-copy-1",
    "isAffiliate": false,
    "priceCents": 399900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "light_spring",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": "v",
    "pattern": "plain",
    "drape": "crisp",
    "metal": null
  },
  {
    "brand": "Chumbak",
    "title": "Fantastical Elephant Printed Wrist Watch With Bracelet Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0601/1093/0098/files/1_c5925ce5-8fe2-4b98-8795-819645710c0c.jpg?width=800",
    "productUrl": "https://www.chumbak.com/products/fantastical-elephant-printed-strap-watch-and-bracelet-set",
    "isAffiliate": false,
    "priceCents": 161100,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Blue - Handmade Fabart Beads Gs Necklace with Earrings Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/3E9A5344_ca110da7-3d83-4ea2-bd66-550651421da2.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/handmade-fabart-beads-gs-necklace-with-earrings-set-43-2026-870-1-43",
    "isAffiliate": false,
    "priceCents": 79000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Janasya",
    "title": "Women's Dark Blue Georgette Sequin Embellished Straight Kurta with Sharara & Choker Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26ST05555.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-dark-blue-georgette-sequin-embellished-straight-kurta-with-sharara-choker-dupatta-set-jab26st05555?variant=49148242559146",
    "isAffiliate": false,
    "priceCents": 214900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "scoop",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Red Stone Kundan Polki Choker Necklace Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/red-stone-kundan-polki-choker-necklace-set-sg434723-1_4e75b308-657e-418f-add9-628f1b128e37.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/red-stone-kundan-polki-choker-necklace-set",
    "isAffiliate": false,
    "priceCents": 47000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Rumi earring",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/products/Kharakapas0035.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/kj35",
    "isAffiliate": false,
    "priceCents": 370000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Lakshita",
    "title": "Lyra CZ Heart Bracelet",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_0952c2d2-793f-4d80-9309-0a1a65fa42cd.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/lyra-cz-heart-bracelet",
    "isAffiliate": false,
    "priceCents": 89500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Golden Crescent Kundan and Pearl Hoop Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/JRY028_4.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-gold-tone-earrings-with-pearl-drops-jry0028",
    "isAffiliate": false,
    "priceCents": 44900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Nicobar",
    "title": "Ahiliya Danglers",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI052527_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/ahiliya-danglers-gold",
    "isAffiliate": false,
    "priceCents": 550000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Salt Attire",
    "title": "Forest-Dark Purple Tie-up Cuff Dress - Dark Purple",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0859/4217/3988/files/1-3DRE-00-0599-6_9912bf1d-b11f-4545-8f59-1ad81c26a0d2.jpg?width=800",
    "productUrl": "https://www.saltattire.com/products/forest-dark-purple-tie-up-cuff-dress-dark-purple-color",
    "isAffiliate": false,
    "priceCents": 228000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "triangle",
      "full_midsection"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "dresses",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": "boat",
    "pattern": "plain",
    "drape": "fluid",
    "metal": null
  },
  {
    "brand": "Sangeeta Boochra",
    "title": "Eternal Elegance Handcrafted Silver Bangle by Sangeeta Boochra",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0619/5855/3762/files/SBB-2289--_1.jpg?width=800",
    "productUrl": "https://www.sangeetaboochra.com/products/eternal-elegance-handcrafted-silver-bangle-by-sangeeta-boochra",
    "isAffiliate": false,
    "priceCents": 2910000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "cool_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Double Flower Afghan German Silver Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/252410-2018-02-06-16_57_43.278764-big-image_0443fc4c-7a4e-4a0e-bce8-dc8beff2e813.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/double-flower-afghan-german-silver-earrings",
    "isAffiliate": false,
    "priceCents": 72400,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "WeaverStory",
    "title": "Artisanal Zari & Bead Embroidered Statement Maang Tikka",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/MP01-3.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/artisanal-zari-bead-embroidered-statement-maang-tikka",
    "isAffiliate": false,
    "priceCents": 319500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Mridah 'Raas' Handmade Mirror Work Terracotta Necklace Set Without Maangtika",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/MR-CH-NKST-00008-RDBK_2.png?width=800",
    "productUrl": "https://okhai.org/products/mridah-raas-handmade-mirror-work-terracotta-necklace-set",
    "isAffiliate": false,
    "priceCents": 329900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "deep_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Samira Jewellery",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/Samira-1.jpg?width=800",
    "productUrl": "https://suta.in/products/samira",
    "isAffiliate": false,
    "priceCents": 236700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Prussian Blue Handcrafted Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/products/prussian-blue1_f817cdad-2c35-4c1a-8c8a-c6060fa7deb1.png?width=800",
    "productUrl": "https://www.aachho.com/products/prussian-blue-handcrafted-brass-earrings",
    "isAffiliate": false,
    "priceCents": 156900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Pink - Handmade Fabart Beads Gs Pendant Necklace with Earrings Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/3E9A5265_051e88a3-ea44-46f9-9821-e44a422a5598.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/handmade-fabart-beads-gs-pendant-necklace-with-earrings-set-17-2026-870-1-17",
    "isAffiliate": false,
    "priceCents": 79000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "cool_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Janasya",
    "title": "Women's Sea Green Tissue Silk Floral Zari Embroidered A-Line Top with Palazzo And Choker Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26TS05688.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-sea-green-tissue-silk-floral-zari-embroidered-a-line-top-with-palazzo-and-choker-dupatta-set-jab26ts05688?variant=67551826575530",
    "isAffiliate": false,
    "priceCents": 219900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "light_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "plain",
    "drape": "crisp",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Mint Green And Pink Kundan Polki Choker Necklace Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/mint-green-and-pink-kundan-polki-choker-necklace-set-sg434720-1_dd3b7d16-6cd5-4aed-ad86-f8abba2db078.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/mint-green-and-pink-kundan-polki-choker-necklace-set",
    "isAffiliate": false,
    "priceCents": 47000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Oro Chimes Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/Untitleddesign_12.png?width=800",
    "productUrl": "https://www.kharakapas.com/products/oro-chimes-earrings",
    "isAffiliate": false,
    "priceCents": 450000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Lakshita",
    "title": "Inaya Pearl Hoop Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0586/9207/5703/files/1_950e9daf-020d-45a2-91db-e68de26898e0.jpg?width=800",
    "productUrl": "https://www.lakshita.com/products/inaya-pearl-hoop-earrings",
    "isAffiliate": false,
    "priceCents": 79500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Libas",
    "title": "Sapphire Blue and Gold Kundan Chandelier Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/JRY032_3.jpg?width=800",
    "productUrl": "https://www.libas.in/products/libas-silver-tone-earrings-with-blue-pearl-drop-jry0032",
    "isAffiliate": false,
    "priceCents": 74900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Nicobar",
    "title": "Gulbahar Earrings - Gold",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI053612_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/gulbahar-earrings-gold",
    "isAffiliate": false,
    "priceCents": 825000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Sangeeta Boochra",
    "title": "Silver Handmade Earrings Adorned with Hydro Gems",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0619/5855/3762/files/10_1.jpg?width=800",
    "productUrl": "https://www.sangeetaboochra.com/products/silver-handmade-earrings-adorned-with-hydro-gems",
    "isAffiliate": false,
    "priceCents": 1464700,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Stylish Fashionable Gold Plated Raisin Cream/Purple Stone Circled/Triangle Shaped Export Quality Earring",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/SG-CM-154-34_1_30dde5cf-769c-42a4-96f5-406569c8598e.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/stylish-fashionable-gold-plated-raisin-cream-purple-stone-circled-triangle-shaped-export-quality-earring-cmsg154",
    "isAffiliate": false,
    "priceCents": 83900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "WeaverStory",
    "title": "Aliah Handcrafted Bangle With Pearls",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/products/WSANJB1943-1.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/aliah-handcrafted-bangle-with-pearls",
    "isAffiliate": false,
    "priceCents": 1599500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Melo Studio Dilbara Pink-Red Hand Beaded Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/DilbaraearringsOKHAI2.webp?width=800",
    "productUrl": "https://okhai.org/products/melo-studio-dilbara-pink-red-hand-beaded-earrings",
    "isAffiliate": false,
    "priceCents": 175000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Ravika",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/Ravika-3.jpg?width=800",
    "productUrl": "https://suta.in/products/ravika",
    "isAffiliate": false,
    "priceCents": 470300,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Buttercream Handcrafted Earrings",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/products/22_c8e60e99-92f9-4844-aa9e-674da99274c5.png?width=800",
    "productUrl": "https://www.aachho.com/products/buttercream-handcrafted-antique-earrings",
    "isAffiliate": false,
    "priceCents": 108900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "iTokri",
    "title": "Multicolor - Handmade Fabart Beads Gs Pendant Necklace with Earrings Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/3E9A5238_bf47df12-c217-4fe5-98bd-2adb01093e41.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/handmade-fabart-beads-gs-pendant-necklace-with-earrings-set-08-2026-870-1-8",
    "isAffiliate": false,
    "priceCents": 79000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "warm_spring"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Janasya",
    "title": "Women's Pink Georgette Floral Beads Zari Embroidered Straight Kurta with Sharara and Choker Dupatta Set",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0607/1209/1818/files/JAB26SS05759.jpg?width=800",
    "productUrl": "https://www.janasya.com/products/janasya-womens-pink-georgette-floral-beads-zari-embroidered-straight-kurta-with-sharara-and-choker-dupatta-set-jab26ss05759?variant=67600190210218",
    "isAffiliate": false,
    "priceCents": 224900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "kurta_sets",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": "round",
    "pattern": "floral",
    "drape": "fluid",
    "metal": "gold"
  },
  {
    "brand": "Kalki Fashion",
    "title": "Off White Kundan Polki Collar Necklace Set With Maang Tikka",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0676/3413/5121/files/off-white-kundan-polki-collar-necklace-set-with-maang-tikka-sg434728-1_f9a78520-76db-4fcb-81de-1013b922cf59.jpg?width=800",
    "productUrl": "https://www.kalkifashion.com/products/off-white-kundan-polki-collar-necklace-set-with-maang-tikka",
    "isAffiliate": false,
    "priceCents": 47000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Cascade of Light Necklace",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/bagsweb_8_4f8be632-27a8-4788-92ab-2395c1cbb793.png?width=800",
    "productUrl": "https://www.kharakapas.com/products/layered-necklace",
    "isAffiliate": false,
    "priceCents": 500000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "warm_autumn"
    ],
    "garmentCategory": "jewellery",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Suta",
    "title": "GoldWide Stride Shoes",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/GoldWideStrideSize5_2.jpg?width=800",
    "productUrl": "https://suta.in/products/goldwide-stride",
    "isAffiliate": false,
    "priceCents": 280500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Jalsa Olive Green Kolha Flats",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_e549222b-1a02-4f13-84d0-7d5f3621af6a.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/jalsa-olive-green-kolha-flats",
    "isAffiliate": false,
    "priceCents": 58900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Khara Kapas",
    "title": "Dark Brown Slip Ons Shoes",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/products/grey_slip_on_04.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/brown-flat-slide-sandals",
    "isAffiliate": false,
    "priceCents": 371000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "work"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Tjori",
    "title": "Creamy White Cruelty Free Leather Inspired Kolhapuri",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-KC-114-16_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/creamy-white-cruelty-free-leather-inspired-kolhapuri",
    "isAffiliate": false,
    "priceCents": 101900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_spring",
      "soft_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "occasion"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Sunehri Golden Flower Heels",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_065b17cf-54c9-42ed-be9c-1a80392ee763.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/sunehri-golden-flower-heels",
    "isAffiliate": false,
    "priceCents": 163900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Tjori",
    "title": "Dark Brown Cruelty Free Leather Kolhapuri",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/TJ-KC-114-07_1.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/dark-brown-cruelty-free-leather-kolhapuri",
    "isAffiliate": false,
    "priceCents": 101900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Suta",
    "title": "Urban Shine Shoes",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/DSC01855_Suta.jpg?width=800",
    "productUrl": "https://suta.in/products/urban-shine",
    "isAffiliate": false,
    "priceCents": 280500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "soft_summer"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Crown Black Kolha Flats",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_3cd03f1c-375b-40f5-b9ed-75da79923379.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/crown-black-kolha-flats",
    "isAffiliate": false,
    "priceCents": 69900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "bright_winter"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Cherry Red Jutti with Multicolor German Silver Accents",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/SG-KC-137-08_1_4c77e845-06ca-4945-bd34-27ce75df3d60.jpg?width=800",
    "productUrl": "https://www.tjori.com/products/cherry-red-jutti-with-multicolor-german-silver-accents-kc173-8",
    "isAffiliate": false,
    "priceCents": 111900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "occasion",
      "casual"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Suta",
    "title": "Subtle Jute Shoes",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/Subtlejute-4.jpg?width=800",
    "productUrl": "https://suta.in/products/subtle-jute",
    "isAffiliate": false,
    "priceCents": 280500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Jungle Mist Kolha Flats",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_1dc9b734-55b6-4b39-a1be-36ce3f086fff.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/jungle-mist-kolha-flats",
    "isAffiliate": false,
    "priceCents": 68900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "light_summer",
      "cool_summer"
    ],
    "garmentCategory": "shoes",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Okhai",
    "title": "Samoolam Boho Bag Charm ~ Green Bird",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/KEY010-C_2.webp?width=800",
    "productUrl": "https://okhai.org/products/samoolam-boho-bag-charm-green-bird",
    "isAffiliate": false,
    "priceCents": 95000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "bright_spring"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Suta",
    "title": "The Wandering Garden",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/TheWanderingGarden-4.jpg?width=800",
    "productUrl": "https://suta.in/products/the-wandering-garden",
    "isAffiliate": false,
    "priceCents": 501000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "bright_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Aachho",
    "title": "Sunflower Trails Yellow Tote Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_484d5467-5441-4f95-b3d6-9ff72ba2ecd0.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/sunflower-trails-yellow-tote-bag",
    "isAffiliate": false,
    "priceCents": 233900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_spring",
      "light_spring"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": "floral",
    "drape": null,
    "metal": null
  },
  {
    "brand": "Chumbak",
    "title": "Teal By Chumbak Round Sling Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0601/1093/0098/files/8907605148828_1.jpg?width=800",
    "productUrl": "https://www.chumbak.com/products/teal-by-chumbak-round-sling-bag",
    "isAffiliate": false,
    "priceCents": 89900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_summer",
      "deep_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "iTokri",
    "title": "Purple - Assam Bihu Folk Dance Canvas Tote Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0155/8131/files/632A6887_14a317bd-0425-4568-8ed2-6bb21b689d76.jpg?width=800",
    "productUrl": "https://www.itokri.com/products/assam-bihu-folk-dance-canvas-tote-bag-10-2026-869-1-10",
    "isAffiliate": false,
    "priceCents": 159000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "cool_winter",
      "deep_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Khara Kapas",
    "title": "Fawn briefcase Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0625/1797/files/DSC_9595kk_acd3fd09-1980-490c-9277-ccf6bd8f64b4.jpg?width=800",
    "productUrl": "https://www.kharakapas.com/products/bag-10",
    "isAffiliate": false,
    "priceCents": 900000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "soft_autumn",
      "warm_autumn"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "work",
      "casual"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": null
  },
  {
    "brand": "Nicobar",
    "title": "Pleated Muse Clutch - Red & White",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5129/4854/files/NBI051688_1.jpg?width=800",
    "productUrl": "https://www.nicobar.com/products/pleated-muse-clutch-red-white",
    "isAffiliate": false,
    "priceCents": 600000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_winter",
      "bright_spring"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "silver"
  },
  {
    "brand": "Tjori",
    "title": "Yellow Brocade Box Clutch with Sling (6.5 X 2 X 6)",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0613/2039/7022/files/246928-big-image_97cbea16-0fe9-4552-bcfd-1ed52f88672e.png?width=800",
    "productUrl": "https://www.tjori.com/products/yellow-brocade-box-clutch-65-x-2-x-6",
    "isAffiliate": false,
    "priceCents": 136900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "warm_spring"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "WeaverStory",
    "title": "The Charcoal Shimmer Mobile Sling Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/1027/2035/files/0A1A0107.jpg?width=800",
    "productUrl": "https://www.weaverstory.com/products/the-charcoal-shimmer-mobile-sling-bag",
    "isAffiliate": false,
    "priceCents": 299500,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_winter",
      "cool_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "occasion",
      "evening"
    ],
    "priceTier": "mid",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Okhai",
    "title": "Samoolam Boho Bag Charm ~ Red Flower Bunch",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2116/1923/files/KEY012-A_13.webp?width=800",
    "productUrl": "https://okhai.org/products/samoolam-boho-bag-charm-red-flower-bunch",
    "isAffiliate": false,
    "priceCents": 95000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "bright_spring",
      "bright_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Suta",
    "title": "Mustard Muse Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/0026/6544/7536/files/MustardMuse-3.jpg?width=800",
    "productUrl": "https://suta.in/products/mustard-muse",
    "isAffiliate": false,
    "priceCents": 792000,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "warm_autumn",
      "deep_autumn"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "evening",
      "occasion"
    ],
    "priceTier": "premium",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  },
  {
    "brand": "Aachho",
    "title": "Rustic Blossom Maroon Fanny Bag",
    "description": null,
    "imageUrl": "https://cdn.shopify.com/s/files/1/2542/7564/files/1_e2dd9239-d743-4149-904d-596849b3b348.jpg?width=800",
    "productUrl": "https://www.aachho.com/products/rustic-blossom-maroon-fanny-bag",
    "isAffiliate": false,
    "priceCents": 158900,
    "currency": "INR",
    "status": "active",
    "eligibleShapes": [
      "hourglass",
      "triangle",
      "full_midsection",
      "rectangle",
      "inverted_triangle"
    ],
    "eligibleSeasons": [
      "deep_autumn",
      "deep_winter"
    ],
    "garmentCategory": "accessories",
    "occasionTags": [
      "casual",
      "weekend"
    ],
    "priceTier": "entry",
    "neckline": null,
    "pattern": null,
    "drape": null,
    "metal": "gold"
  }
];
