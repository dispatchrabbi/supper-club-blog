const frontMatter = require('front-matter');

const markdownItAttrs = require('markdown-it-attrs');

const markdownIt = require('markdown-it')({
  html: true, // enable HTML tags in source
}).use(markdownItAttrs);

const collectAndProcessFiles = require('../collect-and-process-files.js');

async function parseSourceFiles({sourceDir}) {
  return await collectAndProcessFiles('**/*.md', sourceDir, async function(content, filepath) {
    const contentWithFrontMatter = frontMatter(content);
    return {
      srcpath: filepath,
      attributes: contentWithFrontMatter.attributes,
      rawContent: contentWithFrontMatter.body,
      htmlContent: markdownIt.render(contentWithFrontMatter.body),
    };
  });
}

module.exports = parseSourceFiles;
