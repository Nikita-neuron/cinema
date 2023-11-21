const Router = require('express');

const router = Router();

const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);

module.exports = router;