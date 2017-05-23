/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    appVersion: process.env.APP_VERSION
  };
};
