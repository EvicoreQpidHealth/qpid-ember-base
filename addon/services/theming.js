import Ember from 'ember';

export default Ember.Service.extend({
  // enabled themes
  _themes: {
    'evicore': true,
    'carriersweb': true,
    'qpid': true
  },

  setTheme(theme) {
    let themes = this.get('_themes');
    if (theme && themes[theme]) {
      for (let availableTheme in themes) {
        if (Ember.$('body').hasClass(`theme-${availableTheme}`)) {
          Ember.$('body').removeClass(`theme-${availableTheme}`);
        }
      }
      Ember.$('body').addClass(`theme-${theme}`);
    }
  }
});
