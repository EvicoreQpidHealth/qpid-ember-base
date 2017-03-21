import { moduleForComponent, test } from 'ember-qunit';
// import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

// Stub location service
const foundationStub = Ember.Service.extend({
  foundation() {
    // foundation tooltip reflowing
  }
});

moduleForComponent('grid-dropdown', 'Integration | Component | grid dropdown', {
  integration: true,
  beforeEach() {
    this.register('service:foundation-service', foundationStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "foundationService" within each test
    this.inject.service('foundation-service', { as: 'foundationService' });
  }
});

test('it renders', function(assert) {
  assert.expect(0);
  // TODO: use mirage server createList
  let displayRegion = Ember.Object.extend({ row: 1, column: 1, label: 'New label', value: '' });
  let gridLayoutt = Ember.A();

  gridLayoutt.pushObjects([
    displayRegion.create({ column: 1, row: 1, label: 'Diseases 1 1', value: 'disease' }),
    displayRegion.create({ column: 2, row: 1, label: 'Medications/Treatments 1 2', value: 'med' }),
    displayRegion.create({ column: 3, row: 1, label: 'Labs/Diagnostics 1 3', value: 'lab' }),
    displayRegion.create({ column: 2, row: 2, label: 'Other 2 2', value: 'Other' }),
    displayRegion.create({ column: 1, row: 2, label: 'Diseases 2 1', value: 'disease' })]
  );

  let displayLayoutt = Ember.A();
  displayLayoutt.pushObject(displayRegion.create({ column: 1, row: 1, label: 'Diseases 1 1', value: 'disease' }));

  this.set('gridLayout', gridLayoutt);
  this.set('displayLayout', displayLayoutt);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  // this.render(hbs`{{grid-dropdown gridLayout=gridLayout displayLayout=displayLayout}}`);

  // assert.equal(this.$().text().trim(), '');
  // Template block usage:" + EOL +
  // this.render(hbs`
  //   {{#grid-dropdown gridLayout=gridLayout displayLayout=displayLayout}}
  //     template block text
  //   {{/grid-dropdown}}
  // `);
  // this.$().text().trim()
  // assert.equal(this.$().text().trim(), 'template block text');
});
