const composeFile = require('./compose-file.js');
const { fancifyASingleUrl } = require('./fancify-urls.js');

function collectCollections({
  sourceFiles,
  patterns, // [{name: 'name', test: file => false}]
  layouts,
  metadata
}) {
  const collections = patterns.reduce(function(obj, pattern) {
    obj[pattern.name] = sourceFiles.filter(pattern.test).map(file => composeFile(file, layouts, metadata)).map(fancifyASingleUrl);
    return obj;
  }, {});

  return collections;
}

module.exports = collectCollections;
