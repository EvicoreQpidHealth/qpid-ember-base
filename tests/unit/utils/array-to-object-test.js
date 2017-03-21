import arrayToObject from '../../../utils/array-to-object';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | array to object');

test('it uses name and value by default', function(assert) {
  let items = [
    Ember.Object.create({ name: 'dave', value: 1 }),
    Ember.Object.create({ name: 'mike', value: 2 })
  ];

  let result = arrayToObject(items);

  assert.deepEqual(result, { dave: 1, mike: 2 });
});

test('it works with plain objects', function(assert) {
  let items = [
    { name: 'dave', value: 1 },
    { name: 'mike', value: 2 }
  ];

  let result = arrayToObject(items);

  assert.deepEqual(result, { dave: 1, mike: 2 });
});

test('it uses custom key and value properties', function(assert) {
  let items = [
    { crazy: 'dave', something: 1 },
    { crazy: 'mike', something: 2 }
  ];

  let result = arrayToObject(items, 'crazy', 'something');

  assert.deepEqual(result, { dave: 1, mike: 2 });
});
