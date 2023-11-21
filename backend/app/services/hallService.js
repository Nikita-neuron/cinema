const Hall = require("../models/hall");

class HallService {
    async getAll() {
        let result = await Hall.findAll();
        return result;
    }

    async getById(id) {
        let result = await Hall.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(name, cinema_id) {
        let result = Hall.create({
            name: name,
            cinema_id: cinema_id
        });
        return result;
    }

    async addSeat(id, seat_id) {
        let result = Hail.update({
            seat_id: seat_id,
        },
        {
            where: {
                id: id
            }
        });
        return result;
    }

    async update(id, name, cinema_id) {
        let result = Hall.update({
            name: name,
            cinema_id: cinema_id
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Hall.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new HallService();