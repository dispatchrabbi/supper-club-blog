const moment = require('moment');

function formatDate(date) {
  // Parse dates in UTC mode because they come with no time and no timezone
  return moment.utc(date).format('MMMM Do, YYYY');
}

module.exports = formatDate;
