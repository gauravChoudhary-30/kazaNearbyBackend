const Joi = require("joi");

const validationSchemas = {
  signupValidate: Joi.object().keys({
    username: Joi.string().required().messages({
      "string.empty": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email is required.",
      "string.email": "Email must be valid.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
    }),
  }),
  signinValidate: Joi.object().keys({
    username: Joi.string().required().messages({
      "string.empty": "Username is required.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
    }),
  }),
  addProfileValidate: Joi.object().keys({
    id: Joi.number().required().messages({
      "number.empty": "User ID is required.",
    }),
    FirstName: Joi.string().required().messages({
      "string.empty": "FirstName is required.",
    }),
    MiddleName: Joi.string().allow(null, ""),
    LastName: Joi.string().required().messages({
      "string.empty": "LastName is required.",
    }),
    PhoneNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.empty": "PhoneNumber is required.",
      }),
    Address: Joi.string().allow(null, ""),
    Occupation: Joi.string().allow(null, ""),
    WorkExperience: Joi.string().allow(null, ""),
  }),
  updateProfileValidate: Joi.object()
    .keys({
      id: Joi.number().required().messages({
        "number.empty": "User ID is required.",
      }),
      FirstName: Joi.string().allow(null, ""),
      MiddleName: Joi.string().allow(null, ""),
      LastName: Joi.string().allow(null, ""),
      PhoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .allow(null, ""),
      Address: Joi.string().allow(null, ""),
      Occupation: Joi.string().allow(null, ""),
      WorkExperience: Joi.string().allow(null, ""),
    })
    .min(1)
    .messages({
      "object.min": "At least one field must be provided for update.",
    }),
};

module.exports = validationSchemas;
