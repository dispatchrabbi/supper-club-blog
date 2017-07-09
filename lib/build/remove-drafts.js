function removeDrafts(fileIndex) {
  Object.keys(fileIndex).forEach(path => {
    if(fileIndex[path].frontMatter.draft) {
      delete fileIndex[path];
    }
  });
}

module.exports = removeDrafts;
