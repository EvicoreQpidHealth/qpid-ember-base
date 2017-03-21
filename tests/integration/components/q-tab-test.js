import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-tab', 'Integration | Component | q tab', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#q-tab tabParent='fake'}}
      hi
    {{/q-tab}}
  `);

  assert.equal(this.$().text().trim(), 'hi');
});

test('must have a tabParent attribute', function(assert) {

  assert.throws(function() {
    this.render(hbs`
      {{#q-tab}}
        hi
      {{/q-tab}}
    `);
  }, 'Must provide a `tabParent attribute to {{q-tab}}`');
});
