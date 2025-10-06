export function errorHandler(err, _req, res, _next) {
  const error = err || {};
  const status = error.status || 500;
  res.status(status).json({
    success: false,
    message: error.message || 'Internal Server Error',
    code: error.code,
    details: error.details,
  });
}
