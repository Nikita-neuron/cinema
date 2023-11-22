const Router = require('express');

const SeatController = require("../controllers/SeatController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", SeatController.getAll);
router.get("/:id", SeatController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeatController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeatController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), SeatController.delete);

module.exports = router;