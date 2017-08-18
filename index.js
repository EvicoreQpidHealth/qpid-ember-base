/* eslint-env node */
'use strict';

module.exports = {
  name: 'qpid-ember-base',

  included: function(app, parentAddon) {
    this._super.included.apply(this, arguments);
    var target = (parentAddon || app);

    target.import('vendor/arrow_down.png', {
      destDir: '/assets/images'
    });

    target.import(app.bowerDirectory + '/foundation/js/vendor/modernizr.js');

    target.import(app.bowerDirectory + '/foundation/js/foundation.min.js');
    target.import(app.bowerDirectory + '/foundation/js/foundation/foundation.tooltip.js');
  },

  contentFor: function(type, config) {
    if (type === 'theme') {
      let theme = config.theme ? config.theme : 'qpid';
      return `theme-${theme}`;
    } else {
      return this._super(...arguments);
    }
  },

  isDevelopingAddon: function() {
    return true;
  }
};
