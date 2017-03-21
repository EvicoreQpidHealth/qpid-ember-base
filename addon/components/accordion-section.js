import Ember from 'ember';
import layout from '../templates/components/accordion-section';
import resize from '../utils/resize';

const {
  Component,
  computed,
  assert
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['accordion-navigation'],
  classNameBindings: ['isActive:flex:firm', 'isActive:active'],

  group: null,
  open: false,
  animate: false,

  isActive: computed('group.activeSection', 'group.allowMulti', 'open', function() {
    if (this.get('group.allowMulti')) {
      return this.get('open');
    } else {
      return this.get('group.activeSection') === this.get('id');
    }
  }),

  didReceiveAttrs() {
    let id = this.getAttr('id');
    let group = this.getAttr('group');

    assert('Must provide an id.', id);
    assert('Must provide a group to {{accordion-section}}.', group);
  },

  actions: {
    setActive() {
      let group = this.getAttr('group');
      if (group.onActivateSection) {
        group.onActivateSection(this);
      }
      if (this.get('group.allowMulti')) {
        this.toggleProperty('open');
      }
      Ember.$('.accordion-navigation').css('height', '');
      Ember.run.scheduleOnce('afterRender', this, resize);
      if (this.get('animate')) {
        Ember.run.later(this, resize, 300);
      }
    }
  }
});
