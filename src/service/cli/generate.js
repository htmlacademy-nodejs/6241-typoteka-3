'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  MAX_COUNT,
  FILE_NAME,
  MAX_ANNOUNCE_SENTENCES,
  RETROSPECTIVE_MS,
  ExitCode
} = require(`../../constants`);
const {
  title: TITLES,
  sentences: SENTENCES,
  categories: CATEGORIES,
} = require(`../../constants/data`);

const generateRecords = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(Date.now() - getRandomInt(0, RETROSPECTIVE_MS)),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const recordCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (recordCount > MAX_COUNT) {
      console.error(chalk.red(`Attention! No more than ${MAX_COUNT} records`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateRecords(recordCount));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`File was created.`));
      process.exit(ExitCode.success);
    } catch (e) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
