DROP TABLE IF EXISTS film_genre;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS genre;


CREATE TABLE film
(
	film_id integer GENERATED ALWAYS AS IDENTITY,
	title text NOT NULL,
	release_year integer NOT NULL,	
	
	CONSTRAINT pk_film PRIMARY KEY (film_id)
);

CREATE TABLE genre(
	genre_id integer GENERATED ALWAYS AS IDENTITY,
	genre_name text UNIQUE NOT NULL,
	
	CONSTRAINT pk_genre PRIMARY KEY (genre_id)
);

CREATE TABLE film_genre(
	film_id integer NOT NULL,
	genre_id integer NOT NULL,
	
	CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id),
	CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
	CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id) ON DELETE CASCADE
);


INSERT INTO film(title, release_year) VALUES
	('Зеленая миля', 1999),
	('Список Шиндлера', 1993),
	('Побег из Шоушенка', 1994),
	('Интерстеллар', 2014);

INSERT INTO genre(genre_name) VALUES
	('драма'),
	('фэнтези'),
	('криминал'),
	('биография'),
	('история'),
	('военный'),
	('фантастика'),
	('приключения');

INSERT INTO film_genre(film_id, genre_id) VALUES
	(1,1),
	(1,2),
	(1,3),
	(2,1),
	(2,4),
	(2,5),
	(2,6),
	(3,1),
	(4,1),
	(4,7),
	(4,8);
