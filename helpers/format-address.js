function formatAddress(address) {
  return address.trim().replace(/\n/g, ', ').replace(', ', '\n');
}

module.exports = formatAddress;
