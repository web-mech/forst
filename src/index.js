const fs = require('fs');
const {format} = require('util');
const {join} = require('path');
const extend = require('n-deep-merge');

function _path(path, basePath) {
  return format('%s.json', join(basePath, path));
}

function lookupByPath(path, basePath) {
  let fullPath = _path(path, basePath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return JSON.parse(fs.readFileSync(fullPath));
  }

  if (path.split('/').length > 1) {
    path = path.split('/');
    path.pop();
    path = path.join('/');
    return lookupByPath(path, basePath);
  }

  return {};
}

function lookupReduce(map, basePath) {
  return map
    .reduce(function(config, path) {
      extend(config, lookupByPath(path, basePath));
      return config;
    }, {});
}

/**
 * forst
 * @param {(string|string[])} path - Config path
 * @param {string} basePath - Tree base path
 */
module.exports =  function(path, basePath) {
  if (!fs.existsSync(basePath)) {
    throw new Error(format('Base path %s points to nowhere', basePath));
  }

  if (Array.isArray(path)) {
    return lookupReduce( path, basePath );
  }

  if (typeof path === 'string') {
    return lookupByPath( path, basePath );
  }

  return {};
};