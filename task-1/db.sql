DROP TABLE IF EXISTS film_genre;
DROP TABLE IF EXISTS film_person_understudy;
DROP TABLE IF EXISTS film_person_actor;
DROP TABLE IF EXISTS audience;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS country;


CREATE TABLE country(
	country_id integer GENERATED ALWAYS AS IDENTITY,
    country_name text UNIQUE NOT NULL,
	
	CONSTRAINT pk_country PRIMARY KEY (country_id)
);

CREATE TABLE person(
	person_id bigint GENERATED ALWAYS AS IDENTITY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    birthday date,
    birth_country_id integer, 
	
	CONSTRAINT pk_person PRIMARY KEY (person_id),
	CONSTRAINT fk_person_country FOREIGN KEY (birth_country_id) REFERENCES country (country_id)
);

CREATE TABLE genre(
	genre_id bigint GENERATED ALWAYS AS IDENTITY,
    genre_name text UNIQUE NOT NULL,
	
	CONSTRAINT pk_genre PRIMARY KEY (genre_id)
);

CREATE TABLE film
(
    film_id bigint GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    release_year integer NOT NULL,
    country_id integer NOT NULL,
    slogan text,
	budget integer,
    marketing integer,
    box_office integer,
	world_premiere_date date NOT NULL,
    age_restriction integer NOT NULL,
    duration integer NOT NULL,
	
    director_id bigint,
    scenario_id bigint,
    producer_id bigint,
    operator_id bigint,
    composer_id bigint,
    artist_id bigint,
    montage_id bigint,
	
	CONSTRAINT pk_film PRIMARY KEY (film_id),
	CONSTRAINT fk_film_country FOREIGN KEY (country_id) REFERENCES country (country_id),
	CONSTRAINT fk_film_direktor_person FOREIGN KEY (director_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_scenario_person FOREIGN KEY (scenario_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_producer_person FOREIGN KEY (producer_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_operator_person FOREIGN KEY (operator_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_composer_person FOREIGN KEY (composer_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_artist_person FOREIGN KEY (artist_id) REFERENCES person (person_id),
	CONSTRAINT fk_film_montage_person FOREIGN KEY (montage_id) REFERENCES person (person_id)	
);

CREATE TABLE audience(
	audience_id bigint GENERATED ALWAYS AS IDENTITY,
	film_id bigint NOT NULL,
    premiere_date date NOT NULL,
	country_id integer NOT NULL,
	number_people integer,
	
	CONSTRAINT pk_audience PRIMARY KEY (audience_id),
	CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film (film_id),
	CONSTRAINT fk_audience_country FOREIGN KEY (country_id) REFERENCES country (country_id)
);

-- В главных ролях
CREATE TABLE film_person_actor(
	film_id bigint NOT NULL,
	actor_id bigint NOT NULL,
	
	CONSTRAINT pk_film_person_actor PRIMARY KEY (film_id, actor_id),
	CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film (film_id),
	CONSTRAINT fk_person_actor FOREIGN KEY (actor_id) REFERENCES person (person_id)
);

-- Роли дублировали
-- Вынесено в отдельную таблицу, тк нужно знать какого актёра они дублировали
CREATE TABLE film_person_understudy(
	film_id bigint NOT NULL,
	understudy_id bigint NOT NULL,
	actor_id bigint NOT NULL,
	
	CONSTRAINT pk_film_person_understudy PRIMARY KEY (film_id, understudy_id, actor_id),
	CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film (film_id),
	CONSTRAINT fk_person_understudy FOREIGN KEY (understudy_id) REFERENCES person (person_id),
	CONSTRAINT fk_person_actor FOREIGN KEY (actor_id) REFERENCES person (person_id)
);

CREATE TABLE film_genre(
	film_id bigint NOT NULL,
	genre_id bigint NOT NULL,
	
	CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id),
	CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film (film_id),
	CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
);