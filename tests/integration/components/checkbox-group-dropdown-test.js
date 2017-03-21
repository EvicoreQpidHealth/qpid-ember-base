import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('checkbox-group-dropdown', 'Integration | Component | checkbox group dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{checkbox-group-dropdown}}`);
  assert.equal(this.$('[data-test-button]').text().trim(), 'None', 'If no options exist button text says "None"');

  let options = Ember.A([
    { key: 'one', value: false }
  ]);
  this.set('options', options);
  this.render(hbs`{{checkbox-group-dropdown options=options}}`);
  assert.equal(this.$('[data-test-button]').text().trim(), 'None', 'If no options are selected button text says "None"');
});

test('selected options format to comma separated string on button', function(assert) {
  let options = Ember.A([
    { key: 'one', value: true },
    { key: 'two', value: true },
    { key: 'three', value: true }
  ]);

  this.set('options', options);
  this.render(hbs`{{checkbox-group-dropdown options=options}}`);

  assert.equal(this.$('[data-test-button]').text().trim(), 'one, two, three', 'comment-separated-str helper on button works correctly');

  this.set('options.0.value', false);

  assert.equal(this.$('[data-test-button]').text().trim(), 'two, three', 'comment-separated-str helper on button updates correctly');
});

test('options appear in dropdown list', function(assert) {
  let options = Ember.A([
    { key: 'one', value: true },
    { key: 'two', value: true },
    { key: 'three', value: true }
  ]);

  this.set('options', options);
  this.render(hbs`{{checkbox-group-dropdown options=options}}`);

  assert.equal(this.$('[data-test-content] input[type="checkbox"]').length, 3, 'number of checkboxes equals number of options');
  assert.equal(this.$('[data-test-content] input[type="checkbox"]:checked').length, 3, 'number of checked checkboxes equals number of options that are true');

  this.set('options.0.value', false);

  assert.equal(this.$('[data-test-content] input[type="checkbox"]:checked').length, 2, 'Checkboxes stay synched with values');
});
