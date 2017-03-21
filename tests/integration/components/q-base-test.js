import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-base', 'Integration | Component | q base', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{q-base}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#q-base}}
      template block text
    {{/q-base}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
