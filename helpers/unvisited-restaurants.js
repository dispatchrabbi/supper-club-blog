function unvisitedRestaurants(restaurantList, options) {
  return options.fn(restaurantList.filter(r => !r.visited));
}

module.exports = unvisitedRestaurants;
