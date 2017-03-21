import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('back-link', 'Integration | Component | back link', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{back-link}}`);
  assert.equal(this.$('.test-back-link a').length, 1, 'one link renders');

  this.render(hbs`
    {{#back-link}}
      link text
    {{/back-link}}
  `);
  assert.equal(this.$('.test-back-link').text().trim(), 'link text', 'back-link block text appears');
});
