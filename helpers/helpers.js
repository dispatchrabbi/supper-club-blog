const Handlebars = require('handlebars');

const helpers = {
  excerpt: require('./excerpt.js'),
  findRestaurant: require('./find-restaurant.js'),
  formatAddress: require('./format-address.js'),
  formatAddressForMap: require('./format-address-for-map.js'),
  formatDate: require('./format-date.js'),
  formatPhone: require('./format-phone.js'),
  formatWebsite: require('./format-website.js'),
  getMostRecent: require('./get-most-recent.js'),
  mapsApiKey: require('./maps-api-key.js'),
  postUrl: require('./post-url.js'),
  sortList: require('./sort-list.js'),
  unvisitedRestaurants: require('./unvisited-restaurants.js'),
};

module.exports = helpers;
