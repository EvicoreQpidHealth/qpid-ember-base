import config from '../config/environment';

export function initialize(application) {
  application.register('config:environment', config.environment, {
    instantiate: false
  });

  application.inject('component:error-stacktrace', 'environment', 'config:environment');
}

export default {
  name: 'add-environment-to-stacktrace',
  initialize
};
