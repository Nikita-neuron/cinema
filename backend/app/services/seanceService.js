const { Op } = require("sequelize");

const Seance = require("../models/seance");
const Hall = require("../models/hall");
const Movie = require("../models/movie");
const Cinema = require("../models/cinema");
const Seat = require("../models/seat");

class SeanceService {
    async getAll() {
        let result = await Seance.findAll();
        return result;
    }

    async getById(id) {
        let result = await Seance.findOne({
            include: [
                {
                    model: Hall,
                    include: [
                        {
                            model: Cinema
                        },
                        {
                            model: Seat
                        }
                    ]
                },
                {
                    model: Movie
                }
            ],
            where: {
                id: id
            }
        });
        return result;
    }

    async getByHallTime(hall_id, time_begin, time_end) {
        let result = await Seance.findAll({
            where: {
                hall_id: hall_id,
                begin: {
                    [Op.lte]: time_end
                },
                end: {
                    [Op.gte]: time_begin
                }
            }
        });
        return result;
    }

    async getByHalls(halls_id) {
        let result = await Seance.findAll({
            include: Movie,
            where: {
                hall_id: {
                    [Op.in]: halls_id
                }
            }
        });
        return result;
    }

    async getByCinema(cinema_id) {
        let result = await Seance.findAll({
            include: [
                {
                    model: Hall,
                    include: Seat,
                    where: {
                        cinema_id: cinema_id
                    }
                },
                {
                    model: Movie
                }
            ]
        });
        return result;
    }

    async getByMovie(movie_id) {
        let result = await Seance.findAll({
            include: {
                model: Hall,
                include: [
                    {
                        model: Cinema
                    },
                    {
                        model: Seat
                    }
                ]
            },
            where: {
                movie_id: movie_id
            }
        });
        return result;
    }

    async create(begin, end, movie_id, hall_id) {
        let result = await Seance.create({
            begin: begin,
            end: end,
            movie_id: movie_id,
            hall_id: hall_id
        });
        return result;
    }

    async update(id, begin, end, movie_id, hall_id) {
        let result = await Seance.update({
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
        let obj = await this.getById(id);
        if (result == 1) return obj;
        else return obj;
    }

    async delete(id) {
        let obj = await this.getById(id);
        let result = await Seance.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new SeanceService();