import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('main-nav', 'Integration | Component | main nav', {
  integration: true
});

test('shows nothing if session is unauthenticated', function(assert) {
  this.render(hbs`{{main-nav}}`);
  assert.equal(this.$().text().trim(), '');
});

test('shows a nav bar if authenticated', function(assert) {
  this.set('session', { isAuthenticated: true });
  this.render(hbs`{{main-nav session=session}}`);

  assert.equal(this.$('nav').length, 1, 'should have a nav');
});

test('calls showAppInfo when clicking about', function(assert) {
  assert.expect(1);

  this.set('session', { isAuthenticated: true });
  this.set('actions', {
    showAppInfo() {
      assert.ok(true, 'showAppInfo should have been called');
    }
  });

  this.render(hbs`{{main-nav session=session on-show-app-info=(action 'showAppInfo')}}`);

  this.$('.test-about-link').click();
});

test('throws error clicking about if no on-show-app-info defined', function(assert) {
  this.set('session', { isAuthenticated: true });

  this.render(hbs`{{main-nav session=session}}`);

  assert.throws(function() {
    this.$('.test-about-link').click();
  }, 'about link should throw error');
});

test('yields to block if shouldShowSearch is true', function(assert) {
  this.set('session', { isAuthenticated: true });

  this.render(hbs`
    {{#main-nav session=session shouldShowSearch=true}}
      fake search input
    {{/main-nav}}
  `);

  assert.equal(this.$('section:contains(fake search input)').length, 1, 'should yield to block');
});

test('does not yields to block if shouldShowSearch is false', function(assert) {
  this.set('session', { isAuthenticated: true });

  this.render(hbs`
    {{#main-nav session=session}}
      fake search input
    {{/main-nav}}
  `);

  assert.equal(this.$('section:contains(fake search input)').length, 0, 'should not yield to block');
});
