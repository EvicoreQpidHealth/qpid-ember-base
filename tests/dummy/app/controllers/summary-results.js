
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateData() {
      this.set('model.data', JSON.parse(this.get('model.dataText')));
    }
  }
});
