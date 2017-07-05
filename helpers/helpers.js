const Handlebars = require('handlebars');

const helpers = {
  excerpt: require('./excerpt.js'),
  formatDate: require('./format-date.js'),
  postUrl: require('./post-url.js'),
};

module.exports = helpers;
