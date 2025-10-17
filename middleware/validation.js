const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    let dataToValidate;
    switch (source) {
      case "body":
        dataToValidate = req.body;
        break;
      case "params":
        dataToValidate = req.params;
        break;
      case "query":
        dataToValidate = req.query;
        break;
      default:
        dataToValidate = req.body;
    }

    if (source === "body" && dataToValidate == null) {
      return res.status(400).json({ error: "No data provided for validation" });
    }

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const details = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({ error: "Validation failed", details });
    }

    if (source === "params") {
      req.params = result.data;
    } else if (source === "query") {
      req.query = result.data;
    } else {
      req.body = result.data;
    }

    next();
  };
};

module.exports = validateRequest;
