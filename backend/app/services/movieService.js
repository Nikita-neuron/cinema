const Movie = require("../models/movie");

class MovieService {
    async getAll() {
        let result = await Movie.findAll();
        return result;
    }

    async getById(id) {
        let result = await Movie.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(title, premiere, producer, actors, duration, country, year, genre_id) {
        let result = Movie.create({
            title: title,
            premiere: premiere,
            producer: producer,
            actors: actors,
            duration: duration,
            country: country,
            year: year,
            genre_id: genre_id
        });
        return result;
    }

    async addGenre(id, genre_id) {
        let result = Movie.update({
            genre_id: genre_id
        },
        {
            where: {
                id: id
            }
        });
        return result;
    }

    async update(id, title, premiere, producer, actors, duration, country, year, genre_id) {
        let result = Movie.update({
            title: title,
            premiere: premiere,
            producer: producer,
            actors: actors,
            duration: duration,
            country: country,
            year: year,
            genre_id: genre_id
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Movie.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new MovieService();