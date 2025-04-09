const express = require('express');
const { updateProfile, addProfile } = require('../controllers/profile.controller');
const { verifyAccessToken } = require('../middlewares/jwt');
const { validate } = require('../joi/validate');
const { addProfileValidate, updateProfileValidate } = require('../joi/validationSchemas');

const router = new express.Router();

router.post("/add-profile", verifyAccessToken, validate(addProfileValidate, 'body') ,addProfile);
router.post("/update-profile", verifyAccessToken, validate(updateProfileValidate, 'body') ,updateProfile);


module.exports = router;