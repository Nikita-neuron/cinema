const path = require('path');
const httpStatus = require('http-status');
const moment = require('moment');

const logger = require("../logger/logger");
const TicketService = require("../services/ticketService");
const UserService = require("../services/userService");
const SeanceService = require("../services/seanceService");
const SeatService = require("../services/seatService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class TicketController {
    async getAll(req, res) {
        const result = await TicketService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await TicketService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { user_id, seance_id, seat_id } = req.body;

        const user = await UserService.getById(user_id);
        if (!user) return res.status(httpStatus.BAD_REQUEST).json("Пользователь не найден");

        const seance = await SeanceService.getById(seance_id);
        if (!seance) return res.status(httpStatus.BAD_REQUEST).json("Сеанс не найден");

        const seat = await SeatService.getById(seat_id);
        if (!seat) return res.status(httpStatus.BAD_REQUEST).json("Место не найдено");

        const ticket = await TicketService.getByUserSeanceSeat(user_id, seance_id, seat_id);
        if (ticket) return res.status(httpStatus.BAD_REQUEST).json("Билет уже куплен");

        const seatBusy = await TicketService.getBySeat(seat_id);
        if (seatBusy) return res.status(httpStatus.BAD_REQUEST).json("Место уже занято");

        const now = moment();

        if (moment(seance["begin"], 'YYYY-MM-DD HH:mm:ss') < now) {
            return res.status(httpStatus.BAD_REQUEST).json("На данный сеанс уже нельзя купить билеты");
        }

        const result = await TicketService.create(now, user_id, seance_id, seat_id);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, user_id, seance_id, seat_id } = req.body;

        const user = await UserService.getById(user_id);
        if (!user) return res.status(httpStatus.BAD_REQUEST).json("Пользователь не найден");

        const seance = await SeanceService.getById(seance_id);
        if (!seance) return res.status(httpStatus.BAD_REQUEST).json("Сеанс не найден");

        const seat = await SeatService.getById(seat_id);
        if (!seat) return res.status(httpStatus.BAD_REQUEST).json("Место не найдено");

        const ticketBusy = await TicketService.getBySeat(seat_id);
        if (ticketBusy["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Место уже занято");

        const now = moment();

        if (moment(seance["begin"], 'YYYY-MM-DD HH:mm:ss') < now) {
            return res.status(httpStatus.BAD_REQUEST).json("На данный сеанс уже нельзя купить билеты");
        }

        const result = await TicketService.update(id, now, user_id, seance_id, seat_id);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await TicketService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new TicketController();