const Router = require('express');

const SeanceController = require("../controllers/seanceController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", SeanceController.getAll);
router.get("/:id", SeanceController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeanceController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeanceController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeanceController.delete);

module.exports = router;