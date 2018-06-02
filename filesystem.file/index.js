'use strict';

module.exports = (NODE) => {
  const fs = require('fs');

  const pathsIn = NODE.getInputByName('paths');

  const filesOut = NODE.getOutputByName('files');
  filesOut.on('trigger', async (conn, state) => {
    const paths = await pathsIn.getValues(state);
    if (!paths.length) {
      paths.push(NODE.data.path);
    }

    return paths;
  });

  const existsOut = NODE.getOutputByName('exists');
  existsOut.on('trigger', async (conn, state) => {
    const paths = await pathsIn.getValues(state);
    if (!paths.length) {
      paths.push(NODE.data.path);
    }

    return paths.every(path =>
      fs.existsSync(path)
    );
  });
};
