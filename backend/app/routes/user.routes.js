const Router = require('express');

const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), UserController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), UserController.update);
router.delete("/:id", roleMiddlleware(["ADMIN", "SUPERADMIN"]), UserController.delete);

module.exports = router;