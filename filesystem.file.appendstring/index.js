'use strict';

module.exports = (NODE) => {
  const fs = require('fs');

  const triggerIn = NODE.getInputByName('trigger');
  const filesIn = NODE.getInputByName('files');
  const dataIn = NODE.getInputByName('data');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    let  [data, files] = await Promise.all([dataIn.getValues(state), filesIn.getValues(state)]);
    if (!data.length || !files.length) {
      doneOut.trigger(state);
      return;
    }

    data = data.join('');

    let writtenFileCount = 0;
    files.forEach((file) => {
      fs.writeFile(file, data, { flag: 'a' }, (err) => {
        if (err) {
          NODE.error(err, state);
          return;
        }

        if (++writtenFileCount === files.length) {
          doneOut.trigger(state);
        }
      });
    });
  });
};
