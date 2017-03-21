import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-count', 'Integration | Component | notification count', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{notification-count}}`);

  assert.equal(this.$().text().trim(), '');
});

test('counts display correctly', function(assert) {
  this.set('count', 20);

  this.render(hbs`{{notification-count count=count maxDisplayCount=21}}`);
  assert.equal(this.$().text().trim(), '20', 'shows correct number when below max count');

  this.set('count', 24);
  assert.equal(this.$().text().trim(), '21+', 'shows the max number plus "+" when above the max count');
});

test('Hides when count is 0', function(assert) {
  this.set('count', 0);

  this.render(hbs`{{notification-count count=count}}`);
  assert.equal(this.$('.notification-amount').hasClass('hide'), true, 'Hides when 0');

  this.set('count', 1);
  assert.equal(!this.$('.notification-amount').hasClass('hide'), true, 'Shows when over 0');
});

test('Calls action when clicked', function(assert) {
  assert.expect(1);
  let clickCount = 0;
  this.set('count', 1);
  this.on('myAction', function() {
    clickCount++;
    assert.equal(clickCount, 1, 'Triggers myAction when clicked');
  });

  this.render(hbs`{{notification-count count=count action="myAction"}}`);
  this.$('.notification-amount').trigger('click');
});
