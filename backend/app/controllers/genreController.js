const path = require('path');
const httpStatus = require('http-status');

const logger = require("../logger/logger");
const GenreService = require("../services/genreService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class GenreController {
    async getAll(req, res) {
        const result = await GenreService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await GenreService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { name } = req.body;

        const genre = await GenreService.getByName(name);
        if (genre) return res.status(httpStatus.BAD_REQUEST).json("Жанр с таким именем уже существует");

        const result = await GenreService.create(name);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, name } = req.body;

        const genre = await GenreService.getByName(name);
        if (genre && genre["id"] != id) return res.status(httpStatus.BAD_REQUEST).json("Жанр с таким именем уже существует");

        const result = await GenreService.update(id, name);
        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await GenreService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new GenreController();