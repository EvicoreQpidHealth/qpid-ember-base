import Ember from 'ember';
import layout from '../../templates/components/layout/card-light';

export default Ember.Component.extend({
  layout,
  tagName: 'p',
  classNames: ['light']
});
