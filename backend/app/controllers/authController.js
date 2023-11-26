const path = require('path');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const RoleService = require("../services/roleService");
const UserService = require("../services/userService");
const logger = require("../logger/logger");
const responseBuilder = require("./responseUtils/responseBuilder");

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
                return responseBuilder(
                    res,
                    httpStatus.BAD_REQUEST,
                    "Ошибка регистрации",
                    errors,
                    null
                );
            }

            const { firstName, lastName, email, password } = req.body;

            const userFinded = await UserService.getByEmail(email);

            if (userFinded) {
                return responseBuilder(
                    res, 
                    httpStatus.BAD_REQUEST, 
                    "Пользователь с такой почтой уже существует",
                    "Пользователь с такой почтой уже существует",
                    null
                );
            }

            const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
            const userRole = await RoleService.getByName("USER");
            const user = await UserService.create(
                firstName,
                lastName,
                email,
                hashPassword,
                userRole.id
            );

            const token = generateAccessToken(user.email, userRole.name);

            return responseBuilder(
                res,
                httpStatus.OK,
                null,
                null,
                {
                    "email": user.email,
                    "token": token
                }
            );
        } catch (e) {
            return responseBuilder(
                res,
                httpStatus.BAD_REQUEST,
                "Ошибка регистрации",
                e,
                null
            );
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserService.getByEmail(email);

            if (!user) {
                return responseBuilder(
                    res,
                    httpStatus.BAD_REQUEST,
                    "Неверный логин или пароль",
                    "Неверный логин или пароль",
                    null
                );
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return responseBuilder(
                    res,
                    httpStatus.BAD_REQUEST,
                    "Неверный логин или пароль",
                    "Неверный логин или пароль",
                    null
                );
            }
            
            const userRole = await RoleService.getById(user.role_id);

            const token = generateAccessToken(user.email, userRole.name);

            return responseBuilder(
                res,
                httpStatus.OK,
                null,
                null,
                {
                    "email": user.email,
                    "token": token
                }
            );
        } catch (e) {
            return responseBuilder(
                res,
                httpStatus.BAD_REQUEST,
                "Ошибка входа",
                e,
                null
            );
        }
    }
}

module.exports = new AuthController();