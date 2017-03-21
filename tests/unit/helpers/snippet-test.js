import { snippet } from '../../../helpers/snippet';
import { module, test } from 'qunit';

module('Unit | Helper | snippet');

test('old snippet version test', function(assert) {
  let input = {
    context: 'This is a |||MATCH|||highlighted|||/MATCH||| snippet'
  };
  let result = snippet(input);
  assert.equal(result, 'This is a <span class="highlight">highlighted</span> snippet');
});

test('new snippet version test', function(assert) {
  let input = {
    context: 'This is a highlighted snippet',
    snippetStartOffset: 10,
    snippetEndOffset: 21
  };
  let result = snippet(input);
  assert.equal(result, 'This is a <span class="highlight">highlighted</span> snippet');
});

test('no highlight version test', function(assert) {
  let input = {
    context: 'This is a not highlighted snippet'
  };
  let result = snippet(input);
  assert.equal(result, 'This is a not highlighted snippet');
});
