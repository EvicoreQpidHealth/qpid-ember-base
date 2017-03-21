import Ember from 'ember';
import layout from '../../templates/components/layout/card-column';
import Resizing from '../../mixins/resizing';

export default Ember.Component.extend(Resizing, {
  layout,
  tagName: '',
  mediumWidthClass: Ember.computed('medium', 'attrs', function() {
    let medium = this.get('medium');
    if (Ember.isEmpty(medium)) {
      return '';
    } else {
      return `medium-${medium}`;
    }
  })
});
