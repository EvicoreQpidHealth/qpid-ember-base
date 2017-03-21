import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('radio-button-list', 'Integration | Component | radio button list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{radio-button-list}}`);

  assert.equal(this.$().text().trim(), '');
});

test('should create buttons for every option', function(assert) {
  let options = [
    {
      label: 'Label 1',
      value: 1,
      checked: true
    },
    {
      label: 'Label 2',
      value: 2,
      checked: false
    }
  ];

  this.set('options', options);

  this.render(hbs`{{radio-button-list group='testGroup' options=options}}`);

  assert.equal(this.$('label').length, 2);
});

test('clicking should set the checked property', function(assert) {
  this.on('selectOption', function(option) {
    this.set('choice', option);
  });

  this.set('choice', '1');

  let options = Ember.computed('choice', function() {
    return [
      {
        label: 'Label 1',
        value: '1',
        checked: this.get('choice') === '1'
      },
      {
        label: 'Label 2',
        value: '2',
        checked: this.get('choice') === '2'
      },
      {
        label: 'Label 3',
        value: '3',
        checked: this.get('choice') === '3'
      }
    ];
  });

  this.set('options', options);

  this.render(hbs`{{radio-button-list options=options selectRadio=(action 'selectOption') group='testGroup'}}`);

  assert.equal(this.$('input:checked').val(), '1');

  this.$('input:eq(1)').click();

  assert.equal(this.$('input:checked').val(), '2');
});
