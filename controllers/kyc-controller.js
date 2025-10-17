const verifyAndSave = require("../services/verification-service");
const {
  getVerifications: getVerificationsFromDB,
  getVerificationById: getVerificationByIdFromDB,
} = require("../models/verification-model");
const {
  getMockVerifications,
  getMockVerificationById,
} = require("../utils/mock-data");

const createVerification = async (req, res, next) => {
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

const getVerifications = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const verifications = req.isSwaggerRequest
      ? getMockVerifications(limit, offset)
      : await getVerificationsFromDB(limit, offset);
    res.status(200).json(verifications);
  } catch (error) {
    next(error);
  }
};

const getVerificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verificationById = req.isSwaggerRequest
      ? getMockVerificationById(id)
      : await getVerificationByIdFromDB(id);
    if (!verificationById) {
      return res.status(404).json({ error: "Verification not found" });
    }
    res.status(200).json(verificationById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVerification,
  getVerifications,
  getVerificationById,
};
