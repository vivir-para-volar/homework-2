const Router = require("../../framework/Router");
const controller = require("../controllers/film-genre-controller");

const router = new Router();

const mainPartURL = "/film-genre";

router.get(mainPartURL, controller.getFilmsGeners);
router.post(mainPartURL, controller.createFilmGenre);
router.delete(mainPartURL, controller.deleteFilmGenre);

module.exports = router;
