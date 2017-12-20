const fs = require('fs');
const ini = require('ini');
const {format} = require('util');
const {join} = require('path');
const cwd = process.cwd();
const extend = require('n-deep-merge');
let __config__;

try {
  __config__ = ini.parse(fs.readFileSync(join(cwd, '.env'), 'utf-8'));  
} catch(e) {
  throw new Error('No .env file found. Please create one and specify a base_path.');
}

if (!__config__.base_path) {
  throw new Error('No base_path found in .env file. Please specify a base_path.');
}

if (!fs.existsSync(__config__.base_path)) {
  throw new Error('base_path points to nowhere. Please check your .env file.');
}

function _path(path) {
  return format('%s.json', join(__config__.base_path, path));
}

function lookupByPath(path) {
  if (fs.existsSync(_path(path)) && fs.statSync(_path(path)).isFile()) {
    return JSON.parse(fs.readFileSync(_path(path)));
  }

  if (path.split('/').length > 1) {
    path = path.split('/');
    path.pop();
    path = path.join('/');
    return lookupByPath(path);
  }

  return {};
}

function lookupReduce(map) {
  return map
    .reduce(function(config, path) {
      extend(config, lookupByPath(path));
      return config;
    }, {});
}

/**
 * forst
 * @param {(string|string[])} path - Config path
 */
module.exports =  function(path) {
  if (Array.isArray(path)) {
    return lookupReduce( path );
  }
  if (typeof path === 'string') {
    return lookupByPath( path );
  }
  return {};
};