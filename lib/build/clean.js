const del = require('del');

async function clean(dir) {
  return await del([dir + '**']);
}

module.exports = clean;
