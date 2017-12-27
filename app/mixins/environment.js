import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import config from '../config/environment';

export default Mixin.create({
  isProduction: computed({
    get() {
      return config.environment === 'production';
    }
  }).volatile(),

  isDevelopment: computed.not('isProduction').volatile()
});
