import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
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
