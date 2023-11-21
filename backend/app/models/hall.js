const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Hall = db.define('Hall', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hall;