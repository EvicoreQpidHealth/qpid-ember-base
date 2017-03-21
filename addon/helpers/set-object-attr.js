import Ember from 'ember';

export default Ember.Helper.helper(function([object, property, value]) {
  return () => {
    if ('set' in object) {
      object.set(property, value);
    } else {
      object[property] = value;
    }
  };
});
