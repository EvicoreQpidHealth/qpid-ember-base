import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hover-edit', 'Integration | Component | hover edit', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  const model = {
    value: 'test'
  };

  this.set('model', model);
  this.render(hbs`
    {{hover-edit
      value=model.value}}`);
  assert.equal(this.$('.hover-edit').text().trim(), 'test', 'we passed "test" as a value');

  // test block params
  this.render(hbs`
    {{#hover-edit}}
      testText
    {{/hover-edit}}
  `);
  assert.equal(this.$('.hover-edit').text().trim(), 'testText');
});

test('icon appears if configured', function(assert) {
  assert.expect(1);

  const model = {
    value: 'test'
  };

  this.set('model', model);
  this.render(hbs`
    {{hover-edit
      value=model.value
      showIcon=true}}`);
  assert.equal(this.$('i.fa-pencil').length, 1, 'one icon appears');
});
