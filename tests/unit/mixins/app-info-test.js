import Ember from 'ember';
import AppInfoMixin from '../../../mixins/app-info';
import { module, test } from 'qunit';

module('Unit | Mixin | app info');

test('it adds actions and a property to show app info', function(assert) {
  let AppInfoObject = Ember.Controller.extend(AppInfoMixin);
  let subject = AppInfoObject.create();

  assert.equal(subject.get('shouldShowAppInfo'), false, 'shouldShowAppInfo should be false');
  subject.send('showAppInfo');
  assert.equal(subject.get('shouldShowAppInfo'), true, 'shouldShowAppInfo should be true');
  subject.send('hideAppInfo');
  assert.equal(subject.get('shouldShowAppInfo'), false, 'shouldShowAppInfo should be false');
});
