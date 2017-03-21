import Ember from 'ember';

export default Ember.Mixin.create({
  shouldShowAppInfo: false,

  actions: {
    showAppInfo() {
      this.set('shouldShowAppInfo', true);
    },

    hideAppInfo() {
      this.set('shouldShowAppInfo', false);
    }
  }
});
