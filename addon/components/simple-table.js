import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  classNames: ['table-fixed', 'full-width'],

  layout,

  safeColumns: Ember.computed('columns', function() {
    return this.get('columns').map((column) => {
      return Ember.ObjectProxy.create({
        content: column,
        safeWidth: Ember.String.htmlSafe(`width: ${column.width}`)
      });
    });
  }),

  sortAscending: true,

  sortedRows: Ember.computed.oneWay('rows'),

  sortField: '',

  tagName: 'table',

  actions: {
    sortTable(fieldName) {
      if (!fieldName) {
        return;
      }

      if (fieldName === this.get('sortField')) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortAscending', true);
        this.set('sortField', fieldName);
      }

      let rows = this.get('rows');
      let sortedRows = rows.sortBy(fieldName);

      if (this.get('sortAscending')) {
        this.set('sortedRows', sortedRows);
      } else {
        this.set('sortedRows', sortedRows.reverse());
      }
    },

    columnHeaderClick(action, index) {
      this.sendAction(action, index);
    }
  }
});
