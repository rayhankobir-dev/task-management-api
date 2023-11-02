const dotenv = require("dotenv");

dotenv.config();

// environment variables
const environment = process.env.ENVIRONMENT || "development";
const timezone = process.env.TZ;
const port = process.env.PORT || 3000;
const corsUrl = process.env.CORS_URL;

// db configuration
const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};

// token configuration
const tokenInfo = {
  tokenSecret: process.env.TOKEN_SECRET || "secret",
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};
module.exports = { environment, timezone, port, corsUrl, db, tokenInfo };
