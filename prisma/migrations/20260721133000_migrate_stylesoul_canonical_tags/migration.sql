-- Mechanically migrate stored StyleSoul tags to the canonical catalogue contract.
-- The array helpers expand old parent season families in-place, dedupe by first
-- occurrence, and keep unrelated/admin-provided values instead of filtering them.
CREATE OR REPLACE FUNCTION stylesoul_migrate_shape_tags(input_values TEXT[])
RETURNS TEXT[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    array_agg(mapped ORDER BY source_ordinal, family_ordinal),
    ARRAY[]::TEXT[]
  )
  FROM (
    SELECT DISTINCT ON (mapped)
      mapped,
      source_ordinal,
      family_ordinal
    FROM unnest(input_values) WITH ORDINALITY AS input(value, source_ordinal)
    CROSS JOIN LATERAL unnest(
      CASE input.value
        WHEN 'pear' THEN ARRAY['triangle']::TEXT[]
        WHEN 'apple' THEN ARRAY['full_midsection']::TEXT[]
        ELSE ARRAY[input.value]::TEXT[]
      END
    ) WITH ORDINALITY AS expanded(mapped, family_ordinal)
    ORDER BY mapped, source_ordinal, family_ordinal
  ) deduped;
$$;

CREATE OR REPLACE FUNCTION stylesoul_migrate_season_tags(input_values TEXT[])
RETURNS TEXT[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    array_agg(mapped ORDER BY source_ordinal, family_ordinal),
    ARRAY[]::TEXT[]
  )
  FROM (
    SELECT DISTINCT ON (mapped)
      mapped,
      source_ordinal,
      family_ordinal
    FROM unnest(input_values) WITH ORDINALITY AS input(value, source_ordinal)
    CROSS JOIN LATERAL unnest(
      CASE input.value
        WHEN 'warm_spring' THEN ARRAY['light_spring', 'warm_spring', 'bright_spring']::TEXT[]
        WHEN 'cool_summer' THEN ARRAY['light_summer', 'cool_summer', 'soft_summer']::TEXT[]
        WHEN 'warm_autumn' THEN ARRAY['soft_autumn', 'warm_autumn', 'deep_autumn']::TEXT[]
        WHEN 'cool_winter' THEN ARRAY['deep_winter', 'cool_winter', 'bright_winter']::TEXT[]
        ELSE ARRAY[input.value]::TEXT[]
      END
    ) WITH ORDINALITY AS expanded(mapped, family_ordinal)
    ORDER BY mapped, source_ordinal, family_ordinal
  ) deduped;
$$;

UPDATE "StyleProfile"
SET "bodyShape" = CASE "bodyShape"
  WHEN 'pear' THEN 'triangle'
  WHEN 'apple' THEN 'full_midsection'
  ELSE "bodyShape"
END
WHERE "bodyShape" IN ('pear', 'apple');

UPDATE "Product"
SET "eligibleShapes" = stylesoul_migrate_shape_tags("eligibleShapes")
WHERE "eligibleShapes" && ARRAY['pear', 'apple']::TEXT[];

UPDATE "Product"
SET "eligibleSeasons" = stylesoul_migrate_season_tags("eligibleSeasons")
WHERE "eligibleSeasons" && ARRAY['warm_spring', 'cool_summer', 'warm_autumn', 'cool_winter']::TEXT[];

DROP FUNCTION stylesoul_migrate_shape_tags(TEXT[]);
DROP FUNCTION stylesoul_migrate_season_tags(TEXT[]);
