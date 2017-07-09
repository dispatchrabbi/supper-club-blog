function curateCollection(fileIndex, filterFn) {
  const collection = Object.entries(fileIndex)
    .filter(([path, listing]) => filterFn(path, listing))
    .reduce((obj, [path]) => {
      Object.defineProperty(obj, path, {
        enumerable: true,
        get: () => fileIndex[path],
      });
      return obj;
    }, {});

    return collection;
}

module.exports = curateCollection;
