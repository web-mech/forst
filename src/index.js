const fs = require('fs');
const {format, promisify} = require('util');
const {join} = require('path');
const extend = require('n-deep-merge');
const fsExists = promisify(fs.exists);
const fsReadFile = promisify(fs.readFile);
const fsStat = async function(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      resolve(stats);
    })
  })
};

function _path(path, basePath) {
  return format('%s.json', join(basePath, path));
}

async function lookupByPath(path, basePath) {
  let fullPath = _path(path, basePath);
  let exists = await fsExists(fullPath);
  let stat = await fsStat(fullPath);
  let isFile = stat && stat.isFile();

  if (exists && isFile) {
    let file = await fsReadFile(fullPath);
    return JSON.parse(file);
  }

  if (path.split('/').length > 1) {
    path = path.substring(0, path.lastIndexOf('/'));
    return lookupByPath(path, basePath);
  }
  return {};
}

async function lookupReduce(map, basePath, config = {}) {
  let path = map.shift();

  if (path) {
    let nextConfig = await lookupByPath(path, basePath);
    extend(config, nextConfig);
  }

  if (map.length) {
    return lookupReduce(map, basePath, config);
  } else {
    return config;
  }
}

/**
 * forst
 * @param {(string|string[])} path - Config path
 * @param {string} basePath - Tree base path
 */
module.exports = async function forst(path, basePath) {
  let exists = await fsExists(basePath);

  if (!exists) {
    throw new Error(format('Base path %s points to nowhere', basePath));
  }

  if (Array.isArray(path)) {
    return lookupReduce(path, basePath);
  }

  if (typeof path === 'string') {
    return lookupByPath( path, basePath );
  }

  return {};
};