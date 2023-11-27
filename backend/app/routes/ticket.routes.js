const Router = require('express');

const TicketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.get("/me", authMiddleware, TicketController.getByUser);

router.get("/", TicketController.getAll);
router.get("/:id", TicketController.getById);
router.post("/", authMiddleware, TicketController.create);
router.put("/", roleMiddlleware(["ADMIN", "SUPERADMIN"]), TicketController.update);
router.delete("/:id", authMiddleware, TicketController.delete);

module.exports = router;