-- Keep one complete exact-match edit available for every shape and subtype.
UPDATE "Product" AS product
SET "eligibleSeasons" = curated.seasons
FROM (
  VALUES
    ('https://www.marksandspencer.com/jersey-ruched-midaxi-drop-waist-dress/p/clp61225760?color=CHILLI', ARRAY['warm_spring', 'bright_spring', 'bright_winter']::TEXT[]),
    ('https://www.marksandspencer.com/printed-v-neck-midi-tea-dress/p/clp60786414?color=REDMIX', ARRAY['warm_spring', 'bright_spring', 'bright_winter']::TEXT[]),
    ('https://www.marksandspencer.com/pure-cotton-striped-oxford-shirt/p/clp61226209?color=BLUEMIX', ARRAY['light_summer', 'soft_summer']::TEXT[]),
    ('https://www.marksandspencer.com/pure-linen-relaxed-shirt/p/clp61228844', ARRAY['light_spring', 'bright_spring', 'cool_winter']::TEXT[]),
    ('https://www.marksandspencer.com/pure-linen-pleat-front-belted-tapered-trousers/p/clp60775832?color=NAVY', ARRAY['cool_summer', 'deep_winter', 'cool_winter']::TEXT[]),
    ('https://www.marksandspencer.com/linen-rich-elasticated-waist-tapered-trousers/p/clp60775590?color=NAVY', ARRAY['cool_summer', 'deep_winter', 'cool_winter']::TEXT[]),
    ('https://www.marksandspencer.com/pure-linen-wide-leg-trousers/p/clp60775826?color=NAVY', ARRAY['cool_summer', 'deep_winter', 'cool_winter']::TEXT[]),
    ('https://www.marksandspencer.com/ribbed-sweetheart-peplum-knitted-vest/p/clp60783577', ARRAY['warm_spring', 'bright_spring']::TEXT[]),
    ('https://www.marksandspencer.com/ruched-waist-midi-tiered-skirt/p/clp61220353', ARRAY['warm_spring', 'bright_spring']::TEXT[])
) AS curated(product_url, seasons)
WHERE product."catalogueSource" = 'curated-seed'
  AND product."productUrl" = curated.product_url;
