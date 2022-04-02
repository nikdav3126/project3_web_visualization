CREATE TABLE zips (
    us_zip_code INT PRIMARY KEY,
    type TEXT,
    primary_city TEXT,
    state TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    county TEXT,
    timezone TEXT,
    area_codes TEXT,
    country TEXT,
    estimated_population INT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);