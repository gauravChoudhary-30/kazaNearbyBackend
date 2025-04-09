const express = require('express');
const { signup, signin } = require('../controllers/auth.controllers');
const { validate } = require('../joi/validate');
const { signupValidate, signinValidate } = require('../joi/validationSchemas');
const router = new express.Router();


router.post("/sign-up", validate(signupValidate, 'body'),signup);
router.post("/sign-in", validate(signinValidate, 'body'),signin);

module.exports = router;