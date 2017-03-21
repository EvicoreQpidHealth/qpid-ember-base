import Ember from 'ember';
import config from '../config/environment';

const {
  Mixin,
  computed
} = Ember;

export default Mixin.create({
  isProduction: computed({
    get() {
      return config.environment === 'production';
    }
  }).volatile(),

  isDevelopment: computed.not('isProduction').volatile()
});
