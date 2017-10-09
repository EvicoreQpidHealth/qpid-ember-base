import Ember from 'ember';
import ToggleThemeControllerMixin from 'qpid-ember-base/mixins/toggle-theme-controller-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | toggle theme controller');

test('theme is the only query param added', function(assert) {
  assert.expect(1);

  let ToggleThemeControllerObject =
    Ember.Object.extend(ToggleThemeControllerMixin);

  let subject = ToggleThemeControllerObject.create();

  assert.deepEqual(subject.get('queryParams'), ['theme']);
});

test('theme query param defaults to qpid', function(assert) {
  assert.expect(1);

  let ToggleThemeControllerObject =
    Ember.Object.extend(ToggleThemeControllerMixin);

  let subject = ToggleThemeControllerObject.create();

  assert.deepEqual(subject.get('theme'), 'qpid');
});

test('when the theme is updated, the theming service gets called with the updated theme',
  function(assert) {
    assert.expect(1);

    let ToggleThemeControllerObject =
      Ember.Object.extend(ToggleThemeControllerMixin);

    let subject = ToggleThemeControllerObject.create();

    subject.set('themingService', {
      setTheme(theme) {
        assert.equal(theme, 'uhc');
      }
    });

    subject.set('theme', 'uhc');
  });
