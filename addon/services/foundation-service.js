import Ember from 'ember';

export default Ember.Service.extend({
  reflow(plugin) {
    Ember.run.debounce({ pluginName: plugin }, this._reflow, 150);
  },
  _reflow() {
    let { pluginName } = this;
    Ember.run.next(this, () => {
      if (pluginName) {
        Ember.$(document).foundation(pluginName, 'reflow');
      } else {
        Ember.$(document).foundation('reflow');
      }
    });
  },
  libs: Ember.$(window)[0].Foundation.libs
});
