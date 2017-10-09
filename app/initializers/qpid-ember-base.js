import ENV from '../config/environment';
import Configuration from 'qpid-ember-base/configuration';

export function initialize(/* application */) {
  const config = ENV['qpid-ember-base'] || {};
  Configuration.load(config);
}

export default {
  name: 'qpid-ember-base',
  initialize
};
