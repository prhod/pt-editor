CREATE TABLE IF NOT EXISTS data_sources (
    id int primary key generated always as identity,
    name text not null,
    osm_area_id text null
);
SELECT AddGeometryColumn ('public','data_sources','center',4326,'POINT',2);
SELECT AddGeometryColumn ('public','data_sources','area',4326,'MULTIPOLYGON');

CREATE TABLE IF NOT EXISTS networks (
    id int primary key generated always as identity,
    data_source_id int REFERENCES data_sources (id) not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS lines (
    id int primary key generated always as identity,
    data_source_id int REFERENCES data_sources (id) not null,
    network_id in REFERENCES networks (id) not null,
    code text null,
    name text null
);