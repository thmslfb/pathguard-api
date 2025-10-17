const {
  verifyAndSave,
  getVerifications,
  getVerificationById,
} = require("../services/verification-service");

const createVerification = async (req, res, next) => {
  try {
    const { name, email, documentType } = req.body;

    const result = await verifyAndSave(
      { name, email, documentType },
      req.isScalarRequest
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getVerificationsHandler = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const verifications = await getVerifications(
      limit,
      offset,
      req.isScalarRequest
    );
    res.status(200).json(verifications);
  } catch (error) {
    next(error);
  }
};

const getVerificationByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verificationById = await getVerificationById(id, req.isScalarRequest);
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
  getVerificationsHandler,
  getVerificationByIdHandler,
};
