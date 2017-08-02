function curateCollection(fileIndex, filterFn) {
  const collection = Object.entries(fileIndex)
    .filter(([path, listing]) => filterFn(path, listing)) // filter for what we want in the collection
    .reduce((obj, [path]) => { // build the collection object
      Object.defineProperty(obj, path, {
        enumerable: true,
        get: () => fileIndex[path], // makes it so if we alter the original object in place, the collection keeps pace
      });
      return obj;
    }, {});

  return collection;
}

module.exports = curateCollection;
