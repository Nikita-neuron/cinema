const Movie = require("../models/movie");
const Genre = require("../models/genre");

class MovieService {
    async getAll() {
        let result = await Movie.findAll({
            include: Genre
        });
        return result;
    }

    async getById(id) {
        let result = await Movie.findOne({
            where: {
                id: id
            },
            include: Genre
        });
        return result;
    }

    async getByTitle(title) {
        let result = await Movie.findOne({
            where: {
                title: title
            },
            include: Genre
        });
        return result;
    }

    async getGenres(id) {
        let result = await Movie.findOne({
            where: {
                id: id
            }
        });
        if (result) return result.getGenre();
        else return [];
    }

    async create(title, description, premiere, producer, actors, duration, country, year, coef, status) {
        let result = await Movie.create({
            title: title,
            description: description,
            premiere: premiere,
            producer: producer,
            actors: actors,
            duration: duration,
            country: country,
            year: year,
            coef: coef,
            status: status
        });
        let obj = this.getById(result["dataValues"]["id"]);
        return obj;
    }

    async addGenre(id, genre_id) {
        let movie = await this.getById(id);
        if (movie) {
            let genre = await Genre.findOne({
                where: {
                    id: genre_id
                }
            });
            if (genre) {
                movie.addGenre(genre);
            }
        }
        return movie.getGenres();
    }

    async deleteAllGenres(id) {
        let movie = await this.getById(id);
        if (movie) {
            let genres = await movie.getGenres();

            if (genres) {
                for (let genre of genres) {
                    await genre.movie_genre.destroy();
                }
            }
        }
        return movie.getGenres();
    }

    async update(id, title, description, premiere, producer, actors, duration, country, year, coef, status) {
        let result = await Movie.update({
            title: title,
            description: description,
            premiere: premiere,
            producer: producer,
            actors: actors,
            duration: duration,
            country: country,
            year: year,
            coef: coef,
            status: status
        },
        {
            where: {
                id: id
            } 
        });
        let obj = await this.getById(id);
        return obj;
    }

    async delete(id) {
        let obj = await this.getById(id);
        let result = await Movie.destroy({
            where: {
                id: id
            }
        });
        return obj;
    }
}

module.exports = new MovieService();