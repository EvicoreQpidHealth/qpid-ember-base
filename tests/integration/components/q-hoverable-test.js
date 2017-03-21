import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-hoverable', 'Integration | Component | q hoverable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{q-hoverable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#q-hoverable}}
      template block text
    {{/q-hoverable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
