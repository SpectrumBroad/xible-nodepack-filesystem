'use strict';

module.exports = (NODE) => {
  const chokidar = require('chokidar');

  const filesIn = NODE.getInputByName('files');

  const triggerOut = NODE.getOutputByName('trigger');
  const fileOut = NODE.getOutputByName('file');

  NODE.on('init', async (state) => {
    const files = await filesIn.getValues(state);

    files.forEach((file) => {
      try {
        chokidar.watch(file)
        .on('change', () => {
          state.set(NODE, {
            file
          });
          triggerOut.trigger(state);
        });
      } catch (err) {
        NODE.error(err, state);
      }
    });
  });

  fileOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (!thisState || !thisState.file) {
      return;
    }

    return thisState.file;
  });
};
