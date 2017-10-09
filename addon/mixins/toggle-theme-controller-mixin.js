import Mixin from 'ember-metal/mixin';
import service from 'ember-service/inject';
import observer from 'ember-metal/observer';
import Configuration from '../configuration';

export default Mixin.create({
  queryParams: ['theme'],
  theme: Configuration.theme,

  themingService: service('theming'),

  themeUpdate: observer('theme', function() {
    let themingService = this.get('themingService');
    let theme = this.get('theme');

    themingService.setTheme(theme);
  })
});
