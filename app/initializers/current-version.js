import config from '../config/environment';
import Ember from 'ember';

const { merge } = Ember;

export function initialize(application) {
  let info = config.gitInfo;
  merge(info, { appVersion: config.appVersion });

  application.register('config:git-info', info, {
    instantiate: false
  });

  application.inject('component:app-info', 'gitInfo', 'config:git-info');
}

export default {
  name: 'current-version',
  initialize: initialize
};
