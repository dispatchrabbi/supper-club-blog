const frontMatter = require('front-matter');

const markdownItAttrs = require('markdown-it-attrs');
const markdownIt = require('markdown-it')({
  html: true, // enable HTML tags in source
}).use(markdownItAttrs);

function demarkdownifyFile(listing) {
  const { body, attributes } = frontMatter(listing.rawContent);

  Object.assign(listing, {
    frontMatter: attributes,
    markdownContent: body,
    htmlContent: markdownIt.render(body),
  });
  return listing;
}

module.exports = demarkdownifyFile;
