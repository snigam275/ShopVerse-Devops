/**
 * Centralized error handler middleware.
 * Catches all unhandled errors and returns structured JSON.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${new Date().toISOString()} ${err.message}`);

  // Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details.map((d) => d.message),
    });
  }

  // Generic error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
