import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('q-progress-bar', 'Integration | Component | q progress bar', {
  integration: true
});

test('it knows when the goal has NOT been reached', function(assert) {
  assert.expect(1);

  this.render(hbs`
      {{q-progress-bar
        completed=4
        skipped=2
        all=20
        goal=5
      }}
  `);
  assert.equal(this.$('.complete.meter').hasClass('completed'), false, 'Is not completed');
});

test('it knows when the goal has been reached', function(assert) {
  assert.expect(1);

  this.render(hbs`
      {{q-progress-bar
        completed=5
        skipped=2
        all=20
        goal=5
      }}
  `);
  assert.equal(this.$('.complete.meter').hasClass('completed'), true, 'Is completed');
});

test('Completed percent working correctly', function(assert) {
  assert.expect(1);

  this.render(hbs`
      {{q-progress-bar
        completed=10
        skipped=2
        all=20
        goal=10
      }}
  `);
  assert.equal(this.$('.complete.meter').attr('style'), 'width: 50%;', 'calculating completed percent correctly');
});

test('Skipped percent working correctly', function(assert) {
  assert.expect(1);

  this.render(hbs`
      {{q-progress-bar
        completed=2
        skipped=10
        all=100
        goal=10
      }}
  `);
  assert.equal(this.$('.skipped.meter').attr('style'), 'width: 12%;', 'calculating skipped percent correctly');
});
