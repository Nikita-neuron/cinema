const path = require('path');
const bcrypt = require('bcrypt');

const db = require("./db");

const Role = require("../models/role");
const User = require("../models/user");
const Cinema = require("../models/cinema");
const Hall = require("../models/hall");
const Seat = require("../models/seat");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Seance = require("../models/seance");
const Ticket = require("../models/ticket");

const RoleService = require("../services/roleService");
const UserService = require("../services/userService");
const logger = require("../logger/logger");

const LOGGER_TAG = path.relative(process.cwd(), __filename);

const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || "Test";
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || "Test";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "test@test.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 7;

const ROLES = ["SUPERADMIN", "ADMIN", "USER"];

function initAssociations() {
    Role.hasMany(User, {
        foreignKey: "role_id",
        allowNull: false
    });
    User.belongsTo(Role, {
        foreignKey: "role_id",
        allowNull: false
    });

    Cinema.hasMany(Hall, {
        foreignKey: "cinema_id",
        allowNull: false
    });
    Hall.belongsTo(Cinema, {
        foreignKey: "cinema_id",
        allowNull: false
    });

    Seat.belongsToMany(Hall, {
        through: "hall_seat",
        foreignKey: "seat_id"
    });
    Hall.belongsToMany(Seat, {
        through: "hall_seat",
        foreignKey: "hall_id"
    });
    
    Genre.belongsToMany(Movie, {
        through: "movie_genre",
        foreignKey: "genre_id"
    });
    Movie.belongsToMany(Genre, {
        through: "movie_genre",
        foreignKey: "movie_id"
    });

    Movie.hasMany(Seance,{
        foreignKey: "movie_id",
        allowNull: false
    });
    Seance.belongsTo(Movie, {
        foreignKey: "movie_id",
        allowNull: false
    });
    
    Hall.hasMany(Seance, {
        foreignKey: "hall_id",
        allowNull: false
    });
    Seance.belongsTo(Hall,{
        foreignKey: "hall_id",
        allowNull: false
    });

    User.hasOne(Ticket, {
        foreignKey: "user_id",
        allowNull: false
    });
    Ticket.belongsTo(User, {
        foreignKey: "user_id",
        allowNull: false
    });

    Seance.hasOne(Ticket, {
        foreignKey: "seance_id",
        allowNull: false
    });
    Ticket.belongsTo(Seance, {
        foreignKey: "seance_id",
        allowNull: false
    });

    Seat.hasOne(Ticket, {
        foreignKey: "seat_id",
        allowNull: false
    });
    Ticket.belongsTo(Seat, {
        foreignKey: "seat_id",
        allowNull: false
    });
}

function initRoles() {
    ROLES.forEach(async (roleName, index) => {
        const role = await RoleService.getByName(roleName);

        if (!role) {
            await RoleService.create(roleName);
        }

        if (index == 0) {
            initSuperAdmin();
        }
    });
}

async function initSuperAdmin() {
    const role = await RoleService.getByName(ROLES[0]);
    const user = await UserService.getByEmail(ADMIN_EMAIL);

    if (!user) {
        const password = bcrypt.hashSync(ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS);
        await UserService.create(
                ADMIN_FIRST_NAME,
                ADMIN_LAST_NAME,
                ADMIN_EMAIL,
                password,
                role["dataValues"]["id"]
        );
    }
}

function initDB() {
    initAssociations();
    syncDB();
}

function syncDB() {
    db.sync({force: false}).then(result => {
        logger.INFO(LOGGER_TAG, "Выполнена синхронизация с БД");

        initRoles();
    })
    .catch(err => {
        logger.ERROR(LOGGER_TAG, "Невозможно выполнить синхронизацию с БД:");
        logger.ERROR(LOGGER_TAG, err.name, err.message);
        logger.ERROR(LOGGER_TAG, err.stack);
    });
}

module.exports = initDB;