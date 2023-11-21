const Cinema = require("../models/cinema");

class CinemaService {
    async getAll() {
        let result = await Cinema.findAll();
        return result;
    }

    async getById(id) {
        let result = await Cinema.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(name, address) {
        let result = Cinema.create({
            name: name,
            address: address
        });
        return result;
    }

    async update(id, name, address) {
        let result = Cinema.update({
            name: name,
            address: address
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Cinema.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new CinemaService();