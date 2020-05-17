CREATE TABLE IF NOT EXISTS data_sources (
    id int primary key generated always as identity,
    name text not null,
    osm_area_id text null,
    center geometry (POINT, 4326),
    area geometry (MULTIPOLYGON, 4326)
);

CREATE TABLE IF NOT EXISTS networks (
    id int primary key generated always as identity,
    data_source_id int REFERENCES data_sources (id) not null,
    name text not null,
    osm_name text null
);

CREATE TABLE IF NOT EXISTS lines (
    id int primary key generated always as identity,
    data_source_id int REFERENCES data_sources (id) not null,
    network_id int REFERENCES networks (id) not null,
    code text null,
    name text null
);