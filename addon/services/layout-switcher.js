import Ember from 'ember';

const { readOnly } = Ember.computed;

//  Keeps track of the current app title, shown at the top of the page.
export default Ember.Service.extend({
  _context: null,
  _switcherFunction: null,
  _layouts: null,
  current: readOnly('_layouts'),

  setSwitcherFunction(func, ctx) {
    this.set('_switcherFunction', func);
    this.set('_context', ctx);
  },

  setLayouts(layouts) {
    this.set('_layouts', layouts);
  },

  switchLayout(layout) {
    this.get('_switcherFunction').call(this.get('_context'), layout);
  }
});
