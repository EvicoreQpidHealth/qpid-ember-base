import { commaSeparatedStr } from '../../../helpers/comma-separated-str';
import { module, test } from 'qunit';

let consoleErrorCount = 0;
let errorFn = console.error;

function rewireConsoleError() {
  consoleErrorCount = 0;
  console.error = (...args) => {
    let [message] = args;
    if (message.indexOf && message.indexOf(`helper:comma-separated-str: first parameter must be an array. Recieved:`) === 0) {
      consoleErrorCount++;
    }
  };
}

module('Unit | Helper | comma separated str', {
  beforeEach() {
    rewireConsoleError();
  },
  afterEach() {
    console.error = errorFn;
  }
});

test('formatting works', function(assert) {
  let result = commaSeparatedStr([['one', 'two', 'three']]);
  assert.equal(result, 'one, two, three');
});

test('empty text works', function(assert) {
  let result = commaSeparatedStr([['']]);
  assert.equal(result, '');

  let result2 = commaSeparatedStr([[], 'empty']);
  assert.equal(result2, 'empty');
});

test('array warning is called', function(assert) {
  commaSeparatedStr(['booo', 'empy']);
  assert.ok(consoleErrorCount >= 1, 'expected a warning to be logged');
});
