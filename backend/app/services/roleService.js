const path = require('path');

const Role = require("../models/role");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class RoleService {
    async getAll() {
        let roles = await Role.findAll();

        logger.INFO(LOGGER_TAG, "Найдены все роли");
        return roles;
    }

    async getById(id) {
        let role = await Role.findOne({
            where: {
                id: id
            }
        });

        logger.INFO(LOGGER_TAG, `Найдена роль с id = ${id}`);
        return role;
    }

    async getByName(name) {
        let role = await Role.findOne({
            where: {
                name: name
            }
        });

        logger.INFO(LOGGER_TAG, `Найдена роль с name = ${name}`);
        return role;
    }

    async create(name) {
        let role = Role.create({
            name: name
        });

        logger.INFO(LOGGER_TAG, `Создана роль с name = ${name}`);
        return role;
    }

    async update(id, name) {
        let role = Role.update({
            name: name
        },
        {
            where: {
                id: id
            } 
        });

        logger.INFO(LOGGER_TAG, `Обновлена роль с id = ${id}`);
        return role;
    }

    async delete(id) {
        let role = Role.destroy({
            where: {
                id: id
            }
        });

        logger.INFO(LOGGER_TAG, `Удалена роль с id = ${id}`);
        return role;
    }
}

module.exports = new RoleService();