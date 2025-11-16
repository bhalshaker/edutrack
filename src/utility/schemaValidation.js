// Middleware for validating request data against a Joi schema
const validateSchemas = (schema, source) => (req, res, next) => {
  // Validate the specified part of the request (body, params, query)
  const dataToValidate = req[source];
  // Perform validation
  const { error, value } = schema.validate(dataToValidate);
  // If validation fails, respond with 400 and error details
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(400).json({
      success: false,
      message: `Validation error: ${errorMessage}`,
      details: error.details,
    });
  }
  next();
};

export { validateSchemas };
