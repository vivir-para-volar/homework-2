const db = require("../database/db");

class FilmGenreController {
  async getFilmsGeners(req, res) {
    let strQuere = `SELECT f.film_id, g.genre_id, f.title, f.release_year, g.genre_name
        FROM public.film_genre
        JOIN film as f USING (film_id)
        JOIN genre as g USING (genre_id) `;

    if (req.params.film_id || req.params.genre_id) {
      let filmId = req.params.film_id;
      let genreId = req.params.genre_id;

      let film;
      if (filmId && genreId) {
        film = await db.query(`${strQuere} WHERE film_id=$1 AND genre_id=$2`, [
          filmId,
          genreId,
        ]);
      } else if (filmId) {
        film = await db.query(`${strQuere} WHERE film_id=$1`, [filmId]);
      } else if (genreId) {
        film = await db.query(`${strQuere} WHERE genre_id=$1`, [genreId]);
      }

      return res.send(film.rows);
    }

    const filmsGeners = await db.query(strQuere);
    res.send(filmsGeners.rows);
  }

  async createFilmGenre(req, res) {
    const filmId = req.body?.film_id;
    const genreId = req.body?.genre_id;

    if (!(filmId && genreId)) {
      return res.send("Error: Некорректные данные");
    }

    // Проверка, что фильм существует
    const film = await db.query("SELECT * FROM film WHERE film_id=$1", [
      filmId,
    ]);
    if (film.rows.length === 0) {
      return res.send("Error: Данного фильма не существует");
    }

    // Проверка, что жанр существует
    const genre = await db.query("SELECT * FROM genre WHERE genre_id=$1", [
      genreId,
    ]);
    if (genre.rows.length === 0) {
      return res.send("Error: Данного жанра не существует");
    }

    // Проверка на уникальность
    const genres = await db.query(
      "SELECT * FROM film_genre WHERE film_id=$1 AND genre_id=$2",
      [filmId, genreId]
    );
    if (genres.rows.length !== 0) {
      return res.send("Error: Данный жанр уже закреплён за фильмом");
    }

    const newFilmGenre = await db.query(
      "INSERT INTO film_genre(film_id, genre_id) VALUES ($1, $2) RETURNING *",
      [filmId, genreId]
    );

    res.send(newFilmGenre.rows[0]);
  }

  async deleteFilmGenre(req, res) {
    if (!(req.params.film_id && req.params.genre_id)) {
      return res.send("Error: Некорректные данные");
    }

    const film_genre = await db.query(
      "DELETE FROM film_genre WHERE film_id=$1 AND genre_id=$2",
      [req.params.film_id, req.params.genre_id]
    );

    res.send(film_genre.rows[0]);
  }
}

module.exports = new FilmGenreController();
