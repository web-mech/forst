const forst = require('.');

/**
 * forstMap
 * @param {object} map - Config path map
 * @param {string} basePath - Tree base path
 */
async function forstMap(map, basePath, configMap = {}) {
  let key = Object.keys(map).shift();
  configMap[key] = await forst(map[key], basePath);
  delete map[key];
  if (Object.keys(map).length) {
    return forstMap(map, basePath, configMap);
  }
  return configMap;
};

module.exports = forstMap;