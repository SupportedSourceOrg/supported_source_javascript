var fs = require('fs');
var Errors = require('./errors');
var Util = require('./util');
var Organization = require('./organization');
var Values = require('./values');

var Project = function(name, apiToken, options) {
  this.name = name;
  this.apiToken = apiToken;
  this.options = options;
  this.clientData = this.loadClientData();
};

Project.projects = [];

Project.prototype.ensureRequired = function() {
  if (!this.requiredFilesExist()) {
    throw new Errors.MissingProjectToken(this.name, this.apiTokens);
  }
  
  if (!this.isValid()) {
    throw new Errors.InvalidProjectToken(this.name, this.apiTokens);
  }
};

Project.prototype.getFilename = function(filetype) {
  return Values.PROJECT_SUPSO_ROOT + "/projects/" + this.name + "." + filetype;
};

Project.prototype.getDataFilename = function() {
  return this.getFilename('json');
};

Project.prototype.getTokenFilename = function() {
  return this.getFilename('token');
};

Project.prototype.loadClientData = function() {
  if (!Util.fileExists(this.getDataFilename())) {
    return null;
  }
  
  var jsonEncodedData = fs.readFileSync(this.getDataFilename());
  try {
    return JSON.parse(jsonEncodedData);
  } catch(err) {
    throw Errors.MalformedProjectData(this.name, this.apiToken);
  }
};

Project.prototype.loadClientToken = function() {
  if (!Util.fileExists(this.getTokenFilename())) {
    return;
  }
  
  return fs.readFileSync(this.getTokenFilename());
};

Project.prototype.isValid = function() {
  if (!this.clientData && this.apiToken) {
    return false;
  }

  if (this.clientData['project_api_token'] != this.apiToken) {
    return false;
  }

  if (!Organization.getCurrentOrganizationId() ||
      this.clientData['organization_id'] != Organization.getCurrentOrganizationId()) {
    return false;
  }

  var token = this.loadClientToken();
  
  return token && token.length > 0; // TODO actually verify it
};

Project.prototype.requiredFilesExist = function() {
  return Util.fileExists(this.getTokenFilename()) &&
      Util.fileExists(this.getDataFilename())
};

Project.add = function(name, apiToken, options) {
  var project = new Project(name, apiToken, options);
  Project.projects.push(project);
  project.ensureRequired();
};

module.exports = Project;
