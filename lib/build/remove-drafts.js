const objectFromEntries = require('../object-from-entries.js');

function removeDrafts(files) {
  return files.filter(file => !file.attributes.draft);
}

module.exports = removeDrafts;
