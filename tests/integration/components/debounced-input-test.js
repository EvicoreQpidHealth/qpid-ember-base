import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  triggerKey,
  triggerEscapeKey
} from '../../helpers/key-event';
import DebouncedInput from '../../../components/debounced-input';

moduleForComponent('debounced-input', 'Integration | Component | debounced input', {
  integration: true
});

DebouncedInput.reopen({
  onChangeDebounceTime: 0
});

test('sets the input to value', function(assert) {
  this.set('value', 'whoa');
  this.set('actions', {
    onSearch() {}
  });

  this.render(hbs`
    {{debounced-input value=value onInputChanged=(action 'onSearch')}}
  `);

  assert.equal(this.$('input').val(), 'whoa');
});

test('defaults placeholder to Search...', function(assert) {
  assert.expect(2);
  this.set('actions', {
    onSearch() {}
  });

  this.render(hbs`
    {{debounced-input placeholder=placeholder onInputChanged=(action 'onSearch')}}
  `);

  assert.equal(this.$('input').attr('placeholder'), 'Search...');

  this.set('placeholder', 'huh?');

  assert.equal(this.$('input').attr('placeholder'), 'huh?');
});

test('sends a search action on keypress', function(assert) {
  assert.expect(1);
  let done = assert.async();

  let newSearch = 'foo';

  this.set('actions', {
    onSearch(searchText) {
      assert.equal(searchText, newSearch, '`onSearch` is called and search text is passed to action');
      done();
    }
  });

  this.render(hbs`
    {{debounced-input value=value onInputChanged=(action 'onSearch')}}
  `);

  // fake input being set and keypress
  this.set('value', newSearch);
  triggerKey(this.$('input'), 77, { type: 'keypress' });
});

test('sends escape-press action on escape press', function(assert) {
  assert.expect(1);
  let done = assert.async();

  this.set('value', 'start');
  this.set('actions', {
    onSearch() {},
    onCancel() {
      assert.ok(true, '`onCancel` is called');
      done();
    }
  });

  this.render(hbs`
    {{debounced-input value=value onInputChanged=(action 'onSearch') escape-press=(action 'onCancel')}}
  `);

  triggerEscapeKey(this.$('input'));
});

test('blows up if no onInputChanged action', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`
      {{debounced-input value=value}}
    `);
  }, /Must provide an onInputChanged action./i, 'should blow up if not passed.');
});
