import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table', 'Integration | Component | simple table', {
  integration: true
});

test('it renders', function(assert) {
  this.set('columns', [
    {
      width: '100%',
      headerText: 'testColumn'
    }
  ]);

  this.set('rows', Ember.A([
    {
      name: 'testCell'
    }
  ]));

  this.render(hbs`
    {{#simple-table
      columns=columns
      rows=rows as |row| }}

      <tr>
        <td>{{row.name}}</td>
      </tr>

    {{/simple-table}}
  `);

  assert.equal(this.$('thead tr').text().trim(), 'testColumn');
  assert.equal(this.$('td').text().trim(), 'testCell');
});

test('clicking a header sorts by that column', function(assert) {
  this.set('columns', [
    {
      headerText: 'First Name',
      sortByField: 'firstName',
      width: '50%'
    },
    {
      headerText: 'Last Name',
      sortByField: 'lastName',
      width: '50%'
    }
  ]);

  this.set('rows', Ember.A([
    {
      firstName: 'Amy',
      lastName: 'Zuthers'
    },
    {
      firstName: 'Zoltan',
      lastName: 'Anderson'
    },
    {
      firstName: 'Michael',
      lastName: 'Myers'
    }
  ]));

  this.render(hbs`
    {{#simple-table
      rows=rows
      columns=columns as |row| }}

      <tr>
        <td>{{row.firstName}}</td>

        <td>{{row.lastName}}</td>
      </tr>

    {{/simple-table}}
  `);

  let firstRow = this.$('tr').eq(1);
  let secondRow = this.$('tr').eq(2);
  let thirdRow = this.$('tr').eq(3);

  let removeWhitespace = function(text) {
    let regex = /\s+/g;
    return text.replace(regex, ' ');
  };

  assert.equal(removeWhitespace(firstRow.text().trim()), 'Amy Zuthers');
  assert.equal(removeWhitespace(secondRow.text().trim()), 'Zoltan Anderson');
  assert.equal(removeWhitespace(thirdRow.text().trim()), 'Michael Myers');

  // try sorting by first name, ascending
  this.$('.fa-sort').eq(0).click();

  firstRow = this.$('tr').eq(1);
  secondRow = this.$('tr').eq(2);
  thirdRow = this.$('tr').eq(3);

  assert.equal(removeWhitespace(firstRow.text().trim()), 'Amy Zuthers');
  assert.equal(removeWhitespace(secondRow.text().trim()), 'Michael Myers');
  assert.equal(removeWhitespace(thirdRow.text().trim()), 'Zoltan Anderson');

  // try sorting by last name, ascending
  this.$('.fa-sort').eq(0).click();

  firstRow = this.$('tr').eq(1);
  secondRow = this.$('tr').eq(2);
  thirdRow = this.$('tr').eq(3);

  assert.equal(removeWhitespace(firstRow.text().trim()), 'Zoltan Anderson');
  assert.equal(removeWhitespace(secondRow.text().trim()), 'Michael Myers');
  assert.equal(removeWhitespace(thirdRow.text().trim()), 'Amy Zuthers');

  // try sorting by last name, descending
  this.$('.fa-chevron-up').eq(0).click();

  firstRow = this.$('tr').eq(1);
  secondRow = this.$('tr').eq(2);
  thirdRow = this.$('tr').eq(3);

  assert.equal(removeWhitespace(firstRow.text().trim()), 'Amy Zuthers');
  assert.equal(removeWhitespace(secondRow.text().trim()), 'Michael Myers');
  assert.equal(removeWhitespace(thirdRow.text().trim()), 'Zoltan Anderson');
});
