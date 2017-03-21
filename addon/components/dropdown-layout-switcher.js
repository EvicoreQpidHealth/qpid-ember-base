import BASE from './q-base';
import layout from '../templates/components/dropdown-layout-switcher';

export default BASE.extend({
  layout,

  actions: {
    switchLayout(layout) {
      this.callClosureAction('switchLayout', layout);
    }
  }
});
