'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;

const MAX_COUNT = 1000;

const MAX_ANNOUNCE_SENTENCES = 5;

const RETROSPECTIVE_MS = 7776000000;

const FILE_NAME = `mocks.json`;

const ExitCode = {
  success: 0,
  error: 1,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  MAX_COUNT,
  MAX_ANNOUNCE_SENTENCES,
  RETROSPECTIVE_MS,
  FILE_NAME,
  ExitCode,
};
