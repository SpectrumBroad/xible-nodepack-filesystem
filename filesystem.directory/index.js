'use strict';

module.exports = (NODE) => {
  const directoryOut = NODE.getOutputByName('directory');

  directoryOut.on('trigger', async (conn, state) => {
    return NODE.data.path;
  });
};
