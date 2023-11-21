const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Seat = db.define('Seat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    row: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    column: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Seat;