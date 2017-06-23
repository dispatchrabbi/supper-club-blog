const promisify = require('util').promisify;
const path = require('path');

const globby = require('globby');
const makeDir = require('make-dir'); // already as promised
const del = require('del'); // already as promised
const writeFile = promisify(require('fs').writeFile);
const readFile = promisify(require('fs').readFile);

const frontMatter = require('front-matter');
const marked = require('marked');

const objectFromEntries = require('./lib/object-from-entries.js');

const Handlebars = require('handlebars');
const helpers = require('./helpers/helpers.js');

const sass = require('node-sass');
const renderSass = promisify(sass.render);
const bourbon = require('bourbon');
const neat = require('bourbon-neat');

const metadata = require('./metadata/metadata.js');

const SRCDIR = './src/';
const DESTDIR = './dist/';

// TODO: drafts, collections, permalinks
// TODO: logging/debugging
async function build() {
  // Clean the destination folder
  await del([DESTDIR + '**']);

  // Remake the destination folder
  await makeDir(DESTDIR);

  // Register Handlebar helpers
  Object.keys(helpers).forEach(helperName => Handlebars.registerHelper(helperName, helpers[helperName]));

  // Register Handlebar partials
  // TODO: change .html to .hbs
  const partialPaths = await globby('./partials/*.html');
  await Promise.all(partialPaths.map(async function(filepath) {
    const partialContent = await readFile(filepath);
    Handlebars.registerPartial(path.basename(filepath, '.html'), partialContent.toString());
  }));

  // Prepare the layout templates
  // TODO: change .html to .hbs
  const LAYOUTDIR = './layouts/';
  const layoutPaths = await globby('*.html', { cwd: LAYOUTDIR });
  const layoutTemplates = await Promise.all(layoutPaths.map(async function(filepath) {
    const rawContent = await readFile(LAYOUTDIR + filepath);
    const htmlContent = rawContent.toString();
    const compiledTemplate = Handlebars.compile(htmlContent);
    return [filepath, compiledTemplate];
  })).then(objectFromEntries);

  // Parse the content in all the source files from markdown into HTML, with front-matter included
  const srcPaths = await globby('**/*.md', { cwd: SRCDIR });
  const srcFiles = await Promise.all(srcPaths.map(async function(filepath) {
    const rawContent = await readFile(SRCDIR + filepath);
    const mdContent = rawContent.toString();
    const withFrontMatter = frontMatter(mdContent);
    const fileInfo = {
      filepath: filepath,
      attributes: withFrontMatter.attributes,
      body: marked(withFrontMatter.body),
    };
    return [filepath, fileInfo];
  })).then(objectFromEntries);

  // Run each source file through Handlebars
  // using the layout as its template and the front-matter and the metadata as its context
  const DEFAULT_TEMPLATE = Handlebars.compile('{{{contents}}}');
  const finalFiles = Object.keys(srcFiles).reduce(function(obj, filepath) {
    const fileInfo = srcFiles[filepath];

    // modify filename (.md -> .html)
    const pathParts = path.parse(filepath);
    const newFilepath = path.format({
      dir: pathParts.dir,
      name: pathParts.name,
      ext: '.html',
    });

    // compile file contents
    const context = Object.assign({}, metadata, fileInfo.attributes, { contents: fileInfo.body });
    const template = layoutTemplates[context.layout] || DEFAULT_TEMPLATE;
    obj[newFilepath] = template(context);

    return obj;
  }, {});

  // Deposit those files the destination folder
  await Promise.all(Object.entries(finalFiles).map(async function([filepath, contents]) {
    const pathParts = path.parse(filepath);
    await makeDir(DESTDIR + pathParts.dir);
    await writeFile(DESTDIR + filepath, contents);
  })).catch(function(err) {
    console.error(err);
    process.exit(1);
  });

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
