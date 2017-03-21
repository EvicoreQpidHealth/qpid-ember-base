import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-info', 'Integration | Component | app info', {
  integration: true
});

test('it renders appName', function(assert) {
  this.set('appName', 'amazing app');
  this.render(hbs`{{app-info appName=appName}}`);

  assert.equal(this.$('h3:contains(amazing app)').length, 1, 'should have h3 with app name');
});

test('it renders git tag', function(assert) {
  this.set('gitInfo', {
    tag: '1234'
  });
  this.set('appName', 'amazing app');
  this.render(hbs`{{app-info gitInfo=gitInfo}}`);

  assert.equal(this.$('p:contains(1234)').length, 1, 'should have tag in p');
});

test('it renders git branch', function(assert) {
  this.set('gitInfo', {
    branch: '4.5'
  });
  this.render(hbs`{{app-info gitInfo=gitInfo}}`);

  assert.equal(this.$('p:contains(4.5)').length, 1, 'should have branch in p');
});

test('it renders patch version', function(assert) {
  this.set('gitInfo', {
    appVersion: '4.5.9'
  });
  this.render(hbs`{{app-info gitInfo=gitInfo}}`);

  assert.equal(this.$('p:contains(9)').length, 1, 'should have patch version in p');
});

test('if git branch has `-stable` it is removed from the version', function(assert) {
  this.set('gitInfo', {
    branch: '4.5-stable'
  });
  this.render(hbs`{{app-info gitInfo=gitInfo}}`);

  assert.equal(this.$('p:contains(Version 4.5)').length, 1, 'should have branch in p');
});

test('it shows branch and abbreviatedSha', function(assert) {
  let date = new Date().toISOString();
  this.set('gitInfo', {
    date,
    branch: '4.5-stable',
    abbreviatedSha: 'asdf123'
  });
  this.render(hbs`{{app-info gitInfo=gitInfo}}`);

  assert.equal(this.$('p:contains(asdf123)').length, 1, 'should have sha in p');
  assert.equal(this.$(`p:contains(${date})`).length, 1, 'should have date in p');
});
