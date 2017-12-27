import Service from '@ember/service';
import { debounce, next } from '@ember/runloop';
import jquery from 'jquery';

export default Service.extend({
  reflow(plugin) {
    debounce({ pluginName: plugin }, this._reflow, 150);
  },

  _reflow() {
    let { pluginName } = this;

    next(this, () => {
      if (pluginName) {
        jquery(document).foundation(pluginName, 'reflow');
      } else {
        jquery(document).foundation('reflow');
      }
    });
  },

  libs: jquery(window)[0].Foundation.libs
});
