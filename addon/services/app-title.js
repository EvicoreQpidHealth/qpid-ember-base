import Ember from 'ember';

const { readOnly } = Ember.computed;

//  Keeps track of the current app title, shown at the top of the page.
export default Ember.Service.extend({

  _title: null,
  current: readOnly('_title'),

  setTitle(title) {
    this.set('_title', title);
  }
});
