const path = require('path');
const httpStatus = require('http-status');

const logger = require("../logger/logger");
const RoleService = require("../services/roleService");
const UserService = require("../services/userService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class RoleController {
    async getAll(req, res) {
        const result = await RoleService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await RoleService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { name } = req.body;

        const role = await RoleService.getByName(name);
        if (role) return res.status(httpStatus.BAD_REQUEST).json("Роль с таким именем уже существует");

        const result = await RoleService.create(name);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, name } = req.body;

        const role = await RoleService.getByName(name);
        if (role && role["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Роль с таким именем уже существует");

        const result = await RoleService.update(id, name);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;

        const role = await UserService.getByRole(id);
        if (role) return res.status(httpStatus.BAD_REQUEST).json("Есть пользователь с такой ролью");

        const result = await RoleService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new RoleController();