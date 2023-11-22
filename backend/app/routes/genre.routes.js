const Router = require('express');

const GenreController = require("../controllers/genreController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", GenreController.getAll);
router.get("/:id", GenreController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), GenreController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), GenreController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), GenreController.delete);

module.exports = router;