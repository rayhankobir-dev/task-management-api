const express = require("express");
const cors = require("cors");
const connection = require("./database"); // initialize the database
const { routes } = require("./routes");
const { environment, corsUrl } = require("./config");
const { ApiError, NotFoundError, InternalError } = require("./core/ApiError");

process.on("uncaughtException", (e) => {
  console.error(e);
});

// create express app
const app = express();

// middleware configuration
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// middleware error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === "development") console.error(err);
    ApiError.handle(new InternalError(err.message), res);
  }
});

module.exports = app;
