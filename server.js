require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const infoRoutes = require("./routes/info-routes");
const healthRoutes = require("./routes/health-routes");
const kycRoutes = require("./routes/kyc-routes");
const notFoundHandler = require("./middleware/not-found-handler");
const errorHandler = require("./middleware/error-handler");

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

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
