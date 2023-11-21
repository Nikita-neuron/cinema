const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Ticket = db.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    buy_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Ticket;