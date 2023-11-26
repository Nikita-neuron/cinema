const Hall = require("../models/hall");
const Seat = require("../models/seat");

class HallService {
    async getAll() {
        let result = await Hall.findAll({
            include: Seat
        });
        return result;
    }

    async getById(id) {
        let result = await Hall.findOne({
            where: {
                id: id
            },
            include: Seat
        });
        return result;
    }

    async getByCinema(cinema_id) {
        let result = await Hall.findAll({
            where: {
                cinema_id: cinema_id
            },
            include: Seat
        });
        return result;
    }

    async create(name, cinema_id) {
        let result = await Hall.create({
            name: name,
            cinema_id: cinema_id
        });
        result = await this.getById(result["id"]);
        return result;
    }

    async update(id, name, cinema_id) {
        let result = await Hall.update({
            name: name,
            cinema_id: cinema_id
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
        let result = await Hall.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return null;
    }
}

module.exports = new HallService();