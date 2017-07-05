const Handlebars = require('handlebars');

function excerpt(paragraphs) {
  const pStr = paragraphs.toString();

  // This is a super-cheap way to do this. Woo!
  const pEnd = '</p>';
  const endOfFirstParagraph = pStr.indexOf(pEnd) + pEnd.length;

  return new Handlebars.SafeString(pStr.substr(0, endOfFirstParagraph));
}

module.exports = excerpt;
