const Seat = require("../models/seat");

class SeatService {
    async getAll() {
        let result = await Seat.findAll();
        return result;
    }

    async getById(id) {
        let result = await Seat.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(row, column) {
        let result = Seat.create({
            row: row,
            column: column
        });
        return result;
    }

    async update(id, row, column) {
        let result = Seat.update({
            row: row,
            column: column
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Seat.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new SeatService();