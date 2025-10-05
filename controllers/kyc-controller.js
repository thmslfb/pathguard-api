const verifyAndSave = require("../services/verification-service");
const { getVerifications } = require("../models/verification-model");
const { getMockVerifications } = require("../utils/mock-data");

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

exports.getVerifications = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const verifications = req.isSwaggerRequest
      ? getMockVerifications(limit, offset)
      : await getVerifications(limit, offset);
    res.status(200).json(verifications);
  } catch (error) {
    next(error);
  }
};
