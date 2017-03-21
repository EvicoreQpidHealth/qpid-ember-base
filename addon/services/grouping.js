import Ember from 'ember';

const ASCENDING = '';
const DESCENDING = ':desc';

// SOLR key   --   Ember key
// While JSON results will be sorted relative to the database,
// they will lose their sort order relative to each other.
// So we need to enforce correct sort order through ember's sort.
const KEYMAP = {
  startTime: 'time.startLong',
  sourceTitle: 'provenance.title',
  groupSourceTitle: 'name'
};

// Manage the various settings that go into a grouped evidence query
export default Ember.Service.extend({
  isGrouping: Ember.computed.notEmpty('group'),
  group: '',
  start: 'none',
  end: 'none',
  startTime: Ember.computed('start', {
    get() {
      return this.get('start');
    },
    set(key, value) {
      let val = Ember.isEmpty(value) ? 'none' : value;
      this.set('start', val);
      return val;
    }
  }),
  endTime: Ember.computed('end', {
    get() {
      return this.get('end');
    },
    set(key, value) {
      let val = Ember.isEmpty(value) ? 'none' : value;
      this.set('end', val);
      return val;
    }
  }),
  page: 0, // page number (within groups)
  pageSize: 2, // NUMBER OF results per GROUPS
  sortField: 'start_time',
  order: -1,

  // order=1, ('' = ascending) Numbers: small to big, abc: A-Z, date: older to newer
  // order=-1, (:desc) Numbers: big to small, abc: Z-A, date: newer to older
  emberOrder: Ember.computed('order', function() {
    return this.get('order') < 0 ? DESCENDING : ASCENDING;
  }),

  // generate appropriate sorting string for use by ember's sortBy computed property
  sortProperty: Ember.computed('sortField', 'emberOrder', 'isGrouping', function() {
    let key = this.get('isGrouping') ? 'group_source_title' : this.get('sortField');
    return `${KEYMAP[Ember.String.camelize(key)]}${this.get('emberOrder')}`;
  }),

  useSettingsFromDisplay(currentDisplay, defaults) {
    let { defaultSortSelections } = defaults;
    let sortDefaultOptions = currentDisplay.getWithDefault('sortDefault.data', defaultSortSelections.data);
    // there should only be one result to this filter - if all options are false use qpid default setting
    let sortDefault = sortDefaultOptions.filterBy('value', true).objectAt(0) || defaultSortSelections.data.filterBy('value', true).objectAt(0);

    let options = {
      pageSize: currentDisplay.get('pageSize'),
      sortField: sortDefault.sortField,
      order: sortDefault.param
    };

    this.setProperties(options);
  }
});
