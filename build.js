const promisify = require('util').promisify;

const globby = require('globby');
const makeDir = require('make-dir'); // already as promised
const del = require('del'); // already as promised
const writeFile = promisify(require('fs').writeFile);
const readFile = promisify(require('fs').readFile);

const frontMatter = require('front-matter');
const marked = require('marked');

const objectFromEntries = require('./lib/object-from-entries.js');

const sass = require('node-sass');
const renderSass = promisify(sass.render);
const bourbon = require('bourbon');
const neat = require('bourbon-neat');

const SRCDIR = './src/';
const DESTDIR = './dist/';

// TODO: drafts, collections, permalinks
// TODO: logging/debugging
async function build() {
  // Get the metadata in order
  // const metadata = require('./metadata/metadata.js');

  // Clean the destination folder
  await del([DESTDIR + '**']);

  // Remake the destination folder
  await makeDir(DESTDIR);

  // Parse the content in all the source files from markdown into HTML, with front-matter included
  const srcPaths = await globby('**/*.md', { cwd: SRCDIR });
  const srcFiles = await Promise.all(srcPaths.map(async function(path) {
    const rawContent = await readFile(SRCDIR + path);
    const mdContent = rawContent.toString();
    const withFrontMatter = frontMatter(mdContent);
    const fileInfo = {
      path: path, // TODO: change this from .md to .html
      attributes: withFrontMatter.attributes,
      body: marked(withFrontMatter.body),
    };
    return [path, fileInfo];
  })).then(objectFromEntries);

  // Register Handlebar helpers
  // const Handlebars = require('handlebars');
  // const helpers = require('./helpers/helpers.js');
  // Object.keys(helpers).forEach(helperName => Handlebars.registerHelper(helperName, helpers[helperName]));

  // Parse each source file using the appropriate handlebars template

  // Deposit those files the destination folder

  // Compile SCSS into CSS and deposit those files in the destination folder
  const CSSDIR = DESTDIR + 'styles/';
  await makeDir(CSSDIR);
  const sassResult = await renderSass({
    file: SRCDIR + 'styles/main.scss',
    includePaths: [].concat(bourbon.includePaths, neat.includePaths),
    outFile: CSSDIR + 'main.css',
    outputStyle: 'nested',
    sourceMap: true,
    sourceMapContents: true,
  });
  await writeFile(CSSDIR + 'main.css', sassResult.css);
  await writeFile(CSSDIR + 'main.css.map', sassResult.map);
}

build();


// Metalsmith(__dirname)
//   .metadata(metadata)
//   .source('./src')
//   .destination('./dist')
//   .clean(true)
//   .use(sass({
//     includePaths: [].concat(bourbon.includePaths, neat.includePaths),
//     outputDir: 'styles/',
//     outputStyle: 'nested',
//     sourceMap: true,
//     sourceMapContents: true,
//     sourceComments: true,
//   }))
//   .use(drafts())
//   .use(collections({
//     posts: {
//       pattern: 'posts/*.md',
//       sortBy: 'date',
//       reverse: true,
//       refer: false,
//     },
//   }))
//   .use(markdown())
//   .use(permalinks({
//     relative: false,
//   }))
//   .use(layouts({
//     engine: 'handlebars',
//     partials: 'partials',
//   }))
//   .build(function errorHandler(err) {
//     if(err) { throw err; }
//   });
