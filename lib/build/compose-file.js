const path = require('path');
const Handlebars = require('handlebars');

const DEFAULT_TEMPLATE = Handlebars.compile('{{{contents}}}');

function composeFile(file, layouts, metadata) {
  // modify filename (.md -> .html)
  const pathParts = path.parse(file.srcpath);
  const newFilepath = path.format({
    dir: pathParts.dir,
    name: pathParts.name,
    ext: '.html',
  });
  file.dstpath = newFilepath;

  const context = Object.assign({}, metadata, file.attributes, { contents: file.htmlContent });
  const template = layouts[context.layout] || DEFAULT_TEMPLATE;
  file.content = template(context);

  return file;
};

module.exports = composeFile;
