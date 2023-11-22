const path = require('path');

const Role = require("../models/role");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class RoleService {
    async getAll() {
        let result = await Role.findAll();

        return result;
    }

    async getById(id) {
        let result = await Role.findOne({
            where: {
                id: id
            }
        });

        return result;
    }

    async getByName(name) {
        let result = await Role.findOne({
            where: {
                name: name
            }
        });

        return result;
    }

    async create(name) {
        let result = await Role.create({
            name: name
        });

        return result;
    }

    async update(id, name) {
        let result = await Role.update({
            name: name
        },
        {
            where: {
                id: id
            } 
        });

        let obj = await this.getById(id);
        if (result == 1) return obj;
        else return obj;
    }

    async delete(id) {
        let obj = await this.getById(id);
        let result = await Role.destroy({
            where: {
                id: id
            }
        });

        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new RoleService();