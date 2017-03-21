import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete-list', 'Integration | Component | autocomplete list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.on('searchAction', () => {});
  this.on('deleteItem', () => {});
  this.on('onSelect', () => {});

  this.render(hbs`{{autocomplete-list searchAction=(action 'searchAction') deleteItem=(action 'deleteItem') onSelect=(action 'onSelect') }}`);

  assert.equal(this.$().text().trim(), '');
});

test('each item renders as an element in the list', function(assert) {
  let items = ['item 1', 'item 2', 'item 3'];
  this.set('items', items);
  this.on('searchAction', () => {});
  this.on('deleteItem', () => {});
  this.on('onSelect', () => {});

  this.render(hbs`{{autocomplete-list items=items searchAction=(action 'searchAction') deleteItem=(action 'deleteItem') onSelect=(action 'onSelect') }}`);

  assert.equal(this.$('a').length, 3);
});

test('clicking the x next to an item removes it from the list', function(assert) {
  let items = Ember.A(['item 1', 'item 2', 'item 3']);
  this.set('items', items);
  this.on('searchAction', () => {});
  this.on('deleteItem', () => {});
  this.on('onSelect', () => {});

  this.on('deleteItem', function(item) {
    this.get('items').removeObject(item);
  });

  this.render(hbs`{{autocomplete-list items=items deleteItem=(action 'deleteItem') searchAction=(action 'searchAction') deleteItem=(action 'deleteItem') onSelect=(action 'onSelect') }}`);

  assert.equal(this.$('a').length, 3);

  this.$('a:eq(0)').click();

  assert.equal(this.$('a').length, 2);
});
