function unreviewedRestaurants(restaurantList, options) {
  return options.fn(restaurantList.filter(r => r.visited && r.reviewPending));
}

module.exports = unreviewedRestaurants;
