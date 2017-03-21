import Ember from 'ember';

export default Ember.Component.extend({

  callClosureAction(nameStr, param) {
    if (this.attrs[nameStr] && typeof this.attrs[nameStr] === 'function') {
      this.attrs[nameStr](param);
    } else {
      Ember.assert(`Must provide an ${nameStr} closure action to ${this.toString()}.`, !Ember.isEmpty(this.attrs[nameStr]));
    }
  }
});
