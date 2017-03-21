import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
// import { resizeInputWidthModifier } from '../../../components/fancy-search';
import {
  triggerEnterKey,
  triggerKey
} from '../../helpers/key-event';

const { run, RSVP } = Ember;

moduleForComponent('fancy-search', 'Integration | Component | fancy search', {
  integration: true
});

test('it renders', function(assert) {
  this.set('actions', {
    doSearch() {}
  });
  this.render(hbs`{{fancy-search doSearch=(action 'doSearch')}}`);

  assert.equal(this.$('input').length, 1);
});

test('has a clear search button when text is present', function(assert) {
  this.set('actions', {
    doSearch() {
      return RSVP.Promise.resolve([]);
    }
  });

  this.render(hbs`
    {{fancy-search
      doSearch=(action 'doSearch')
      searchInputText='foo'}}
  `);

  run(() => {
    this.$('input').focus().focus();
  });

  run(() => {
    let cancelButton = this.$('.search-button-close');
    assert.equal(cancelButton.length, 1);

    cancelButton.click();

    cancelButton = this.$('.search-button-close');
    assert.equal(cancelButton.length, 0);
  });
});

test('always shows a search icon if toggleSearchIcon is false', function(assert) {
  this.set('actions', {
    doSearch() {}
  });
  this.render(hbs`{{fancy-search doSearch=(action 'doSearch')}}`);

  assert.equal(this.$('.search-icon').length, 1, 'should have a set search icon');
});

test('shows a search icon when focused if toggleSearchIcon is true', function(assert) {
  assert.expect(2);
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`{{fancy-search doSearch=(action 'doSearch') toggleSearchIcon=true}}`);

  assert.equal(this.$('.search-icon').length, 0, 'should not have a set search icon');

  run(() => this.$('input').focus().focus());

  assert.equal(this.$('.search-icon').length, 1, 'should have a set search icon');
});
/*
test('sets width based on input length', function(assert) {
  this.set('searchText', 'foo');
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`
    {{fancy-search
      resizeToContent=true
      doSearch=(action 'doSearch')
      searchInputText=searchText}}
  `);

  assert.equal(this.$('.auto-width').attr('style'), `width: ${3 * resizeInputWidthModifier}px`, '3 letters * modifier + icon width');
});

test('sets width based on placeholder', function(assert) {
  let placeholder = 'my placeholder';
  this.set('placeHolderText', placeholder);
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`
    {{fancy-search
      resizeToContent=true
      doSearch=(action 'doSearch')
      searchInputText=searchText
      placeHolderText=placeHolderText}}
  `);

  assert.equal(this.$('.auto-width').attr('style'), `width: ${placeholder.length * resizeInputWidthModifier}px`, `width should be ${placeholder.length} letters * modifier`);
});
*/
test('sets width to 100% if resizeToContent is false', function(assert) {
  this.set('searchText', 'foo');
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`
    {{fancy-search
      resizeToContent=false
      doSearch=(action 'doSearch')
      searchInputText=searchText}}
  `);

  assert.equal(this.$('.auto-width').attr('style'), 'width: 100%');
});

test('sets width to 100% if focused', function(assert) {
  this.set('searchText', 'foo');
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`
    {{fancy-search
      resizeToContent=true
      doSearch=(action 'doSearch')
      searchInputText=searchText}}
  `);

  run(() => this.$('input').focus().focus());

  assert.equal(this.$('.auto-width').attr('style'), 'width: 100%');
});

test('performs search if enter is pressed', function(assert) {
  const done = assert.async();
  const newSearch = 'foo2';

  this.set('searchText', 'foo');
  this.set('actions', {
    doSearch(search) {
      assert.equal(search, newSearch, `search should equal ${newSearch}.`);
      done();
    }
  });

  this.render(hbs`
    {{fancy-search
      resizeToContent=true
      searchInputText=searchText
      doSearch=(action 'doSearch')}}
  `);

  run(() => {
    // fake new input
    this.$('input').val('foo2');
    triggerKey(this.$('input'), 77);
  });

  run(() => {
    triggerEnterKey(this.$('input'));
  });
});

test('renders block for input if provided', function(assert) {
  this.set('actions', {
    doSearch() {}
  });

  this.render(hbs`
    {{#fancy-search}}

      <div class="not-a-good-input">what</div>

    {{/fancy-search}}
  `);

  assert.equal(this.$('.not-a-good-input').text().trim(), 'what', 'should get our custom block');
});
