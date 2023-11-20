const intel = require('intel');

// Конфигурация формата лога
const formatter = new intel.Formatter({
    'format': '[%(date)s] %(levelname)s: %(message)s'
})

// Добавление потока логирования в файл
intel.addHandler(new intel.handlers.File({
    'file': './app/logger/log/log.log',
    'formatter': formatter
}));

// Добавление потока логирования в консоль
intel.addHandler(new intel.handlers.Console({ 'formatter': formatter }));

function INFO(tag, message) {
    intel.info(tag, message);
}

function DEBUG(tag, message) {
    intel.debug(tag, message);
}

function WARNING(tag, message) {
    intel.warn(tag, message);
}

function ERROR(tag, message) {
    intel.error(tag, message);
}

module.exports = {
    INFO: INFO,
    DEBUG: DEBUG,
    WARNING: WARNING,
    ERROR: ERROR
}