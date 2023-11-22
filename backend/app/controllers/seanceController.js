const path = require('path');
const httpStatus = require('http-status');
const moment = require('moment');

const logger = require("../logger/logger");
const SeanceService = require("../services/seanceService");
const MovieService = require("../services/movieService");
const HallService = require("../services/hallService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class SeanceController {
    async getAll(req, res) {
        const result = await SeanceService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await SeanceService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { begin, movie_id, hall_id } = req.body;

        const movie = await MovieService.getById(movie_id);
        if (!movie) return res.status(httpStatus.BAD_REQUEST).json("Фильм не найден");
        const end = moment(begin, 'YYYY-MM-DD HH:mm:ss').add(movie["duration"], 'm');

        const hall = await HallService.getById(hall_id);
        if (!hall) return res.status(httpStatus.BAD_REQUEST).json("Зал не найден");

        const seances = await SeanceService.getByHallTime(hall_id, moment(begin, 'YYYY-MM-DD HH:mm:ss'), end);
        if (seances.length != 0) return res.status(httpStatus.BAD_REQUEST).json("Зал в это время занят");

        if (hall["Seats"].length == 0) return res.status(httpStatus.BAD_REQUEST).json("В зале нет посадочных мест");

        const now = moment();
        const beginTime = moment(begin, 'YYYY-MM-DD HH:mm:ss');

        if (now > beginTime) return res.status(httpStatus.BAD_REQUEST).json("Нельзя создавать сеанс в прошлом");

        const result = await SeanceService.create(moment(begin, 'YYYY-MM-DD HH:mm:ss'), end, movie_id, hall_id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, begin, movie_id, hall_id } = req.body;

        const movie = await MovieService.getById(movie_id);
        if (!movie) return res.status(httpStatus.BAD_REQUEST).json("Фильм не найден");
        const end = moment(begin, 'YYYY-MM-DD HH:mm:ss').add(movie["duration"], 'm');

        const hall = await HallService.getById(hall_id);
        if (!hall) return res.status(httpStatus.BAD_REQUEST).json("Зал не найден");

        const seances = await SeanceService.getByHallTime(hall_id, moment(begin, 'YYYY-MM-DD HH:mm:ss'), end);
        if (seances) {
            for (let seance of seances) {
                if (seance["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Зал в это время занят");
            }
        }

        if (hall["Seats"].length == 0) return res.status(httpStatus.BAD_REQUEST).json("В зале нет посадочных мест");

        const now = moment();
        const beginTime = moment(begin, 'YYYY-MM-DD HH:mm:ss');

        if (now > beginTime) return res.status(httpStatus.BAD_REQUEST).json("Нельзя создавать сеанс в прошлом");

        const result = await SeanceService.update(id, moment(begin, 'YYYY-MM-DD HH:mm:ss'), end, movie_id, hall_id);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await SeanceService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new SeanceController();