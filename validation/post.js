const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePost(data) {
  let errors = {};
  const body = data.body;

  if (isEmpty(body.title)) errors.title = "Title is required";
  if (isEmpty(body.community)) errors.community = "Community is required";

  switch (body.type) {
    case "textPost":
      if (isEmpty(body.body)) errors.body = "Body is required";
      if ((!Validator.isLength(body.body), { min: 10, max: 300 })) {
        errors.length = "The body must be between 10 and 300 chalacters long";
      }
      break;

    case "mediaPost":
      if (body.file === undefined) errors.file = "File is required";
      break;

    case "linkPost":
      if (isEmpty(body.link)) errors.link = "Link is required";
      if (!Validator.isURL(body.link)) errors.validLink = "Link isn't right";
      break;

    default:
      "";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
