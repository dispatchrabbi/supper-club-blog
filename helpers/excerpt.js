const Handlebars = require('handlebars');

const P_REGEX = /<p>(.*?)<\/p>/;
function excerpt(postContent) {
  const matches = P_REGEX.exec(postContent);
  const excerptText = matches[1] || '';
  return new Handlebars.SafeString(excerptText);
}

module.exports = excerpt;
