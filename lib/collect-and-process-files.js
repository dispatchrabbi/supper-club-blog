const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);

const globby = require('globby');

const objectFromEntries = require('./object-from-entries.js');

async function collectAndProcessFiles(glob, cwd, cb, returnObject = false) {
  const paths = await globby(glob, { cwd });
  const processedFileEntries = objectFromEntries(await Promise.all(paths.map(async function(filepath) {
    const rawContent = await readFile(cwd + filepath);
    const processedContent = await cb(rawContent.toString(), filepath);

    return [filepath, processedContent];
  })));

  return returnObject ? processedFileEntries : Object.values(processedFileEntries);
}

module.exports = collectAndProcessFiles;
