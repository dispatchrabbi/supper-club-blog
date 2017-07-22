function formatAddressForMap(name, address) {
  return name + ' ' + address.trim().replace(/[\n\r]+/g, ', ');
}

module.exports = formatAddressForMap;
