const path = require('path');
const Handlebars = require('handlebars');

const collectAndProcessFiles = require('../collect-and-process-files.js');

async function prepHandlebars({helpers, partialsDir}) {
  Object.keys(helpers).forEach(helperName => Handlebars.registerHelper(helperName, helpers[helperName]));

  await collectAndProcessFiles('*.html', partialsDir, async function(content, filepath) {
    const pathParts = path.parse(filepath);
    Handlebars.registerPartial(pathParts.name, content);
  });
}

module.exports = prepHandlebars;
