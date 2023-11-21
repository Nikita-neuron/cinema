const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Cinema = db.define('Cinema', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cinema;