const detectSwagger = (req, res, next) => {
  if (req.headers["x-swagger-ui"] === "true") {
    req.isSwaggerRequest = true;
  }

  next();
};

module.exports = detectSwagger;
