import Service from 'ember-service';
import jquery from 'jquery';
import Configuration from '../configuration';

export default Service.extend({
  base: 'theme-',
  theme: Configuration.theme,

  setTheme(theme) {
    let currentTheme = this.get('theme');
    let newTheme = this.set('theme', theme);
    let body = this._getBody();
    let prevCssClass = this._generateClass(currentTheme);
    let newCssClass = this._generateClass(newTheme);

    body.removeClass(prevCssClass).addClass(newCssClass);
  },

  setDefaultTheme() {
    let theme = this.get('theme');
    let body = this._getBody();
    let cssClass = this._generateClass(theme);

    body.addClass(cssClass);
  },

  _getBody() {
    return jquery('body');
  },

  _generateClass(theme) {
    let base = this.get('base');

    return `${base}${theme}`;
  }
});
