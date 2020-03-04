'use strict';

const fs = require(`fs`);
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

const getCategoriesNames = (library, number) => {
  const arr = (new Array(number)).fill(undefined);
  const maximum = library.length - 1;

  const getCategoryName = () => {
    const newItem = library[getRandomInt(0, maximum)];
    if (arr.includes(newItem)) {
      return getCategoryName();
    }
    return newItem;
  };

  arr.forEach((cur, index) => {
    arr[index] = getCategoryName();
  });
  return arr;
};

const generateRecords = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(Date.now() - getRandomInt(0, RETROSPECTIVE_MS)),
    announce: shuffle(SENTENCES).slice(1, getRandomInt(1, MAX_ANNOUNCE_SENTENCES)).join(` `),
    fullText: shuffle(SENTENCES).slice(1, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    category: getCategoriesNames(CATEGORIES, getRandomInt(1, CATEGORIES.length)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const recordNumber = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (recordNumber > MAX_COUNT) {
      console.error(`Attention! No more than ${MAX_COUNT} records`);
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateRecords(recordNumber));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`File was created.`);
      process.exit(ExitCode.success);
    });
  }
};
