import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hover-tooltip', 'Integration | Component | hover tooltip', {
  integration: true
});

test('it renders', function(assert) {
  this.$('.has-tip').foundation();

  this.render(hbs`{{hover-tooltip tooltipText='tooltip'
    infoText='information' }}`);

  assert.equal(this.$().text().trim(), 'information', 'infoText renders in nonBlock form');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#hover-tooltip tooltipText='tooltip' }}
      Block Info Text
    {{/hover-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'Block Info Text', 'infoText renders in block form');
});

test('tooltip placed as title attribute', function(assert) {
  this.render(hbs`{{hover-tooltip tooltipText='tooltip'
    infoText='information' }}`);

  assert.equal(this.$('.has-tip').attr('title'), 'tooltip');
});
