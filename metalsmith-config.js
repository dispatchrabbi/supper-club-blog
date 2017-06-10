const METALSMITH_CONFIG = {
  source: 'src',
  destination: 'dist',
  metadata: {
    blogTitle: 'Supper Club Reports',
    description: 'Two foodies eat their way through Chicagoland',
  },
  plugins: {
    'metalsmith-drafts': true,
    'metalsmith-markdown': true,
    'metalsmith-layouts': {
      engine: 'handlebars'
    },
    'metalsmith-permalinks': {
      pattern: ':title'
    },
  }
};

module.exports = METALSMITH_CONFIG;
