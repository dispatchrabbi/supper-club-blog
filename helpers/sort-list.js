const cmp = require('../lib/cmp.js');

function plumb(obj, path) {
  const pathParts = path.split('.');
  return pathParts.reduce((cur, prop) => (cur == undefined ? undefined : cur[prop]), obj);
}

function sortList(list, prop, options) {
  const arr = list instanceof Array ? list : Object.values(list);

  const reverse = !!options.hash.reverse;
  const sorted = arr.sort((a, b) => ((reverse ? -1 : 1) * cmp(plumb(a, prop), plumb(b, prop))));
  return options.fn(sorted);
}

module.exports = sortList;
