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

    async getByName(name) {
        let result = await Genre.findOne({
            where: {
                name: name
            }
        });
        return result;
    }

    async create(name) {
        let result = await Genre.create({
            name: name
        });
        return result;
    }

    async update(id, name) {
        let result = await Genre.update({
            name: name
        },
        {
            where: {
                id: id
            } 
        });
        let obj = await this.getById(id);
        if (result == 1) return obj;
        else return obj;
    }

    async delete(id) {
        let obj = await this.getById(id);
        let result = await Genre.destroy({
            where: {
                id: id
            }
        });
        if (result == 1) return obj;
        else return obj;
    }
}

module.exports = new GenreService();