const Router = require('express');

const router = Router();

const authRoutes = require("./auth.routes");

const cinemaRoutes = require("./cinema.routes");
const genreRoutes = require("./genre.routes");
const hallRoutes = require("./hall.routes");
const movieRoutes = require("./movie.routes");
const roleRoutes = require("./role.routes");
const seatRoutes = require("./seat.routes");
const userRoutes = require("./user.routes");
const seanceRoutes = require("./seance.routes");
const ticketRoutes = require("./ticket.routes");

router.use("/auth", authRoutes);
router.use("/cinema", cinemaRoutes);
router.use("/genre", genreRoutes);
router.use("/hall", hallRoutes);
router.use("/movie", movieRoutes);
router.use("/role", roleRoutes);
router.use("/seat", seatRoutes);
router.use("/user", userRoutes);
router.use("/seance", seanceRoutes);
router.use("/ticket", ticketRoutes);

module.exports = router;