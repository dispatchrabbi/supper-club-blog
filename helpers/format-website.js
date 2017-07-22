function formatWebsite(website) {
  return website.startsWith('http') ? website : 'http://' + website;
}

module.exports = formatWebsite;
