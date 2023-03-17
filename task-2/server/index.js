require("dotenv").config();

const Application = require("./framework/Application");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");
const filmRouter = require("./src/routers/film-router");
const genreRouter = require("./src/routers/genre-router");
const filmGenreRouter = require("./src/routers/film-genre-router");

const PORT = process.env.PORT || 8080;

const app = new Application();

app.use(jsonParser);
app.use(parseUrl(`http://localhost:${PORT}`));

app.addRouter(filmRouter);
app.addRouter(genreRouter);
app.addRouter(filmGenreRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
