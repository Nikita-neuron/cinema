const Router = require('express');
const { check } = require("express-validator");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddlleware = require("../middlewaree/roleMiddleware");

const router = Router();

router.post("/registration", [
    check("firstName", "Имя пользователя не моет быть пустым").notEmpty(),
    check("lastName", "Фамилия пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль не должен быть пустым").notEmpty()
], authController.registration);
router.post("/login", authController.login);

router.get("/test", roleMiddlleware(["SUPERADMIN"]), (req, res) => { return res.json("Hello") });

module.exports = router;