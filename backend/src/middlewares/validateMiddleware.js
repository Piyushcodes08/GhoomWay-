const validate = (schema) => (req, res, next) => {
  try {
    const dataToValidate = {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
    };

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      // Ensure result.error and result.error.errors exist before mapping
      const errorDetail = result.error?.errors
        ? result.error.errors.map((err) => `${err.path.join('.')} : ${err.message}`).join(', ')
        : 'Invalid request data';

      return res.status(400).json({
        success: false,
        error: errorDetail,
      });
    }
    next();
  } catch (error) {
    console.error('Validation Middleware Internal Error:', error);
    next(error);
  }
};

module.exports = validate;
