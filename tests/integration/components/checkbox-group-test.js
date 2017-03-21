import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('checkbox-group', 'Integration | Component | checkbox group', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{checkbox-group}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it renders checkboxes', function(assert) {
  let options = Ember.A([
    { key: 'one', value: true },
    { key: 'two', value: true },
    { key: 'three', value: true }
  ]);
  this.set('options', options);
  this.render(hbs`{{checkbox-group options=options}}`);

  assert.equal(this.$('label').text().trim().replace(/\s+/g, ' '), 'one two three', 'key labels render correctly');
  assert.equal(this.$('input[type="checkbox"]').length, 3, 'number of checkboxes equals number of options');
  assert.equal(this.$('input[type="checkbox"]:checked').length, 3, 'number of checked checkboxes equals number of options that are true');
});

test('checkbox checked state synces with values', function(assert) {
  let options = Ember.A([
    { key: 'one', value: true },
    { key: 'two', value: true },
    { key: 'three', value: true }
  ]);
  this.set('options', options);
  this.render(hbs`{{checkbox-group options=options}}`);

  assert.equal(this.$('input[type="checkbox"]').length, 3, 'number of checkboxes equals number of options');
  assert.equal(this.$('input[type="checkbox"]:checked').length, 3, 'number of checked checkboxes equals number of options that are true');

  this.set('options.0.value', false);
  this.set('options.1.value', false);

  assert.equal(this.$('input[type="checkbox"]').length, 3, 'number of checkboxes equals number of options');
  assert.equal(this.$('input[type="checkbox"]:checked').length, 1, 'Checkboxes stay synched with values');
});
