import Ember from 'ember';
import layout from '../../templates/components/nav/app-search';

const {
  Component,
  computed
} = Ember;

const { service } = Ember.inject;

export default Component.extend({
  layout,
  appSearch: service(),
  quantum: service(),
  searchPlaceholderText: 'Search for a patient name or MRN',
  noSearchResultsText: 'No patients or MRNs found.',

  /**
    The format to apply to the display of selected items in the search.
  */
  searchResultLabelFormatter: computed(() => {
    return function(selectedItem) {
      return `${selectedItem}`;
    };
  }),

  /**
    The component used to render app search results.
    @default 'app-search-patient'
  */
  searchResultsComponent: 'app-search-patient'
});
