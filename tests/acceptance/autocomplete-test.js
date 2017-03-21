import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';
import KEYCODES from '../../utils/keycodes';
import Autocomplete from '../../components/qpid-autocomplete';

module('Acceptance | autocomplete', {
  beforeEach() {
    this.application = startApp();
    Autocomplete.reopen({
      debounceTime: 0
    });
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

function suggestionWithText(text) {
  return find(`.suggestion:contains(${text})`);
}

test('autocomplete works with plain text values', function(assert) {
  visit('/autocomplete');
  fillIn('.search-input.plain-text', 'ye');

  andThen(function() {
    assert.ok(suggestionWithText('yep'), 'should have a suggestion called yep');
  });
});

test('autocomplete works with objects and uses arrow keys', function(assert) {
  visit('/autocomplete');
  fillIn('.search-input.object', 'ye');

  andThen(() => {
    let suggestionLength = find('.suggestion').length;
    assert.equal(suggestionLength, 3, 'should have 3 suggestions');
    assert.ok(suggestionWithText('Sarah'), 'should have a suggestion called yep');
  });

  // select the 2nd item in the list
  keyEvent('.search-input.object', 'keyup', KEYCODES.DOWN_ARROW);
  keyEvent('.search-input.object', 'keyup', KEYCODES.DOWN_ARROW);
  keyEvent('.search-input.object', 'keyup', KEYCODES.ENTER);

  andThen(() => {
    let searchText = find('.search-input.object').val();
    // our autocomplete calls in the dummy app prefix response time + id for id.
    assert.equal(searchText, '302 - Sarah');
  });

  // try to move past 3rd item
  keyEvent('.search-input.object', 'keyup', KEYCODES.DOWN_ARROW);

  andThen(() => {
    let searchText = find('.search-input.object').val();
    assert.equal(searchText, '303 - Mike');
  });

  keyEvent('.search-input.object', 'keyup', KEYCODES.DOWN_ARROW);

  andThen(() => {
    let searchText = find('.search-input.object').val();
    assert.equal(searchText, '303 - Mike');
  });

  // try to move past first
  keyEvent('.search-input.object', 'keyup', KEYCODES.UP_ARROW);
  keyEvent('.search-input.object', 'keyup', KEYCODES.UP_ARROW);
  keyEvent('.search-input.object', 'keyup', KEYCODES.UP_ARROW);

  andThen(() => {
    let searchText = find('.search-input.object').val();
    assert.equal(searchText, '301 - Dave');
  });
});

/**
  In the dummy app, we make up to 3 requests that are different "speeds":
    1: 300ms,
    2: 1000ms,
    3: 100ms

  Id's in the response are 1, 2, 3 + the delay time so that we can key off them

  We want to ensure the last one is always the one that shows.
*/
test('queues requests and always takes the last one', function(assert) {
  visit('/autocomplete');
  fillIn('.search-input.object', 'one');

  andThen(() => {
    // fake changing text so that the test helpers dont queue async behavior
    Ember.$('.search-input.object').val('two').trigger('keyup');
    Ember.run.later(function() {
      Ember.$('.search-input.object').val('three').trigger('keyup');
    }, 300);
  });

  andThen(() => {
    let suggestionLength = find('.suggestion').length;
    assert.equal(suggestionLength, 3, 'should have 3 suggestions');
    assert.ok(suggestionWithText('102 - Sarah'), 'should get the results from the last call');
  });
});

test('enter selects 1st item', function(assert) {
  visit('/autocomplete');

  andThen(() => {
    let searchText = find('.search-input.object').val();
    assert.equal(searchText, '302 - Sarah', '2nd result is selected by default');
  });

  fillIn('.search-input.object', 'fake');
  keyEvent('.search-input.object', 'keyup', KEYCODES.ENTER);

  andThen(() => {
    let searchText = find('.search-input.object').val();
    assert.equal(searchText, '301 - Dave', 'enter should select the first search result');
  });
});
