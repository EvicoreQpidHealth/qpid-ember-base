/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    babel: {
      includePolyfill: true
    },
    sassOptions: {
      includePaths: [
        'bower_components/foundation/scss'
      ]
    }
  });

  app.import('vendor/colorbrewer.js');

  return app.toTree();
};
