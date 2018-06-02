'use strict';

module.exports = (NODE) => {
  const directoryOut = NODE.getOutputByName('directory');

  directoryOut.on('trigger', (conn, state, callback) => {
    callback(NODE.data.path);
  });
};
