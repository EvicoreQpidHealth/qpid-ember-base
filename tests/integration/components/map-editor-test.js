import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import {
  triggerKey
} from '../../helpers/key-event';

moduleForComponent('map-editor', 'Integration | Component | map editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('map', Ember.Object.create({ hello: 'world' }));
  this.render(hbs`{{map-editor map=map}}`);

  assert.equal(this.$('.test-property-column').text().trim(), 'hello', 'property should get rendered');
  assert.equal(this.$('.test-value-column input').val().trim(), 'world', 'property value should get rendered');
});

test('add property button works', function(assert) {
  assert.expect(1);

  this.set('map', Ember.Object.create({ }));
  this.set('actions', {
    change() {}
  });
  this.render(hbs`{{map-editor map=map change=(action "change")}}`);

  this.$('input.test-new-property').val('foo').keyup();
  this.$('button').click();
  assert.equal(this.$('.test-property-column').text().trim(), 'foo', 'property should get rendered');
});

test('update property works', function(assert) {
  // assert.expect(3);
  let done = assert.async();

  this.set('map', Ember.Object.create({ foo: 'bar' }));
  this.set('actions', {
    change(property, value) {
      assert.equal(property, 'foo', 'property change should get sent');
      assert.equal(value, 'bar', 'property change value should get recieved');
      done();
    }
  });
  this.render(hbs`{{map-editor map=map change=(action "change")}}`);
  triggerKey(this.$('.test-value-column input'), 77, { type: 'keypress' });
});

test('delete property button works', function(assert) {
  // assert.expect(1);
  let done = assert.async();

  this.set('map', Ember.Object.create({ hello: 'world' }));
  this.set('actions', {
    delete(property) {
      assert.equal(property, 'hello', 'delete should get triggered');
      done();
    }
  });
  this.render(hbs`{{map-editor map=map delete=(action "delete")}}`);

  this.$('.test-delete-link').click();
});
