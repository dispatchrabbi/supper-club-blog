const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);
const globby = require('globby');

async function collectAndProcessFiles(glob, cwd, cb = defaultCallback) {
  const paths = await globby(glob, { cwd });
  const processedFileEntries = objectFromEntries(await Promise.all(paths.map(async function(filepath) {
    const rawContent = await readFile(cwd + filepath);
    const processedContent = await cb(rawContent.toString(), filepath);

    return [filepath, processedContent];
  })));

  return processedFileEntries;
}

function defaultCallback(content, filepath) { return content; }

function objectFromEntries(entries) {
  return entries.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

module.exports = collectAndProcessFiles;
