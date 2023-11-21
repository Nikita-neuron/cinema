const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "user"
    }
});

module.exports = Role;