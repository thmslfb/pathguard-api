const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: "NotFoundError",
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = notFoundHandler;
