const clean = require('./lib/build/clean.js');
const prepHandlebars = require('./lib/build/prep-handlebars.js');
const compileLayouts = require('./lib/build/compile-layouts.js');
const parseSourceFiles = require('./lib/build/parse-source-files.js');
const collectCollections = require('./lib/build/collect-collections.js');
const removeDrafts = require('./lib/build/remove-drafts.js');
const composeSourceAndLayouts = require('./lib/build/compose-source-and-layouts.js');
const { fancifyUrls } = require('./lib/build/fancify-urls.js');
const writeFiles = require('./lib/build/write-files.js');
const compileStyles = require('./lib/build/compile-styles.js');
const copyOtherFiles = require('./lib/build/copy-other-files.js');

const helpers = require('./helpers/helpers.js');
const metadata = require('./metadata/metadata.js');

const SRCDIR = './src/';
const DESTDIR = './dist/';

// TODO: logging/debugging
async function build() {
  await clean(DESTDIR);

  // Register helpers and partials
  await prepHandlebars({
    helpers,
    partialsDir: './partials/',
  });
  const Handlebars = require('handlebars');

  // Compile layouts for later use
  const layouts = await compileLayouts({
    layoutsDir: './layouts/',
  });

  // Extract front-matter data and turn Markdown into HTML
  const sourceFiles = await parseSourceFiles({
    sourceDir: SRCDIR,
  });

  const POSTS_REGEX = /^posts\//;
  const collections = collectCollections({
    sourceFiles,
    patterns: [{
      name: 'posts',
      test: file => POSTS_REGEX.test(file.srcpath),
    }],
    layouts,
    metadata,
  });
  Object.assign(metadata, {collections});

  // Smash layout templates and source pages together to make actual pages
  // And also fancify the URLs so they look nice on the URL bar
  const finalFiles = fancifyUrls(composeSourceAndLayouts({
    sourceFiles: removeDrafts(sourceFiles),
    layouts,
    metadata,
  }));

  // Write the smashed files to the destination directory
  await writeFiles({
    destinationDir: DESTDIR,
    files: finalFiles.reduce(function(obj, file) {
      obj[file.dstpath] = file.content;
      return obj;
    }, {}),
  });

  // Compile SCSS into CSS (with sourcemaps!)
  const styleFiles = await compileStyles({
    stylesDir: SRCDIR + 'styles/',
    outputDir: DESTDIR + 'styles/',
  });

  // Write the CSS to the destination directory
  await writeFiles({
    destinationDir: DESTDIR + 'styles/',
    files: styleFiles
  });

  // We have no other files we need to copy... yet
  // await copyOtherFiles({
  //   sourceDir: ['images/'].map(dir => SRCDIR + dir),
  //   exclude: [],
  //   destinationDir: DESTDIR,
  // });
}

build();
