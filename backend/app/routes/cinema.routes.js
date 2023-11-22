const Router = require('express');

const CinemaController = require("../controllers/cinemaController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", CinemaController.getAll);
router.get("/:id", CinemaController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), CinemaController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), CinemaController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), CinemaController.delete);

router.get("/:id/seances", CinemaController.getSeances);

module.exports = router;