require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const infoRoutes = require("./routes/info");
const healthRoutes = require("./routes/health");
const kycRoutes = require("./routes/kyc");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", infoRoutes);
app.use("/health", healthRoutes);
app.use("/api/v1/kyc", kycRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/v1");
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
