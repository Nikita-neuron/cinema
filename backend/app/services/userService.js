const path = require('path');

const User = require("../models/user");
const Role = require("../models/role");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class UserService {
    async getAll() {
        let result = await User.findAll({
            include: Role
        });

        return result;
    }

    async getById(id) {
        let result = await User.findOne({
            where: {
                id: id
            },
            include: Role
        });

        return result;
    }

    async getByEmail(email) {
        let result = await User.findOne({
            where: {
                email: email
            },
            include: Role
        });

        return result;
    }

    async create(firstName, lastName, email, password, role_id) {
        let result = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role_id: role_id
        });

        let obj = await this.getById(result["id"]);
        return obj;
    }

    async updateMe(id, firstName, lastName, email) {
        let result = await User.update({
            firstName: firstName,
            lastName: lastName,
            email: email
        },
        {
            where: {
                id: id
            } 
        });

        let obj = await this.getById(id);
        return obj;
    }

    async update(id, firstName, lastName, email, password, role_id) {
        let result = await User.update({
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

        let obj = await this.getById(id);
        return obj;
    }

    async delete(id) {
        let obj = await this.getById(id);
        let result = await User.destroy({
            where: {
                id: id
            }
        });

        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new UserService();