const Genre = require("../models/genre");

class GenreService {
    async getAll() {
        let result = await Genre.findAll();
        return result;
    }

    async getById(id) {
        let result = await Genre.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async create(name) {
        let result = Genre.create({
            name: name
        });
        return result;
    }

    async update(id, name) {
        let result = Genre.update({
            name: name
        },
        {
            where: {
                id: id
            } 
        });
        return result;
    }

    async delete(id) {
        let result = Genre.destroy({
            where: {
                id: id
            }
        });
        return result;
    }
}

module.exports = new GenreService();