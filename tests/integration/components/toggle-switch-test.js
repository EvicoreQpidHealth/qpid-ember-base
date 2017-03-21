import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toggle-switch', 'Integration | Component | toggle switch', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{toggle-switch}}`);

  assert.equal(this.$().text().trim(), '');
});

test('clicking changes the checked attribute', function(assert) {
  this.set('isChecked', false);

  this.render(hbs`{{toggle-switch switchId='test-switch'
    checked=isChecked }}`);

  assert.equal(this.$('input').is(':checked'), false, 'should start unchecked');

  this.$('input').click();

  assert.equal(this.$('input').is(':checked'), true, 'should be checked');
});

test('clicking triggers the toggleAction', function(assert) {
  assert.expect(1);

  this.set('isChecked', false);
  this.on('testToggle', function() {
    assert.ok(true, 'toggleAction triggered');
  });

  this.render(hbs`{{toggle-switch switchId='test-switch'
    checked=isChecked
    toggleAction=(action 'testToggle')
    }}`);

  this.$('.switch-input').click();
});
