const composeFile = require('./compose-file.js');

function composeSourceAndLayouts({
  sourceFiles,
  layouts,
  metadata
}) {
  return sourceFiles.map(file => composeFile(file, layouts, metadata));
}

module.exports = composeSourceAndLayouts;
