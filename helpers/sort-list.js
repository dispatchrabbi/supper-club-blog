function plumb(obj, path) {
  const pathParts = path.split('.');
  return pathParts.reduce((cur, prop) => (cur == undefined ? undefined : cur[prop]), obj);
}

function cmp(a, b) {
  return a < b ? -1 : (b < a ? 1 : 0);
}

function sortList(list, prop, options) {
  return list
    .sort((a, b) => cmp(plumb(a, prop), plumb(b, prop)))
    .map(el => options.fn(el)).join('');
}

module.exports = sortList;
