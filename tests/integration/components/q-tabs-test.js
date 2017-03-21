import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import QTabs from '../../../components/q-tabs';

moduleForComponent('q-tabs', 'Integration | Component | q tabs', {
  integration: true,
  beforeEach() {
    $('.ember-application').css({ transform: 'none' });
  },
  afterEach() {
    $('.ember-application').css({ transform: 'scale(0.5)' });
  }
});

QTabs.reopen({
  tabFollowAnimationDuration: 0
});

test('it moves the link follower under the active tab', function(assert) {
  // use plain links instead of link-to's to make the active class explicit
  this.render(hbs`
    {{#q-tabs as |tabs|}}
      {{#q-tab tabParent=tabs}}
        <a href="#">one</a>
      {{/q-tab}}
      {{#q-tab tabParent=tabs}}
        <a href="#" class="active">two</a>
      {{/q-tab}}
    {{/q-tabs}}
  `);

  let link = this.$('a.active');
  let expectedFollowerPosition = Math.ceil(link.offset().left);
  let actualFollowerPosition = Math.ceil(this.$('.tab-follow').offset().left);
  assert.equal(actualFollowerPosition, expectedFollowerPosition);
});
/*
test('follower stays under first link if none active', function(assert) {
  this.render(hbs`
    {{#q-tabs}}
      {{#q-tabs as |tabs|}}
        {{#q-tab tabParent=tabs}}
          <a href="#">one</a>
        {{/q-tab}}
        {{#q-tab tabParent=tabs}}
          <a href="#">two</a>
        {{/q-tab}}
      {{/q-tabs}}
    {{/q-tabs}}
  `);

  let expectedFollowerPosition = 0;
  assert.equal(Math.floor(this.$('.tab-follow').offset().left), expectedFollowerPosition);
});

test('follower moves to the link that was clicked', function(assert) {
  assert.expect(3);

  this.set('markActive', false);
  this.on('markLinkActive', () => {
    this.set('markActive', true);
  });

  this.render(hbs`
    {{#q-tabs}}
      {{#q-tabs as |tabs|}}
        {{#q-tab tabParent=tabs}}
          <a href="#">one</a>
        {{/q-tab}}
        {{#q-tab tabParent=tabs}}
          <a class={{if markActive 'active'}} href="#" {{action 'markLinkActive'}}>two</a>
        {{/q-tab}}
      {{/q-tabs}}
    {{/q-tabs}}
  `);

  let expectedFollowerPosition = 0;
  assert.equal(Math.floor(this.$('.tab-follow').offset().left), expectedFollowerPosition);

  this.$('a:nth-of-type(1)').click();

  let link = this.$('a.active');
  let followPosition = Math.ceil(this.$('.tab-follow').offset().left);
  expectedFollowerPosition = Math.ceil(link.offset().left);
  assert.ok(expectedFollowerPosition > 0);
  assert.equal(followPosition, expectedFollowerPosition);
});
*/
