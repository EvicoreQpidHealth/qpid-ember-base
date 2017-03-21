import Ember from 'ember';

const {
  Service,
  computed
} = Ember;

//  Keeps track of the current app search.
export default Service.extend({
  currentSearch: null,

  /**
    The formatter function used create the input value.
    Returns the input by default.
  */
  formatter: computed(function() {
    return (value) => {
      return value;
    };
  }),

  formattedSearch: computed('formatter', 'currentSearch', function() {
    let formatter = this.get('formatter');
    let search = this.get('currentSearch');

    return formatter(search);
  })
});
