const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePost(data) {
  let errors = {};

  if (isEmpty(data.title)) errors.title = "Title is required";
  if (isEmpty(data.community)) errors.community = "Community is required";

  switch (data.type) {
    case "textPost":
      if (isEmpty(data.body)) errors.body = "Body is required";
      if ((!Validator.isLength(data.body), { min: 10, max: 300 })) {
        errors.length = "The body must be between 10 and 300 chalacters long";
      }
      break;

    case "mediaPost":
      if (isEmpty(data.file)) errors.file = "File is required";
      break;

    case "linkPost":
      if (isEmpty(data.link)) errors.link = "Link is required";
      if (!Validator.isURL(data.link)) errors.validLink = "Link isn't right";
      break;

    default:
      "";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
