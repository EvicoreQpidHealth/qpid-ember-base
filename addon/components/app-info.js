import Ember from 'ember';
import layout from '../templates/components/app-info';

const {
  Component,
  computed,
  A
} = Ember;

const versionFromBranch = function(gitInfo) {
  if (!gitInfo.branch) {
    return;
  }

  return gitInfo.branch.replace(/-stable/, '');
};

const versionFromDirectory = function(gitInfo) {
  if (!gitInfo.root) {
    return;
  }

  return new A(gitInfo.root.match(/(\d+\.{1})+\d+/))[0];
};

const getAppVersion = function(gitInfo={}) {
  return gitInfo.appVersion ||
         gitInfo.tag ||
         versionFromBranch(gitInfo) ||
         versionFromDirectory(gitInfo) || '';
};

export default Component.extend({
  layout,
  appName: null,
  appVersion: computed(function() {
    let gitInfo = this.get('gitInfo');
    if (!gitInfo) {
      return;
    }

    return getAppVersion(gitInfo);
  }),

  majorMinorAppVersion: computed('appVersion', function() {
    let version = getAppVersion(this.get('gitInfo')) || '';
    return version.split('.').slice(0, 2).join('.');
  }),

  patchAppVersion: computed('appVersion', function() {
    let version = getAppVersion(this.get('gitInfo')) || '';
    let [patchVersion] = version.split('.').slice(-1);

    if (patchVersion) {
      return ` (${patchVersion})`;
    } else {
      return '';
    }
  }),

  commitHash: computed('gitInfo', function() {
    let info = this.getWithDefault('gitInfo', {});
    return info.abbreviatedSha || (info.sha || '').slice(0, 8);
  })
});
