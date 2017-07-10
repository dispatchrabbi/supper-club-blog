const Handlebars = require('handlebars');

const P_REGEX = /<p>(.*?)<\/p>/;
function excerpt(postContent) {
  const matches = P_REGEX.exec(postContent);
  const excerpt = matches[1] || '';
  return new Handlebars.SafeString(excerpt);
}

module.exports = excerpt;
