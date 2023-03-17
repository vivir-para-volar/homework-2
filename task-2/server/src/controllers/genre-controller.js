const db = require("../database/db");

class GenreController {
  async getGenres(req, res) {
    if (req.params.id) {
      const genre = await db.query("SELECT * FROM genre WHERE genre_id=$1", [
        req.params.id,
      ]);

      return res.send(genre.rows[0]);
    }

    const genres = await db.query("SELECT * FROM genre");
    res.send(genres.rows);
  }

  async createGenre(req, res) {
    const genreName = req.body?.genre_name;

    if (!genreName) {
      return res.send("Error: Некорректные данные");
    }

    // Проверка на уникальность названия жанра
    const genres = await db.query("SELECT * FROM genre WHERE genre_name=$1", [
      genreName,
    ]);
    if (genres.rows.length !== 0) {
      return res.send("Error: Данное название жанра уже существует");
    }

    const newGenre = await db.query(
      "INSERT INTO genre(genre_name) VALUES ($1) RETURNING *",
      [genreName]
    );

    res.send(newGenre.rows[0]);
  }

  async updateGenre(req, res) {
    const genreId = req.body?.genre_id;
    const genreName = req.body?.genre_name;

    if (!(genreId && genreName)) {
      res.send("Error: Некорректные данные");
    }

    // Проверка на уникальность названия жанра
    const genres = await db.query(
      "SELECT * FROM genre WHERE genre_id<>$1 AND genre_name=$2",
      [genreId, genreName]
    );
    if (genres.rows.length !== 0) {
      return res.send("Error: Данное название жанра уже существует");
    }

    const changedGenre = await db.query(
      "UPDATE genre SET genre_name=$2 WHERE genre_id=$1 RETURNING *",
      [genreId, genreName]
    );

    res.send(changedGenre.rows[0]);
  }

  async deleteGenre(req, res) {
    if (!req.params.id) {
      res.send("Error: Некорректные данные");
    }

    const genre = await db.query("DELETE FROM genre WHERE genre_id=$1", [
      req.params.id,
    ]);

    res.send(genre.rows[0]);
  }
}

module.exports = new GenreController();
