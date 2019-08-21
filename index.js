var fs = require('fs');

function ObjectStore(init, defaultReturn, path) {
  this.path = path;
  this.defaultReturn = defaultReturn;
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(init));
  this.ObjectStore = require(path);
}

ObjectStore.prototype.getAll = function () {
    return this.ObjectStore;
}

ObjectStore.prototype.get = function (id) {
    if (this.ObjectStore.hasOwnProperty(id)) {
        return this.ObjectStore[id];
    } else {
        return this.defaultReturn;
    }
}

ObjectStore.prototype.delete = function (id, cb) {
    delete this.ObjectStore[id];
    this.save(cb);
}

ObjectStore.prototype.put = function (id, val, cb) {
    this.ObjectStore[id] = val;
    this.save(cb);
}

ObjectStore.prototype.save = function (cb) {
    fs.writeFile(this.path, JSON.stringify(this.ObjectStore), cb);
}

module.exports = function(init, defaultReturn, path) {
  return new ObjectStore(init, defaultReturn, path);
}