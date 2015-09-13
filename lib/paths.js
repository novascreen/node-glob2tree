var cwd = process.cwd();
var pathUtil = require('path');
var fs = require('fs');

module.exports = {
  convertToTree: function (paths) {
    var obj = this.convertPathsToObject(paths);
    return this.convertObjectToArray(obj);
  },

  convertPathsToObject: function (arr) {
    var self = this;
    var obj = {};

    arr.forEach(function (path, i) {
      var fragments = path.split('/');
      self.convertPathToObject(fragments, obj, i);
    });

    return obj;
  },

  convertPathToObject: function (nodes, obj, i) {
    obj = obj || {};
    var node = nodes[0];
    obj[node] = obj[node] || {};
    nodes.shift();
    if (nodes.length) {
      this.convertPathToObject(nodes, obj[node], i);
    }
    else {
      obj[node] = false;
    }
  },

  convertObjectToArray: function (obj, parent) {
    var arr = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var node = {
          relativePath: key,
          node: key
        };
        if (parent) {
          node.relativePath = parent.relativePath + pathUtil.sep + key;
        }
        node.absolutePath = cwd + pathUtil.sep + node.relativePath;
        console.log(node.node, fs.statSync(node.absolutePath));
        if (obj[key]) {
          node.children = this.convertObjectToArray(obj[key], node);
        }
        arr.push(node);
      }
    }

    return arr;
  },

  convertObjectToPath: function (obj, path) {
    path = path || '';
    path = obj + pathUtil.sep + path;
  }
};