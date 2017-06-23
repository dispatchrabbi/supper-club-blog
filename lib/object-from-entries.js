function objectFromEntries(entries) {
  return entries.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

module.exports = objectFromEntries;
