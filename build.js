const Metalsmith  = require('metalsmith');

const collections = require('metalsmith-collections');
const drafts = require('metalsmith-drafts');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');

const metadata = require('./metadata/metadata.js');

const bourbon = require('bourbon');
const neat = require('bourbon-neat');

const Handlebars = require('handlebars');
const registerHelpers = require('./helpers/register.js');
registerHelpers();

Metalsmith(__dirname)
  .metadata(metadata)
  .source('./src')
  .destination('./dist')
  .clean(true)
  .use(sass({
    includePaths: [].concat(bourbon.includePaths, neat.includePaths),
    outputDir: 'styles/',
    outputStyle: 'nested',
    sourceMap: true,
    sourceMapContents: true,
    sourceComments: true,
  }))
  .use(drafts())
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true,
      refer: false,
    },
  }))
  .use(markdown())
  .use(permalinks({
    relative: false,
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials',
  }))
  .build(function errorHandler(err) {
    if(err) { throw err; }
  });
