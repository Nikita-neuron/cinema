const path = require('path');

const User = require("../models/user");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class UserService {
    async getAll() {
        let users = await User.findAll();

        logger.INFO(LOGGER_TAG, "Найдены все пользователи");
        return users;
    }

    async getById(id) {
        let user = await User.findOne({
            where: {
                id: id
            }
        });

        logger.INFO(LOGGER_TAG, `Найден пользователь с id = ${id}`);
        return user;
    }

    async getByEmail(email) {
        let user = await User.findOne({
            where: {
                email: email
            }
        });

        logger.INFO(LOGGER_TAG, `Найден пользователь с email = ${email}`);
        return user;
    }

    async create(firstName, lastName, email, password, role_id) {
        let user = User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role_id: role_id
        });

        logger.INFO(LOGGER_TAG, `Создан пользователь с email = ${email}`);
        return user;
    }

    async update(id, firstName, lastName, email, password, role_id) {
        let user = User.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role_id: role_id
        },
        {
            where: {
                id: id
            } 
        });

        logger.INFO(LOGGER_TAG, `Обновлен пользователь с id = ${id}`);
        return user;
    }

    async delete(id) {
        let user = User.destroy({
            where: {
                id: id
            }
        });

        logger.INFO(LOGGER_TAG, `Удален пользователь с id = ${id}`);
        return user;
    }
}

module.exports = new UserService();