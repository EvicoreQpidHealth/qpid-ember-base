import Ember from 'ember';
import layout from '../templates/components/q-table-filter-dropdown';
import Resizing from '../mixins/resizing';

export default Ember.Component.extend(Resizing, {
  layout,
  tagName: '',
  filterUnset: Ember.computed('filter', function() {
    return Ember.isEmpty(this.get('filter'));
  }),
  dropdownClasess: '',
  actions: {
    setFilter(value) {
      this.set('filter', value);
      this.attrs.saveFilter(this.get('name'), this.get('filter'));
    },

    unsetFilter() {
      this.set('filter', null);
      this.attrs.saveFilter(this.get('name'), this.get('filter'));
    },

    saveFilter() {
      this.attrs.saveFilter(this.get('name'), this.get('filter'));
    }
  }
});
