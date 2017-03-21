import Ember from 'ember';
import layout from '../templates/components/q-accordion';

const {
  Component,
  assert,
  isEmpty
} = Ember;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['accordion', 'full-height'],

  /**
    If the first item be selected if `activeSection` is not passed or
    is null.

    @default false
  */
  autoSelectFirstItem: false,
  allowMulti: false,

  didReceiveAttrs() {
    if (!this.get('allowMulti')) {
      let onActivateSection = this.getAttr('onActivateSection');
      assert('Must provide an onActivateSection closure action to {{q-accordion}}.', !isEmpty(onActivateSection));
    }
  },

  didInsertElement() {
    if (!this.get('allowMulti')) {
      this._autoSelectFirstItem();
    }
  },

  _autoSelectFirstItem() {
    let autoSelect = this.get('autoSelectFirstItem');
    let selected = this.getAttr('activeSection');

    if (autoSelect && !selected) {
      let id = this.$('.accordion-navigation:first-of-type').attr('id');
      let item = Ember.Object.create({
        id
      });

      this.attrs.onActivateSection(item);
    }
  }
});
