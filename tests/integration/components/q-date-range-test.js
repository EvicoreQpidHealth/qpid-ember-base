import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-date-range', 'Integration | Component | q date range', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{q-date-range}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#q-date-range}}
      template block text
    {{/q-date-range}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
