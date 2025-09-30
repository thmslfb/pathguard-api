const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/v1:
 *   get:
 *     tags: [API Info]
 *     summary: Get API information
 *     description: Retrieve basic information about the PathGuard API, including available endpoints and version.
 *     operationId: getApiInfo
 *     responses:
 *       200:
 *         description: Successful response with API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to PathGuard API."
 *                 version:
 *                   type: string
 *                   example: "^1.0.0"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     health:
 *                       type: string
 *                       example: "/api/v1/health"
 *                     kyc:
 *                       type: string
 *                       example: "/api/v1/kyc"
 *                     docs:
 *                       type: string
 *                       example: "/api/v1/docs"
 */

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to PathGuard API.",
    version: "^1.0.0",
    endpoints: {
      health: "/api/v1/health",
      kyc: "/api/v1/kyc",
      docs: "/api/v1/docs",
    },
  });
});

module.exports = router;
