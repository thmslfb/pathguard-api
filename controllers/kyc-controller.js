const verifyAndSave = require("../services/verification-service");

exports.createVerification = async (req, res, next) => {
  try {
    const { name, email, documentType } = req.body;

    const result = await verifyAndSave(
      { name, email, documentType },
      req.isSwaggerRequest
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
