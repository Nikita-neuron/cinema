require('dotenv').config();

const logger = require("./app/logger/logger");
const db = require("./app/db/db");

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;
const LOGGER_TAG = path.relative(process.cwd(), __filename);

app.use(express.json());

app.listen(PORT, () => { 
    logger.INFO(LOGGER_TAG, `Сервер запущен на порту: ${PORT}`);
});