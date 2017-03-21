import Ember from 'ember';
import layout from '../../templates/components/layout/card-heading';

export default Ember.Component.extend({
  layout,
  tagName: 'p',
  classNames: ['heading'],
  classNameBindings: ['noLower:no-lower']
});
