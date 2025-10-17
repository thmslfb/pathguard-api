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
const { apiReference } = require("@scalar/express-api-reference");
const detectScalar = require("./middleware/scalar-detection");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      },
    },
  })
);
app.use(cors());
app.use(morgan(process.env.NODE_ENV === "production" ? "common" : "dev"));
app.use(express.json());

app.use("/openapi.yaml", express.static("openapi.yaml"));

app.use(
  "/api/v1/docs",
  apiReference({
    spec: {
      url: "/openapi.yaml",
    },
    onBeforeRequest: ({ request }) => {
      console.log("[Scalar onBeforeRequest] Adding header to request");
      request.headers.set("x-scalar-docs", "true");
      return request;
    },
  })
);

app.use(detectScalar);

// Vos routes API
app.use("/api/v1", infoRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/kyc", kycRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/v1/docs");
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
