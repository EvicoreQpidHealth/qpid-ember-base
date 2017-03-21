import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toggle-button', 'Integration | Component | toggle button', {
  integration: true
});

test('button renders correctly when false', function(assert) {
  assert.expect(2);

  const model = {
    value: true
  };

  this.set('model', model);
  this.render(hbs`
    {{#toggle-button value=model.value}}test{{/toggle-button}}`);
  assert.equal(this.$('button').text().trim(), 'test', 'button renders test contents');
  assert.equal(this.$('button').hasClass('outline-only'), false, 'button renders as selected');
});

test('button click flips state', function(assert) {
  assert.expect(3);

  const model = {
    value: true
  };

  this.set('model', model);
  this.render(hbs`
    {{#toggle-button value=model.value}}test{{/toggle-button}}`);

  assert.equal(this.$('button').hasClass('outline-only'), false, 'button renders as selected');
  this.$('button').click();
  assert.equal(this.$('button').hasClass('outline-only'), true, 'button does not render as selected');
  assert.equal(model.value, false, 'value stated is flipped');
});
