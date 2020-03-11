'use strict';

const chalk = require(`chalk`);
const packageJson = require(`../../../package`);
const {ExitCode} = require(`../../constants`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJson.version));
    process.exit(ExitCode.success);
  }
};
