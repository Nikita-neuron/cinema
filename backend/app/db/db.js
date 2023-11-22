const { Sequelize } = require('sequelize');
const path = require('path');

const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

const DB_NAME = process.env.DB_NAME || "cinema";
const DB_USER = process.env.DB_USER || "user";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";
const DB_TIMEZONE = process.env.DB_TIMEZONE || "+03:00";

// Подключаемся к базе данных
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        }
    },
    timezone: DB_TIMEZONE,
    logging: false
    // logging: (...msg) => logger.INFO(LOGGER_TAG, msg)
});

// Проверка корректности подключения
async function checkConnection() {
    try {
        await sequelize.authenticate();
        logger.INFO(LOGGER_TAG, "Подключение к базе данных прошло успешно");
    } catch (e) {
        logger.ERROR(LOGGER_TAG, "Невозможно выполнить подключение к БД:");
        logger.ERROR(LOGGER_TAG, e.name, e.message);
        logger.ERROR(LOGGER_TAG, e.stack);
    }
}

checkConnection();

module.exports = sequelize;