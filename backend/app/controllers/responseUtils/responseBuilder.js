const httpStatus = require('http-status');
const path = require('path');

const logger = require("../../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

const responseBuilder = (res, type, errorMessage, error, data) => {
    switch (type) {
        case httpStatus.OK:
            return res.status(httpStatus.OK).json({
                "data": data,
                "errors": null
            });

        case httpStatus.BAD_REQUEST:
            logger.ERROR(LOGGER_TAG, error);
            return res.status(httpStatus.BAD_REQUEST).json({
                "data": null,
                "error": errorMessage
            });
        default: return res
    }
}

module.exports = responseBuilder;