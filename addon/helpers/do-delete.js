import Ember from 'ember';

export default Ember.Helper.helper(function([confirmMessage]) {
  if (!confirmMessage) {
    confirmMessage = '';
  }
  return (model) => {
    if ((!confirmMessage) || confirm(confirmMessage)) {
      model.destroyRecord();
    }
  };
});
