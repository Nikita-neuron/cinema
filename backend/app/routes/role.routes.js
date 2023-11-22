const Router = require('express');

const RoleController = require("../controllers/roleController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", RoleController.getAll);
router.get("/:id", RoleController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), RoleController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), RoleController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), RoleController.delete);

module.exports = router;