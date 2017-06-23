const path = require('path');
const Handlebars = require('handlebars');

const objectFromEntries = require('../object-from-entries.js');

const DEFAULT_TEMPLATE = Handlebars.compile('{{{contents}}}');

function composeSourceAndLayouts({
  sourceFiles,
  layouts,
  metadata
}) {
  return objectFromEntries(Object.entries(sourceFiles).map(function([filepath, fileInfo]) {
    // modify filename (.md -> .html)
    const pathParts = path.parse(filepath);
    const newFilepath = path.format({
      dir: pathParts.dir,
      name: pathParts.name,
      ext: '.html',
    });

    const context = Object.assign({}, metadata, fileInfo.attributes, { contents: fileInfo.body });
    const template = layouts[context.layout] || DEFAULT_TEMPLATE;
    const content = template(context);

    return [newFilepath, content]
  }));
}

module.exports = composeSourceAndLayouts;
