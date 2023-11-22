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

    async getByRowColumnHall(row, column, hall_id) {
        let result = await Seat.findOne({
            where: {
                row: row,
                column: column,
                hall_id: hall_id
            }
        });
        return result;
    }

    async create(row, column, type, price, hall_id) {
        let result = await Seat.create({
            row: row,
            column: column,
            type: type,
            price: price,
            hall_id: hall_id
        });
        return result;
    }

    async update(id, row, column, type, price, hall_id) {
        let result = await Seat.update({
            row: row,
            column: column,
            type: type,
            price: price,
            hall_id: hall_id
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
        let result = await Seat.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new SeatService();