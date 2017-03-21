import Ember from 'ember';
import layout from '../../templates/components/layout/card-column-footer';

export default Ember.Component.extend({
  layout,
  classNames: ['footer', 'firm'],
  classNameBindings: ['white:white-background']
});
