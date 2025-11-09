const validateSchemas = (schema, source) => (req, res, next) => {
  const dataToValidate = req[source];
  const { error, value } = schema.validate(dataToValidate);
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

export default validateSchemas;
