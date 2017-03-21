import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-search-bar', 'Integration | Component | simple search bar', {
  integration: true
});

test('onChange is triggered', function(assert) {
  assert.expect(1);
  this.set('testValue', '');
  this.on('inputEntered', function() {
    assert.ok(true, 'key up action called');
  });
  this.render(hbs`{{simple-search-bar value=testValue onChange=(action 'inputEntered') }}`);
  this.$('input').keyup();
});

test('onClear is triggered', function(assert) {
  assert.expect(1);
  this.set('testValue', 'testValue');
  this.on('inputClear', function() {
    assert.ok(true, 'clear action called');
  });
  this.render(hbs`{{simple-search-bar value=testValue onClear=(action 'inputClear') }}`);
  this.$('.fa-close').click();
});

test('close button only shows with text', function(assert) {
  assert.expect(2);
  this.set('testValue', '');
  this.render(hbs`{{simple-search-bar value=testValue }}`);
  assert.equal(this.$('.fa-close').length, 0);
  this.set('testValue', 'some testing text');
  assert.equal(this.$('.fa-close').length, 1);
});
