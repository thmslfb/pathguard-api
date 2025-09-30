const { ZodError } = require("zod");
const { ValidationError, NotFoundError } = require("../utils/error");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof ZodError) {
    const details = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid request data",
      details,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.name,
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: err.name,
      message: err.message,
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      error: "Resource already exists",
      message: "A resource with the given identifier already exists.",
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred."
        : err.message,
  });
};

module.exports = errorHandler;
