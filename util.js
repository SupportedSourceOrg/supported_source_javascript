var fs = require('fs');

var Util = {};

Util.fileExists = function(filename) {
  try {
    var stats = fs.statSync(filename);
    return true;
  } catch(err) {
    return false;
  }
};

module.exports = Util;

