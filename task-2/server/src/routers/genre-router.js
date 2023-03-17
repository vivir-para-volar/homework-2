const Router = require("../../framework/Router");
const controller = require("../controllers/genre-controller");

const router = new Router();

const mainPartURL = "/genre";

router.get(mainPartURL, controller.getGenres);
router.post(mainPartURL, controller.createGenre);
router.put(mainPartURL, controller.updateGenre);
router.delete(mainPartURL, controller.deleteGenre);

module.exports = router;
