const detectScalar = (req, res, next) => {
  if (req.headers["x-scalar-docs"] === "true") {
    req.isScalarRequest = true;
  } else {
    req.isScalarRequest = false;
  }

  next();
};

module.exports = detectScalar;
