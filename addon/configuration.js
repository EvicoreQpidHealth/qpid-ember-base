import Ember from 'ember';

const { getWithDefault, typeOf } = Ember;

const DEFAULTS = {
  theme: 'carriersweb'
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
