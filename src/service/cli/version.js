'use strict';

const packageJson = require(`../../../package`);
const {ExitCode} = require(`../../constants`);

module.exports = {
  name: `--version`,
  run() {
    console.info(packageJson.version);
    process.exit(ExitCode.success);
  }
};
