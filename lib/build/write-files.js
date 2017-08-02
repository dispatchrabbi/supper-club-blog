const promisify = require('util').promisify;
const path = require('path');
const makeDir = require('make-dir'); // already as promised
const writeFile = promisify(require('fs').writeFile);

async function writeFiles({
  destinationDir,
  files
}) {
  return Promise.all(Object.entries(files).map(async ([filepath, contents]) => {
    const pathParts = path.parse(filepath);
    await makeDir(destinationDir + pathParts.dir);
    await writeFile(destinationDir + filepath, contents);
  }));
}

module.exports = writeFiles;
