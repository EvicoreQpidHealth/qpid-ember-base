import Ember from 'ember';
import refreshLogic from '../utils/resize';

export default Ember.Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, () => refreshLogic());
  }
});
