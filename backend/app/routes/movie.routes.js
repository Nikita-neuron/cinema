const Router = require('express');

const MovieController = require("../controllers/movieController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", MovieController.getAll);
router.get("/:id", MovieController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), MovieController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), MovieController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), MovieController.delete);

module.exports = router;