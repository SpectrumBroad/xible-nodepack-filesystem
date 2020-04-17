'use strict';

module.exports = (NODE) => {
  const fs = require('fs');

  const filesIn = NODE.getInputByName('files');

  const triggerOut = NODE.getOutputByName('trigger');
  const fileOut = NODE.getOutputByName('file');

  NODE.on('init', async (state) => {
    const files = await filesIn.getValues(state);

    files.forEach((file) => {
      try {
        fs.watch(file, (eventType, filename) => {
          state.set(NODE, {
            file
          });
          switch (eventType) {
            case 'rename':
              triggerOut.trigger(state);
              break;
          }
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
