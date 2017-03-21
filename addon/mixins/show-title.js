import Ember from 'ember';

export default Ember.Mixin.create({
  activate() {
    this._super(...arguments);
    this.send('showTitle');
  },

  deactivate() {
    this._super(...arguments);
    this.send('hideTitle');
  }
});
