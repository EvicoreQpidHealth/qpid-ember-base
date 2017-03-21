import Ember from 'ember';
import layout from '../templates/components/q-date-range';
import moment from 'moment';
const { isEmpty } = Ember;

// <Input type=date> expects this format
const INPUT_FORMAT = 'YYYY-MM-DD';
// Shorten date as much as possible to conserve screen real estate
const DISPLAY_FORMAT = 'M/D/YY';
// SQRLZ expects this format
const SQRLZ_FORMAT = 'MM/DD/YYYY';

export default Ember.Component.extend({
  layout,
  tagName: '',
  startTime: '',
  endTime: Ember.computed(function() {
    return this.get('today');
  }),
  today: moment().format(INPUT_FORMAT),
  init() {
    this._super(...arguments);
    this.send('dateChange', true);
  },
  displayText: Ember.computed('startTime', 'endTime', function() {
    let startTime = this.get('startTime');
    let endTime = this.get('endTime');

    if (isEmpty(startTime)) {
      return 'None';
    }
    startTime = this.displayDateFormat(startTime);

    if (Ember.isEqual(endTime, this.get('today'))) {
      return `${startTime}-Present`;
    } else {
      return `${startTime}-${this.displayDateFormat(endTime)}`;
    }
  }),
  displayDateFormat(dateString) {
    return moment(dateString).format(DISPLAY_FORMAT);
  },
  actions: {
    dateChange(onInit) {
      let start = this.get('startTime');
      let format = function(date) {
        return moment(date).format(SQRLZ_FORMAT);
      };

      this.sendAction('dateChange', {
        displayText: this.get('displayText'),
        start: Ember.isEmpty(start) ? '' : format(start),
        end: format(this.get('endTime')),
        // true if called from init, false otherwise
        onInit: typeof onInit === 'boolean' ? onInit : false
      });
    }
  }
});
