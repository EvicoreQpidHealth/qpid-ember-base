import Ember from 'ember';
import showTitleMixin from '../../../mixins/show-title';
import { module, test } from 'qunit';

module('Unit | Mixin | show title');

test('show-title mixin activate/deactivate', function(assert) {
  let sendActionName = '';

  const showTitleObject = Ember.Object.extend(showTitleMixin, {
    send(actionName) {
      sendActionName = actionName;
    }
  });

  const showTitle = showTitleObject.create();

  sendActionName = '';
  showTitle.activate();
  assert.equal(sendActionName, 'showTitle', 'activate() sends "showTitle');

  sendActionName = '';
  showTitle.deactivate();
  assert.equal(sendActionName, 'hideTitle', 'deactivate() sends "hideTitle');
});
