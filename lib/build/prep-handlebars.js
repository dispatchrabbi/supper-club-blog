const path = require('path');
const Handlebars = require('handlebars');

function prepHandlebars({helpers = {}, partials = {}}) {
  Object.keys(helpers).forEach(helperName => Handlebars.registerHelper(helperName, helpers[helperName]));
  Object.keys(partials).forEach(partialPath => Handlebars.registerPartial(path.parse(partialPath).name, partials[partialPath]));
}

module.exports = prepHandlebars;
