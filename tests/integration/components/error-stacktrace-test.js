import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-stacktrace', 'Integration | Component | error stacktrace', {
  integration: true
});

test('it shows a list of errors returned in JSON API format', function(assert) {
  this.set('model', {
    errors: [
      {
        status: 403,
        title: 'Nope',
        detail: 'Here are details'
      }
    ]
  });

  this.render(hbs`{{error-stacktrace model=model}}`);

  let text = this.$().text();
  assert.ok(text.match(/403/), 'should have the status code');
  assert.ok(text.match(/Nope/), 'should have the title');
  assert.ok(text.match(/Here are details/), 'should have the details');
});
