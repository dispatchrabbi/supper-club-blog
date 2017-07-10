function cmp(a, b) {
  return a < b ? -1 : (b < a ? 1 : 0);
}

module.exports = cmp;
