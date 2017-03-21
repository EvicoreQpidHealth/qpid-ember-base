/*jshint node:true*/
'use strict';

var gitRepoInfo = require('git-repo-info');
require('shelljs/global');

var dateFromGit = function() {
  return exec('git log -1 --format="%ad" HEAD', { silent: true }).output.trim();
};

module.exports = function() {
  var info = gitRepoInfo();

  // if we weren't able to parse a date from the commit, ask git
  info.date = info.date || dateFromGit();

  return {
    gitInfo: info,
    appVersion: process.env.APP_VERSION
  };
};
