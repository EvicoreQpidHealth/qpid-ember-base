import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-infinite-scroll', 'Integration | Component | simple infinite scroll', {
  integration: true
});

test('block form renders', function(assert) {
  // testing block form
  this.render(hbs`
    {{#simple-infinite-scroll }}
      <p>loading...</p>
    {{/simple-infinite-scroll }}
  `);
  assert.equal(this.$('p').text().trim(), 'loading...');
});
