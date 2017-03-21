import Ember from 'ember';
import layout from '../templates/components/edit-toggle';

const { service } = Ember.inject;

export default Ember.Component.extend({
  layout,
  tagName: '',
  editing: service(),

  actions: {
    toggleEditing() {
      this.get('editing').toggleIsEditing();
    }
  }
});
