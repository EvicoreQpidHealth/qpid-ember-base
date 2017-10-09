import Service from 'ember-service';
import jquery from 'jquery';

export default Service.extend({
  base: 'theme-',
  theme: 'carriersweb',

  setTheme(theme) {
    let currentTheme = this.get('theme');
    let newTheme = this.set('theme', theme);
    let body = this._getBody();
    let base = this.get('base');

    body
      .removeClass(`${base}${currentTheme}`)
      .addClass(`${base}${newTheme}`);
  },

  _getBody() {
    return jquery('body');
  }
});
