function findRestaurant(list, name, options) {
  const found = list.find(r => r.name.toLowerCase() === name.toLowerCase());

  if(found) {
    return options.fn(found);
  } else {
    console.error(`Could not find a restaurant with the name "${name}"!`);
    return '';
  }
}

module.exports = findRestaurant;
