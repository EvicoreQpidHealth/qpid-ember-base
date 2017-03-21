import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-search-patient', 'Integration | Component | app search patient', {
  integration: true
});

test('it renders a header', function(assert) {
  this.set('result', { isHeader: true });

  this.render(hbs`{{app-search-patient result=result}}`);

  assert.equal(this.$('.columns:contains(Patient Name)').length, 1, 'should have Patient name column');
  assert.equal(this.$('.columns:contains(MRN)').length, 1, 'should have MRN column');
  assert.equal(this.$('.columns:contains(DOB)').length, 1, 'should have DOB column');
});

test('it renders rows', function(assert) {
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  let result = {
    name: 'dave',
    last_name: 'last',
    first_name: 'first',
    patient_identifier: 123,
    dob: '12/31/1999'
  };
  this.set('result', result);

  this.render(hbs`{{app-search-patient result=result}})`);

  assert.equal(this.$(`.columns:contains('last, first')`).length, 1, 'should have Patient name column');
  assert.equal(this.$(`.columns:contains(${result.patient_identifier})`).length, 1, 'should have MRN column');
  assert.equal(this.$(`.columns:contains('12-31-1999')`).length, 1, 'should have DOB column');
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
});

test('it renders with null values', function(assert) {
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  let result = {
    name: null,
    last_name: null,
    first_name: null,
    patient_identifier: null,
    dob: null
  };
  this.set('result', result);

  this.render(hbs`{{app-search-patient result=result}})`);

  assert.equal(this.$('.columns:nth-of-type(1)').text().trim(), '-', 'column 1 should have dash');
  assert.equal(this.$('.columns:nth-of-type(2)').text().trim(), '-', 'column 2 should have dash');
  assert.equal(this.$('.columns:nth-of-type(3)').text().trim(), '-', 'column 3 should have dash');
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
});

test('it renders with undefined values', function(assert) {
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  let result = {
  };
  this.set('result', result);

  this.render(hbs`{{app-search-patient result=result}})`);

  assert.equal(this.$('.columns:nth-of-type(1)').text().trim(), '-', 'column 1 should have dash');
  assert.equal(this.$('.columns:nth-of-type(2)').text().trim(), '-', 'column 2 should have dash');
  assert.equal(this.$('.columns:nth-of-type(3)').text().trim(), '-', 'column 3 should have dash');
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
});
