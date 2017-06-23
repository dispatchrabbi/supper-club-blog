const frontMatter = require('front-matter');
const marked = require('marked');

const collectAndProcessFiles = require('../collect-and-process-files.js');

async function parseSourceFiles({sourceDir}) {
  return await collectAndProcessFiles('**/*.md', sourceDir, async function(content, filepath) {
    const contentWithFrontMatter = frontMatter(content);
    return {
      filepath: filepath,
      attributes: contentWithFrontMatter.attributes,
      body: marked(contentWithFrontMatter.body),
    };
  });
}

module.exports = parseSourceFiles;
