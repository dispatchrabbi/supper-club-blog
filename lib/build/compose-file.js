const Handlebars = require('handlebars');

const DEFAULT_TEMPLATE = Handlebars.compile('{{{contents}}}');

function composeFile(listing, layouts, metadata) {
  const context = Object.assign({}, metadata, listing.frontMatter, { contents: listing.htmlContent });
  const template = layouts[context.layout] || DEFAULT_TEMPLATE;
  listing.pageContent = template(context);

  return listing;
};

module.exports = composeFile;
