function mapObject(obj, fn) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(acc[key], key, obj);
    return acc;
  }, obj);
}

module.exports = mapObject;
