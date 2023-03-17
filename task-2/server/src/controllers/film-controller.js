const db = require("../database/db");

class FilmController {
  async getFilms(req, res) {
    if (req.params.id) {
      const film = await db.query("SELECT * FROM film WHERE film_id=$1", [
        req.params.id,
      ]);

      return res.send(film.rows[0]);
    }

    const films = await db.query("SELECT * FROM film");
    res.send(films.rows);
  }

  async createFilm(req, res) {
    const title = req.body?.title;
    const releaseYear = req.body?.release_year;

    if (!(title && releaseYear)) {
      return res.send("Error: Некорректные данные");
    }

    const newFilm = await db.query(
      "INSERT INTO film(title, release_year) VALUES ($1, $2) RETURNING *",
      [title, releaseYear]
    );

    res.send(newFilm.rows[0]);
  }

  async updateFilm(req, res) {
    const filmId = req.body?.film_id;
    const title = req.body?.title;
    const releaseYear = req.body?.release_year;

    if (!(filmId && title && releaseYear)) {
      return res.send("Error: Некорректные данные");
    }

    const changedFilm = await db.query(
      "UPDATE film SET title=$2, release_year=$3 WHERE film_id=$1 RETURNING *",
      [filmId, title, releaseYear]
    );

    res.send(changedFilm.rows[0]);
  }

  async deleteFilm(req, res) {
    if (!req.params.id) {
      return res.send("Error: Некорректные данные");
    }

    const film = await db.query("DELETE FROM film WHERE film_id=$1", [
      req.params.id,
    ]);

    res.send(film.rows[0]);
  }
}

module.exports = new FilmController();
