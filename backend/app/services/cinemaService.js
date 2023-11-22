const Cinema = require("../models/cinema");
const Seance = require("../models/seance");

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

    async getByName(name) {
        let result = await Cinema.findOne({
            where: {
                name: name
            }
        });
        return result;
    }

    async create(name, address) {
        let result = await Cinema.create({
            name: name,
            address: address
        });
        return result;
    }

    async update(id, name, address) {
        let result = await Cinema.update({
            name: name,
            address: address
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
        let result = await Cinema.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new CinemaService();