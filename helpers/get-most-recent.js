const cmp = require('../lib/cmp.js');

function getMostRecent(collection) {
  const sorted = Object.values(collection).sort((a, b) => -cmp(a.frontMatter.date, b.frontMatter.date));

  return sorted[0];
}

module.exports = getMostRecent;
