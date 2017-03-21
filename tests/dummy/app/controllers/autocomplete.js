import Ember from 'ember';
const {
  Controller,
  RSVP,
  computed,
  get
} = Ember;

export default Controller.extend({
  objectLabelFormatter: computed(() => {
    return (thing) => {
      return `${get(thing, 'id')} - ${get(thing, 'name')}`;
    };
  }),

  selectedObjectValue: {
    name: 'Sarah',
    id: 302
  },

  _randomTimeIndex: -1,

  actions: {
    plainTextItemSelected(item) {
      this.set('selectedPlainTextValue', item);
    },

    plainTextResultsSearch() {
      return RSVP.Promise.resolve(['yep']);
    },

    objectItemSelected(item) {
      this.set('selectedObjectValue', item);
    },

    objectResultsSearch() {
      let times = [300, 1000, 100];
      let index = this.getWithDefault('_randomTimeIndex', -1) + 1;
      let randomTime = times[index];
      this.set('_randomTimeIndex', index);
      // console.log(`calling later with time of ${randomTime}`)

      return new RSVP.Promise((resolve) => {
        Ember.run.later(function() {
          return resolve([
            { name: 'Dave', id: 1 + randomTime },
            { name: 'Sarah', id: 2 + randomTime },
            { name: 'Mike', id: 3 + randomTime }
          ]);
        }, randomTime);
      });
    }
  }
});
