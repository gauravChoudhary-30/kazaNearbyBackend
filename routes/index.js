const express = require('express');
const authRoutes = require('./auth.routes');
const router = express.Router();


router.use("/auth",authRoutes);  // using all the routes present in auth with /auth as the prefix

module.exports = router;