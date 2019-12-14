const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePost(data) {
  let errors = {};

  if (isEmpty(data.body)) errors.body = "Body is required";
  if ((!Validator.isLength(data.body), { min: 10, max: 300 })) {
    errors.length = "The body must be between 10 and 300 chalacters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
