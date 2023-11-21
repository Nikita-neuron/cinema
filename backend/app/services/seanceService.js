const Seance = require("../models/seance");

class SeanceService {
    async getAll() {
        let result = await Seance.findAll();
        return result;
    }

    async getById(id) {
        let result = await Seance.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(begin, end, movie_id, hall_id) {
        let result = Seance.create({
            begin: begin,
            end: end,
            movie_id: movie_id,
            hall_id: hall_id
        });
        return result;
    }

    async update(id, begin, end, movie_id, hall_id) {
        let result = Seance.update({
            begin: begin,
            end: end,
            movie_id: movie_id,
            hall_id: hall_id
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Seance.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new SeanceService();