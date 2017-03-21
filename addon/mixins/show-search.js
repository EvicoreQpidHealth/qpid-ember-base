import Ember from 'ember';

export default Ember.Mixin.create({
  activate() {
    this._super(...arguments);
    this.send('showSearch');
  },

  deactivate() {
    this._super(...arguments);
    this.send('hideSearch');
  }
});
