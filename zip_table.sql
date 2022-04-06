CREATE TABLE zips (
    us_zip_code VARCHAR,
    type TEXT,
    primary_city TEXT,
    state TEXT,
    latitude VARCHAR,
    longitude VARCHAR,
    county TEXT,
    timezone TEXT,
    area_codes TEXT,
    country TEXT,
    estimated_population INT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);