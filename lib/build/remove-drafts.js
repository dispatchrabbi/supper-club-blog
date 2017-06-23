const objectFromEntries = require('../object-from-entries.js');

function removeDrafts(files) {
  return objectFromEntries(Object.entries(files).filter(file => !file[1].attributes.draft));
}

module.exports = removeDrafts;
