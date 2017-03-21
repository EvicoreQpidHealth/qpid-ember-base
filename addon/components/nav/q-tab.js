import Ember from 'ember';
import layout from '../../templates/components/nav/q-tab';

const {
  Component,
  assert
} = Ember;

export default Component.extend({
  layout,
  tagName: 'dd',
  tabParent: null,

  click() {
    this.get('tabParent').activateTab(this);
  },

  didReceiveAttrs() {
    let tabParent = this.getAttr('tabParent');
    assert('Must provide a `tabParent` attribute to {{q-tab}}', tabParent);
  }
});
