const forst = require('.');

module.exports = function(map) {
  return Object
  .keys(map)
  .reduce((configMap, key) => {
    configMap[key] = forst(map[key]);
    return configMap;
  }, {});
};