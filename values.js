var APP_ROOT = require('app-root-path');
var USER_HOME = process.env.HOME || process.env.USERPROFILE

Values = {};

Values.PROJECT_SUPSO_ROOT = APP_ROOT + '/.supso';
Values.USER_SUPSO_ROOT = USER_HOME + '/.supso';

module.exports = Values;
