exports = module.exports = exports = module.exports = function() {
  var fs = typeof require !== "undefined" ? require("fs") : undefined;
  var mod = {
    levels: {},
    level: typeof require !== "undefined" ? require("level") : undefined,
    db: function(path) {
      fs.mkdirSync("./" + path, {recursive: true});
      if (!app.has(mod.levels[path])) mod.levels[path] = mod.level(path);
      return mod.levels[path];
    },
    getCallback: async function(callback, errorCallback, table, key) {
      var db = mod.db(config.leveldb.path + "/" + table);
      await new Promise(function(resolve, reject) {
        db.get(key, function(error, val) {
          if (!app.has(error)) {
            if (typeof callback === "function") callback(val);
          } else {
            if (typeof errorCallback === "function") errorCallback("LevelDB: Could not fetch " + table + "/" + key, val);
          }
          resolve();
        });
      });
    },
    putCallback: async function(callback, errorCallback, table, key, value) {
      var db = mod.db(config.leveldb.path + "/" + table);
      await new Promise(function(resolve, reject) {
        db.put(key, value, function(error, val) {
          if (!app.has(error)) {
            if (typeof callback === "function") callback(val);
          } else {
            if (typeof errorCallback === "function") errorCallback("LevelDB: Could not fetch " + table + "/" + key, val);
          }
          resolve();
        });
      });
    }
  };
  return mod;
}