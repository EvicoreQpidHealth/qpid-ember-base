import { getWithDefault } from '@ember/object';
import { typeOf } from '@ember/utils';

const DEFAULTS = {
  theme: 'qpid'
};

export default {
  theme: DEFAULTS.theme,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && typeOf(this[property]) !== 'function') {
        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};
