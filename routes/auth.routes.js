const express = require('express');
const { signup } = require('../controllers/auth.controllers');
const router = new express.Router();


router.post("/sign-up", signup);

module.exports = router;