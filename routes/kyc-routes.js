const express = require("express");
const router = express.Router();
const { verify } = require("../controllers/kyc-controller");

router.get("/", (req, res) => {
  res.json({
    message: "KYC verification endpoint",
    methods: ["POST"],
    documentation: "/api/v1/docs#kyc",
  });
});

router.post("/verify", verify);

module.exports = router;
