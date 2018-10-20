'use strict';

module.exports = (NODE) => {
  const pathsIn = NODE.getInputByName('paths');

  const directoriesOut = NODE.getOutputByName('directories');
  directoriesOut.on('trigger', async (conn, state) => {
    const paths = await pathsIn.getValues(state);

    return paths.length ? paths : NODE.data.path;
  });
};
