import tokensFromSearchString from 'qpid-shared-2/utils/tokens-from-search-string';
import { module, test } from 'qunit';

module('Unit | Utility | tokens from search string');

// Replace this with your real tests.
test('tokenize by pipe |', function(assert) {
  let result = tokensFromSearchString('query|string');
  assert.deepEqual(result, ['query','string'], 'should have two elements in the array');
});

test('should replace parentheses', function(assert) {
  let result = tokensFromSearchString('(query string)');
  assert.deepEqual(result, ['query','string'], 'should have two elements in the array without paren');
});

test('should not remove # sign', function(assert) {
  let result = tokensFromSearchString('#query');
  assert.deepEqual(result, ['#query'], 'should have hashtag sign');
});

test('nothing in nothing out', function(assert) {
  let result = tokensFromSearchString('');
  assert.deepEqual(result, [''], 'NINO');
});
