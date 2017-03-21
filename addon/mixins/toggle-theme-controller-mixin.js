import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: ['theme'],
  theme: 'carriersweb',

  themingService: Ember.inject.service('theming'),

  themeUpdate: Ember.observer('theme', function() {
    this.get('themingService').setTheme(this.get('theme'));
  })
});
