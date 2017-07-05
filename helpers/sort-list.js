function sortList(list, prop, options) {
  const sorted = list.sort((a, b) => a - b);
  return sorted.map(el => options.fn(el)).join('');
}

module.exports = sortList;
