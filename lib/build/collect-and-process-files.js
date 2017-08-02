const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);
const globby = require('globby');

function objectFromEntries(entries) {
  return entries.reduce((obj, [key, val]) => {
    obj[key] = val; // eslint-disable-line no-param-reassign
    return obj;
  }, {});
}


function defaultCallback(content /* , filepath */) { return content; }

async function collectAndProcessFiles(glob, cwd, cb = defaultCallback) {
  const paths = await globby(glob, { cwd });
  const processedFileEntries = objectFromEntries(await Promise.all(paths.map(async (filepath) => {
    const rawContent = await readFile(cwd + filepath);
    const processedContent = await cb(rawContent.toString(), filepath);

    return [filepath, processedContent];
  })));

  return processedFileEntries;
}


module.exports = collectAndProcessFiles;
