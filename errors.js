Errors = {};

Errors.MalformedProjectData = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project data is malformed." + Errors.INSTRUCTIONS;
};
Errors.MalformedProjectData.prototype = Object.create(Error.prototype);

Errors.InvalidProjectToken = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project token is invalid." + Errors.INSTRUCTIONS;
};
Errors.InvalidProjectToken.prototype = Object.create(Error.prototype);

Errors.MissingProjectToken = function(projectName, projectApiToken) {
  Error.captureStackTrace(this);
  this.name = this.constructor.name;
  this.message = "The project token is missing." + Errors.INSTRUCTIONS;
};
Errors.MissingProjectToken.prototype = Object.create(Error.prototype);

Errors.INSTRUCTIONS = "\n\n * To get client tokens, run `supso update`." +
    "\n\n * If you do not have the supso command line interface yet, first run `gem install supso`." +
    "\n\n * Visit http://supportedsource.org/help for further help.\n";

module.exports = Errors;
