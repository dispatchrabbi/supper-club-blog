const cpy = require('cpy');

async function copyOtherFiles({
  sourceDir,
  destinationDir,
  exclude,
}) {
  const patterns = [
    sourceDir + '**/*.*',
    ...exclude.map(pattern => '!' + pattern),
  ];

  return cpy(patterns, destinationDir);
}

module.exports = copyOtherFiles;
