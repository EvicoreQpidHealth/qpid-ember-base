import Ember from 'ember';
import layout from '../templates/components/app-search-patient';
import moment from 'moment';

const {
  Component,
  computed,
  isEmpty
} = Ember;

function highlightText(toMatch, text) {
  if (isEmpty(toMatch)) {
    return text;
  }

  let regex = new RegExp(toMatch, 'i');
  let searchIndex = text.search(regex);

  if (searchIndex >= 0) {
    toMatch = text.substring(searchIndex, searchIndex + toMatch.length);
    let highlighted = text.replace(regex, `<strong>${toMatch}</strong>`);

    return new Ember.String.htmlSafe(highlighted);
  } else {
    return text;
  }
}

export default Component.extend({
  layout,

  userInput: null,
  result: null,
  showSite: false, // site associated with a MRN, e.g. "MGH" at Partners

  highlightedName: computed('userInput', 'result.name', function() {
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    let lastName = this.get('result.last_name');
    let firstName = this.get('result.first_name');
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

    let name = lastName && firstName ? `${lastName}, ${firstName}` : '-';
    let userInput = this.get('userInput');

    return highlightText(userInput, name);
  }),

  highlightedIdentifier: computed('userInput', 'result.patient_identifier', function() {
    let userInput = this.get('userInput');
    let name = this.get('result.patient_identifier');

    return name ? highlightText(userInput, name) : '-';
  }),

  highlightedSite: computed('userInput', 'result.site', function() {
    let userInput = this.get('userInput');
    let site = this.get('result.site');

    return site ? highlightText(userInput, site) : '-';
  }),

  formattedDob: computed('userInput', 'result.dob', function() {
    let dob = this.get('result.dob');
    let result = '-';

    // dob can be 12/31/2001 or 2001-12-31. Convert to 12-31-2001
    if (dob) {
      if (dob.indexOf('/') > -1) {
        result = moment(dob, 'MM/DD/YYYY').format('MM-DD-YYYY');
      } else if (dob.indexOf('-') > -1) {
        result = moment(dob, 'YYYY-MM-DD').format('MM-DD-YYYY');
      }

      // No matter what, make sure the ouput doesn't say something like "INVALID DATE"
      if (result.indexOf('-') < 0) {
        result = '-';
      }
    }

    return result;
  })

});
