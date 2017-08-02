// TODO: implement better logging so this can be removed
/* eslint no-console: ["warn", { allow: ["warn"] }] */
function findRestaurant(list, name, options) {
  const found = list.find(r => r.name.toLowerCase() === name.toLowerCase());

  if (!found) {
    console.warn(`Could not find a restaurant with the name "${name}"!`);
    return '';
  }

  return options.fn(found);
}

module.exports = findRestaurant;
