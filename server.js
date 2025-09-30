require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const infoRoutes = require("./routes/info-routes");
const healthRoutes = require("./routes/health-routes");
const kycRoutes = require("./routes/kyc-routes");
const notFoundHandler = require("./middleware/not-found-handler");
const errorHandler = require("./middleware/error-handler");
const detectSwagger = require("./middleware/swagger-detection");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const BASE_URL = `${HOST}:${PORT}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PathGuard API",
      version: "1.0.0",
      description:
        "A modular KYC API with customizable risk scoring, validation checks, and PostgreSQL persistence",
    },
    servers: [
      {
        url: BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const app = express();
const specs = swaggerJsdoc(options);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(detectSwagger);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      requestInterceptor: (request) => {
        request.headers["X-Swagger-UI"] = "true";
        return request;
      },
    },
  })
);
app.use("/api/v1", infoRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/kyc", kycRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/v1/docs");
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
