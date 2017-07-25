// Import environment variables from .env for local testing
const dotenv = require('dotenv').config();

const path = require('path');
const del = require('del');
const Handlebars = require('handlebars');

const collectAndProcessFiles = require('../lib/build/collect-and-process-files.js');
const mapObject = require('../lib/map-object.js');

const prepHandlebars = require('../lib/build/prep-handlebars.js');
const demarkdownifyFile = require('../lib/build/demarkdownify-file.js');
const removeDrafts = require('../lib/build/remove-drafts.js');
const curateCollection = require('../lib/build/curate-collection.js');
const composeFile = require('../lib/build/compose-file.js');
const writeFiles = require('../lib/build/write-files.js');
const compileStyles = require('../lib/build/compile-styles.js');
const copyOtherFiles = require('../lib/build/copy-other-files.js');

// TODO: logging, debugging, allow handlebar stuff in the markdown
// Note to future self: allowing handlebar stuff means breaking apart demarkdownify

DEFAULT_OPTIONS = {
  includeDrafts: false,
  helpers: require('../helpers/helpers.js'),
  partialsDir: './partials/',
  layoutsDir: './layouts/',
  metadata: require('../metadata/metadata.js'),
};

async function build(srcDir, destDir, options) {
  const opts = Object.assign({}, DEFAULT_OPTIONS, options);

  // Clean destination directory
  await del([destDir + '**']);

  // Add partials and helpers to Handlebars
  prepHandlebars({
    helpers: opts.helpers,
    partials: await collectAndProcessFiles('*.html', opts.partialsDir),
  });

  // Create an index of files to process
  const fileIndex = await collectAndProcessFiles('**/*.md', srcDir, (content, filepath) => {
    const pathParts = path.parse(filepath);

    return {
      srcPath: filepath,
      dstPath: path.format({
        dir: pathParts.dir,
        name: pathParts.name,
        ext: '.html',
      }),
      slug: pathParts.name,
      rawContent: content,
    };
  });

  // Prettify all the file URLs (except index.html, which is already pretty)
  mapObject(fileIndex, listing => {
    listing.dstPath = listing.dstPath === 'index.html' ?
      listing.dstPath :
      listing.dstPath.replace('.html', '/index.html');
    return listing;
  });

  // Process the front-matter of those files and convert the content to HTML
  mapObject(fileIndex, (listing, path) => demarkdownifyFile(listing));

  // Remove drafts from the index
  if(!opts.includeDrafts) {
    removeDrafts(fileIndex);
  }

  // Pull out collections from the index and
  // make those collections available in the metadata
  const POSTS_REGEX = /^posts\//;
  opts.metadata.collections = {
    posts: curateCollection(fileIndex, path => POSTS_REGEX.test(path)),
  };

  // Compile layout templates
  const layouts = await collectAndProcessFiles('*.html', opts.layoutsDir, (content, filepath) => Handlebars.compile(content))

  // Compose the content, layout, and metadata of each file to
  // create the full page HTML
  mapObject(fileIndex, listing => composeFile(listing, layouts, opts.metadata));

  // Write those files to the destination directory
  await writeFiles({
    destinationDir: destDir,
    files: Object.values(fileIndex).reduce((obj, listing) => (obj[listing.dstPath] = listing.pageContent, obj), {}),
  });

  // Compile styles from the source directory...
  const styleFiles = await compileStyles({
    stylesDir: srcDir + 'styles/',
    outputDir: destDir + 'styles/',
  });

  // ...and write them to the destination directory
  await writeFiles({
    destinationDir: destDir + 'styles/',
    files: styleFiles
  });

  // Copy scripts into the destination directory
  await copyOtherFiles({
    sourceDir: srcDir + 'scripts/',
    destinationDir: destDir + 'scripts/',
  });

}

build('./src/', './dist/', {
  includeDrafts: (process.env.INCLUDE_DRAFTS === 'true'),
}).then(() => { console.log('The build finished without errors!'); }, err => {
  console.error('There was an error during the build:')
  console.error(err);
  process.exit(127);
});
