const path = require('path');
const httpStatus = require('http-status');

const logger = require("../logger/logger");
const CinemaService = require("../services/cinemaService");
const SeanceService = require("../services/seanceService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class CinemaController {
    async getAll(req, res) {
        const result = await CinemaService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await CinemaService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async getSeances(req, res) {
        const id = req.params.id;
        const result = await SeanceService.getByCinema(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { name, address } = req.body;

        const cinema = await CinemaService.getByName(name);
        if (cinema) return res.status(httpStatus.BAD_REQUEST).json("Кинотеатр с таким именем уже существует");

        const result = await CinemaService.create(name, address);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, name, address } = req.body;

        const cinema = await CinemaService.getByName(name);
        if (cinema && cinema["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Кинотеатр с таким именем уже существует");

        const result = await CinemaService.update(id, name, address);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await CinemaService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new CinemaController();