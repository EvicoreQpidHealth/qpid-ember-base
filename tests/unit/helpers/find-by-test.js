import { findBy } from '../../../helpers/find-by';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | find by');

test('finds the correct value', function(assert) {
  let enumerable = Ember.A([]);

  enumerable.pushObjects([
    {
      name: 'one',
      displayName: 'uno'
    },
    {
      name: 'two',
      displayName: 'dos'
    },
    {
      name: 'three',
      displayName: 'tres'
    }
  ]);

  assert.equal(findBy(['name', 'one', enumerable, 'displayName']), 'uno');
  assert.equal(findBy(['name', 'two', enumerable, 'displayName']), 'dos');
  assert.equal(findBy(['displayName', 'tres', enumerable, 'name']), 'three');
  assert.equal(findBy(['name', enumerable[0].name, enumerable, 'displayName']), 'uno');
});

test('Doesn\'t crash when it can\'t find anything', function(assert) {
  let enumerable = Ember.A([]);

  assert.equal(findBy(['name', 'one', enumerable, 'displayName']), '');
});
