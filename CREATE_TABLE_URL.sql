create table url( id serial not null constraint url_pk primary key,full_address varchar(100),short varchar(100),url varchar(100),created_in timestamp not null);

insert into url (id,full_address,short,url,created_in) values (1, 'http://google.com', 'x3d0as', 'http://localhost:8080/api', current_timestamp);

alter table url_shortener.url owner to laercio;

create unique index url_id_uindex on url_shortener.url (id);


GRANT CONNECT ON DATABASE url_shortener TO postgres;

GRANT USAGE ON SCHEMA public TO postgres;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

ALTER DATABASE url_shortener OWNER TO postgres;



