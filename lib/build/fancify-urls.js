function fancifyASingleUrl(file) {
  if (file.dstpath !== 'index.html') {
    // eslint-disable-next-line no-param-reassign
    file.dstpath = file.dstpath.replace(/\.html$/, '/index.html'); // turns posts/foo.html -> posts/foo/index.html
  }
  return file;
}

function fancifyUrls(files) {
  return files.map(fancifyASingleUrl);
}

module.exports = { fancifyUrls, fancifyASingleUrl };
