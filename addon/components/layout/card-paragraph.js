import Ember from 'ember';
import layout from '../../templates/components/layout/card-paragraph';

export default Ember.Component.extend({
  layout,
  tagName: 'p',
  classNames: ['break-words'],
  classNameBindings: ['lighten']
});
