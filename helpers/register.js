const Handlebars = require('handlebars');

const helpers = {
  formatDate: require('./format-date.js'),
  excerpt: require('./excerpt.js'),
  timeout: require('./timeout.js'),
};

function registerHelpers() {
  Object.keys(helpers).forEach(function register(name) {
    Handlebars.registerHelper(name, helpers[name]);
  });
};

module.exports = registerHelpers;
