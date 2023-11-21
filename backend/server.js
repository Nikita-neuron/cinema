require('dotenv').config();

const logger = require("./app/logger/logger");
const initDB = require("./app/db/initDB");
const routes = require("./app/routes/routes");

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;
const LOGGER_TAG = path.relative(process.cwd(), __filename);

initDB();

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => { 
    logger.INFO(LOGGER_TAG, `Сервер запущен на порту: ${PORT}`);
});