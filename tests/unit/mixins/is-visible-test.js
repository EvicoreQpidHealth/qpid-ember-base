import Ember from 'ember';
import IsVisibleMixin from '../../../mixins/is-visible';
import { module, test } from 'qunit';

module('Unit | Mixin | is visible');

test('enteredViewport and isVisible get triggered', function(assert) {
  assert.expect(3);

  let wrapperObject = Ember.Object.extend(IsVisibleMixin, {
    enteredViewport() {
      assert.ok(true, 'subject has entered viewport');
    },

    isVisible() {
      assert.ok(true, 'subject is now visible');
    },

    _windowHeight: 1000,

    _windowWidth: 1000
  });

  let subject = wrapperObject.create();

  // start out of the viewport
  let rect = {
    top: -50,
    left: 50,
    bottom: 50,
    right: 50
  };
  subject._updateIsInViewport(rect);
  assert.notOk(subject.get('_isInViewport'), 'wrapper is not in viewport at start');

  // move into the viewport
  rect = {
    top: 50,
    left: 50,
    bottom: 50,
    right: 50
  };
  subject._updateIsInViewport(rect);
});

test('exitedViewport gets triggered', function(assert) {
  assert.expect(2);

  let wrapperObject = Ember.Object.extend(IsVisibleMixin, {
    exitedViewport() {
      assert.ok(true, 'subject has exited viewport');
    },

    _windowHeight: 1000,

    _windowWidth: 1000
  });

  let subject = wrapperObject.create();
  // start in the viewport
  let rect = {
    top: 50,
    left: 50,
    bottom: 50,
    right: 50
  };
  subject._updateIsInViewport(rect);
  assert.ok(subject.get('_isInViewport'), 'wrapper is in viewport at the start');
  // move out of the viewport
  rect = {
    top: -50,
    left: 50,
    bottom: 50,
    right: 50
  };
  subject._updateIsInViewport(rect);
});
