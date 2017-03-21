import Ember from 'ember';

export default Ember.Helper.helper(function([text]) {
  return (text.match(new RegExp('\n', 'g')) || []).length;
});
