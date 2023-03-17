const Router = require("../../framework/Router");
const controller = require("../controllers/film-controller");

const router = new Router();

const mainPartURL = "/film";

router.get(mainPartURL, controller.getFilms);
router.post(mainPartURL, controller.createFilm);
router.put(mainPartURL, controller.updateFilm);
router.delete(mainPartURL, controller.deleteFilm);

module.exports = router;
