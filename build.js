const clean = require('./lib/build/clean.js');
const prepHandlebars = require('./lib/build/prep-handlebars.js');
const compileLayouts = require('./lib/build/compile-layouts.js');
const parseSourceFiles = require('./lib/build/parse-source-files.js');
const composeSourceAndLayouts = require('./lib/build/compose-source-and-layouts.js');
const writeFiles = require('./lib/build/write-files.js');
const compileStyles = require('./lib/build/compile-styles.js');

const helpers = require('./helpers/helpers.js');
const metadata = require('./metadata/metadata.js');

const SRCDIR = './src/';
const DESTDIR = './dist/';

// TODO: drafts, collections, permalinks
// TODO: logging/debugging
async function build() {
  await clean(DESTDIR);

  // Register helpers and partials
  await prepHandlebars({
    helpers,
    partialsDir: './partials/',
  });

  const layouts = await compileLayouts({
    layoutsDir: './layouts/',
  });

  const sourceFiles = await parseSourceFiles({
    sourceDir: SRCDIR,
  });

  const finalFiles = composeSourceAndLayouts({
    sourceFiles,
    layouts,
    metadata,
  });

  await writeFiles({
    destinationDir: DESTDIR,
    files: finalFiles,
  });

  const styleFiles = await compileStyles({
    stylesDir: SRCDIR + 'styles/',
    outputDir: DESTDIR + 'styles/',
  });

  await writeFiles({
    destinationDir: DESTDIR + 'styles/',
    files: styleFiles
  });
}

build();
