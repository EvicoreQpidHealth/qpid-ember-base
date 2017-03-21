import Ember from 'ember';
import showSearchMixin from '../../../mixins/show-search';
import { module, test } from 'qunit';

module('Unit | Mixin | show search');

test('show-search mixin activate/deactivate', function(assert) {
  let sendActionName = '';

  const showSearchObject = Ember.Object.extend(showSearchMixin, {
    send(actionName) {
      sendActionName = actionName;
    }
  });

  const showSearch = showSearchObject.create();

  sendActionName = '';
  showSearch.activate();
  assert.equal(sendActionName, 'showSearch', 'activate() sends "showSearch');

  sendActionName = '';
  showSearch.deactivate();
  assert.equal(sendActionName, 'hideSearch', 'deactivate() sends "hideSearch');
});
