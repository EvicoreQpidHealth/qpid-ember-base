import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('q-table-cell', 'Integration | Component | q table cell', {
  integration: true
});

test('cell with text renders', function(assert) {
  assert.expect(1);

  this.set('data', { 'title': 'Text...' });
  this.render(hbs`{{q-table-cell data=data field='title'}}`);
  assert.equal(this.$().text().trim(), 'Text...');
});

test('cell with date renders', function(assert) {
  assert.expect(1);

  this.set('data', { 'time': moment([2010, 0, 1]) });
  this.render(hbs`{{q-table-cell data=data field='time' type='date' format='MM/DD/YYYY'}}`);
  assert.equal(this.$().text().trim(), '01/01/2010');
});
