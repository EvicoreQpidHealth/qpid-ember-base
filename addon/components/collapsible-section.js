import Ember from 'ember';
import layout from '../templates/components/collapsible-section';

export default Ember.Component.extend({
  layout,
  maxHeight: 20,
  heightStyle: Ember.computed('maxHeight', function() {
    let height = this.get('maxHeight');
    return Ember.String.htmlSafe(`max-height: ${height}rem;`);
  }),
  actions: {
    toggleOpen() {
      this.toggleProperty('open');
    }
  }
});
