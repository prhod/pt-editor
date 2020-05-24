INSERT INTO data_sources (name) values 
('toto');

INSERT INTO networks (data_source_id, name) values 
(currval(pg_get_serial_sequence('data_sources','id')), 'network 1');

INSERT INTO lines (data_source_id, network_id, code, name) values 
(
    currval(pg_get_serial_sequence('data_sources','id')), 
    currval(pg_get_serial_sequence('networks','id')), 
    '1', 
    'line 1'
);


INSERT INTO data_sources (name, bbox) values 
('Data set 2', '{{13.068776734359162, 35.15625}, {-13.068776734355879, -35.15624999999997}}');