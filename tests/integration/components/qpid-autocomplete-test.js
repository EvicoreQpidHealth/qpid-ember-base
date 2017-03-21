import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import Autocomplete from '../../../components/qpid-autocomplete';

const { run, RSVP } = Ember;

moduleForComponent('qpid-autocomplete', 'Integration | Component | qpid autocomplete', {
  integration: true
});

Autocomplete.reopen({
  debounceTime: 0
});

function focusAutocomplete(input) {
  run(() => {
    input.focus().focus();
  });
}

test('yields results for custom markup', function(assert) {
  this.set('selectedValue', Ember.Object.create({
    myCoolProp: 'whoa'
  }));
  this.set('actions', {
    doSearch() {
      return RSVP.Promise.resolve([
        Ember.Object.create({ myCoolProp: 'yep' })
      ]);
    }
  });

  this.render(hbs`{{#qpid-autocomplete
    selectedValue=selectedValue
    searchQueryAction=(action 'doSearch') as |result|}}

    <strong>result is: {{result.myCoolProp}}</strong>
  {{/qpid-autocomplete}}`);

  focusAutocomplete(this.$('input'));

  assert.equal(this.$('.suggestions').text().trim(), 'result is: whoa', 'results should yield to block');
});

test('it shows default no results message if no results', function(assert) {
  let done = assert.async();
  this.set('actions', {
    doSearch() {
      let promise = RSVP.resolve([]);

      run.next(() => {
        assert.equal(this.$('.message').text().trim(), 'No results.', 'default message should show if no suggestions');
        done();
      });

      return promise;
    }
  });

  this.render(hbs`
    {{#qpid-autocomplete
      searchQueryAction=(action 'doSearch') as |result|}}

      <strong>result is: {{result}}</strong>
    {{/qpid-autocomplete}}`);

  focusAutocomplete(this.$('input'));
  this.$('input').val('foo').keyup();
});

test('uses an inverse block for custom "not found" text', function(assert) {
  let done = assert.async();
  this.set('actions', {
    doSearch() {
      let promise = RSVP.resolve([]);

      run.next(() => {
        assert.equal(this.$('.message').text().trim(), 'sorry, nothing here.', 'default message should show if no suggestions');
        done();
      });

      return promise;
    }
  });

  this.render(hbs`
    {{#qpid-autocomplete
      searchQueryAction=(action 'doSearch') as |result|}}

      <strong>result is: {{result}}</strong>
    {{else}}
      sorry, nothing here.
    {{/qpid-autocomplete}}`);

  focusAutocomplete(this.$('input'));
  this.$('input').val('foo').keyup();
});

test('does not show suggestion if input is empty', function(assert) {
  this.set('actions', {
    doSearch() {
      return RSVP.resolve([]);
    }
  });

  this.render(hbs`
    {{#qpid-autocomplete
      searchQueryAction=(action 'doSearch') as |result|}})

      {{result}}
    {{/qpid-autocomplete}}
  `);

  focusAutocomplete(this.$('input'));

  assert.equal(this.$('.suggestions').length, 0, 'should not get suggestions with empty input');
});
