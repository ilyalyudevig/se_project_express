const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  FORBIDDEN,
  UNAUTHORIZED,
} = require("./errors");

module.exports.handleError = (err, res) => {
  console.error(err);
  if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "The ID is not valid" });
  } else if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND).send({
      message: "Requested resource not found",
    });
  } else if (err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({ message: err.message });
  } else if (err.name === "ForbiddenError") {
    res.status(FORBIDDEN).send({ message: err.message });
  } else if (err.name === "AuthorizationError") {
    res.status(UNAUTHORIZED).send({ message: err.message });
  } else if (err.name === "ConflictError" || err.code === 11000) {
    res.status(CONFLICT).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
};
