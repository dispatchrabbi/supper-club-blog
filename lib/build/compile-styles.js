const promisify = require('util').promisify;

const sass = require('node-sass');
const renderSass = promisify(sass.render);

const bourbon = require('bourbon');
const neat = require('bourbon-neat');

async function compileStyles({
  stylesDir,
  outputDir
}) {
  const sassResult = await renderSass({
    file: stylesDir + 'main.scss',
    includePaths: [].concat(bourbon.includePaths, neat.includePaths),
    outFile: outputDir + 'main.css',
    outputStyle: 'nested',
    sourceMap: true,
    sourceMapContents: true,
  });

  return {
    'main.css': sassResult.css,
    'main.css.map': sassResult.map,
  };
}

module.exports = compileStyles;
