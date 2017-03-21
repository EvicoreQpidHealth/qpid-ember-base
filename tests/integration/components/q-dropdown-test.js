import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-dropdown', 'Integration | Component | q dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('btnText', 'dropdown button');
  this.render(hbs`{{q-dropdown btnText=btnText}}`);

  assert.equal(this.$('[data-test-button]').text().trim(), 'dropdown button', 1);

  this.render(hbs`
    {{#q-dropdown btnText=btnText}}
      <li>template block text</li>
    {{/q-dropdown}}
  `);
  assert.equal(this.$('[data-test-button]').text().trim(), 'dropdown button', 2);
  assert.equal(this.$('[data-test-content] li').text().trim(), 'template block text');
});

test('passed in classes added to default class', function(assert) {
  this.set('baseBtnClass', 'dd-button');
  this.set('btnClass', 'new-class other-class');

  this.render(hbs`{{q-dropdown btnClass=btnClass}}`);

  assert.equal(this.$('a').attr('class'), 'dd-button new-class other-class');
});
