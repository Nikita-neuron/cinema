const Ticket = require("../models/ticket");

class TicketService {
    async getAll() {
        let result = await Ticket.findAll();
        return result;
    }

    async getById(id) {
        let result = await Ticket.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async getBySeat(seat_id) {
        let result = await Ticket.findOne({
            where: {
                seat_id: seat_id
            }
        });
        return result;
    }

    async getByIdSeat(id, seat_id) {
        let result = await Ticket.findOne({
            where: {
                id: id,
                seat_id: seat_id
            }
        });
        return result;
    }

    async getByUserSeanceSeat(user_id, seance_id, seat_id) {
        let result = await Ticket.findOne({
            where: {
                user_id: user_id,
                seance_id: seance_id,
                seat_id: seat_id
            }
        });
        return result;
    }

    async create(buy_date, user_id, seance_id, seat_id) {
        let result = await Ticket.create({
            buy_date: buy_date,
            user_id: user_id,
            seance_id: seance_id,
            seat_id: seat_id
        });
        return result;
    }

    async update(id, buy_date, user_id, seance_id, seat_id) {
        let result = await Ticket.update({
            buy_date: buy_date,
            user_id: user_id,
            seance_id: seance_id,
            seat_id: seat_id
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
        let result = await Ticket.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new TicketService();