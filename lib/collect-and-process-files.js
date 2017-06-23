const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);

const globby = require('globby');

const objectFromEntries = require('./object-from-entries.js');

async function collectAndProcessFiles(glob, cwd, cb) {
  const paths = await globby(glob, { cwd });
  const processedFileEntries = await Promise.all(paths.map(async function(filepath) {
    const rawContent = await readFile(cwd + filepath);
    const processedContent = await cb(rawContent.toString(), cwd + filepath);
    return [filepath, processedContent];
  }));

  return objectFromEntries(processedFileEntries);
}

module.exports = collectAndProcessFiles;
