const path = require('path');
const httpStatus = require('http-status');

const logger = require("../logger/logger");
const SeatService = require("../services/seatService");
const HallService = require("../services/hallService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class SeatController {
    async getAll(req, res) {
        const result = await SeatService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await SeatService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { row, column, type, price, hall_id } = req.body;

        const seat = await SeatService.getByRowColumnHall(row, column, hall_id);
        if (seat) return res.status(httpStatus.BAD_REQUEST).json("Такое место в зале уже существует");

        if (price <= 0) return res.status(httpStatus.BAD_REQUEST).json("Цена места должна быть больше нуля");

        const hall = await HallService.getById(hall_id);
        if (!hall) return res.status(httpStatus.BAD_REQUEST).json("Зал не найден");

        const result = await SeatService.create(row, column, type, price, hall_id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, row, column, type, price, hall_id } = req.body;

        const seat = await SeatService.getByRowColumnHall(row, column, hall_id);
        if (seat && seat["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Такое место в зале уже существует");

        if (price <= 0) return res.status(httpStatus.BAD_REQUEST).json("Цена места должна быть больше нуля");

        const hall = await HallService.getById(hall_id);
        if (!hall) return res.status(httpStatus.BAD_REQUEST).json("Зал не найден");

        const result = await SeatService.update(id, row, column, type, price, hall_id);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await SeatService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new SeatController();