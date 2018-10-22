const forst = require('.');

/**
 * forstMap
 * @param {object} map - Config path map
 * @param {string} basePath - Tree base path
 */
module.exports = function(map, basePath) {
  return Object
  .keys(map)
  .reduce((configMap, key) => {
    configMap[key] = forst(map[key], basePath);
    return configMap;
  }, {});
};