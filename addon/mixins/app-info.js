import Mixin from '@ember/object/mixin';

export default Mixin.create({
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
