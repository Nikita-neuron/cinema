const path = require('path');
const httpStatus = require('http-status');
const moment = require('moment');

const logger = require("../logger/logger");
const MovieService = require("../services/movieService");
const GenreService = require("../services/genreService");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

class MovieController {
    async getAll(req, res) {
        const result = await MovieService.getAll();
        return res.status(httpStatus.OK).json(result);
    }

    async getById(req, res) {
        const id = req.params.id;
        const result = await MovieService.getById(id);
        return res.status(httpStatus.OK).json(result);
    }

    async create(req, res) {
        const { title, description, premiere, producer, actors, duration, country, year, coef, status, genres_id } = req.body;

        const movie = await MovieService.getByTitle(title);
        if (movie) {
            return res.status(httpStatus.BAD_REQUEST).json("Фильм с таким названием уже существует");
        }

        if (coef <= 0) return res.status(httpStatus.BAD_REQUEST).json("Коэффициент должен быть больше нуля");

        let result = await MovieService.create(
            title, description, moment(premiere, 'YYYY-MM-DD'), producer, actors, duration, country, year, coef, status);

        if (result) {
            for (let genre_id of genres_id) {
                let genre = await GenreService.getById(genre_id);
                if (!genre) return res.status(httpStatus.BAD_REQUEST).json("Жанр не найден");

                await MovieService.addGenre(result["id"], genre_id);
            }
        }

        result = await MovieService.getById(result["id"]);
        return res.status(httpStatus.OK).json(result);
    }

    async update(req, res) {
        const { id, title, description, premiere, producer, actors, duration, country, year, coef, status, genres_id } = req.body;

        const movie = await MovieService.getByTitle(title);
        if (movie && movie["id"] != id) {
            return res.status(httpStatus.BAD_REQUEST).json("Фильм с таким названием уже существует");
        }

        if (coef <= 0) return res.status(httpStatus.BAD_REQUEST).json("Коэффициент должен быть больше нуля");

        let result = await MovieService.update(
            id, title, description, moment(premiere, 'YYYY-MM-DD'), producer, actors, duration, country, year, coef, status);

        await MovieService.deleteAllGenres(id);

        if (result) {
            for (let genre_id of genres_id) {
                let genre = await GenreService.getById(genre_id);
                if (!genre) return res.status(httpStatus.BAD_REQUEST).json("Жанр не найден");
                
                await MovieService.addGenre(id, genre_id);
            }
        }
        result = await MovieService.getById(id);

        return res.status(httpStatus.OK).json(result);
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await MovieService.delete(id);
        return res.status(httpStatus.OK).json(result);
    }
}

module.exports = new MovieController();