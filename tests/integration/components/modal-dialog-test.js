import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerEscapeKey } from '../../helpers/key-event';

moduleForComponent('modal-dialog', 'Integration | Component | modal dialog', {
  integration: true
});

test('it renders block text', function(assert) {
  this.render(hbs`
    {{#modal-dialog}}
      hi
    {{/modal-dialog}}
  `);

  assert.equal(this.$('.reveal-modal:contains(hi)').length, 1, 'hi should be in modal');
});

test('sends close action via keyboard', function(assert) {
  assert.expect(1);
  let done = assert.async();

  this.set('actions', {
    closeModal() {
      assert.ok(true, 'closeModal should have been called');
      done();
    }
  });

  this.render(hbs`
    {{#modal-dialog on-close=(action 'closeModal')}}
      hi
    {{/modal-dialog}}
  `);

  triggerEscapeKey(this.$('.reveal-modal'));
});
