const restaurantsJson = require('./restaurants.json');

const metadata = {
  blogTitle: 'Supper Club Reports',
  description: 'Two foodies eat their way through Chicagoland',
  restaurants: restaurantsJson.restaurants,
};

module.exports = metadata;
