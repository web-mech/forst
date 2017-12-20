const forst = require('.');

/**
 * forstMap
 * @param {object} map - Config path map
 */
module.exports = function(map) {
  return Object
  .keys(map)
  .reduce((configMap, key) => {
    configMap[key] = forst(map[key]);
    return configMap;
  }, {});
};