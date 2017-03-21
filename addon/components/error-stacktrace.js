import Ember from 'ember';
import layout from '../templates/components/error-stacktrace';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  layout,

  isDevelopment: computed('environment.environment', function() {
    let environment = this.get('environment.environment');

    return environment !== 'production';
  })
});
