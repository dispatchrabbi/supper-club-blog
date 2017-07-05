const Handlebars = require('handlebars');
const collectAndProcessFiles = require('../collect-and-process-files.js');

async function compileLayouts({layoutsDir}) {
  return await collectAndProcessFiles('*.html', layoutsDir, async function(content, filepath) {
    return Handlebars.compile(content);
  }, true);
}

module.exports = compileLayouts;
