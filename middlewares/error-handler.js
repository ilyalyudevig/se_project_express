const InternalServerError = require("../errors/InternalServerError");

module.exports = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? new InternalServerError("An error occurred on the server")
        : message,
  });
};
