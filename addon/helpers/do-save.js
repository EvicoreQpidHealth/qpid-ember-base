import Ember from 'ember';

export default Ember.Helper.helper(function([model]) {
  if (!model) {
    model = null;
  }
  return (input) => {
    if (model) {
      model.save();
    } else {
      input.save();
    }
  };
});
