const metadata = require('./metadata/metadata.js');

const bourbon = require('bourbon');
const neat = require('bourbon-neat');

const METALSMITH_CONFIG = {
  source: 'src/',
  destination: 'dist/',
  metadata,
  plugins: {
    'metalsmith-sass': {
      includePaths: [].concat(bourbon.includePaths, neat.includePaths),
      outputDir: 'styles/',
      outputStyle: 'nested',
      sourceMap: true,
      sourceMapContents: true,
      sourceComments: true,
    },
    'metalsmith-drafts': true,
    'metalsmith-markdown': true,
    'metalsmith-layouts': {
      engine: 'handlebars',
      partials: 'partials',
    },
    'metalsmith-permalinks': {},
  }
};

module.exports = METALSMITH_CONFIG;
