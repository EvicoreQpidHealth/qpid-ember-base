import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('confirm-dialog', 'Integration | Component | confirm dialog', {
  integration: true
});

test('it renders block text', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#confirm-dialog}}
      hi
    {{/confirm-dialog}}
  `);

  assert.equal(this.$('.reveal-modal:contains(hi)').length, 1, 'hi should be in modal');
});

test('it has a yes button', function(assert) {
  this.render(hbs`
    {{#confirm-dialog}}
      hi
    {{/confirm-dialog}}
  `);

  assert.equal(this.$('button:contains(Yes)').length, 1, 'should have yes button');
});

test('it has a no button', function(assert) {
  this.render(hbs`
    {{#confirm-dialog}}
      hi
    {{/confirm-dialog}}
  `);

  assert.equal(this.$('button:contains(No)').length, 1, 'should have no button');
});

test('buttons correctly fire actions', function(assert) {
  assert.expect(2);

  this.set('actions', {
    onConfirmNo() {
      assert.ok(true, 'onConfirmNo should have been called');
    },
    onConfirmYes() {
      assert.ok(true, 'onConfirmYes should have been called');
    }
  });

  this.render(hbs`
    {{#confirm-dialog onConfirmNo=(action 'onConfirmNo') onConfirmYes=(action 'onConfirmYes')}}
      hi
    {{/confirm-dialog}}
  `);

  this.$('button:contains(No)').click();
  this.$('button:contains(Yes)').click();
});
