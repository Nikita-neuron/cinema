const path = require('path');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

const logger = require("../logger/logger");
const UserService = require("../services/userService");
const RoleService = require("../services/roleService");
const TicketService = require("../services/ticketService");
const generateAccessToken = require("../utils/generateToken");

const LOGGER_TAG = path.relative(process.cwd(), __filename);
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 7;

class UserController {
    async getAll(req, res) {
        const result = await UserService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await UserService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async getMe(req, res) {
        const user = await UserService.getByEmail(req.user.email);
        if (!user) return res.status(httpStatus.BAD_REQUEST).json("Пользователь не найден");

        return res.status(httpStatus.OK).json(user);
    }

    async updateMe(req, res) {
        const { firstName, lastName, email } = req.body;
        
        const user = await UserService.getByEmail(req.user.email);
        if (!user) return res.status(httpStatus.BAD_REQUEST).json("Пользователь не найден");

        const userRep = await UserService.getByEmail(email);
        if (userRep && userRep.id != user.id) return res.status(httpStatus.BAD_REQUEST).json("Пользователь с таким email уже существует");

        const result = await UserService.updateMe(user.id, firstName, lastName, email);
        const userRole = await RoleService.getById(user.role_id);

        const token = generateAccessToken(email, userRole.name);

        return res.status(httpStatus.OK).json({
            email: email,
            token: token
        });
    }

    async create(req, res) {
        const { firstName, lastName, email, password, role_id } = req.body;

        const user = await UserService.getByEmail(email);
        if (user) return res.status(httpStatus.BAD_REQUEST).json("Пользователь с таким email уже существует");

        const role = await RoleService.getById(role_id);
        if (!role) return res.status(httpStatus.BAD_REQUEST).json("Роль не найдена");

        const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

        const result = await UserService.create(firstName, lastName, email, hashPassword, role_id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, firstName, lastName, email, password, role_id } = req.body;

        const user = await UserService.getByEmail(email);
        if (user && user["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Пользователь с таким email уже существует");

        const role = await RoleService.getById(role_id);
        if (!role) return res.status(httpStatus.BAD_REQUEST).json("Роль не найдена");

        const hashPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

        const result = await UserService.update(id, firstName, lastName, email, hashPassword, role_id);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await UserService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new UserController();