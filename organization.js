var fs = require('fs');
var Util = require('./util');
var Values = require('./values');

var Organization = function(name, id) {
  this.name = name;
  this.id = id;
};

Organization._currentOrganization = null;

Organization.getCurrentOrganizationFilename = function() {
  return Values.PROJECT_SUPSO_ROOT + "/current_organization.json";
};

Organization.getCurrentOrganizationFromFile = function() {
  if (!Util.fileExists(Organization.getCurrentOrganizationFilename())) {
    return {};
  }

  var organizationData = {};
  try {
    organizationData = JSON.parse(fs.readFileSync(this.getCurrentOrganizationFilename()));
  } catch(err) {
    organizationData = {};
  }

  return organizationData;
};

Organization.getCurrentOrganization = function() {
  Organization._currentOrganization = Organization._currentOrganization ||
      Organization.getCurrentOrganizationFromFile();

  return Organization._currentOrganization;
};

Organization.getCurrentOrganizationId = function() {
  var currentOrg = Organization.getCurrentOrganization();
  return currentOrg ? currentOrg.id : null;
};

module.exports = Organization;
