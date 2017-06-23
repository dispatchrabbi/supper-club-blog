const Handlebars = require('handlebars');

const helpers = {
  formatDate: require('./format-date.js'),
  excerpt: require('./excerpt.js'),
  timeout: require('./timeout.js'),
};

module.exports = helpers;
