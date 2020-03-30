'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;

const DEFAULT_PORT = 3000;

const DEFAULT_SERVER_PORT = 8080;

const PUBLIC_DIR = `public`;

const MAX_COUNT = 1000;

const MAX_ANNOUNCE_SENTENCES = 5;

const RETROSPECTIVE_MS = 7776000000;

const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;

const FILE_TITLES_PATH = `./data/titles.txt`;

const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const ExitCode = {
  success: 0,
  error: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  DEFAULT_SERVER_PORT,
  PUBLIC_DIR,
  MAX_COUNT,
  MAX_ANNOUNCE_SENTENCES,
  RETROSPECTIVE_MS,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  ExitCode,
  HttpCode,
};
