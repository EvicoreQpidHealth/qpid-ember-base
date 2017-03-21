import Ember from 'ember';

const { readOnly } = Ember.computed;

/**
  Keeps track of the current app title, shown at the top of the page.
*/
export default Ember.Service.extend({

  _isEditing: false,
  isEditing: readOnly('_isEditing'),

  setIsEditing(isEditing) {
    this.set('_isEditing', isEditing);
  },

  _changeFunctions: Ember.A([]),

  toggleIsEditing() {
    this.set('_isEditing', !(this.get('_isEditing')));
    $('.ember-application').toggleClass('editing');
    let isEditing = this.get('_isEditing');
    this.get('_changeFunctions').forEach((f) => {
      f(isEditing);
    });
  },
  registerChangeNotify(func) {
    this.get('_changeFunctions').pushObject(func);
  },
  unregisterChangeNotify(func) {
    this.get('_changeFunctions').removeObject(func);
  }
});
