import Ember from 'ember';
import CustomWarningsInitializer from '../../../initializers/custom-warnings';
import { module, test, skip } from 'qunit';

function isBeforeEmber2() {
  return parseInt(Ember.VERSION) < 2;
}

let application;
let warningCalledCount = 0;
const warnFn = Ember.warn;

function rewireWarnToCheckOurDeprecationNotice() {
  warningCalledCount = 0;
  Ember.warn = (...args) => {
    let [message] = args;
    if (message.indexOf && message.indexOf(`"Ember.computed.mapBy" does not always work as expected`) === 0) {
      warningCalledCount++;
    }
    warnFn(...args);
  };
}

module('Unit | Initializer | custom warnings', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
    rewireWarnToCheckOurDeprecationNotice();
  },
  afterEach() {
    Ember.warn = warnFn;
  }
});

// Our mapBy inititalizer will not throw warnings once we hit Ember 2
let testOrSkipMapBy = test;
if (!isBeforeEmber2()) {
  testOrSkipMapBy = skip;
}

testOrSkipMapBy('should be able to call mapBy and get warning', function(assert) {
  CustomWarningsInitializer.initialize(application);
  let TestComponent = Ember.Component.extend({
    options: Ember.A([{ value: 1, key: 'A' }, { value: 1, key: 'B' }]),
    mapped: Ember.computed.mapBy('options', 'key')
  });

  let comp = new TestComponent();
  assert.deepEqual(comp.get('mapped'), ['A', 'B']);
  assert.ok(warningCalledCount >= 1, 'expected a warning to be logged');
});
