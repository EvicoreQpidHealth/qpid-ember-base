import Ember from 'ember';
import refreshLogic from '../utils/resize';

export default Ember.Mixin.create({
  transition: function() {
    Ember.run.schedule('afterRender', this, refreshLogic);
  }.on('didTransition')
});
