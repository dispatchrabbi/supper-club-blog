const Handlebars = require('handlebars');

const helpers = {
  excerpt: require('./excerpt.js'),
  findRestaurant: require('./find-restaurant.js'),
  formatAddressForMap: require('./format-address-for-map.js'),
  formatDate: require('./format-date.js'),
  formatPhone: require('./format-phone.js'),
  getMostRecent: require('./get-most-recent.js'),
  mapsApiKey: require('./maps-api-key.js'),
  postUrl: require('./post-url.js'),
  sortList: require('./sort-list.js'),
};

module.exports = helpers;
