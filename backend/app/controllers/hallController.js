const path = require('path');
const httpStatus = require('http-status');

const logger = require("../logger/logger");
const HallService = require("../services/hallService");
const CinemaService = require("../services/cinemaService");
const SeatService = require("../services/seatService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class HallController {
    async getAll(req, res) {
        const result = await HallService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await HallService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { name, cinema_id} = req.body;

        const cinema = await CinemaService.getById(cinema_id);
        if (!cinema) return res.status(httpStatus.BAD_REQUEST).json("Кинотеатр не найден");

        let result = await HallService.create(name, cinema_id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, name, cinema_id } = req.body;

        const cinema = await CinemaService.getById(cinema_id);
        if (!cinema) return res.status(httpStatus.BAD_REQUEST).json("Кинотеатр не найден");

        let result = await HallService.update(id, name, cinema_id );
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await HallService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new HallController();