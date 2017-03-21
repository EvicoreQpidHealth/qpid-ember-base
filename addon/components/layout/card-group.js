import Ember from 'ember';
import layout from '../../templates/components/layout/card-group';

export default Ember.Component.extend({
  layout,
  classNames: ['card-group'],
  classNameBindings: ['selected:selected-card-group', 'streamline:streamline']
});
