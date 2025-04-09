const validate = (schema, property) => {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req[property]);
      const valid = error == null;
      if (valid) {
        return next(); // Proceed to the next middleware/route handler
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        return res.status(422).json({ error: message }); // Send a 422 status code with error message
      }
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  validate,
};
