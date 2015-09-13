var pathsUtil = require('./lib/paths');
var _ = require('lodash');
var glob = require('glob-all');

module.exports = function (pattern, callback) {
  callback = callback || function () {};

  var result = {};

  var d = Date.now();
  console.info('Globbing files...');
  glob(pattern.slice(0), function (err, paths) {

    result.paths = paths;
    result.absolutePaths = [];
    result.paths.forEach(function (path) {
      result.absolutePaths.push(process.cwd() + path);
    });
    result.tree = pathsUtil.convertToTree(paths);

    console.log(result)
    console.info('Done globbing files in ' + (Date.now() - d) + 'ms', pattern);

    callback(result);
  });
};