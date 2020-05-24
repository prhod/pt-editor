CREATE TABLE IF NOT EXISTS data_sources (
    id int primary key generated always as identity,
    name text not null,
    bbox float[2][2]
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


-- DB Vues to be used with Postgrest
CREATE OR REPLACE VIEW data_sources_detailed AS
    SELECT ds.id, ds.name, ds.bbox,
        count(n.id) as networks_count, 
        count(l.id) as lines_count
    FROM data_sources ds
        LEFT JOIN networks n on n.data_source_id = ds.id
        LEFT JOIN lines l on l.network_id = n.id
    GROUP BY ds.id, ds.name, ds.bbox;