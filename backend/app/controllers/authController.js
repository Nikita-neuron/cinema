const path = require('path');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const RoleService = require("../services/roleService");
const UserService = require("../services/userService");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 7;
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_STRING";

const generateAccessToken = (email, role) => {
    const payload = {
        email,
        role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: errors });
            }

            const { firstName, lastName, email, password } = req.body;

            const userFinded = await UserService.getByEmail(email);

            if (userFinded) {
                logger.INFO(LOGGER_TAG, `Пользовательс такой почтой ужесуществует; email = ${email}`);
                return res.status(httpStatus.BAD_REQUEST).json({ message: "Пользователь с такой почтой уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
            const userRole = await RoleService.getByName("USER");
            const user = await UserService.create(
                firstName,
                lastName,
                email,
                hashPassword,
                userRole["dataValues"]["id"]
            );
            
            logger.INFO(LOGGER_TAG, `Пользователь с email = ${email} зарегистрирован`);
            return res.status(httpStatus.OK).json({
                message: "Пользователь зарегистрирован",
                user: user["dataValues"]
            });
        } catch (e) {
            logger.ERROR(LOGGER_TAG, e);
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Ошибка регистрации" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserService.getByEmail(email);

            if (!user) {
                logger.INFO(LOGGER_TAG, `Неверный логин или пароль`);
                return res.status(httpStatus.BAD_REQUEST).json({ message: `Неверный логин или пароль` });
            }

            const validPassword = bcrypt.compareSync(password, user["dataValues"]["password"]);
            if (!validPassword) {
                logger.INFO(LOGGER_TAG, `Неверный логин или пароль`);
                return res.status(httpStatus.BAD_REQUEST).json({ message: `Неверный логин или пароль` });
            }
            
            const userRole = await RoleService.getById(user["dataValues"]["role_id"]);

            const token = generateAccessToken(user["dataValues"]["email"], userRole["dataValues"]["name"]);
            
            logger.INFO(LOGGER_TAG, "Сгенерирован токен");
            return res.status(httpStatus.OK).json({ 
                "email": user["dataValues"]["email"],
                "token": token
            })
        } catch (e) {
            logger.ERROR(LOGGER_TAG, e);
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Ошибка входа" });
        }
    }
}

module.exports = new AuthController();