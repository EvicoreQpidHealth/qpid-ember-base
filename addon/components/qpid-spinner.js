import Ember from 'ember';
import layout from '../templates/components/qpid-spinner';

export default Ember.Component.extend({
  layout,
  radius: 10,
  width: 5,
  scale: 1,
  height: 100,
  style: Ember.computed('height', function() {
    return Ember.String.htmlSafe(`position:relative; height:${this.get('height')}px;`);
  })
});
