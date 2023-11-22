const Router = require('express');

const HallController = require("../controllers/hallController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", HallController.getAll);
router.get("/:id", HallController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), HallController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), HallController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), HallController.delete);

module.exports = router;