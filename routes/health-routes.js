const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags: [API Health]
 *     summary: Get API health status
 *     description: Retrieve the health status and uptime information of the PathGuard API.
 *     operationId: getApiHealth
 *     responses:
 *       200:
 *         description: Successful response with API health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 timestamp:
 *                   type: integer
 *                   example: 1759239042808
 */

router.get("/", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

module.exports = router;
