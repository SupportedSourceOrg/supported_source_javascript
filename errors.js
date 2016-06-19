Errors = {};

Errors.MalformedProjectData = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project data is malformed.";
};
Errors.MalformedProjectData.prototype = Object.create(Error.prototype);

Errors.InvalidProjectToken = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project token is invalid.";
};
Errors.InvalidProjectToken.prototype = Object.create(Error.prototype);

Errors.MissingProjectToken = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project token is missing.";
};
Errors.MissingProjectToken.prototype = Object.create(Error.prototype);

module.exports = Errors;