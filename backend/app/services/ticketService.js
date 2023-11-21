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

    async create(buy_date, user_id, seance_id, seat_id) {
        let result = Ticket.create({
            buy_date: buy_date,
            user_id: user_id,
            seance_id: seance_id,
            seat_id: seat_id
        });
        return result;
    }

    async update(id, buy_date, user_id, seance_id, seat_id) {
        let result = Ticket.update({
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
        return result;
    }

    async delete(id) {
        let result = Ticket.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new TicketService();