function removeDrafts(fileIndex) {
  Object.keys(fileIndex).forEach((path) => {
    if (fileIndex[path].frontMatter.draft) {
      delete fileIndex[path]; // eslint-disable-line no-param-reassign
    }
  });
}

module.exports = removeDrafts;
