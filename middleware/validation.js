const validateBody = (schema) => (req, res, next) => {
  if (req.body == null) {
    return res.status(400).json({ error: "Empty request body" });
  }
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({ error: "Validation failed", details });
  }
  req.body = result.data;
  next();
};

module.exports = validateBody;
