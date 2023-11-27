const path = require('path');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_STRING";
const JWT_PREFIX = process.env.JWT_PREFIX || "Bearer ";

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(`${JWT_PREFIX} `)[1];

        if (!token) {
            return res.status(httpStatus.FORBIDDEN).json( "Пользователь не авторизован" );
        }

        const decodedData = jwt.verify(token, JWT_SECRET);
        req.user = decodedData;
        next();
    } catch(e) {
        logger.ERROR(LOGGER_TAG, e);
        return res.status(httpStatus.FORBIDDEN).json( "Пользователь не авторизован" );
    }
}