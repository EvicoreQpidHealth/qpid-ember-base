import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-table', 'Integration | Component | q table', {
  integration: true
});

test('table cells render', function(assert) {
  // use plain links instead of link-to's to make the active class explicit
  this.set('content', Ember.A([
    { name: 'Name1', details: 'Details1' },
    { name: 'Name2', details: 'Details2' }
  ]));

  this.set('columns', Ember.A([
    {
      name: 'name',
      field: 'name'
    },
    {
      name: 'details',
      field: 'details'
    }
  ]));

  this.render(hbs`{{q-table columns=columns content=content}}`);

  assert.equal(this.$('.test-col-header')[0].textContent.trim(), 'Name');
  assert.equal(this.$('.test-col-header')[1].textContent.trim(), 'Details');
  assert.equal(this.$('td')[0].textContent.trim(), 'Name1');
  assert.equal(this.$('td')[1].textContent.trim(), 'Details1');
  assert.equal(this.$('td')[2].textContent.trim(), 'Name2');
  assert.equal(this.$('td')[3].textContent.trim(), 'Details2');
});
