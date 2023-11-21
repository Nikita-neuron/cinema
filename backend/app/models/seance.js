const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Seance = db.define('Seance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    begin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Seance;